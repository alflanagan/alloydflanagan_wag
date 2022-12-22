.PHONY: tasks stop start rootshell dbshell

stop:
	docker compose down --remove-orphans

start:
	docker compose up --detach

#start a shell running in the django environment
shell:
	docker exec -it alloydflanagan_wag-api-1 /bin/bash -i

rootshell:
	docker exec -it -u 0 alloydflanagan_wag-api-1 /bin/bash -i

dbshell:
	docker exec -it alloydflanagan_wag-postgres-1 /bin/bash -i

requirements:
	pip-compile --generate-hashes --allow-unsafe --resolver=backtracking --output-file requirements.txt requirements.in
	pip-compile --generate-hashes --allow-unsafe --resolver=backtracking --output-file requirements.dev.txt requirements.dev.in

upgrade_reqts:
	pip-compile --generate-hashes --upgrade --allow-unsafe --resolver=backtracking --output-file requirements.txt requirements.in
	pip-compile --generate-hashes --upgrade --allow-unsafe --resolver=backtracking --output-file requirements.dev.txt requirements.dev.in

pip-sync:
	pip-sync requirements.txt requirements.dev.txt

# this makes up for the fact that make has no command to show what tasks are defined
# no attempt was made at a universal solution; you'll need to enhance for any but most basic case
tasks:
	@grep -E '^[a-zA-Z_-]+:' Makefile | cut -d: -f1 | grep -v tasks
