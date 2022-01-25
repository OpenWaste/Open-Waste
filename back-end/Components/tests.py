from django.test import TestCase, Client
from django.core.files.uploadedfile import SimpleUploadedFile
from Components.models import Category, DWUser
import json


class CreateUser(TestCase):
    def setUp(self):
        self.client = Client()
        self.path = '/create-user'

    def test_user_creation_success(self):
        # user
        user_info = {'username': 'John',
                     'email': 'John@gmail.com',
                     'password': 'John123'}

        # post request
        response = self.client.post(self.path, user_info)

        # assert status code: 200
        self.assertEqual(response.status_code, 200)

    def test_user_creation_fail(self):
        # user
        user_info = {'username': 'John',
                     'password': 'John123'}

        # post request
        response = self.client.post(self.path, user_info)

        # assert status code: 400
        self.assertEqual(response.status_code, 400)


class AuthenticateUser(TestCase):
    def setUp(self):
        self.client = Client()
        self.path = '/authenticate-user'

    def test_authenticate_user_success_correct(self):
        # user
        user_info = {'username': 'John',
                     'password': 'John123'}

        # post request
        response = self.client.post(self.path, user_info)

        # assert status code: 200
        self.assertEqual(response.status_code, 200)

    def test_authenticate_user_success_incorrect(self):
        # user
        user_info = {'username': 'John',
                     'password': 'John1234'}

        # post request
        response = self.client.post(self.path, user_info)

        # assert status code: 200
        self.assertEqual(response.status_code, 200)

    def test_authenticate_user_fail_missing_param(self):
        # user
        user_info = {'password': 'John1234'}

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
        user_info = {'password': 'John123'}

        # patch request
        response = self.client.patch(self.path, user_info)

        # assert status code: 400
        self.assertEqual(response.status_code, 400)


class UpdateUsernameAndEmail(TestCase):
    def setUp(self):
        self.client = Client()
        self.path = '/update-username-email'
        self.user = self.client.post('/create-user', {'username': 'John',
                                                      'email': 'John@gmail.com',
                                                      'password': 'John123'})

    def test_update_username_and_email_success(self):
        # user
        users_info = {'old_username': 'John',
                      'new_username': 'JohnCena',
                      'email': 'YouCannotSeeMe@gmail.com'}

        response = self.client.patch(self.path,
                                     users_info,
                                     content_type='application/json')

        # assert status code: 200
        self.assertEqual(response.status_code, 200)

    def test_update_username_and_email_fail(self):
        # user - old_username doesn't exist in DB
        users_info = {'old_username': 'James',
                      'new_username': 'JohnCena',
                      'email': 'YouCannotSeeMe@gmail.com'}

        response = self.client.patch(self.path,
                                     users_info,
                                     content_type='application/json')

        # assert status code: 400
        self.assertEqual(response.status_code, 400)


class DeleteUser(TestCase):
    def setUp(self):
        self.client = Client()
        self.path = '/delete-user'

    def test_delete_user_success(self):
        # create user
        self.user = DWUser.objects.create_user({'username': 'John',
                                                'email': 'John@gmail.com',
                                                'password': 'John123'})

        # user
        user_info = {'username': 'John'}

        # delete request
        response = self.client.delete(
            self.path, user_info, content_type='application/json')

        # assert status code: 200
        self.assertEqual(response.status_code, 200)

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
        category = Category(name='plastic')
        category.save()

    def test_image_submission_success(self):
        # stub image object
        img_param = {'category': 'plastic',
                     'image': self.image}

        # post request
        response = self.client.post(self.path, img_param)

        # assert status code: 200
        self.assertEqual(response.status_code, 200)

    def test_image_submission_fail(self):
        # stub image object
        img_param = {'category': 'plastic'}

        # post request
        response = self.client.post(
            self.path, img_param, content_type='application/json')

        # assert status code: 400
        self.assertEqual(response.status_code, 400)


class ImageUpdate(TestCase):
    def setUp(self):
        # Test client is a Python class that acts as a dummy Web browser
        # allowing you to test your views and interact with your Django-powered  application
        self.client = Client()
        # url to end point
        self.path = '/update'

    def test_update_success(self):
        # insert categories into test db
        Category(name='cardboard').save()
        Category(name='plastic').save()
        Category(name='glass').save()

        # mock returned json
        mock = '{"categories":["cardboard","plastic","glass"]}'

        # get request
        response = self.client.get(self.path)

        # assert values returned are correct
        self.assertEqual(response.content.decode('utf8'), mock)

        # assert status code: 200
        self.assertEqual(response.status_code, 200)


class ImageRecognitionTest(TestCase):
    def setUp(self):
        self.client = Client()

        # url to end point
        self.path = '/prediction'

    def test_prediction_endpoint_success(self):
        valid_image = '/9j/4AAQSkZJRgABAQEAYABgAAD/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBERISGBUYLxoaL2NCOEJjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY//CABEIAGAAYAMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQUGBAMCB//aAAgBAQAAAAD9FAAAAFlcTT1gHfqyMvXA0lsKvMg0VxCanNg6db6PjJ8gPbS97hzXgHTrPWE+eS5hre0HHkUd2tAZLiXV+mEwoaT/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oACgICEAMQAAAAAAAAAAAAAAAA/8QALxAAAgIAAwYEBQUBAAAAAAAAAQIDBAURIAAQITFBUQYSMIETFCIjcTJCYZGh8f/aAAgBAQABPwD1OnqdNFDB5raiWQ/CiPI9W/G0WDUoxxiLnuzHaTBqEgOURQ90Y7X8FmqIZYiZYRzI5r6GE0hbt/WM4k4t/PYbAADIaMYoinZDIAIpRmB2PUa8AjAoO/VnOnHkDYcG6q41+HpQ1WSEkZo/m9j/AM0+IJlSkkX73fP2GuhcNK0soBK8mXuNopkniWSNgytyO+WVIIi7sFQcydsQuG9aaTLJBwRew0dN9WpNck8kKZ9yeQ2w7DfkAT8Z2Y8wOC78Rw354AiZ0K/pU8V2tU5qcnkmTLsRyOqjTe7YEacBzZuw2r14q0QiiXJR/umzWjsQGGZAQf7G16k9GyYn4jmrdxpwymKlNVYfcbi+vEqYuU2VR91PqTf02wqAWMSiVhminzN+B6OK1/lsSmQDJSfMPff4dQGxPIRyQAe/o+JIwtmB8uJTI7v/xAAUEQEAAAAAAAAAAAAAAAAAAABQ/9oACAECAQE/ABP/xAAUEQEAAAAAAAAAAAAAAAAAAABQ/9oACAEDAQE/ABP/2Q=='

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
