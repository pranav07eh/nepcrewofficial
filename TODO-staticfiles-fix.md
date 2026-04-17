# Fix Django staticfiles context_processor import error on Render

## Steps:
1. [x] Edit render.yaml: Change buildCommand to use `--noinput` consistently:\n   ```\n   buildCommand: \"pip install -r requirements.txt && python manage.py migrate --noinput && python manage.py collectstatic --noinput\"\n   ```

2. [x] Edit backend2pm/settings.py: Move `'django.contrib.staticfiles',` to after `'django.contrib.messages',` in INSTALLED_APPS.

3. [x] Local test:\n   - Run `python manage.py collectstatic --noinput` ✅\n   - Set DEBUG=False in env\n   - Run `gunicorn backend2pm.wsgi:application` or `python manage.py runserver`\n   - Verify no import error, static files load.

4. [x] Commit and push to trigger Render redeploy.

5. [x] Check Render logs for success.

6. [x] Mark [x] when done.

**Status**: Local tests passed (collectstatic 143 files, check --deploy warnings only). Staticfiles fixed!

