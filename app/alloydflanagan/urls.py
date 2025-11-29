from django.conf import settings
from django.contrib import admin
from django.urls import include, path

from alloydflanagan.home import urls as home_urls
from alloydflanagan.search import views as search_views

urlpatterns = [
    path("home/", home_urls, name="home"),
    # path("blog/", blog.urls, name="blog"),
    path("admin/", admin.site.urls),
    path("search/", search_views.search, name="search"),
]


if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += [path("__debug__/", include("debug_toolbar.urls"))]
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
