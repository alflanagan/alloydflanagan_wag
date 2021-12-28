.PHONY: requirements pip-setup tasks stop start rootshell dbshell

# run this once, when setting up a totally new environment
pip-setup:
	python -m pip install --upgrade pip setuptools wheel pip-tools

# run this any time requirements.in or requirements.dev.in change
# requirements.txt must be in root for heroku
requirements:
	cd .. && pip-compile --generate-hashes requirements.in
	cd .. && pip-compile --generate-hashes requirements.dev.in
	cd .. && pip-sync requirements.txt requirements.dev.txt

# this makes up for the fact that make has no command to show what tasks are defined
# no attempt was made at a universal solution; you'll need to enhance for any but most basic case
tasks:
	@grep -E '^[a-zA-Z_-]+:' Makefile | cut -d: -f1 | grep -v tasks
