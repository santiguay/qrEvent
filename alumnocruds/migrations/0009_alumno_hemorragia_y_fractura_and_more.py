# Generated by Django 5.0.2 on 2024-04-29 04:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('alumnocruds', '0008_rename_apellido_alumno_nombrecompleto_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='alumno',
            name='HEMORRAGIA_Y_FRACTURA',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='alumno',
            name='INTUBACION_OROTRAQUEAL',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='alumno',
            name='NUDO_Y_SUTURA',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='alumno',
            name='dia_dos',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='alumno',
            name='dia_uno',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='alumno',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='alumno',
            name='jornada',
            field=models.TextField(),
        ),
    ]
