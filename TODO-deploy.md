# TODO: Fix Errors & Deploy

Status: Local fixed, implementing final fixes for deploy.

**Remaining Steps:**
- [x] 1. Fix hardcoded images in products.html & hoodie.html → dynamic product.image.url
- [x] 2. Generalize hoodie_view/url/template → product_detail for all products (jersey, hoodie)
- [x] 3. Update runtime.txt to python-3.12
- [ ] 4. source venv/bin/activate && python manage.py createsuperuser
- [x] 5. source venv/bin/activate && python manage.py collectstatic --noinput

- [x] 7. git add . && git commit -m "Fix images, generic product view, ready deploy" && git push
- [x] 8. Monitor Render logs (fixed Procfile port timeout)
- [ ] 9. Test live site & admin
- [ ] 10. Complete task
