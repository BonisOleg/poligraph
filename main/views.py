from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.conf import settings
import json

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
                'price': '2500 грн',
                'extended_price': '4000 грн (розширений)',
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
        'experience_years': 15,
        'cases_completed': 1500,
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

@csrf_exempt
def send_contact_form(request):
    """API для відправки форми контактів"""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name')
            phone = data.get('phone')
            service = data.get('service')
            message = data.get('message')
            
            # Тут можна додати відправку email або збереження в базу
            # send_mail(...)
            
            return JsonResponse({'success': True, 'message': 'Заявку успішно відправлено!'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': 'Помилка відправки заявки'})
    
    return JsonResponse({'success': False, 'message': 'Невірний метод запиту'}) 