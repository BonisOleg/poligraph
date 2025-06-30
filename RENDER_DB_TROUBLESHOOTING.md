# Вирішення проблем з базою даних на Render

## Проблема
База даних PostgreSQL на Render може бути недоступна під час розгортання, що призводить до помилок типу:
```
could not translate host name "dpg-xxx" to address: Name or service not known
```

## Рішення

### Варіант 1: З автоматичним fallback до SQLite
Використовуйте основний файл `render.yaml` - він автоматично переключиться на SQLite якщо PostgreSQL недоступна.

### Варіант 2: Тільки SQLite (швидке рішення)
1. Перейменуйте `render.yaml` в `render-postgres.yaml`
2. Перейменуйте `render-sqlite.yaml` в `render.yaml`
3. Виконайте deployment

### Варіант 3: Створення нової бази даних PostgreSQL
1. В панелі Render створіть нову PostgreSQL базу даних
2. Оновіть `render.yaml`, змінивши назву бази з `poligraph-db` на нову назву
3. Виконайте deployment

## Налаштування бази даних PostgreSQL

### 1. Перевірка існування бази даних
Перейдіть в Dashboard → Databases і перевірте, чи існує база `poligraph-db`.

### 2. Створення нової бази даних
Якщо база не існує:
1. Натисніть "New +"
2. Виберіть "PostgreSQL"
3. Назва: `poligraph-db`
4. Database Name: `poligraph`
5. User: `poligraph`
6. Plan: Free

### 3. Очікування готовності
Після створення база данних може потребувати кілька хвилин для повної ініціалізації.

## Команди для діагностики

### Перевірка підключення до бази даних
```bash
python manage.py check_db --max-attempts 5 --wait-seconds 2
```

### Використання SQLite fallback
```bash
python manage.py check_db --max-attempts 5 --wait-seconds 2 --fallback-sqlite
```

### Примусове використання SQLite
Встановіть змінну середовища:
```
USE_SQLITE=true
```

## Моніторинг

1. Перевірте логи Render для детальної інформації про помилки
2. Статус бази даних можна перевірити в розділі Databases
3. При проблемах з'єднання перевірте Network в налаштуваннях 