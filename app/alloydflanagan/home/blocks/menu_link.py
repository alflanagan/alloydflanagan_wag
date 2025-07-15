from wagtail.blocks import StructBlock, CharBlock, PageChooserBlock, URLBlock
from wagtail.documents.blocks import DocumentChooserBlock

class MenuLinkBlock(StructBlock):
    title = CharBlock(required=False)
    # one of the three should have a value, if more than one we'll just use first
    targetPage = PageChooserBlock(required=False)
    targetDoc = DocumentChooserBlock(required=False)
    targetUrl = URLBlock(required=False)

    class Meta:
        template = 'home/blocks/menu_link.html'
