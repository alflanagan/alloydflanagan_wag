from wagtail.blocks import StructBlock, ListBlock
from wagtail.images.blocks import ImageChooserBlock
from alloydflanagan.home.blocks.menu_link import MenuLinkBlock


class HeaderBlock(StructBlock):
    tabs = ListBlock(MenuLinkBlock())
    banner = ImageChooserBlock(required=False)
    class Meta:
        template = 'home/blocks/header.html'
