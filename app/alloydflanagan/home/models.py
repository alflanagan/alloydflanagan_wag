from wagtail.admin.panels import FieldPanel
from wagtail.blocks import RichTextBlock
from wagtail.images.blocks import ImageChooserBlock
from wagtail.models import Page
from wagtail.fields import RichTextField, StreamField

from alloydflanagan.home.blocks.header import HeaderBlock


class HomePage(Page):
    intro = RichTextField()
    header = StreamField([
        ('header', HeaderBlock())
    ], blank=True)
    content = StreamField([
        ('text', RichTextBlock()),  #probably will use custom type later
        ('image', ImageChooserBlock()),
    ], blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('header', classname="full"),
        FieldPanel("intro", classname="full"),
        FieldPanel("content", classname="full"),
    ]
