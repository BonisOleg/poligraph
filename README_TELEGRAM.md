# 🤖 Налаштування Telegram Bot для Render

## 📋 Крок 1: Змінні середовища на Render

Додайте ці змінні середовища у вашому сервісі на Render:

```
TELEGRAM_BOT_TOKEN=ВАШ_ТОКЕН_БОТА
TELEGRAM_CHAT_ID=ВАШ_CHAT_ID
```

## 🔧 Крок 2: Як отримати дані

### Telegram Bot Token:
1. Відкрийте Telegram і знайдіть @BotFather
2. Відправте команду `/newbot`
3. Слідуйте інструкціям для створення бота
4. Отримайте токен (формат: `123456789:ABCDefGhIJKLMnopQRSTUvwxyz`)

### Chat ID:
1. Додайте вашого бота в групу/канал ДЕ хочете отримувати повідомлення
2. Відправте будь-яке повідомлення в групу
3. Перейдіть за посиланням: `https://api.telegram.org/botВАШ_ТОКЕН/getUpdates`
4. Знайдіть "chat":{"id": ЧИСЛО} - це ваш CHAT_ID

## ⚙️ Крок 3: Додавання на Render

1. Увійдіть в панель управління Render
2. Оберіть ваш сервіс
3. Перейдіть в розділ "Environment"
4. Додайте змінні:
   - `TELEGRAM_BOT_TOKEN` = ваш токен бота
   - `TELEGRAM_CHAT_ID` = ваш chat ID

## 🚀 Крок 4: Деплой

Після додавання змінних середовища Render автоматично перезапустить сервіс.

## ✅ Тест

Зайдіть на сайт і заповніть форму - повідомлення має прийти в Telegram!

## 🔍 Діагностика

Якщо повідомлення не приходять, перевірте логи на Render:
1. Dashboard → ваш сервіс → Logs
2. Шукайте повідомлення про помилки Telegram

## 📝 Примітки

- Бот має бути адміністратором групи/каналу
- Chat ID може бути від'ємним для груп
- Токен тримайте в секреті! 