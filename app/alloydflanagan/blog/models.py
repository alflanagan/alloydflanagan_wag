from django.db import models
from django.utils.translation import gettext_lazy as _
from wagtail.core.fields import RichTextField
from wagtail.core.models import Page


class BlogPost(Page):
    posted_date = models.DateField(
        verbose_name=_("posted date"),
        null=True,
        blank=True,
        help_text='"Official" date post was written',
    )
    primary_image = models.ImageField()
    content = RichTextField()
