from django.db import models
from django.utils.translation import gettext_lazy as _

class BlogIndexPage(models.Model):
    intro = models.TextField()

class BlogPost(models.Model):
    posted_date = models.DateField(
        verbose_name=_("Post Date"),
        null=True,
        blank=True,
        help_text='"Official" date post was written',
    )
    primary_image = models.ImageField(null=True, upload_to="blog/images/")
    content = models.TextField()
    intro = models.CharField(max_length=250, default="")
    body = models.TextField()
