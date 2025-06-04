# 🚀 Налаштування сайту на Render

## 📋 Кроки налаштування

### 1. ⚙️ Змінні середовища на Render

Додайте ці змінні в розділі **Environment** на Render:

```bash
# Django
SECRET_KEY=your-secret-key-here
DEBUG=False

# База даних (Render налаштує автоматично)
DATABASE_URL=your-database-url

# Telegram Bot
TELEGRAM_BOT_TOKEN=ваш-токен-бота
TELEGRAM_CHAT_ID=ваш-chat-id

# Render
RENDER_EXTERNAL_HOSTNAME=ваше-ім'я-додатку.onrender.com
```

### 2. 🤖 Налаштування Telegram Bot

#### Отримання Bot Token:
1. Знайдіть @BotFather в Telegram
2. Відправте `/newbot`
3. Дайте назву боту
4. Отримайте токен (формат: `123456789:ABCDefGhIJKLMnopQRSTUvwxyz`)

#### Отримання Chat ID:
1. Створіть групу/канал для повідомлень
2. Додайте бота в групу як адміна
3. Відправте тестове повідомлення
4. Відкрийте: `https://api.telegram.org/bot<ВАШ_ТОКЕН>/getUpdates`
5. Знайдіть `"chat":{"id": ЧИСЛО}` - це ваш Chat ID

### 3. 🔧 Build команди для Render

**Build Command:**
```bash
pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate
```

**Start Command:**
```bash
gunicorn myproject.wsgi:application
```

### 4. ✅ Перевірка

Після деплою:
1. Відкрийте сайт
2. Заповніть форму контакту
3. Перевірте чи прийшло повідомлення в Telegram

### 5. 🐛 Діагностика

Якщо щось не працює:
1. Перевірте логи на Render (Dashboard → Logs)
2. Переконайтесь що всі змінні середовища встановлені
3. Перевірте чи бот додано як адмін в групу/канал

### 6. 📝 Тестування локально

Для тестування на локальному сервері:
```bash
# Встановіть змінні середовища
export TELEGRAM_BOT_TOKEN="ваш-токен"
export TELEGRAM_CHAT_ID="ваш-chat-id"

# Запустіть сервер
python manage.py runserver

# Запустіть тести
python test_form.py
```

## 🔒 Безпека

- Ніколи не публікуйте токени в коді
- Використовуйте тільки змінні середовища
- Регулярно оновлюйте токени

## 📞 Підтримка

Якщо виникли проблеми:
- Перевірте логи на Render
- Переконайтесь у правильності токенів
- Перевірте налаштування бота в Telegram 