# mercadona/urls.py
from django.urls import path

from .views import ProductViews

urlpatterns = [
    path('product/', ProductViews.as_view(), name='product'),
]
