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


# Machine Learning Utils

## Setup
As in the backend setup, run `pip install -r requirements.txt` from the root directory if you haven't already.

If any modules still show up as not found, simply run `pip install <module name>`.

Also run the following for specific versions of packages required to use your GPU during training:
`pip3 install torch==1.10.0+cu102 torchvision==0.11.1+cu102 torchaudio===0.10.0+cu102 -f https://download.pytorch.org/whl/cu102/torch_stable.html`

Now, ensure you are in the `back-end` directory using `cd back-end`.

## download.py
Run this script using `python utils/download.py` to download a copy of the garythung/trashnet dataset as a ZIP file and unzip it (the copy is already sorted into training and validation data).

## model.py
Before running the model, you need to be able to log to Weights and Biases or ignore the logging call.  
Option 1: Run `wandb offline` before you run the script to let the program run offline.  
Option 2: Create a Weights and Biases account and ask for an invite to the project. Once invited, you can run `wandb login` and paste your API key to connect to the project. This allows your run stats to save onto the project history online.

Run this script using `python utils/model.py` to train on the dataset, the model is saved as a file called `model.ckpt` that can be loaded in again later on.

Note: If you do not have a GPU or PyTorch cannot detect yours, change `gpus=1` to `gpus=0` in the Trainer call near the end of the file.