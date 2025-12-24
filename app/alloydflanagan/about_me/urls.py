from django.urls import path
from alloydflanagan.about_me.views import AboutMeView

urlpatterns = [
    path("", AboutMeView.as_view(), name="about_me")
]
