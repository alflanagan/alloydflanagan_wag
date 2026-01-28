from django.urls import path
from alloydflanagan.design_system.views import DesignSystemView

urlpatterns = [
    path("", DesignSystemView.as_view(), name="design_system"),
]
