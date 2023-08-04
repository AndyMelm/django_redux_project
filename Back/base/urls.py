from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.views import (
    PasswordResetView,
    PasswordResetDoneView,
    PasswordResetConfirmView,
    PasswordResetCompleteView,
)
from . import views

urlpatterns = [
    path("login/", TokenObtainPairView.as_view()),
    path("reset_password/", PasswordResetView.as_view(template_name="password_reset.html"), name="reset_password"),
    path("reset_password_sent/", PasswordResetDoneView.as_view(template_name="password_reset_sent.html"),name="password_reset_done"),
    path("reset/<uidb64>/<token>/", PasswordResetConfirmView.as_view(template_name="password_reset_form.html"),name="password_reset_confirm"),
    path("reset_password_complete/", PasswordResetCompleteView.as_view(template_name="password_reset_done.html"), name="password_reset_complete"),
    path('register/', views.register),
    path('journal/', views.JournalView.as_view()),
    path('journal/<pk>/', views.JournalView.as_view()),
    path('get_user_id/', views.get_user_id),
    path('get_crypto_price/', views.get_crypto_price),
    
]
