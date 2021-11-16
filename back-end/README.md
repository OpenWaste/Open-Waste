# back-end

## Setting up the back-end
Make sure you have Django installed. Run `pip install django` and `pip install djangorestframework`
Run `django-admin startproject back-end`. **back-end** may not be a valid name. Use the command with a different name and rename the generated folder to **back-end**.
Navigate to **back-end** folder
Run `python manage.py startapp Components`
Open the **settings.py** file and add the lines in the **INSTALLED_APPS** section:
`'rest_framework',`
`'Components',`