# Django Поліграф

Сайт для послуг поліграфолога з анімованою головною сторінкою.

## Швидкий старт

```bash
# Активувати венв
source venv/bin/activate

# Запустити сервер
python3 manage.py runserver
```

Доступ: http://127.0.0.1:8000/

## Головна сторінка

✅ **Створено головну сторінку з:**
- Величезний напис "ПОЛІГРАФ" шрифтом Viaoda Libre
- Анімована ЕКГ стрічка (зʼявляється ліворуч, 60% ширини, пульс, 2 сек пауза)
- Місце для зображення в лівій половині екрану
- Повна адаптація для планшетів та мобільних (iOS Safari)

## 📁 Зображення

**Розмістіть зображення апарату поліграфа за шляхом:**
```
main/static/main/images/polygraph-device.jpg
```

Рекомендовані розміри: 800x600px або більше
Формат: JPG/PNG

## Структура

```
main/
├── static/main/
│   ├── css/home.css           # Стилі головної
│   └── images/                # Зображення
│       └── polygraph-device.jpg  ← СЮДИ
├── templates/main/
│   └── home.html              # HTML шаблон
├── views.py                   # View функції
└── urls.py                    # URL маршрути
```

## Основні команди

- `python3 manage.py runserver` - запуск сервера
- `python3 manage.py createsuperuser` - створити адміна

## Встановлення та запуск

### 1. Активація віртуального середовища

```bash
source venv/bin/activate
```

### 2. Встановлення залежностей

```bash
pip install -r requirements.txt
```

### 3. Виконання міграцій

```bash
python3 manage.py migrate
```

### 4. Створення суперкористувача (опціонально)

```bash
python3 manage.py createsuperuser
```

## Структура проєкту

```
Poligraph/
├── venv/                   # Віртуальне середовище
├── myproject/              # Головна директорія проєкту
│   ├── __init__.py
│   ├── settings.py         # Налаштування Django
│   ├── urls.py             # URL конфігурація
│   ├── wsgi.py             # WSGI конфігурація
│   └── asgi.py             # ASGI конфігурація
├── manage.py               # Django management script
├── requirements.txt        # Залежності Python
└── README.md               # Цей файл
```

## Корисні команди

- `python3 manage.py startapp <app_name>` - створити нову Django аплікацію
- `python3 manage.py makemigrations` - створити міграції
- `python3 manage.py migrate` - застосувати міграції
- `python3 manage.py collectstatic` - зібрати статичні файли
- `python3 manage.py shell` - запустити Django shell

## Вимкнення віртуального середовища

```bash
deactivate
``` 