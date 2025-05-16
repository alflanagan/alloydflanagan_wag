.PHONY: tasks stop start rootshell dbshell

PIP_COMPILE = pip-compile --generate-hashes --allow-unsafe --resolver=backtracking

stop:
	docker compose down --remove-orphans

start:
	docker compose up --wait

#start a shell running in the django environment
shell:
	docker compose exec -it wagtail /bin/bash -i

rootshell:
	docker compose exec -it -u 0 wagtail /bin/bash -i

dbshell:
	docker compose exec -it postgres /bin/bash -i

# this makes up for the fact that make has no command to show what tasks are defined
# no attempt was made at a universal solution; you'll need to enhance for any but most basic case
targets:
	@grep -E '^[a-zA-Z_-]+:' Makefile | cut -d: -f1 | grep -v targets

tasks: targets
