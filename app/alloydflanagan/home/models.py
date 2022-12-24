from wagtail.admin.panels import FieldPanel
from wagtail.core.models import Page
from wagtail.fields import RichTextField


class HomePage(Page):
    intro = RichTextField()

    content_panels = Page.content_panels + [
        FieldPanel("intro", classname="full"),
    ]
