from django.test import TestCase, Client
from django.core.files.uploadedfile import SimpleUploadedFile
from Components.models import Category, DWUser, CategoryInstructions, Bin, BinImages, Building, BuildingImages
import json

CONTENT_TYPE = 'application/json'
TEST_EMAIL = 'John@gmail.com'
USER_NAME = 'John'
PASSWORD = 'John123'
WRONG_PASSWORD = 'John1234'
CREATE_USER_PATH = '/create-user'
VALID_IMAGE = '/9j/4AAQSkZJRgABAQEAYABgAAD/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBERISGBUYLxoaL2NCOEJjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY//CABEIAGAAYAMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQUGBAMCB//aAAgBAQAAAAD9FAAAAFlcTT1gHfqyMvXA0lsKvMg0VxCanNg6db6PjJ8gPbS97hzXgHTrPWE+eS5hre0HHkUd2tAZLiXV+mEwoaT/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oACgICEAMQAAAAAAAAAAAAAAAA/8QALxAAAgIAAwYEBQUBAAAAAAAAAQIDBAURIAAQITFBUQYSMIETFCIjcTJCYZGh8f/aAAgBAQABPwD1OnqdNFDB5raiWQ/CiPI9W/G0WDUoxxiLnuzHaTBqEgOURQ90Y7X8FmqIZYiZYRzI5r6GE0hbt/WM4k4t/PYbAADIaMYoinZDIAIpRmB2PUa8AjAoO/VnOnHkDYcG6q41+HpQ1WSEkZo/m9j/AM0+IJlSkkX73fP2GuhcNK0soBK8mXuNopkniWSNgytyO+WVIIi7sFQcydsQuG9aaTLJBwRew0dN9WpNck8kKZ9yeQ2w7DfkAT8Z2Y8wOC78Rw354AiZ0K/pU8V2tU5qcnkmTLsRyOqjTe7YEacBzZuw2r14q0QiiXJR/umzWjsQGGZAQf7G16k9GyYn4jmrdxpwymKlNVYfcbi+vEqYuU2VR91PqTf02wqAWMSiVhminzN+B6OK1/lsSmQDJSfMPff4dQGxPIRyQAe/o+JIwtmB8uJTI7v/xAAUEQEAAAAAAAAAAAAAAAAAAABQ/9oACAECAQE/ABP/xAAUEQEAAAAAAAAAAAAAAAAAAABQ/9oACAEDAQE/ABP/2Q=='


class CreateUser(TestCase):
    def setUp(self):
        self.client = Client()
        self.path = CREATE_USER_PATH

    def test_user_creation_success(self):
        # user
        user_info = {'username': USER_NAME,
                     'email': TEST_EMAIL,
                     'password': PASSWORD}

        # post request
        response = self.client.post(self.path, user_info)

        # assert status code: 200
        self.assertEqual(response.status_code, 200)

    def test_user_creation_fail(self):
        # user
        user_info = {'username': USER_NAME,
                     'password': PASSWORD}

        # post request
        response = self.client.post(self.path, user_info)

        # assert status code: 400
        self.assertEqual(response.status_code, 400)


class AuthenticateUser(TestCase):
    def setUp(self):
        self.client = Client()
        self.path = '/authenticate-user'
        self.user = self.client.post(CREATE_USER_PATH, {'username': USER_NAME,
                                                        'email': TEST_EMAIL,
                                                        'password': PASSWORD})

    def test_authenticate_user_success_correct(self):
        # user
        user_info = {'username': USER_NAME,
                     'password': PASSWORD}

        # post request
        response = self.client.post(self.path, user_info)

        # assert status code: 200
        self.assertEqual(response.status_code, 200)

    def test_authenticate_user_success_incorrect(self):
        # user
        user_info = {'username': USER_NAME,
                     'password': WRONG_PASSWORD}

        # post request
        response = self.client.post(self.path, user_info)

        # assert status code: 401
        self.assertEqual(response.status_code, 401)

    def test_authenticate_user_fail_missing_param(self):
        # user
        user_info = {'password': PASSWORD}

        # post request
        response = self.client.post(self.path, user_info)

        # assert status code: 400
        self.assertEqual(response.status_code, 400)


