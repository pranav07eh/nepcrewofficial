from django.urls import path
from .views_fixed import *

urlpatterns = [
    path('', home, name='home'),

    path('about/', about, name='about'),
    path('contact/', contact, name='contact'),
    path('products/', products, name='products'),
    path('product/<int:pk>/', product_detail, name='product_detail'),

    path('login/', login_view, name='login'),
    path('signup/', signup_view, name='signup'),
    path('logout/', logout_view, name='logout'),

    path('orders/', my_orders, name='my_orders'),
    path('cart/', cart_view, name='cart'),
    path('add-to-cart/', add_to_cart, name='add_to_cart'),
    path('remove/<int:item_id>/', remove_from_cart, name='remove'),

    path('checkout/', checkout_view, name='checkout'),
    path('payment/<int:order_id>/', payment_view, name='payment'),
    path('order-success/<int:order_id>/', order_success, name='order_success'),
]

