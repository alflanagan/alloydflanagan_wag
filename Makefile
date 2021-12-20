.PHONY: requirements pip-setup tasks stop start rootshell dbshell

# run this once, when setting up a totally new environment
pip-setup:
	python -m pip install --upgrade pip setuptools wheel pip-tools

# run this any time requirements.in or requirements.dev.in change
requirements:
	pip-compile --generate-hashes --allow-unsafe requirements.in
	pip-compile --generate-hashes --allow-unsafe requirements.dev.in
	pip-sync requirements.txt requirements.dev.txt

stop:
	docker compose down --remove-orphans

start:
	docker compose up --build --detach

#start a shell running in the django environment
shell:
	docker exec -it alloydflanagan_wag-api-1 /bin/bash -i

rootshell:
	docker exec -it -u 0 alloydflanagan_wag-api-1 /bin/bash -i

dbshell:
	docker exec -it alloydflanagan_wag-postgres-1 /bin/bash -i

# this (attempts to) make up for the fact that make has no command to show what tasks are defined
tasks:
	@grep -E '^[a-zA-Z_-]+:' Makefile | cut -d: -f1 | grep -v tasks
