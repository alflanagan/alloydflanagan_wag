from .base import *

DEBUG = False

try:
    from .local import *
except ImportError:
    pass

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')

allowed_hosts = os.environ.get('DJANGO_ALLOWED_HOSTS')
if allowed_hosts is None:
    ALLOWED_HOSTS = ['*']
else:
    ALLOWED_HOSTS = allowed_hosts.split(',')
