# Generated by Django 5.0.4 on 2024-04-30 02:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('alumnocruds', '0011_alter_alumno_semestre'),
    ]

    operations = [
        migrations.AddField(
            model_name='alumno',
            name='Asistencia_HEMORRAGIA_Y_FRACTURA',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='alumno',
            name='Asistencia_INTUBACION_OROTRAQUEAL',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='alumno',
            name='Asistencia_NUDO_Y_SUTURA',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='alumno',
            name='codigo',
            field=models.IntegerField(null=True),
        ),
    ]
