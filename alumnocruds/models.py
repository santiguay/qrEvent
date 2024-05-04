from django.db import models

class Alumno(models.Model):
    id = models.AutoField(primary_key=True)
    cedula = models.CharField(max_length=20)
    nombreCompleto = models.CharField(max_length=200)
    semestre = models.CharField(max_length=20, null=True, blank=True)
    jornada = models.TextField(null=True, blank=True)
    talleres = models.TextField(null=True, blank=True)
    NUDO_Y_SUTURA = models.BooleanField(default=False)
    HEMORRAGIA_Y_FRACTURA = models.BooleanField(default=False)
    INTUBACION_OROTRAQUEAL = models.BooleanField(default=False)
    Asistencia_NUDO_Y_SUTURA = models.DateTimeField(null=True)
    Asistencia_HEMORRAGIA_Y_FRACTURA = models.DateTimeField(null=True)
    Asistencia_INTUBACION_OROTRAQUEAL = models.DateTimeField(null=True)
    dia_uno = models.DateTimeField(null=True, blank=True)
    dia_dos = models.DateTimeField(null=True, blank=True)
    salida_NUDO_Y_SUTURA = models.DateTimeField(null=True)
    salida_HEMORRAGIA_Y_FRACTURA = models.DateTimeField(null=True)
    salida_INTUBACION_OROTRAQUEAL = models.DateTimeField(null=True)
    salida_dia_uno = models.DateTimeField(null=True, blank=True)
    salida_dia_dos = models.DateTimeField(null=True, blank=True)
    codigo = models.IntegerField(null=True)

class QR(models.Model):
    pass

class Evento(models.Model):
    nombre = models.CharField(max_length=200)

class Conferencia(models.Model):
    nombre = models.CharField(max_length=200)
    evento = models.ForeignKey(Evento, on_delete=models.CASCADE)
    alumnos = models.ManyToManyField(Alumno)

class Asistencia(models.Model):
    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE, default=1)
    conferencia = models.ForeignKey(Conferencia, on_delete=models.CASCADE, default=1)
    qr = models.ForeignKey(QR, on_delete=models.CASCADE, default=1)
    fecha_hora = models.DateTimeField(auto_now_add=True, null=True)




    
class Inscripcion(models.Model):
    pass


    