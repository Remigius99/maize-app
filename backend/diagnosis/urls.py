from django.urls import path
from .views import predict, register_user, login_user, diagnosis_history, delete_prediction

urlpatterns = [
    path('predict/', predict, name='predict'),
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('delete-diagnosis/<int:pk>/', delete_prediction, name='delete-diagnosis'),
    path('diagnosis-history/', diagnosis_history, name='diagnosis-history'),  # kipengele kipya
]