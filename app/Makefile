.PHONY: requirements pip-setup tasks stop start rootshell dbshell

PIP_COMPILE = pip-compile --generate-hashes --allow-unsafe --output-file

# run this once, when setting up a totally new environment
pip-setup:
	python -m pip install --upgrade pip setuptools wheel pip-tools

# run this any time requirements.in or requirements.dev.in change
requirements:
	$(PIP_COMPILE) requirements.txt requirements.in requirements.dev.in
	pip-sync requirements.txt

run-server:
	python manage.py migrate
	python manage.py runserver 0.0.0.0:8080

djhtml:
	find alloydflanagan -name '*.html' -exec djhtml -i -t2 '{}' +

targets:
	@grep -E '^[a-zA-Z_-]+:' Makefile | cut -d: -f1 | grep -v targets

flake8:
	find alloydflanagan -name migrations -prune -o -name '*.py' -exec flake8 '{}' +

isort:
	isort alloydflanagan

black:
	black alloydflanagan

lint: isort black flake8 djhtml
