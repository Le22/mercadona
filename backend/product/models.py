from datetime import date
from django.db import models

class Product(models.Model):
    id = models.BigAutoField(primary_key=True)
    label = models.CharField(max_length=100)
    description = models.TextField()
    price = models.IntegerField()
    image = models.ImageField(upload_to="assets/")
    category = models.CharField(max_length=100)

    def is_promoted(self):
        product=Product.objects.get(id=self.id)
        today = date.today()
        try:
            promotion = Promotion.objects.get(product_id=product, dateStart__lte=today, dateEnd__gte=today)
            return True
        except Promotion.DoesNotExist:
            return False


class Promotion(models.Model):
    id = models.BigAutoField(primary_key=True)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    promotionPercent = models.IntegerField()
    dateStart = models.DateField()
    dateEnd = models.DateField()