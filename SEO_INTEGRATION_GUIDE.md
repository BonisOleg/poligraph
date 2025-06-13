# 🔧 Інструкція з SEO-інтеграції в Django

## ✅ Що вже зроблено

1. **robots.txt** та **sitemap.xml** - інтегровані в Django як динамічні view
2. **URL-роути** - додані для SEO-файлів
3. **SEO-артефакти** - створені всі необхідні файли

## 🔄 Що потрібно зробити далі

### 1. Додати мікророзмітку в шаблони

Відкрий файли шаблонів у папці `main/templates/main/` та додай JSON-LD сніпети:

#### `main/templates/main/base.html` - додай в `<head>`:
```html
<!-- Базова мікророзмітка Organization для всіх сторінок -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Поліграфолог Львів",
  "url": "{{ request.build_absolute_uri:'/' }}",
  "logo": "{{ request.build_absolute_uri:'/static/images/logo.png' }}",
  "description": "Професійні послуги поліграфолога у Львові. Член Національної Асоціації Поліграфологів України.",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+380675243354",
    "contactType": "customer service",
    "areaServed": "UA",
    "availableLanguage": "Ukrainian"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "вул. Городоцька, 120",
    "addressLocality": "Львів",
    "addressRegion": "Львівська область",
    "postalCode": "79000",
    "addressCountry": "UA"
  }
}
</script>
```

#### `main/templates/main/home.html` - додай після тегу title:
```html
<!-- WebSite мікророзмітка для головної -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Поліграфолог Львів - Професійні послуги детекції брехні",
  "url": "{{ request.build_absolute_uri:'/' }}",
  "description": "Професійні послуги поліграфолога у Львові. Перевірка персоналу, детекція брехні, розслідування крадіжок.",
  "inLanguage": "uk-UA"
}
</script>
```

#### `main/templates/main/contacts.html` - додай LocalBusiness:
```html
<!-- LocalBusiness мікророзмітка -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Поліграфолог Львів - Професійні послуги детекції брехні",
  "description": "Професійні послуги поліграфолога у Львові. Перевірка персоналу, детекція брехні, розслідування крадіжок.",
  "url": "{{ request.build_absolute_uri:'/' }}",
  "telephone": "+380675243354",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "вул. Городоцька, 120",
    "addressLocality": "Львів",
    "addressRegion": "Львівська область",
    "postalCode": "79000",
    "addressCountry": "UA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 49.8397,
    "longitude": 24.0297
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification", 
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "16:00"
    }
  ],
  "priceRange": "₴₴"
}
</script>
```

### 2. Покращити мета-теги

Для кожної сторінки додай унікальні title та description:

#### У `main/templates/main/home.html`:
```html
<title>Поліграфолог Львів | Професійна детекція брехні | Перевірка на поліграфі</title>
<meta name="description" content="⭐ Професійний поліграфолог у Львові. Перевірка персоналу, детекція зради, розслідування крадіжок. Обладнання Rubicon. ✓ Досвід 5+ років ✓ 98% точність">
<meta name="keywords" content="поліграфолог львів, детектор брехні, перевірка на поліграфі, поліграф львів">
```

#### У `main/templates/main/services.html`:
```html
<title>Послуги поліграфолога у Львові | Ціни та умови перевірки</title>
<meta name="description" content="💼 Послуги поліграфолога: скринінг персоналу від 2500 грн, перевірка на зраду 5000 грн, розслідування крадіжок. ✓ Знижки військовим 10%">
```

### 3. Створити FAQ сторінку

Створи новий файл `main/templates/main/faq.html` та додай FAQPage мікророзмітку:

```html
<!-- FAQ мікророзмітка -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Чи можна обманути поліграф?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Сучасні поліграфи мають точність 85-95%. Обманути професійний детектор брехні практично неможливо, особливо при використанні сертифікованого обладнання Rubicon."
      }
    }
  ]
}
</script>
```

### 4. Налаштувати Google Search Console

1. Перейди на [search.google.com/search-console](https://search.google.com/search-console)
2. Додай свій домен `polygraph.website`
3. Підтверди права власності (через DNS або HTML файл)
4. Відправ sitemap: `https://polygraph.website/sitemap.xml`

### 5. Після деплою на Render

#### Перевір SEO-файли:
- `https://твій-домен.onrender.com/robots.txt`
- `https://твій-домен.onrender.com/sitemap.xml`

#### Надішли до Google:
```bash
# Відправ URL сайту для індексації
curl "https://www.google.com/ping?sitemap=https://твій-домен.onrender.com/sitemap.xml"
```

## ⏰ Реалістичні очікування

### Google знайде сайт через:
- **24-48 годин** - перша індексація (якщо правильно налаштовано)
- **1-2 тижні** - початок показів у пошуку
- **1-3 місяці** - стабільні позиції

### Що впливає на швидкість індексації:
✅ **Прискорює:**
- Google Search Console підключений
- Sitemap відправлений
- Якісний контент
- Швидкість сайту
- Мобільна адаптація

❌ **Сповільнює:**
- Відсутність GSC
- Повільний сайт
- Технічні помилки
- Дублікати контенту

## 🎯 Наступні кроки після деплою

### Тиждень 1:
- [ ] Підключити Google Search Console
- [ ] Відправити sitemap.xml
- [ ] Перевірити індексацію базових сторінок
- [ ] Встановити Google Analytics

### Тиждень 2-4:
- [ ] Створити Google Business Profile
- [ ] Написати першу статтю для блогу
- [ ] Налаштувати локальні цитування
- [ ] Розпочати збір відгуків

### Місяць 2-3:
- [ ] Аналіз позицій у пошуку
- [ ] Оптимізація за результатами GSC
- [ ] Створення додаткового контенту
- [ ] Лінкбілдінг стратегія

## ⚠️ Важливо!

1. **Не чекай миттєвих результатів** - SEO процес довготривалий
2. **Моніторь GSC щотижня** - відстежуй помилки та прогрес  
3. **Створюй якісний контент** - це основа успішного SEO
4. **Будь терплячим** - перші результати через 2-4 тижні

---

## 📞 Якщо виникли питання

Пиши мені, допоможу з інтеграцією та налаштуванням! 🚀 