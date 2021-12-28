release: python app/manage.py migrate
web: gunicorn --timeout 30 app.alloydflanagan.wsgi:application --log-file -
