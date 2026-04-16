from django.contrib import admin
from .models import Product, CartItem, Order

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'stock']
    list_editable = ['price', 'stock']
    search_fields = ['name']
    list_filter = ['stock']

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['user', 'product', 'size', 'quantity']
    list_filter = ['size', 'created_at']

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'total_amount', 'status', 'created_at']
    list_editable = ['status']
    list_filter = ['status', 'created_at']
    readonly_fields = ['created_at']
    search_fields = ['user__username', 'id']

    actions = ['mark_received', 'mark_paid', 'mark_shipped', 'mark_delivered', 'mark_completed']

    def mark_received(self, request, queryset):
        queryset.update(status='Received')
        self.message_user(request, "Selected orders marked as Received.")
    mark_received.short_description = "Mark selected orders as Received"

    def mark_paid(self, request, queryset):
        queryset.update(status='Paid')
        self.message_user(request, "Selected orders marked as Paid.")
    mark_paid.short_description = "Mark selected orders as Paid"

    def mark_shipped(self, request, queryset):
        queryset.update(status='Shipped')
        self.message_user(request, "Selected orders marked as Shipped.")
    mark_shipped.short_description = "Mark selected orders as Shipped"

    def mark_delivered(self, request, queryset):
        queryset.update(status='Delivered')
        self.message_user(request, "Selected orders marked as Delivered.")
    mark_delivered.short_description = "Mark selected orders as Delivered"

    def mark_completed(self, request, queryset):
        queryset.update(status='Completed')
        self.message_user(request, "Selected orders marked as Completed.")
    mark_completed.short_description = "Mark selected orders as Completed"
