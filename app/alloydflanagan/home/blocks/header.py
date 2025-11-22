from wagtail.blocks import StructBlock, ListBlock
from wagtail.images.blocks import ImageChooserBlock

class HeaderBlock(StructBlock):
    banner = ImageChooserBlock(required=False)
    class Meta:
        template = 'home/blocks/header.html'
