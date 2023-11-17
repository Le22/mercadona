# mercadona/urls.py
from django.urls import include, path

urlpatterns = [
   path('', include('<app name>.urls')),
]
