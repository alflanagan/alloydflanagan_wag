from .base import *

DEBUG = False

try:
    from .local import *
except ImportError:
    pass

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')
