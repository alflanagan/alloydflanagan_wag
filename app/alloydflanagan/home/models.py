from django.db.models import FileField

from wagtail.admin.panels import FieldPanel
from wagtail.blocks import RichTextBlock
from wagtail.images.blocks import ImageChooserBlock
from wagtail.models import Page
from wagtail.fields import RichTextField, StreamField

from alloydflanagan.home.blocks.header import HeaderBlock


class HomePage(Page):
    intro = RichTextField()
    # may move resume to AboutPage model if/when we have one
    resume = FileField(blank=True)
    content = StreamField([
        ('text', RichTextBlock()),  #probably will use custom type later
        ('image', ImageChooserBlock()),
        ('header', HeaderBlock()),
    ], use_json_field=True, blank=True)

    content_panels = Page.content_panels + [
        FieldPanel("intro", classname="full"),
        FieldPanel("resume", classname="full"),
        FieldPanel("content", classname="full"),
    ]
