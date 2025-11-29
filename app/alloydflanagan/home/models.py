from django.db import models

class HomePage(models.Model):
    intro = models.TextField()
    # header = StreamField([
    #     ('header', HeaderBlock())
    # ], blank=True)
    # content = StreamField([
    #     ('text', RichTextBlock()),  #probably will use custom type later
    #     ('image', ImageChooserBlock()),
    # ], blank=True)

