from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.mail import send_mail
from django.conf import settings
import json
import requests
from datetime import datetime

def home(request):
    """Головна сторінка"""
    return render(request, 'main/home.html')

def services(request):
    """Сторінка послуг"""
    context = {
        'services_list': [
            {
                'title': 'Перевірка подружжя на зраду',
                'price': '5000 грн',
                'discount': 'Знижка 50% на другого з подружжя',
                'description': 'Професійна перевірка на детекторі брехні для з\'ясування фактів зради',
                'icon': '💔',
                'features': [
                    'Конфіденційність 100%',
                    'Детальний звіт',
                    'Психологічна підтримка',
                    'Можливість записи відео'
                ]
            },
            {
                'title': 'Скринінг при працевлаштуванні',
                'price': '2500/4000 грн',
                'description': 'Перевірка кандидатів на роботу для забезпечення надійності',
                'icon': '👥',
                'features': [
                    'Базова перевірка - 2500 грн',
                    'Розширений скринінг - 4000 грн',
                    'Перевірка резюме',
                    'Оцінка чесності'
                ]
            },
            {
                'title': 'Перевірка діючого персоналу',
                'price': '2500/4000 грн',
                'description': 'Регулярна перевірка співробітників для підтримки довіри',
                'icon': '🏢',
                'features': [
                    'Планові перевірки',
                    'Розслідування порушень',
                    'Корпоративна етика',
                    'Захист від шахрайства'
                ]
            },
            {
                'title': 'Приватні питання',
                'price': '5000 грн',
                'description': 'Конфіденційні перевірки особистих питань',
                'icon': '🔒',
                'features': [
                    'Повна конфіденційність',
                    'Індивідуальний підхід',
                    'Безпечне середовище',
                    'Підтримка експерта'
                ]
            },
            {
                'title': 'Розслідування крадіжок',
                'price': '5000 грн',
                'description': 'Професійне розслідування випадків крадіжок та шахрайства',
                'icon': '🔍',
                'features': [
                    'Швидке розслідування',
                    'Збір доказів',
                    'Співпраця з правоохоронцями',
                    'Відшкодування збитків'
                ]
            },
            {
                'title': 'Пошуки матеріальних доказів',
                'price': '5000 грн',
                'discount': 'Знижка військовим 10%',
                'description': 'Пошук та збір доказової бази для судових справ',
                'icon': '⚖️',
                'features': [
                    'Юридична цінність',
                    'Документування процесу',
                    'Експертні висновки',
                    'Підготовка до суду'
                ]
            }
        ]
    }
    return render(request, 'main/services.html', context)

def about(request):
    """Сторінка про мене"""
    context = {
        'certifications': [
            {
                'title': 'Сертифікований поліграфолог',
                'organization': 'Національна Асоціація Поліграфологів України',
                'year': '2009',
                'description': 'Офіційна сертифікація з права проведення поліграфічних досліджень'
            },
            {
                'title': 'Офіційний дилер Rubicon',
                'organization': 'Rubicon International',
                'year': '2015',
                'description': 'Авторизований представник провідного виробника поліграфів'
            },
            {
                'title': 'Спеціаліст з безпеки',
                'organization': 'Інститут криміналістики',
                'year': '2008',
                'description': 'Додаткова кваліфікація у сфері корпоративної безпеки'
            }
        ],
        'experience_years': 3,
        'cases_completed': 500,
        'accuracy_rate': 98
    }
    return render(request, 'main/about.html', context)

def equipment(request):
    """Сторінка обладнання"""
    context = {
        'main_device': {
            'name': 'Rubicon Polygraph',
            'model': 'Professional Series',
            'description': 'Найсучасніший поліграф від світового лідера',
            'features': [
                'Цифрова обробка сигналів',
                'Багатоканальний запис',
                'Автоматичний аналіз',
                'Захищене зберігання даних'
            ],
            'specifications': {
                'Точність': '98.5%',
                'Кількість каналів': '8+',
                'Частота дискретизації': '2000 Гц',
                'Сертифікація': 'APA Standards'
            }
        },
        'additional_equipment': [
            {
                'name': 'Камера відеозапису',
                'description': 'HD запис процесу тестування'
            },
            {
                'name': 'Аудіосистема',
                'description': 'Кристально чистий звук'
            },
            {
                'name': 'Комп\'ютерний комплекс',
                'description': 'Потужна обробка даних'
            }
        ]
    }
    return render(request, 'main/equipment.html', context)

def contacts(request):
    """Сторінка контактів"""
    return render(request, 'main/contacts.html')

def reviews(request):
    """Сторінка відгуків"""
    context = {
        'reviews_list': [
            {
                'name': 'Олександр К.',
                'service': 'Перевірка персоналу',
                'rating': 5,
                'text': 'Швидко та професійно виявили недобросовісного співробітника. Рекомендую!',
                'date': '15.12.2024'
            },
            {
                'name': 'Марина В.',
                'service': 'Особисті питання',
                'rating': 5,
                'text': 'Дуже делікатно підійшли до моєї ситуації. Отримала відповіді на всі питання.',
                'date': '28.11.2024'
            },
            {
                'name': 'ТОВ "Техносфера"',
                'service': 'Корпоративна перевірка',
                'rating': 5,
                'text': 'Регулярно користуємося послугами. Високий професіоналізм та точність результатів.',
                'date': '05.11.2024'
            }
        ]
    }
    return render(request, 'main/reviews.html', context)

