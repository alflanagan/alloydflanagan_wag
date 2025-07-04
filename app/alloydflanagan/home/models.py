from django.db.models import FileField

from wagtail.admin.panels import FieldPanel
from wagtail.models import Page
from wagtail.fields import RichTextField

class HomePage(Page):
    intro = RichTextField()
    # may move resume to AboutPage model if/when we have one
    resume = FileField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel("intro", classname="full"),
        FieldPanel("resume", classname="full"),
    ]
