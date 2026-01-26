# -*- mode: makefile-gmake; -*-
PYTHON=uv run --link-mode=copy python
SERVER_ARGS=--access-logfile - --timeout 30 --bind 0.0.0.0:8080 --error-logfile -
EXCLUDE_DIRS=-name .venv -prune -o -name .yarn -prune -o -name vendor -prune -o -name dist -prune -o


run-server:
	echo "Starting server..."; \
	$(PYTHON) manage.py migrate; \
	$(PYTHON) manage.py collectstatic --noinput; \
	uv run gunicorn alloydflanagan.wsgi:application $(SERVER_ARGS); \
	echo "Server is up."

djhtml:
	find alloydflanagan -name '*.html' -exec djhtml -i -t2 '{}' +

flake8:
	find alloydflanagan -name migrations -prune -o -name '*.py' -exec flake8 '{}' +

isort:
	uv run isort alloydflanagan

black:
	uv run black alloydflanagan

test:
	node `yarn bin mocha`

build:
	yarn run webpack --config webpack.config.cjs

lintjs:
	yarn run standard

formatjs:
	yarn run standard --fix

lintcss:
	yarn run stylelint

formatcss:
	yarn run style-fix

lint: isort black flake8 djhtml
