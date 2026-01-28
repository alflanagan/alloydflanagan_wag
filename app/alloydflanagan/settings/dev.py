import socket

from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "3_g6z8!sq&^a_r!8t--57#bz0zrthoz3+fqc=!p8_hz6&0kh*x"

# SECURITY WARNING: define the correct hosts in production!
ALLOWED_HOSTS = ["*"]

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

INSTALLED_APPS += [
    "debug_toolbar",
]

MIDDLEWARE = [
    "alloydflanagan.middleware.DisableBrowserCacheMiddleware",
    "debug_toolbar.middleware.DebugToolbarMiddleware",
] + MIDDLEWARE

hostname, _, ips = socket.gethostbyname_ex(socket.gethostname())
INTERNAL_IPS = [ip[: ip.rfind(".")] + ".1" for ip in ips] + ["127.0.0.1", "10.0.2.2"]

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.dummy.DummyCache",
    }
}

TEMPLATES[0]["OPTIONS"]["debug"] = True

try:
    from .local import *
except ImportError:
    pass
