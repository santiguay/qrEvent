# Generated by Django 5.0.2 on 2024-04-29 04:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('alumnocruds', '0009_alumno_hemorragia_y_fractura_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='alumno',
            name='jornada',
            field=models.TextField(blank=True, null=True),
        ),
    ]
