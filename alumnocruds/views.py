from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
import json
from .models import Alumno, Evento, QR, Conferencia, Asistencia
from django.http import JsonResponse, HttpResponseNotFound
from django.views import View
from django.forms.models import model_to_dict
from datetime import datetime
from django.http import QueryDict
\
# Create your views here.
def index(request):
    if request.user.is_authenticated:
        
        
        alumnos = Alumno.objects.all()
        return render(request, 'evento.html', {'alumnos': alumnos})
    else:
        return redirect('/login')



def evento(request, nombre):
    if request.user.is_authenticated:
        nombre = nombre.replace('%20', ' ')
        evento = Evento.objects.get(nombre=nombre)
        if request.method == 'POST':
            nombre_completo = request.POST['nombre']
            apellidos = request.POST['apellido']
            cedula = request.POST['cedula']
            semestre = request.POST['curso']
            
            if Alumno.objects.filter(cedula=cedula, evento=evento).exists():
                messege = "Los datos están repetidos"
            else:
                alumno = Alumno(nombre=nombre_completo,apellido =apellidos, cedula=cedula, semestre=semestre, evento=evento)
                alumno.save()
                messege = "Se ha cargado correctamente"
        elif request.method == 'PUT':
            cedula = request.PUT['cedula']
            alumno = Alumno.objects.get(cedula=cedula, evento=evento)
            alumno.nombre = request.PUT['nombre']
            alumno.apellido = request.PUT['apellido']
            alumno.semestre = request.PUT['curso']
            alumno.save()
            messege = "Se ha actualizado correctamente"
        elif request.method == 'DELETE':
            data = json.loads(request.body)
            cedula = data.get('cedula')
            alumno = Alumno.objects.get(cedula=cedula, evento=evento)
            alumno.delete()
            messege = "Se ha eliminado correctamente"
        else:
            messege = ""
        
        alumnos = Alumno.objects.filter(evento=evento)
        return render(request, 'evento.html', {'alumnos': alumnos, 'messege': messege})
    else:
        return redirect('/login')

  

    
def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)  
            return redirect('home')
        else:
            return render(request, 'login.html', {'error_message': 'Credenciales inválidas'})
    
    return render(request, 'login.html')


def profile(request, token):
    alumno = Alumno.objects.get(cedula=token)
    return render(request, 'profile.html', {'alumno': alumno})
def qrscanner(request):
    return render(request, 'qrscanner.html')





class AlumnoView(View):
    def get(self, request, *args, **kwargs):
        codigo = request.GET.get('codigo')
        if id:
            alumno = Alumno.objects.filter(codigo=codigo).first()
            if alumno:
                return JsonResponse(model_to_dict(alumno), safe=False)
            else:
                return JsonResponse({'message': 'Alumno no encontrado'}, status=403, safe=False)
        else:
            alumnos = Alumno.objects.all()
            return JsonResponse({'alumnos': list(alumnos.values())}, safe=False)

    def post(self, request, *args, **kwargs):
        data = request.POST.copy()  # Hacemos una copia para no modificar el objeto POST original
        print(request.POST)
        data.pop('csrfmiddlewaretoken', None)  # Eliminamos el token CSRF
        # Aquí puedes eliminar cualquier otro campo no deseado
        codigo = data['codigo']
        data.pop('codigo')  # Extraemos el valor de 'codigo' y lo eliminamos de 'data'

        # Verificamos si ya existe un alumno con la misma cédula o código
        if Alumno.objects.filter(cedula=data['cedula']).exists():
            return JsonResponse({'error': 'Ya existe un alumno con la cédula proporcionada.'}, status=400)
        if Alumno.objects.filter(codigo=codigo).exists():
            return JsonResponse({'error': 'Ya existe un alumno con el código proporcionado.'}, status=400)

        # Aseguramos que los campos booleanos son True o False
        boolean_fields = {field: data.get(field) == 'on' for field in ['NUDO_Y_SUTURA', 'HEMORRAGIA_Y_FRACTURA', 'INTUBACION_OROTRAQUEAL']}
        for field in boolean_fields.keys():
            if field in data:
                del data[field]

        try:
            alumno = Alumno.objects.create(codigo=codigo, nombreCompleto = data['nombreCompleto'], cedula = data['cedula'], semestre =(data['semestre'] + " semestre"),  **boolean_fields)  # Pasamos 'codigo' individualmente
            return JsonResponse(model_to_dict(alumno), safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)


    def put(self, request, *args, **kwargs):
        # Parsea el cuerpo de la solicitud
        data = QueryDict(request.body).copy()

        # Elimina el token CSRF de los datos
        data.pop('csrfmiddlewaretoken', None)
        print(data)
        

        
        datetime_fields = ['Asistencia_NUDO_Y_SUTURA', 'Asistencia_HEMORRAGIA_Y_FRACTURA', 'Asistencia_INTUBACION_OROTRAQUEAL',
        'dia_uno', 'dia_dos','salida_NUDO_Y_SUTURA','salida_HEMORRAGIA_Y_FRACTURA', 'salida_INTUBACION_OROTRAQUEAL',
        'salida_dia_uno',
        'salida_dia_dos']

        

        for field in datetime_fields:
            if field in data and data[field] and isinstance(data[field], str):
                try:
                    datetime.strptime(data[field], '%Y-%m-%dT%H:%M')  # Fecha con hora
                except ValueError:
                    return JsonResponse({'message': f'La fecha y hora proporcionadas en {field} no están en el formato correcto (YYYY-MM-DDTHH:MM)'}, safe=False, status=400)
            else:
                # Si el campo de fecha y hora está vacío, lo eliminamos de los datos
                data.pop(field, None)
        # Verifica si el alumno existe
        alumno = Alumno.objects.filter(cedula=data.get('cedula'))  # Cambia 'codigo' a 'cedula'
        if not alumno.exists():
            return JsonResponse({'message': 'El alumno no existe'}, safe=False, status=403)
        print(alumno)
        # Prepara los datos para la actualización
        update_data = {key: data.get(key) for key in data}

        # Si el alumno existe, actualiza el registro
        alumno.update(**update_data)
        return JsonResponse({'message': 'Alumno actualizado correctamente'}, safe=False)





    def delete(self, request, *args, **kwargs):
        # Obtiene la cédula del alumno de los parámetros de la URL
        params = QueryDict(request.META['QUERY_STRING'])
        codigo = params.get('cedula')
        print(codigo)
        alumno = Alumno.objects.get(codigo=codigo)
        alumno.delete()
        
        return JsonResponse({'message': 'Alumno eliminado correctamente', 'data': codigo}, safe=False)
    
def error_404_view(request, exception):
    return HttpResponseNotFound("Esta página no existe.")