# 🚨 HOTFIX: 500 Error на Render

## Проблема
Сайт успішно задеплоївся на `https://poligraph-0yg0.onrender.com/`, але показує 500 помилку.

## Виправлення

### 1. ALLOWED_HOSTS
- Додано конкретний домен Render
- Додано тимчасово `*` для діагностики

### 2. STATICFILES_STORAGE 
- Оновлено до нового формату `STORAGES` для Django 4.2+
- Використано правильний backend для WhiteNoise

### 3. SSL налаштування
- Відключено HTTPS redirect тимчасово для діагностики
- Додано умову `DEBUG_RENDER`

### 4. Логування
- Додано console logging для помилок Django

## Деплой
```bash
git add .
git commit -m "🚨 HOTFIX: Fix 500 error on Render"
git push origin main
```

Render автоматично перебудує сайт з новими налаштуваннями. 