# hello/urls.py
from django.urls import path

from .views import ProductViews, hello

urlpatterns = [
    path('', hello, name='hello'),
    path('product/', ProductViews.as_view(), name='product'),
]
