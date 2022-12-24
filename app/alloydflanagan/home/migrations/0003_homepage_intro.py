# Generated by Django 4.1.4 on 2022-12-24 13:43

import wagtail.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0002_create_homepage"),
    ]

    operations = [
        migrations.AddField(
            model_name="homepage",
            name="intro",
            field=wagtail.fields.RichTextField(
                default="This is a brief introductory paragraph: who I am, what the site does, blah blah blah"
            ),
            preserve_default=False,
        ),
    ]