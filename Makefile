# -*- mode: makefile-gmake; -*-
cd.PHONY: tasks stop start rootshell dbshell

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

# TODO: get machine ID from app name
exec_on_db:
	fly machine exec 1857276f657438 --app alf-wag-db 'bash -c "psql --version"'

fly_dbshell:
	fly machine exec 6830393f152ed8 '/bin/bash -c "cd app && uv run python manage.py dbshell"'

fly_console:
	fly console --machine 6830393f152ed8

# TODO: should be able to make general bash script to accept arbitrary python.
fly_users:
	fly machine exec 48e42d9c724718 '/bin/bash -c "cd app && uv run python manage.py shell -c \"from django.contrib.auth.models import User; print(User.objects.count())\""'
