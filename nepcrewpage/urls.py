from django.urls import path
from .views_fixed import *

urlpatterns = [\n    path('', home, name='home'),

    path('about/', about, name='about'),\n    path('contact/', contact, name='contact'),\n    path('products/', products, name='products'),\n    path('product/<int:pk>/', product_detail, name='product_detail'),


    path('login/', login_view, name='login'),\n    path('signup/', signup_view, name='signup'),\n    path('logout/', logout_view, name='logout'),

    path('orders/', my_orders, name='my_orders'),\n    path('cart/', cart_view, name='cart'),\n    path('add-to-cart/', add_to_cart, name='add_to_cart'),\n    path('remove/<int:item_id>/', remove_from_cart, name='remove'),

    path('checkout/', checkout_view, name='checkout'),\n    path('payment/<int:order_id>/', payment_view, name='payment'),\n    path('order-success/<int:order_id>/', order_success, name='order_success'),\n]
