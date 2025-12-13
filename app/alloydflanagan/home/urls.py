from django.urls import path
from alloydflanagan.home.views import HomePageView

urlpatterns = [
    path("", HomePageView.as_view(), name="home")
]
