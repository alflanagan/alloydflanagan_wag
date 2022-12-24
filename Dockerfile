FROM python:3.11.0-slim-buster

# Add user that will be used in the container.
RUN adduser --shell /bin/bash wagtail && echo "wagtail:wagtail" | chpasswd

# Install system packages required by Wagtail and Django.
RUN apt-get update --yes --quiet && apt-get install --yes --quiet --no-install-recommends \
    build-essential \
    curl \
    libpq-dev \
    libmariadbclient-dev \
    libjpeg62-turbo-dev \
    postgresql-client \
    sudo \
    zlib1g-dev \
    libwebp-dev \
 && rm -rf /var/lib/apt/lists/*

RUN echo "wagtail 	ALL=(ALL:ALL) NOPASSWD:ALL" >> /etc/sudoers

RUN curl -sL https://deb.nodesource.com/setup_18.x | bash; \
    apt-get install -y nodejs; \
    npm i -g corepack@latest npm@latest; \
    corepack enable

# Port used by this container to serve HTTP.
EXPOSE 8080

# Set environment variables.
# 1. Force Python stdout and stderr streams to be unbuffered.
# 2. Set PORT variable that is used by Gunicorn. This should match "EXPOSE"
#    command.
ENV PYTHONUNBUFFERED=1 \
    PORT=8080 \
    PATH=/home/wagtail/.local/bin:$PATH

# Use /app folder as a directory where the source code is stored.
WORKDIR /app

# Set this directory to be owned by the "wagtail" user.
RUN chown wagtail:wagtail /app

# Use user "wagtail" to run the build commands below and the server itself.
USER wagtail

# Install the project requirements.
COPY --chown=wagtail requirements.in requirements.dev.in requirements.txt requirements.dev.txt app/Makefile /tmp/
COPY --chown=wagtail app/Makefile /app
RUN make pip-setup && pip-sync /tmp/requirements.txt /tmp/requirements.dev.txt

# Copy the source code of the project into the container.
COPY --chown=wagtail:wagtail app /app/

# Collect static files.
RUN python manage.py collectstatic --noinput --clear

CMD set -xe; gunicorn alloydflanagan.wsgi:application -b 0.0.0.0:$PORT
