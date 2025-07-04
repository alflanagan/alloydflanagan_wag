# Generated by Django 4.2.21 on 2025-06-21 17:49

from django.db import migrations, models
import wagtail.fields


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='blogindexpage',
            name='intro',
            field=wagtail.fields.RichTextField(blank=True),
        ),
        migrations.AddField(
            model_name='blogpost',
            name='body',
            field=wagtail.fields.RichTextField(blank=True),
        ),
        migrations.AddField(
            model_name='blogpost',
            name='intro',
            field=models.CharField(default='', max_length=250),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='blogpost',
            name='posted_date',
            field=models.DateField(blank=True, help_text='"Official" date post was written', null=True, verbose_name='Post Date'),
        ),
    ]
