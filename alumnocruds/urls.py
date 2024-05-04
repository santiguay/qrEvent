from django.urls import path, include
from . import views
handler404 = 'alumnocruds.views.error_404_view'

urlpatterns = [
    path('', views.index, name="home"),
    path('evento/<str:nombre>/', views.evento),
    path('login/', views.login_view, name='login'),
    path('qrscanner/', views.qrscanner, name='qrscanner'),
    path('profile/<str:token>/', views.profile, name='profile'),
    path('alumno/', views.AlumnoView.as_view(), name='alumno'),
] 