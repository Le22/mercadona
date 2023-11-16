# hello/views.py
from django.http import HttpResponse, JsonResponse
from django.views.generic import View
from .models import Product, Promotion
from datetime import date


def hello(request):
    return HttpResponse("mercandona")

class ProductViews(View):
    def get(self, request, *args, **kwargs):
        productsData = Product.objects.all()

        product_list = []
        today = date.today()

        for product in productsData:
            try:
                promotion = Promotion.objects.get(product_id=product, dateStart__lte=today, dateEnd__gte=today)
                is_promoted = True
                percent = promotion.promotionPercent
            except Promotion.DoesNotExist:
                is_promoted = False
                percent = 0

            product_data = {
                "id": product.id,
                "label": product.label,
                "description": product.description,
                "price": product.price,
                "image": product.image,
                "category": product.category,
                "isPromoted": is_promoted,
                "percent": percent
            }

            product_list.append(product_data)

        return JsonResponse(product_list, safe=False)
    
    def post(self, request):
        data = request.data

        try:
            product = Product(
                label=data['label'],
                description=data['description'],
                price=data['price'],
                image=data['image'],
                category=data['category']
            )
            product.save()

            return JsonResponse({'message': 'Produit créé avec succès'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)