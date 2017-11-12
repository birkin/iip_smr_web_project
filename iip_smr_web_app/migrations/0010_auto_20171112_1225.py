# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-11-12 17:25
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('iip_smr_web_app', '0009_auto_20171112_1222'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='storypage',
            name='thumbnail_url',
        ),
        migrations.AddField(
            model_name='storypage',
            name='thumbnail_image_url',
            field=models.TextField(blank=True, max_length=500),
        ),
    ]
