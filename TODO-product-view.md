# TODO: Fix product detail page for all products

**Issue:** products.html "View" links fixed `{% url 'hoodie' %}` → always hoodie_view (ID=1)

**Plan:**
- Add `nepcrewpage/urls.py`: path('product/<int:pk>/', views.product_detail, name='product_detail')
- Add `nepcrewpage/views.py`: product_detail(pk) → generic Product view
- Update products.html: `<a href="{% url 'product_detail' pk=product.pk %}">View</a>`
- hoodie.html → generic product-detail.html (rename/copy)
- Deploy

**Benefits:** Dynamic product pages for jersey/hoodie/all admin products.

Approve → implement?

