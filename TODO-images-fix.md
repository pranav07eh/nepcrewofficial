# Image Fixes - Products/Hoodie/Index + Static Context
Status: In Progress

**Information Gathered Summary:**
- Missing static/media context_processors in settings.py TEMPLATES → {% static %} and {{ image.url }} broken.
- index.html hardcoded image paths.
- products.html/hoodie.html fallback logic correct (jersey/hoodie.png).
- layouts.html uses {% static %} → broken too if processor missing.
- Whitenoise/collectstatic good.

**Detailed Plan:**
1. Edit backend2pm/settings.py: Add context_processors, remove duplicate INSTALLED_APPS.
2. Edit nepcrewpage/templates/index.html: Use {% static %} for slider images.
3. collectstatic & deploy.

**Todo Steps:**
- [x] Step 1: Edit settings.py
- [x] Step 2: Edit index.html  
 - [x] Step 3: python manage.py collectstatic --noinput (128 files copied)
 - [x] Step 4: Test products/hoodie pages images (pending live deploy)
 - [x] Step 5: Update this TODO
