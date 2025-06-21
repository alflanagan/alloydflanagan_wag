from django.db import models
from django.utils.translation import gettext_lazy as _

from wagtail.admin.panels import FieldPanel
from wagtail.fields import RichTextField
from wagtail.models import Page

from wagtail.search import index

class BlogIndexPage(Page):
    intro = RichTextField(blank=True, default='')

    content_panels = Page.content_panels + [
        FieldPanel("intro"),
    ]

class BlogPost(Page):
    parent_page_types = ["blog.BlogIndexPage"]
    posted_date = models.DateField(
        verbose_name=_("Post Date"),
        null=True,
        blank=True,
        help_text='"Official" date post was written',
    )
    primary_image = models.ImageField(null=True, upload_to="blog/images/")
    content = RichTextField()
    intro = models.CharField(max_length=250, default="")
    body = RichTextField(blank=True)

    search_fields = Page.search_fields + [
        index.SearchField('intro'),
        index.SearchField('body'),
    ]

    content_panels = Page.content_panels + [
        FieldPanel("posted_date"),
        FieldPanel("content"),
        FieldPanel("primary_image"),
        FieldPanel("body"),
        FieldPanel("intro"),
    ]
