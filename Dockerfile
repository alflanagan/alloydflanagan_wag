FROM python:3.11.5-slim-bookworm

# Add user that will be used in the container.
RUN adduser --shell /bin/bash webapp && echo "webapp:webapp" | chpasswd

# Install system packages required by Wagtail and Django.
RUN apt-get update --yes --quiet && apt-get install --yes --quiet --no-install-recommends \
    build-essential \
    curl \
    libpq-dev \
    libjpeg62-turbo-dev \
    postgresql-client \
    sudo \
    zlib1g-dev \
    libwebp-dev \
 && rm -rf /var/lib/apt/lists/*

RUN echo "webapp 	ALL=(ALL:ALL) NOPASSWD:ALL" >> /etc/sudoers

# Port used by this container to serve HTTP.
EXPOSE 8080

# Set environment variables.
# 1. Force Python stdout and stderr streams to be unbuffered.
# 2. Set PORT variable that is used by Gunicorn. This should match "EXPOSE"
#    command.
ENV PYTHONUNBUFFERED=1 \
    PORT=8080 \
    PATH=/home/webapp/.local/bin:$PATH

# Use /app folder as a directory where the source code is stored.
WORKDIR /app

# Set this directory to be owned by the "webapp" user.
RUN chown webapp:webapp /app

# Use user "webapp" to run the build commands below and the server itself.
USER webapp

# get node
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
RUN /bin/bash -c ". ~/.nvm/nvm.sh &&  nvm install lts/hydrogen"

# Install the project requirements.
COPY --chown=webapp requirements.in requirements.dev.in requirements.txt app/Makefile /tmp/
COPY --chown=webapp app/Makefile /app
RUN make pip-setup && pip-sync /tmp/requirements.txt

# Copy the source code of the project into the container.
COPY --chown=webapp:webapp app /app/

# Collect static files.
RUN python manage.py collectstatic --noinput --clear

CMD set -xe; gunicorn alloydflanagan.wsgi:application -b 0.0.0.0:$PORT
