# back-end

## Setting up the back-end

Start from the root folder **SOEN-490-ATTACK-ON-SOEN**

Install requirements
`pip install -r requirements.txt`

Make sure you have Django installed.
`pip install django` and `pip install djangorestframework`

Change directory to the **back-end** folder
`cd back-end`

## Steps to run the server

If you don't have an .env file with a Django secret key

- Rename the **env.example** file to **.env** and add a secret key to the variable **SECRET_KEY**
- Make sure to put the value of the secret key in quotation marks **""**
- You can generate a secret key on https://djecrety.ir/

Run the server
`py manage.py migrate`
`py manage.py runserver`

Run test
`py manage.py test`

If you want to login, you need to create a superuser account
`py manage.py createsuperuser`

Login with you superuser credentials

If you can't connect to the server, try restarting your computer or disabling your firewalls

## Endpoints

To test these endpoints, run the server and use Postman or Insomnia.

/prediction

- This endpoint is used to detect the waste of the submitted image.
- Make a POST request to this url `http://127.0.0.1:8000/prediction/`
- Add in the Body->form data the KEY **image** and for the VALUE, upload an image.

/image-submission

- This endpoint is used to add a new waste to the database.
- To test this endpoint, do the same steps as the /prediction endpoint but make a POST to this url `http://127.0.0.1:8000/image-submission/` instead.
- Add the same KEY and VALUE as the /prediction endpoint but also add another param with **category** as the KEY and either one of these as the VALUE **{cardboard, glass, metal, paper, plastic, trash}**.

/update

- Used to fetch the categories for image submission. In the future it will get other updates like updated waste disposal instructions, etc
