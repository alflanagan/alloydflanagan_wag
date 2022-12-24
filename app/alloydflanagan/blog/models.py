from django.db import models
from django.utils.translation import gettext_lazy as _

from wagtail.admin.edit_handlers import FieldPanel
from wagtail.core.fields import RichTextField
from wagtail.core.models import Page


class BlogIndexPage(Page):
    parent_page_types = ["home.HomePage"]


class BlogPost(Page):
    parent_page_types = ["blog.BlogIndexPage"]
    posted_date = models.DateField(
        verbose_name=_("posted date"),
        null=True,
        blank=True,
        help_text='"Official" date post was written',
    )
    primary_image = models.ImageField(null=True, upload_to="blog/images/")
    content = RichTextField()

    content_panels = Page.content_panels + [
        FieldPanel("posted_date"),
        FieldPanel("content"),
        FieldPanel("primary_image"),
    ]
