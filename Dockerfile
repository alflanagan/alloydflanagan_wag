FROM python:3.11.5-slim-bookworm

# Add user that will be used in the container.
RUN adduser --shell /bin/bash wagtail && echo "wagtail:wagtail" | chpasswd

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

RUN echo "wagtail 	ALL=(ALL:ALL) NOPASSWD:ALL" >> /etc/sudoers

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

# get node
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash; \

RUN NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")" \
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" ; \
    nvm install lts/hydrogen \
    
# Install the project requirements.
COPY --chown=wagtail requirements.in requirements.dev.in requirements.txt app/Makefile /tmp/
COPY --chown=wagtail app/Makefile /app
RUN make pip-setup && pip-sync /tmp/requirements.txt

# Copy the source code of the project into the container.
COPY --chown=wagtail:wagtail app /app/

# Collect static files.
RUN python manage.py collectstatic --noinput --clear

CMD set -xe; gunicorn alloydflanagan.wsgi:application -b 0.0.0.0:$PORT
