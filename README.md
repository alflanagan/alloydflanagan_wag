# A Lloyd Flanagan's Personal Website

Wagtail version of my personal website


## Create superuser locally

When running on a local machine, after `docker compose -up -wait` run the following:

```
$ docker compose exec -it wagtail bash
root@5c5cb7559dca:/app# uv run python manage.py createsuperuser
Username (leave blank to use 'root'): xxxxx
Email address: xxxx@xx.xx
Password:
Password (again):
The password is too similar to the username.
This password is too short. It must contain at least 8 characters.
This password is too common.
Bypass password validation and create user anyway? [y/N]: y
Superuser created successfully.
```
