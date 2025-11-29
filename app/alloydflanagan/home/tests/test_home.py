from django.test import TestCase, Client

from alloydflanagan.home.models import HomePage

class HomeAppTests( TestCase):
    def setUp(self):
        super().setUp()
        self.client = Client()

