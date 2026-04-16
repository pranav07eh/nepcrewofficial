from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="products/", null=True, blank=True)
    stock = models.PositiveIntegerField(default=10)

    def __str__(self):
        return self.name


class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    size = models.CharField(max_length=10, default="M")
    quantity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    def total_price(self):
        return self.product.price * self.quantity

    def __str__(self):
        return f"{self.user.username} - {self.product.name}"


class Order(models.Model):
    STATUS = (
        ("Pending", "Pending"),
        ("Received", "Received"),
        ("Paid", "Paid"),
        ("Shipped", "Shipped"),
        ("Delivered", "Delivered"),
        ("Completed", "Completed"),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    address = models.TextField()
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20)
    status = models.CharField(max_length=20, choices=STATUS, default="Pending")
    reference = models.CharField(max_length=100, blank=True)
    screenshot = models.ImageField(upload_to='payment_proofs/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id}"
