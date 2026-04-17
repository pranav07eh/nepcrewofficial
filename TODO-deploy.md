# TODO: Fix Errors & Deploy

Status: Local fixed, implementing final fixes for deploy.

**Remaining Steps:**
- [ ] 1. Fix hardcoded images in products.html & hoodie.html → dynamic product.image.url
- [ ] 2. Generalize hoodie_view/url/template → product_detail for all products (jersey, hoodie)
- [ ] 3. Update runtime.txt to python-3.12
- [ ] 4. source venv/bin/activate && python manage.py createsuperuser
- [ ] 5. source venv/bin/activate && python manage.py collectstatic --noinput
- [ ] 6. Test local: http://127.0.0.1:8000/products/ /product/1/ etc.
- [ ] 7. git add . && git commit -m "Fix images, generic product view, ready deploy" && git push
- [ ] 8. Monitor Render logs
- [ ] 9. Test live site & admin
- [ ] 10. Complete task
