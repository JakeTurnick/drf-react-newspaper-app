# Generated by Django 4.1.7 on 2023-02-25 19:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='is_submitted',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='post',
            name='published_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='post',
            name='submitted_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='category',
            field=models.CharField(choices=[('bus', 'Business'), ('game', 'Gaming'), ('hlth', 'Health'), ('pol', 'Politics'), ('wrld', 'World')], max_length=4),
        ),
    ]
