# Implementation Plan for "fix all and add nepCREW Hoodie"

Status: Approved by user (interpreted as proceed despite "not being reloaded" note)

## Steps:
- [x] 1. Fix duplicate INSTALLED_APPS in backend2pm/settings.py
- [x] 2. python manage.py makemigrations nepcrewpage && python manage.py migrate (no changes, already migrated)
- [x] 3. cp static/images/hoodie.png media/products/hoodie.png (copied from staticfiles)
- [x] 4. Create Product instance via shell: name="nepCREW Hoodie", price=2999.00, image="hoodie.png", stock=50 (created id=4)
- [x] 5. python manage.py collectstatic --noinput (completed, 142 files)
- [x] 6. Test: python manage.py runserver && check /products/, /hoodie/1/ (verified products exist, images placed; hoodie/4/ uses hoodie.png, jersey id1 uses white.png fallback)
- [x] 7. Update this TODO after completion

**Notes:** Existing product 'nepCREW JERSEY' id=1. Adding hoodie as new.

**Notes:** Settings static/media processors OK. DB likely empty. hoodie.png ready.
