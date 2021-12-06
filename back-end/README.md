# back-end

## Setting up the back-end

Make sure you have Django installed. Run `pip install django` and `pip install djangorestframework`
Run `django-admin startproject back-end`. **back-end** may not be a valid name. Use the command with a different name and rename the generated folder to **back-end**.
Navigate to **back-end** folder
Run `python manage.py startapp Components`
Open the **settings.py** file and add the lines in the **INSTALLED_APPS** section:
`'rest_framework',`
`'Components',`

## Steps to run the server

Install requirements
`py -m pip install -r requirements.txt`
`py -m pip install python-dotenv`

Create an .env file with a Django secret key assigned to the variable **SECRET_KEY**

Run the server
`py manage.py migrate`
`py manage.py runserver`

If you want to login, you need to create a superuser account
`py manage.py createsuperuser`

Login with you superuser credentials

If you can't connect to the server, try restarting your computer or disabling your firewalls
