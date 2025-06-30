from django.core.management.base import BaseCommand
from django.db import connection
from django.core.management import call_command
import time
import sys


class Command(BaseCommand):
    help = 'Перевіряє доступність бази даних та запускає міграції'

    def add_arguments(self, parser):
        parser.add_argument(
            '--max-attempts',
            type=int,
            default=30,
            help='Максимальна кількість спроб підключення до БД'
        )
        parser.add_argument(
            '--wait-seconds',
            type=int,
            default=2,
            help='Час очікування між спробами (в секундах)'
        )

    def handle(self, *args, **options):
        max_attempts = options['max_attempts']
        wait_seconds = options['wait_seconds']
        
        self.stdout.write('Перевіряю підключення до бази даних...')
        
        for attempt in range(1, max_attempts + 1):
            try:
                # Спроба підключитися до БД
                with connection.cursor() as cursor:
                    cursor.execute('SELECT 1')
                
                self.stdout.write(
                    self.style.SUCCESS(f'✓ База даних доступна (спроба {attempt})')
                )
                
                # Запускаємо міграції
                self.stdout.write('Запускаю міграції...')
                call_command('migrate', verbosity=0)
                self.stdout.write(
                    self.style.SUCCESS('✓ Міграції успішно застосовані')
                )
                return
                
            except Exception as e:
                if attempt == max_attempts:
                    self.stdout.write(
                        self.style.ERROR(
                            f'✗ Не вдалося підключитися до БД після {max_attempts} спроб'
                        )
                    )
                    self.stdout.write(f'Останя помилка: {str(e)}')
                    sys.exit(1)
                else:
                    self.stdout.write(
                        f'⏳ Спроба {attempt}: БД недоступна, чекаю {wait_seconds} сек...'
                    )
                    time.sleep(wait_seconds) 