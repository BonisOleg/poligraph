from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('services/', views.services, name='services'),
    path('about/', views.about, name='about'),
    path('equipment/', views.equipment, name='equipment'),
    path('contacts/', views.contacts, name='contacts'),
    path('reviews/', views.reviews, name='reviews'),
    path('api/send-contact/', views.send_contact_form, name='send_contact_form'),
    path('api/send-review/', views.send_review_form, name='send_review_form'),
    path('api/quick-order/', views.send_quick_order, name='send_quick_order'),
    # SEO URLs
    path('robots.txt', views.robots_txt, name='robots_txt'),
    path('sitemap.xml', views.sitemap_xml, name='sitemap_xml'),
] 