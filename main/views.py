from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
import json
import requests
from datetime import datetime
import os
from django.urls import reverse

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
                'title': 'Національний юридичний університет імені Ярослава Мудрого',
                'organization': 'Спеціальність: Правознавство',
                'year': '2020',
                'description': 'Диплом магістра з відзнакою'
            },
            {
                'title': 'Національна академія державного управління при Президентові України',
                'organization': 'Спеціальність: Публічне управління та адміністрування',
                'year': '2022',
                'description': 'Диплом магістра'
            },
            {
                'title': 'Курси підвищення кваліфікації',
                'organization': 'ДНП Державний університет «Київський авіаційний інститут»',
                'year': '2023',
                'description': 'Програма «Проведення досліджень та експертиз із використанням поліграфа»'
            },
            {
                'title': 'Керівниця представництва НАПУ у Львівській області',
                'organization': 'Національна асоціація поліграфологів України',
                'year': '2024',
                'description': 'Офіційне представництво в регіоні'
            }
        ],
        'cases_completed': 150,
        'accuracy_rate': 98
    }
    return render(request, 'main/about.html', context)

def equipment(request):
    """Сторінка обладнання"""
    context = {
        'main_device': {
            'name': 'Поліграф "РУБІКОН"',
            'model': 'Професійна версія',
            'description': 'Сучасний українськийський поліграф від офіційного дилера з надійними комплектуючими',
            'features': [
                '🔧 Якісні конектори та давачі',
                '🌿 Екологічно безпечні матеріали',
                '📊 7 реєстраційних каналів', 
                '🛡️ Гарантія виробника до 3 років'
            ],
            'specifications': {
                'Точність': '95-98%',
                'Кількість каналів': '7',
                'Реєстраційні канали': 'ШГР, ФПГ, Дихання, Тиск',
                'Гарантія': 'До 3 років'
            }
        },
        'additional_equipment': [
            {
                'name': '⚡ Давач ШГР',
                'description': 'Давач шкірно-гальванічної реакції для вимірювання електропровідності шкіри'
            },
            {
                'name': '❤️ Давач ФПГ',
                'description': 'Фотоплетизмографічний давач для реєстрації пульсу та серцево-судинної активності'
            },
            {
                'name': '🫁 Давачі дихання',
                'description': '2 канали для моніторингу грудного та діафрагмального дихання'
            },
            {
                'name': '💓 Давач артеріального тиску',
                'description': 'Манжета для вимірювання змін артеріального тиску під час тестування'
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
                'date': '15.03.2025'
            },
            {
                'name': 'Марина В.',
                'service': 'Особисті питання',
                'rating': 5,
                'text': 'Дуже делікатно підійшли до моєї ситуації. Отримала відповіді на всі питання.',
                'date': '28.03.2025'
            },
            {
                'name': 'ТОВ "Техносфера"',
                'service': 'Корпоративна перевірка',
                'rating': 5,
                'text': 'Регулярно користуємося послугами. Високий професіоналізм та точність результатів.',
                'date': '05.04.2025'
            }
        ]
    }
    return render(request, 'main/reviews.html', context)

# Telegram конфігурація - використовуємо змінні середовища
TELEGRAM_BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN', '')
TELEGRAM_CHAT_ID = os.environ.get('TELEGRAM_CHAT_ID', '')

def send_telegram_message(message):
    """Відправка повідомлення в Telegram"""
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        print("Telegram credentials not configured")
        return False
        
    try:
        url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
        data = {
            'chat_id': TELEGRAM_CHAT_ID,
            'text': message,
            'parse_mode': 'HTML'
        }
        response = requests.post(url, data=data, timeout=10)
        
        if response.status_code == 200:
            print("Telegram message sent successfully")
            return True
        else:
            print(f"Telegram API error: {response.status_code}, {response.text}")
            return False
            
    except Exception as e:
        print(f"Telegram error: {e}")
        return False

