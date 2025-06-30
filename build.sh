#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install requirements
pip install -r requirements.txt

# Convert static asset files
python manage.py collectstatic --no-input

echo "Build completed successfully. Database migrations will run on service start." 