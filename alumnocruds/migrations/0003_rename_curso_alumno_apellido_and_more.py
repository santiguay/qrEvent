# Generated by Django 5.0.2 on 2024-04-24 22:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('alumnocruds', '0002_evento_rename_cedula_rg_alumno_cedula_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='alumno',
            old_name='curso',
            new_name='apellido',
        ),
        migrations.RenameField(
            model_name='alumno',
            old_name='nombre_completo',
            new_name='nombre',
        ),
        migrations.RemoveField(
            model_name='alumno',
            name='token',
        ),
        migrations.AddField(
            model_name='alumno',
            name='semestre',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='alumno',
            name='cedula',
            field=models.CharField(max_length=200),
        ),
    ]
