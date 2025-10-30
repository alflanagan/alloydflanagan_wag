FROM python:3.14.0-trixie
# node version in slim-bookworm is 18.19.0
# postgresql client is 15.8

SHELL ["/bin/bash", "-euo", "pipefail", "-c"]

# Install system packages required by Wagtail and Django.
# hadolint ignore=DL3008
RUN apt-get update --yes --quiet && apt-get install --yes --quiet --no-install-recommends \
    build-essential \
    curl \
    libpq-dev \
    libjpeg62-turbo-dev \
    postgresql-client \
    zlib1g-dev \
    libwebp-dev \
 && rm -rf /var/lib/apt/lists/*

# Port used by this container to serve HTTP.
EXPOSE 8080

# Set environment variables.
# 1. Force Python stdout and stderr streams to be unbuffered.
# 2. Set PORT variable that is used by Gunicorn. This should match "EXPOSE"
#    command.
ENV PYTHONUNBUFFERED=1 \
    PORT=8080 \
    DJANGO_SETTINGS_MODULE=alloydflanagan.settings.production

# Use /app folder as a directory where the source code is stored.
WORKDIR /app

# Copy the source code of the project into the container.
COPY app /app/

#TODO: get uv to use system python instead of downloading -- faster, more reliable.
RUN pip install --no-cache-dir uv==0.7.17 && \
    uv sync --frozen --no-dev

# Note: Fly automatically sets DATABASE_URL
CMD ["make", "run-server"]
