.PHONY: tasks stop start rootshell dbshell

PIP_COMPILE = pip-compile --generate-hashes --allow-unsafe --resolver=backtracking

stop:
	docker compose down --remove-orphans

start:
	docker compose up --wait

#start a shell running in the django environment
shell:
	docker exec -it alf-wag /bin/bash -i

rootshell:
	docker exec -it -u 0 alf-wag /bin/bash -i

dbshell:
	 docker exec -it alf-pg /bin/bash -i

requirements:
	$(PIP_COMPILE) requirements.in; $(PIP_COMPILE) requirements.dev.in

# this does not work, as of 7/7/2004
# upgrade_reqts:
#   $(PIP_COMPILE) --upgrade requirements.in --upgrade requirements.dev.in --output-file requirements.txt

upgrade_reqts:
	$(PIP_COMPILE) --upgrade requirements.in; \
	$(PIP_COMPILE) --upgrade requirements.dev.in

pip-sync:
	pip-sync requirements.txt requirements.dev.txt

# this makes up for the fact that make has no command to show what tasks are defined
# no attempt was made at a universal solution; you'll need to enhance for any but most basic case
targets:
	@grep -E '^[a-zA-Z_-]+:' Makefile | cut -d: -f1 | grep -v targets