class UpdatePassword(TestCase):
    def setUp(self):
        self.client = Client()
        self.path = '/update-password'

    def test_update_password_fail(self):
        # user
        user_info = {'password': PASSWORD}

        # patch request
        response = self.client.patch(self.path, user_info, content_type=CONTENT_TYPE)

        # assert status code: 400
        self.assertEqual(response.status_code, 400)

    def test_update_password_success(self):
        # create user
        self.user = DWUser.objects.create_user(USER_NAME.lower(),
                                                TEST_EMAIL,
                                                PASSWORD)
        self.user.save()
        # user
        user_info = {'username': USER_NAME, 'password': 'newpass'}

        # patch request
        response = self.client.patch(self.path, user_info, content_type=CONTENT_TYPE)

        # assert status code: 400
        self.assertEqual(response.status_code, 200)
        self.assertTrue("Successfully changed password." in response.json())


class UpdateUsernameAndEmail(TestCase):
    def setUp(self):
        self.client = Client()
        self.path = '/update-username-email'
        self.user = self.client.post(CREATE_USER_PATH, {'username': USER_NAME,
                                                        'email': TEST_EMAIL,
                                                        'password': PASSWORD})

    def test_update_username_and_email_success(self):
        # user
        users_info = {'old_username': USER_NAME,
                      'new_username': 'JohnCena',
                      'email': 'YouCannotSeeMe@gmail.com'}

        response = self.client.patch(self.path,
                                     users_info,
                                     content_type=CONTENT_TYPE)

        # assert status code: 200
        self.assertEqual(response.status_code, 200)

    def test_update_username_and_email_fail(self):
        # user - old_username doesn't exist in DB
        users_info = {'old_username': 'James',
                      'new_username': 'JohnCena',
                      'email': 'YouCannotSeeMe@gmail.com'}

        response = self.client.patch(self.path,
                                     users_info,
                                     content_type=CONTENT_TYPE)

        # assert status code: 400
        self.assertEqual(response.status_code, 400)


class DeleteUser(TestCase):
    def setUp(self):
        self.client = Client()
        self.path = '/delete-user'

    def test_delete_user_success(self):
        # create user
        self.user = DWUser.objects.create_user(USER_NAME.lower(),
                                                TEST_EMAIL,
                                                PASSWORD)
        self.user.save()

        # user
        user_info = {'username': USER_NAME}

        # delete request
        response = self.client.delete(
            self.path, user_info, content_type=CONTENT_TYPE)

        # assert status code: 200
        self.assertEqual(response.status_code, 200)
        self.assertTrue("The user is deleted." in response.json())


    def test_delete_user_that_does_not_exist(self):
        # user that does not exist
        user_info = {'username': USER_NAME}

        # delete request
        response = self.client.delete(
            self.path, user_info, content_type=CONTENT_TYPE)

        # assert status code: 200
        self.assertEqual(response.status_code, 200)
        self.assertTrue("The user does not exist." in response.json())



    def test_delete_user_missing_param_fail(self):
        # user
        user_info = {''}

        # delete request
        response = self.client.delete(self.path, user_info)

        # assert status code: 400
        self.assertEqual(response.status_code, 400)


class ImageSubmissionTest(TestCase):
    def setUp(self):
        # Test client is a Python class that acts as a dummy Web browser
        # allowing you to test your views and interact with your Django-powered application
        self.client = Client()
        # An UploadedFile object behaves somewhat like a file object and
        # represents some file data that the user submitted with a form
        self.image = SimpleUploadedFile(
            'image.jpg', b"image_content", content_type='image/jpeg')
        # url to end point
        self.path = '/image-submission'
        # insert 'plastic' category into test db
        Category(name='plastic').save()
        DWUser(email='admin@admin.com').save()

    def test_image_submission_success(self):
        # stub image object
        img_param = {'category': 'plastic',
                     'image': VALID_IMAGE,
                     'accepted': True,
                     'email': 'admin@admin.com'}
        # post request
        response = self.client.post(self.path, img_param)

        # assert status code: 200
        self.assertEqual(response.status_code, 200)

    def test_image_submission_fail(self):
        # stub image object
        img_param = {'category': 'plastic'}

        # post request
        response = self.client.post(
            self.path, img_param, content_type=CONTENT_TYPE)

        # assert status code: 400
        self.assertEqual(response.status_code, 400)


