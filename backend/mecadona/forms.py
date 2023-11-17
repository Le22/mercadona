# forms.py

from django import forms
from django.contrib.auth.forms import AuthenticationForm

class CustomLoginForm(AuthenticationForm):
    def clean(self):
        cleaned_data = super().clean()
        username = cleaned_data.get('username')
        password = cleaned_data.get('password')

        if username != 'admin' or password != 'studi-mercadona-1':
            raise forms.ValidationError("Nom d'utilisateur ou mot de passe incorrect.")

        return cleaned_data
