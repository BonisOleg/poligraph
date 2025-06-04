#!/usr/bin/env python3
"""
Скрипт для тестування форм сайту
"""

import requests
import json
import os

# Налаштування
BASE_URL = "http://127.0.0.1:8000"  # Локальний сервер
# BASE_URL = "https://your-render-app.onrender.com"  # Для продакшену

def test_contact_form():
    """Тестування форми контактів"""
    print("🔍 Тестуємо форму контактів...")
    
    data = {
        "name": "Тест Тестович",
        "phone": "+38 (067) 123-45-67",
        "service": "Тест послуги",
        "message": "Це тестове повідомлення з форми контактів"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/send-contact/",
            json=data,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        
        result = response.json()
        
        if result.get('success'):
            print("✅ Форма контактів працює!")
            print(f"📝 Повідомлення: {result.get('message')}")
        else:
            print("❌ Помилка форми контактів")
            print(f"📝 Помилка: {result.get('message')}")
            
    except Exception as e:
        print(f"❌ Помилка з'єднання: {e}")

def test_quick_order():
    """Тестування швидкого замовлення"""
    print("\n🚀 Тестуємо швидке замовлення...")
    
    data = {
        "name": "Тест Швидкий",
        "phone": "+38 (067) 987-65-43",
        "service": "Перевірка на зраду"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/quick-order/",
            json=data,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        
        result = response.json()
        
        if result.get('success'):
            print("✅ Швидке замовлення працює!")
            print(f"📝 Повідомлення: {result.get('message')}")
        else:
            print("❌ Помилка швидкого замовлення")
            print(f"📝 Помилка: {result.get('message')}")
            
    except Exception as e:
        print(f"❌ Помилка з'єднання: {e}")

def test_review_form():
    """Тестування форми відгуків"""
    print("\n📝 Тестуємо форму відгуків...")
    
    data = {
        "name": "Тест Відгук",
        "service": "Тест послуги",
        "rating": "5",
        "review": "Це тестовий відгук для перевірки роботи форми. Все працює чудово!"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/send-review/",
            json=data,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        
        result = response.json()
        
        if result.get('success'):
            print("✅ Форма відгуків працює!")
            print(f"📝 Повідомлення: {result.get('message')}")
        else:
            print("❌ Помилка форми відгуків")
            print(f"📝 Помилка: {result.get('message')}")
            
    except Exception as e:
        print(f"❌ Помилка з'єднання: {e}")

if __name__ == "__main__":
    print("🧪 Тестування форм сайту поліграфолога")
    print("=" * 50)
    
    # Перевіряємо чи налаштовані змінні середовища
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    
    if not bot_token or not chat_id:
        print("⚠️  УВАГА: Telegram не налаштований")
        print("   Встановіть TELEGRAM_BOT_TOKEN та TELEGRAM_CHAT_ID")
        print("   Форми будуть тестуватися але повідомлення не відправлятимуться")
        print()
    
    test_contact_form()
    test_quick_order()
    test_review_form()
    
    print("\n" + "=" * 50)
    print("🏁 Тестування завершено!") 