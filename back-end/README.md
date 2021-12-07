# back-end

## Setting up the back-end

Start from the root folder **SOEN-490-ATTACK-ON-SOEN**

Install requirements
`pip install -r requirements.txt`

Change directory to the **back-end** folder
`cd back-end`

## Steps to run the server

If you don't have an .env file with a Django secret key

- Create a copy of the **env.example** file and rename it to **.env**
- Add a secret key to the variable **SECRET_KEY** in the .env file
- Make sure to put the value of the secret key in quotation marks **""**
- You can generate a secret key at https://djecrety.ir/

Run the server
`py manage.py migrate`
`py manage.py runserver`

Run test
`py manage.py test`

If you want to login, you need to create a superuser account. Enter a username (uses default username if nothing is entered), email (optional), password (passwords must match).
`py manage.py createsuperuser`

Login with you superuser credentials

If you can't connect to the server, try restarting your computer or disabling your firewalls

## Endpoints

To test these endpoints, run the server and use Postman or Insomnia.
You can install Postman here: https://www.postman.com/downloads/

/prediction

- This endpoint is used to detect the waste of the submitted image.
- Open up Postman, go to the home screen (if not already there)
- Select `Create New` under Start with something new. Finally, select HTTP Request
  ![](https://user-images.githubusercontent.com/31664874/143655777-1448c6bc-dc87-41f5-974c-55cf59a2e252.png)
- Next, you will select POST request and enter the URL. The URL here is the development address noted above with the word `prediction` appended to it. So, in this example, it would be `http://127.0.0.1:8000/prediction`
  ![](https://user-images.githubusercontent.com/31664874/143655939-fa525b18-ddbf-4692-8217-8450b307b1af.png)
- Now, we will have to add an image to the body of the request. For this, select the `Body` tab, then select the `form-data` radio button. Hover over the `Key` box and select "Text" to open up a dropdown and then select File
  ![](https://user-images.githubusercontent.com/31664874/143656024-607c6e21-b9ed-43fc-99fa-354ffccd0902.png)
- Now, you will be able to select files to upload. For the `Key` field, enter the word `image` and the for the `Value` field, browse for an image to test the endpoint with (download one from google or something). For this example, I chose an image of a plastic bottle as seen in the screenshot below.
  ![](https://user-images.githubusercontent.com/31664874/143656197-de6d8da5-1db3-4bbd-9a12-db0ab96e57eb.png)
- Then press on SEND, you should get a response back with the prediction from the ML algorithm as seen below
  ![](https://user-images.githubusercontent.com/31664874/143656241-fb59c57a-59a6-4430-b182-2b3d7de2a3e3.png)

/image-submission

- This endpoint is used to add a new waste to the database.
- To test this endpoint, do the same steps as the /prediction endpoint but make a POST to this url `http://127.0.0.1:8000/image-submission/` instead.
- Add the same KEY and VALUE as the /prediction endpoint but also add another param with **category** as the KEY and either one of these as the VALUE **{cardboard, glass, metal, paper, plastic, trash}**.
  ![](https://user-images.githubusercontent.com/48952121/144181376-a1f405ff-8cb6-476c-8241-d9990b02b600.png)

/update

- Used to fetch the categories for image submission. In the future it will get other updates like updated waste disposal instructions, etc
