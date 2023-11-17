# mercadona/views.py
import logging
from django.http import HttpResponse, JsonResponse
from django.views.generic import View

from .form import ProductForm
from .models import Product, Promotion
from datetime import date

class ProductViews(View):
    
    def get(self, request, *args, **kwargs):

        productsData = Product.objects.all()
        product_list = []
        today = date.today()

        for product in productsData:
            try:
                promotion = Promotion.objects.get(product_id=product, dateStart__lte=today, dateEnd__gte=today)
                is_promoted = True
                price = 100 * product / (100 - promotion.promotionPercent)
            except Promotion.DoesNotExist:
                is_promoted = False
                price = product.price

            product_data = {
                "id": product.id,
                "label": product.label,
                "description": product.description,
                "price": price,
                "image": product.image,
                "category": product.category,
                "isPromoted": is_promoted,
            }

            product_list.append(product_data)

        return JsonResponse(product_list, safe=False)
    
    def post(self, request):
        form = ProductForm(request.POST, request.FILES)

        logging.info(form)
        
        if form.is_valid():
            form.save()
            return JsonResponse({'product': form}, status=201)
        else:
            return JsonResponse(form.errors, status=400)

       
