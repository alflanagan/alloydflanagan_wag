# A Lloyd Flanagan's Personal Website

Wagtail version of my personal website

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[![Powered by Django.](https://www.djangoproject.com/m/img/badges/djangopowered126x54.gif)](https://www.djangoproject.com)

**If you're seeing this on github.com, it's just a mirror; the actual project is at https://gitlab.com/a-lloyd-flanagan-group/alloydflanagan_wag**

# Set up project

## .. Lots of Stuff I Haven't Documented Yet
## Create superuser locally

When running on a local machine, after `docker compose -up -wait` run the following:

```sh
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
