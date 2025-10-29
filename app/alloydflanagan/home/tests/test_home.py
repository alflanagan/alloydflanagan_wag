from django.test import TestCase, Client, override_settings
from wagtail.models import Page, Site
from wagtail.rich_text import RichText
from wagtail.images import get_image_model
from wagtail.images.tests.utils import get_test_image_file
from wagtail.test.utils import WagtailTestUtils

from alloydflanagan.home.models import HomePage
from alloydflanagan.home.blocks.header import HeaderBlock
from alloydflanagan.home.blocks.menu_link import MenuLinkBlock


@override_settings(STATICFILES_STORAGE="django.contrib.staticfiles.storage.StaticFilesStorage")
class HomeAppTests(WagtailTestUtils, TestCase):
    def setUp(self):
        super().setUp()
        # Create a homepage under the root and attach a Site to it
        root = Page.get_first_root_node()
        self.home_page = HomePage(
            title="Home",
            intro="<p>Welcome intro</p>",
        )
        root.add_child(instance=self.home_page)
        self.home_page.save_revision().publish()

        # Ensure there's a Site record for test client routing
        Site.objects.update_or_create(
            hostname="localhost",
            defaults={
                "root_page": self.home_page,
                "is_default_site": True,
                "port": 80,
                "site_name": "Test Site",
            },
        )
        self.client = Client()

    def test_homepage_created_and_live(self):
        self.assertTrue(self.home_page.live)
        self.assertEqual(self.home_page.specific.intro, "<p>Welcome intro</p>")

    def test_homepage_serves_200(self):
        resp = self.client.get("/")
        self.assertEqual(resp.status_code, 200)
        self.assertContains(resp, "Welcome intro")

    def test_content_panels_include_fields(self):
        # Verify field names in content panels
        panel_field_names = [getattr(p, "field_name", None) for p in self.home_page.content_panels]
        self.assertIn("header", panel_field_names)
        self.assertIn("intro", panel_field_names)
        self.assertIn("content", panel_field_names)

    def test_header_block_to_python_without_banner(self):
        # Build a header block value with two tabs and no banner (do not render template)
        header_value = HeaderBlock().to_python({
            "tabs": [
                {"title": "Home", "targetUrl": "/"},
                {"title": "Docs", "targetUrl": "/docs/"},
            ],
            # banner omitted on purpose
        })
        # Assert structure is preserved
        self.assertEqual(len(header_value["tabs"]), 2)
        self.assertIsNone(header_value.get("banner"))

    def test_header_block_render_with_tabs_and_banner(self):
        # Create a test image and attach as banner
        Image = get_image_model()
        image = Image.objects.create(title="Banner", file=get_test_image_file())

        header_value = HeaderBlock().to_python({
            "tabs": [
                {"title": "Home", "targetUrl": "/"},
            ],
            "banner": image.id,
        })
        self.home_page.header = [("header", header_value)]
        self.home_page.save_revision().publish()

        # Page should render and include the tab; header banner container should be present
        resp = self.client.get("/")
        self.assertEqual(resp.status_code, 200)
        self.assertContains(resp, "Home")
        self.assertContains(resp, "header-banner")

    def test_content_streamfield_text_and_image(self):
        # Add text and image blocks and ensure they render
        Image = get_image_model()
        image = Image.objects.create(title="Content Image", file=get_test_image_file())

        self.home_page.content = [
            ("text", RichText("<p>Alpha</p>")),
            ("image", image),
        ]
        self.home_page.save_revision().publish()

        resp = self.client.get("/")
        self.assertEqual(resp.status_code, 200)
        self.assertContains(resp, "Alpha")
        self.assertContains(resp, "<img", html=False)
