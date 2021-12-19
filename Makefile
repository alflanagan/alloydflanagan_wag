# run this once, when setting up a totally new environment
pip-setup:
	python -m pip install --upgrade pip setuptools wheel pip-tools

# run this any time requirements.in or requirements.dev.in change
requirements:
	pip-compile --generate-hashes --allow-unsafe requirements.in
	pip-compile --generate-hashes --allow-unsafe requirements.dev.in
	pip-sync requirements.txt requirements.dev.txt

# this (attempts to) make up for the fact that make has no command to show what tasks are defined
tasks:
	@grep -E '^[a-zA-Z_-]+:' Makefile | cut -d: -f1 | grep -v tasks
