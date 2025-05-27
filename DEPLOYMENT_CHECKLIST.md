# ✅ Чек-лист деплою на Render

## Передумови
- [x] Python 3.10+ встановлений
- [x] Git репозиторій налаштований
- [x] Django проєкт працює локально

## 📦 Файли конфігурації

### ✅ requirements.txt
```
Django>=4.2,<5.0
gunicorn>=21.2.0
psycopg2-binary>=2.9.7
whitenoise>=6.5.0
dj-database-url>=2.1.0
python-decouple>=3.8
```

### ✅ build.sh
```bash
#!/usr/bin/env bash
set -o errexit
pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate
```

### ✅ render.yaml
```yaml
databases:
  - name: poligraph-db
    plan: free
    databaseName: poligraph
    user: poligraph

services:
  - type: web
    plan: free
    name: poligraph
    runtime: python
    buildCommand: './build.sh'
    startCommand: 'python -m gunicorn myproject.wsgi:application'
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: poligraph-db
          property: connectionString
      - key: SECRET_KEY
        generateValue: true
      - key: WEB_CONCURRENCY
        value: 4
      - key: DEBUG
        value: False
      - key: RENDER
        value: true
```

## ⚙️ Django налаштування (settings.py)

### ✅ Імпорти
```python
import os
import dj_database_url
```

### ✅ Безпека
```python
SECRET_KEY = os.environ.get('SECRET_KEY', 'fallback-key')
DEBUG = 'RENDER' not in os.environ
```

### ✅ Хости
```python
ALLOWED_HOSTS = []
RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

if 'RENDER' in os.environ:
    ALLOWED_HOSTS.extend(['.onrender.com', 'localhost', '127.0.0.1'])
```

### ✅ Middleware
```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Додано
    # ... інші middleware
]
```

### ✅ База даних
```python
DATABASES = {
    'default': dj_database_url.config(
        default='sqlite:///' + str(BASE_DIR / 'db.sqlite3'),
        conn_max_age=600
    )
}
```

### ✅ Статичні файли
```python
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

if not DEBUG:
    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
else:
    STATICFILES_DIRS = [BASE_DIR / "main" / "static"]
```

### ✅ Продакшн безпека
```python
if not DEBUG:
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    X_FRAME_OPTIONS = 'DENY'
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
```

## 🚀 Кроки деплою

### Автоматичний деплой (рекомендований)

1. **Завантажте код на GitHub**:
   ```bash
   git add .
   git commit -m "Ready for production deployment"
   git push origin main
   ```

2. **На Render.com**:
   - Натисніть "New+" → "Blueprint"
   - Виберіть ваш GitHub репозиторій
   - Натисніть "Connect"
   - Дайте назву проєкту (наприклад, "poligraph")
   - Натисніть "Apply"

3. **Дочекайтеся деплою**:
   - Render автоматично створить PostgreSQL базу
   - Побудує та запустить ваш додаток
   - Призначить URL (напр. `https://poligraph.onrender.com`)

### Ручний деплой

1. **Створіть PostgreSQL базу**:
   - Dashboard → New+ → PostgreSQL
   - Оберіть Free tier
   - Назва: `poligraph-db`

2. **Створіть Web Service**:
   - Dashboard → New+ → Web Service
   - Підключіть GitHub репозиторій
   - Runtime: Python 3
   - Build Command: `./build.sh`
   - Start Command: `python -m gunicorn myproject.wsgi:application`

3. **Налаштуйте змінні середовища**:
   - `DATABASE_URL`: URL з PostgreSQL сервісу
   - `SECRET_KEY`: Згенеруйте безпечний ключ
   - `WEB_CONCURRENCY`: 4
   - `DEBUG`: False
   - `RENDER`: true

## 🔧 Після деплою

1. **Створіть суперкористувача**:
   ```bash
   python manage.py createsuperuser
   ```
   (через Render Shell у вашому web service)

2. **Перевірте сайт**:
   - Відкрийте URL вашого сайту
   - Перевірте всі сторінки
   - Перевірте статичні файли (CSS/JS)

## 🛠️ Локальне тестування

1. **Тест продакшну**:
   ```bash
   python test_production.py
   ```

2. **Тест збирання статичних файлів**:
   ```bash
   python manage.py collectstatic --no-input
   ```

3. **Тест Django**:
   ```bash
   python manage.py check
   python manage.py check --deploy
   ```

4. **Тест Gunicorn**:
   ```bash
   gunicorn myproject.wsgi:application --bind 0.0.0.0:8000
   ```

## 🔍 Можливі проблеми

### Проблема: Статичні файли не завантажуються
**Рішення**: Перевірте, що WhiteNoise middleware додано правильно

### Проблема: 500 Internal Server Error
**Рішення**: Перевірте логи в Render Dashboard → Logs

### Проблема: База даних не підключається
**Рішення**: Перевірте DATABASE_URL в змінних середовища

### Проблема: ALLOWED_HOSTS помилка
**Рішення**: Додайте домен Render до ALLOWED_HOSTS

## 📊 Моніторинг

- **Логи**: Render Dashboard → Logs
- **Метрики**: Render Dashboard → Metrics
- **База даних**: PostgreSQL Dashboard

## 🔒 Безпека

- [x] DEBUG = False в продакшені
- [x] SECRET_KEY не в коді
- [x] HTTPS автоматично через Render
- [x] Безпечні заголовки налаштовані
- [x] PostgreSQL замість SQLite

## 🎯 Результат

✅ **Ваш сайт буде доступний за адресою**: `https://your-app-name.onrender.com`

🎉 **Готово! Сайт поліграфолога готовий до використання!** 