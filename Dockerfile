FROM python:3.14.0-trixie

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
    npm \
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
RUN pip install --no-cache-dir uv==0.9.7 && \
    uv sync --frozen --no-dev

# hadolint ignore=DL3016
RUN npm install -g npm; \
    npm install -g n; \
    n 24

RUN corepack enable

# hadolint ignore=DL3016
RUN yarn; \
    yarn build

# Note: Fly automatically sets DATABASE_URL
CMD ["make", "run-server"]