@csrf_exempt
@require_http_methods(["POST"])
def send_contact_form(request):
    """API для відправки форми контактів в Telegram"""
    try:
        # Перевіряємо чи є body у запиті
        if not request.body:
            return JsonResponse({'success': False, 'message': 'Порожній запит'})
            
        data = json.loads(request.body)
        name = data.get('name', '').strip()
        phone = data.get('phone', '').strip()
        service = data.get('service', 'Не вказано')
        message = data.get('message', '').strip()
        
        # Валідація
        if not name or len(name) < 2:
            return JsonResponse({'success': False, 'message': "Ім'я повинно містити мінімум 2 символи"})
        
        if not phone or len(phone) < 10:
            return JsonResponse({'success': False, 'message': 'Введіть коректний номер телефону'})
        
        # Формування повідомлення для Telegram
        telegram_message = f"""
🔔 <b>Нова заявка з сайту!</b>

👤 <b>Ім'я:</b> {name}
📞 <b>Телефон:</b> {phone}
🎯 <b>Послуга:</b> {service}

📝 <b>Повідомлення:</b>
{message if message else 'Не вказано'}

📅 <b>Час:</b> {datetime.now().strftime('%d.%m.%Y %H:%M')}
🌐 <b>Джерело:</b> Сайт поліграфолога
"""
        
        # Відправка в Telegram
        if send_telegram_message(telegram_message):
            return JsonResponse({'success': True, 'message': 'Заявку успішно відправлено! Зв\'яжемося з вами протягом 15 хвилин.'})
        else:
            return JsonResponse({'success': False, 'message': 'Тимчасова помилка з\'єднання. Зателефонуйте нам: +38 (067) 524-33-54'})
            
    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'message': 'Помилка обробки даних'})
    except Exception as e:
        print(f"Contact form error: {e}")
        return JsonResponse({'success': False, 'message': 'Виникла помилка. Спробуйте зателефонувати: +38 (067) 524-33-54'})

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
        if not request.body:
            return JsonResponse({'success': False, 'message': 'Порожній запит'})
            
        data = json.loads(request.body)
        name = data.get('name', '').strip()
        phone = data.get('phone', '').strip()
        service = data.get('service', '')
        
        # Валідація
        if not name or len(name) < 2:
            return JsonResponse({'success': False, 'message': "Ім'я повинно містити мінімум 2 символи"})
        
        if not phone or len(phone) < 10:
            return JsonResponse({'success': False, 'message': 'Введіть коректний номер телефону'})
            
        if not service:
            return JsonResponse({'success': False, 'message': 'Оберіть послугу'})
        
        # Формування повідомлення для Telegram
        telegram_message = f"""
⚡ <b>Швидке замовлення!</b>

👤 <b>Ім'я:</b> {name}
📞 <b>Телефон:</b> {phone}
🎯 <b>Послуга:</b> {service}

📅 <b>Час:</b> {datetime.now().strftime('%d.%m.%Y %H:%M')}
🌐 <b>Джерело:</b> Сайт поліграфолога
⏰ <b>Тип:</b> Термінова заявка - передзвонити протягом 15 хвилин!
"""
        
        # Відправка в Telegram
        if send_telegram_message(telegram_message):
            return JsonResponse({'success': True, 'message': 'Замовлення прийнято! Передзвонимо протягом 15 хвилин.'})
        else:
            return JsonResponse({'success': False, 'message': 'Тимчасова помилка. Зателефонуйте: +38 (067) 524-33-54'})
            
    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'message': 'Помилка обробки даних'})
    except Exception as e:
        print(f"Quick order error: {e}")
        return JsonResponse({'success': False, 'message': 'Виникла помилка. Зателефонуйте: +38 (067) 524-33-54'})

def robots_txt(request):
    lines = [
        "User-agent: *",
        "Allow: /",
        "Disallow: /admin/",
        "Disallow: /private/",
        "",
        "# Оптимізовані сторінки для Львова",
        "Allow: /poligrafolog-lviv/",
        "Allow: /perevirka-na-poligrafi-lviv/",
        "Allow: /robotodavtsyam/",
        "",
        "# Основні сторінки",
        "Allow: /services/",
        "Allow: /about/",
        "Allow: /equipment/",
        "Allow: /contacts/",
        "",
        "Sitemap: https://polygraph.website/sitemap.xml"
    ]
    return HttpResponse("\n".join(lines), content_type="text/plain")

def sitemap_xml(request):
    xml_content = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://polygraph.website/</loc>
        <lastmod>{date}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://polygraph.website/poligrafolog-lviv/</loc>
        <lastmod>{date}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://polygraph.website/perevirka-na-poligrafi-lviv/</loc>
        <lastmod>{date}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://polygraph.website/robotodavtsyam/</loc>
        <lastmod>{date}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://polygraph.website/services/</loc>
        <lastmod>{date}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://polygraph.website/about/</loc>
        <lastmod>{date}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>https://polygraph.website/equipment/</loc>
        <lastmod>{date}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>https://polygraph.website/contacts/</loc>
        <lastmod>{date}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
</urlset>""".format(date=datetime.now().strftime('%Y-%m-%d'))

    return HttpResponse(xml_content, content_type='application/xml')

# Нові SEO-оптимізовані сторінки для Львова
def poligrafolog_lviv(request):
    """Сторінка поліграфолога у Львові"""
    return render(request, 'main/poligrafolog_lviv.html')

def perevirka_lviv(request):
    """Сторінка перевірки на поліграфі у Львові"""
    return render(request, 'main/perevirka_lviv.html')

def robotodavtsyam(request):
    """Сторінка для роботодавців"""
    return render(request, 'main/robotodavtsyam.html') 