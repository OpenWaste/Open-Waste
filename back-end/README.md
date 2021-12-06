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

Create an .env file with a Django secret key assigned to the variable **SECRET_KEY**
You can copy the env.eample file and rename it to .env.
You can generate a secret key on https://djecrety.ir/

Run the server
`py manage.py migrate`
`py manage.py runserver`

If you want to login, you need to create a superuser account
`py manage.py createsuperuser`

Login with you superuser credentials

If you can't connect to the server, try restarting your computer or disabling your firewalls

## Endpoints

To test these endpoint, run the server and use Postman or Insomnia.

/prediction
Make a POST request to this url `http://127.0.0.1:8000/prediction/` and add in the Body->form data the KEY **image** and for the VALUE, upload an image. This endpoint is used to detect the waste of the submitted image.

/imageSubmission
To test this endpoint, do the same steps as the /prediction endpoint but make a POST to this url `http://127.0.0.1:8000/imageSubmission/` instead. Add the same KEY and VALUE as the /prediction endpoint but also add another param with **category** as the KEY and either one of these as the VALUE **{cardboard, glass, metal, paper, plastic, trash}**. This endpoint is used to add a new waste to the database.

/update
Used to fetch the categories for image submission. In the future it will get other updates like updated waste disposal instructions, etc
