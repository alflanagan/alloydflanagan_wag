PYTHON="uv run --link-mode=copy python"

run-server:
	echo "Starting server..."; \
	$(PYTHON) manage.py migrate; \
	$(PYTHON) manage.py collectstatic --noinput; \
	uv run gunicorn --timeout 30 alloydflanagan.wsgi:application --bind 0.0.0.0:8080 --log-file -; \
	echo "Server is up."

djhtml:
	find alloydflanagan -name '*.html' -exec djhtml -i -t2 '{}' +

targets:
	@grep -E '^[a-zA-Z_-]+:' Makefile | cut -d: -f1 | grep -v targets

flake8:
	find alloydflanagan -name migrations -prune -o -name '*.py' -exec flake8 '{}' +

isort:
	uv run isort alloydflanagan

black:
	uv run black alloydflanagan

lint: isort black flake8 djhtml
