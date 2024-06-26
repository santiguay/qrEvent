# Generated by Django 5.0.2 on 2024-05-04 17:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('alumnocruds', '0021_alter_alumno_cedula'),
    ]

    operations = [
        migrations.AddField(
            model_name='alumno',
            name='salida_HEMORRAGIA_Y_FRACTURA',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='alumno',
            name='salida_INTUBACION_OROTRAQUEAL',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='alumno',
            name='salida_NUDO_Y_SUTURA',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='alumno',
            name='salida_dia_dos',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='alumno',
            name='salida_dia_uno',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='alumno',
            name='dia_dos',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='alumno',
            name='dia_uno',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