# Telegram конфігурація
TELEGRAM_BOT_TOKEN = '7920924607:AAF6fKUGWZYKPBX8dvOQ_bgG4cJj0XQN98o'  # Замінити на ваш токен
TELEGRAM_CHAT_ID = '-1002428014069'  # Замінити на ваш chat_id

def send_telegram_message(message):
    """Відправка повідомлення в Telegram"""
    try:
        url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
        data = {
            'chat_id': TELEGRAM_CHAT_ID,
            'text': message,
            'parse_mode': 'HTML'
        }
        response = requests.post(url, data=data, timeout=10)
        return response.status_code == 200
    except Exception as e:
        print(f"Telegram error: {e}")
        return False

@csrf_exempt
@require_http_methods(["POST"])
def send_contact_form(request):
    """API для відправки форми контактів в Telegram"""
    try:
        data = json.loads(request.body)
        name = data.get('name', '').strip()
        phone = data.get('phone', '').strip()
        service = data.get('service', 'Не вказано')
        message = data.get('message', '').strip()
        
        # Валідація
        if not name or len(name) < 2:
            return JsonResponse({'success': False, 'message': "Ім'я повинно містити мінімум 2 символи"})
        
        if not phone:
            return JsonResponse({'success': False, 'message': 'Телефон є обов\'язковим'})
        
        # Формування повідомлення для Telegram
        telegram_message = f"""
🔔 <b>Нова заявка з сайту!</b>

👤 <b>Ім'я:</b> {name}
📞 <b>Телефон:</b> {phone}
🎯 <b>Послуга:</b> {service}

📝 <b>Повідомлення:</b>
{message if message else 'Не вказано'}

📅 <b>Час:</b> {datetime.now().strftime('%d.%m.%Y %H:%M')}
"""
        
        # Відправка в Telegram
        if send_telegram_message(telegram_message):
            return JsonResponse({'success': True, 'message': 'Заявку успішно відправлено!'})
        else:
            return JsonResponse({'success': False, 'message': 'Помилка відправки. Спробуйте зателефонувати.'})
            
    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'message': 'Невірний формат даних'})
    except Exception as e:
        print(f"Contact form error: {e}")
        return JsonResponse({'success': False, 'message': 'Внутрішня помилка сервера'})

@csrf_exempt
@require_http_methods(["POST"])
def send_review_form(request):
    """API для відправки форми відгуків в Telegram"""
    try:
        data = json.loads(request.body)
        name = data.get('name', '').strip()
        service = data.get('service', 'Не вказано')
        rating = data.get('rating', '')
        review = data.get('review', '').strip()
        
        # Валідація
        if not name or len(name) < 2:
            return JsonResponse({'success': False, 'message': "Ім'я повинно містити мінімум 2 символи"})
        
        if not rating:
            return JsonResponse({'success': False, 'message': 'Оберіть рейтинг'})
        
        if not review or len(review) < 10:
            return JsonResponse({'success': False, 'message': 'Відгук повинен містити мінімум 10 символів'})
        
        # Формування повідомлення для Telegram
        stars = '⭐' * int(rating)
        telegram_message = f"""
📝 <b>Новий відгук!</b>

👤 <b>Ім'я:</b> {name}
🎯 <b>Послуга:</b> {service}
⭐ <b>Рейтинг:</b> {stars} ({rating}/5)

💬 <b>Відгук:</b>
{review}

📅 <b>Час:</b> {datetime.now().strftime('%d.%m.%Y %H:%M')}
"""
        
        # Відправка в Telegram
        if send_telegram_message(telegram_message):
            return JsonResponse({'success': True, 'message': 'Відгук успішно відправлено!'})
        else:
            return JsonResponse({'success': False, 'message': 'Помилка відправки. Спробуйте пізніше.'})
            
    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'message': 'Невірний формат даних'})
    except Exception as e:
        print(f"Review form error: {e}")
        return JsonResponse({'success': False, 'message': 'Внутрішня помилка сервера'})

@csrf_exempt  
@require_http_methods(["POST"])
def send_quick_order(request):
    """API для швидкого замовлення послуги"""
    try:
        data = json.loads(request.body)
        name = data.get('name', '').strip()
        phone = data.get('phone', '').strip()
        service = data.get('service', '')
        
        # Валідація
        if not name or len(name) < 2:
            return JsonResponse({'success': False, 'message': "Ім'я повинно містити мінімум 2 символи"})
        
        if not phone:
            return JsonResponse({'success': False, 'message': 'Телефон є обов\'язковим'})
            
        if not service:
            return JsonResponse({'success': False, 'message': 'Оберіть послугу'})
        
        # Формування повідомлення для Telegram
        telegram_message = f"""
⚡ <b>Швидке замовлення!</b>

👤 <b>Ім'я:</b> {name}
📞 <b>Телефон:</b> {phone}
🎯 <b>Послуга:</b> {service}

📅 <b>Час:</b> {datetime.now().strftime('%d.%m.%Y %H:%M')}
"""
        
        # Відправка в Telegram
        if send_telegram_message(telegram_message):
            return JsonResponse({'success': True, 'message': 'Замовлення прийнято! Передзвонимо протягом 15 хвилин.'})
        else:
            return JsonResponse({'success': False, 'message': 'Помилка відправки. Зателефонуйте нам.'})
            
    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'message': 'Невірний формат даних'})
    except Exception as e:
        print(f"Quick order error: {e}")
        return JsonResponse({'success': False, 'message': 'Внутрішня помилка сервера'}) 