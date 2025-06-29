from wagtail.blocks import StructBlock, CharBlock, PageChooserBlock


class MenuLinkBlock(StructBlock):
    title = CharBlock(required=False)
    target = PageChooserBlock(required=False)

    class Meta:
        template = 'home/templates/home/blocks/menu_link.html'