class ImageUpdate(TestCase):
    maxDiff = None

    def setUp(self):
        # Test client is a Python class that acts as a dummy Web browser
        # allowing you to test your views and interact with your Django-powered  application
        self.client = Client()
        # url to end point
        self.path = '/update'

    def test_update_success(self):
        # insert categories into test db
        category_plastic = Category(name='plastic')
        category_metal = Category(name='metal')
        category_paper = Category(name='paper')
        category_cardboard = Category(name='cardboard')
        category_glass = Category(name='glass')
        category_trash = Category(name='trash')
        category_plastic.save()
        category_metal.save()
        category_paper.save()
        category_cardboard.save()
        category_glass.save()
        category_trash.save()

        CategoryInstructions(
            category=category_plastic, instructions='1. check if it is contaminated;\r\n2. if contaminated, throw in trash;\r\n3. if not, put in recycle bin;\r\n4. congratulate yourself').save()
        CategoryInstructions(
            category=category_metal, instructions='1. if dirty, please wash;\r\n2. check recycle number (1-6);\r\n3. if recyclable, put in recylce bin;\r\n4. otherwise, throw in trash;').save()
        CategoryInstructions(
            category=category_paper, instructions='1. make sure item  does not contain electronic components;\r\n2. clean item;\r\n3. if item is large, make it smaller;\r\n4. dispose in recycle bin while being cautious not to get cut').save()
        CategoryInstructions(
            category=category_cardboard, instructions='1. wash container;\r\n2. DO NOT BREAK;\r\n3. place in recycle bin;').save()
        CategoryInstructions(
            category=category_glass, instructions='1. dispose in trash bin 5').save()
        CategoryInstructions(
            category=category_trash, instructions='1. dispose in trash bin 6').save()

        Building(id=1, building_name='hall building', address='123 address street',
                 latitude=45, longitude=46).save()  # For foreign key
        Bin(id=1,
            location_name='First Floor Hall Building',
            floor_number=1,
            room_number='H123',
            disposal_type='disposal type',
            accepted_categories='C1',
            building_id=1).save()

        # mock returned json
        update_mock = open('Components/mocks/update_mock.json')
        mock = json.load(update_mock)

        # get request
        response = self.client.get(self.path)

        # assert values returned are correct
        self.assertCountEqual(response.json(), mock)

        # assert status code: 200
        self.assertEqual(response.status_code, 200)


class ImageRecognitionTest(TestCase):
    def setUp(self):
        self.client = Client()

        # url to end point
        self.path = '/prediction'

    def test_prediction_endpoint_success(self):
        valid_image = VALID_IMAGE

        response = self.client.post(self.path, {'image': valid_image})

        self.assertEqual(response.status_code, 200)
        self.assertTrue('prediction' in response.data)

    def test_prediction_endpoint_fail_with_empty_string(self):
        invalid_image = ""
        response = self.client.post(self.path, {'image': invalid_image})

        self.assertEqual(response.status_code, 400)
        self.assertTrue('prediction' not in response.data)

    def test_prediction_endpoint_fail_with_ordinary_string(self):
        # The validation checks the image input for a valid JPEG header
        # The following image data should fail this check and return a 400
        invalid_image = "dsadasdas"
        response = self.client.post(self.path, {'image': invalid_image})

        self.assertEqual(response.status_code, 400)
        self.assertTrue('prediction' not in response.data)

    def test_prediction_endpoint_fail_with_invalid_jpeg_base64_string(self):
        # The prefix '/9j/4AAQSkZJRgABA' is a header for JPEG images in base64 format
        # However, a header by itself is not a valid image. Therefore, a request with this input should return a 400
        invalid_jpeg_image = "/9j/4AAQSkZJRgABA"
        response = self.client.post(self.path, {'image': invalid_jpeg_image})

        self.assertEqual(response.status_code, 400)
        self.assertTrue('prediction' not in response.data)


class ResetPassword(TestCase):
    def setUp(self):
        self.client = Client()
        self.path = '/reset-password'
        # create user
        self.user = self.client.post(CREATE_USER_PATH, {'username': USER_NAME,
                                                        'email': TEST_EMAIL,
                                                        'password': PASSWORD})

    def test_reset_password_success(self):

        # POST to that email
        response = self.client.post(self.path, {'email': TEST_EMAIL})

        self.assertEqual(response.status_code, 200)
        self.assertTrue('The email has been sent' in response.data)

    def test_reset_password_fail(self):

        # POST with no email
        response = self.client.post(self.path, {'': ""})

        self.assertEqual(response.status_code, 400)


class VerifyEmail(TestCase):
    def setUp(self):
        self.client = Client()
        self.path = '/verify-email'
        # create user
        self.user = self.client.post(CREATE_USER_PATH, {'username': USER_NAME,
                                                        'email': TEST_EMAIL,
                                                        'password': PASSWORD})

    def test_verify_email_success(self):
        # user
        user_info = {'passcode': '',
                     'email': TEST_EMAIL}
        # POST to that email
        response = self.client.post(self.path, user_info)

        self.assertEqual(response.status_code, 200)

    def test_verify_email_fail(self):
        # user
        user_info = {'': '',
                     '': ''}
        # POST with no parameters
        response = self.client.post(self.path, user_info)

        self.assertEqual(response.status_code, 400)
