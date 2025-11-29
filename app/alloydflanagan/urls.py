from django.conf import settings
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("home/", include("alloydflanagan.home.urls"), name="home"),
    # path("blog/", blog.urls, name="blog"),
    path("admin/", admin.site.urls, name="admin"),
]


if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += [path("__debug__/", include("debug_toolbar.urls"))]
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
