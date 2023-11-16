from django.db import models
class Product(models.Model):
    id = models.BigAutoField(primary_key=True)
    label = models.CharField(max_length=100)
    description = models.TextField()
    price = models.IntegerField()
    image = models.URLField()
    category = models.CharField(max_length=100)


class Promotion(models.Model):
    id = models.BigAutoField(primary_key=True)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    promotionPercent = models.IntegerField()
    dateStart = models.DateField()
    dateEnd = models.DateField()