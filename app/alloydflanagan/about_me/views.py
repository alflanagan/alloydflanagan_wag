from django.views.generic.base import TemplateView


# Create your views here.
class AboutMeView(TemplateView):
    template_name = 'about_me/about.html'
