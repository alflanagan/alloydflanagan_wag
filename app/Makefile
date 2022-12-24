.PHONY: requirements pip-setup tasks stop start rootshell dbshell

PIP_COMPILE = pip-compile --generate-hashes --allow-unsafe --output-file

# run this once, when setting up a totally new environment
pip-setup:
	python -m pip install --upgrade pip setuptools wheel pip-tools

# run this any time requirements.in or requirements.dev.in change
requirements:
	$(PIP_COMPILE) requirements.txt requirements.in
	$(PIP_COMPILE) requirements.dev.txt requirements.dev.in
	pip-sync requirements.txt requirements.dev.txt

djhtml:
	find alloydflanagan -name '*.html' -exec djhtml -i -t2 '{}' +

# this makes up for the fact that make has no command to show what tasks are defined
# no attempt was made at a universal solution; you'll need to enhance for any but most basic case
tasks:
	@grep -E '^[a-zA-Z_-]+:' Makefile | cut -d: -f1 | grep -v tasks
