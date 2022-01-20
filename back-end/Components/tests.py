from unicodedata import category
from django.test import TestCase, Client
from django.core.files.uploadedfile import SimpleUploadedFile
from Components.models import Category, DWUser, CategoryInstructions
import json


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
                     'image': self.image,
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
            self.path, img_param, content_type='application/json')

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
        Category(name='plastic').save()
        Category(name='metal').save()
        Category(name='paper').save()
        Category(name='cardboard').save()
        Category(name='glass').save()
        Category(name='trash').save()

        CategoryInstructions(
            category=Category.objects.get(id=1), instructions='1. check if it is contaminated;\r\n2. if contaminated, throw in trash;\r\n3. if not, put in recycle bin;\r\n4. congratulate yourself').save()
        CategoryInstructions(
            category=Category.objects.get(id=2), instructions='1. if dirty, please wash;\r\n2. check recycle number (1-6);\r\n3. if recyclable, put in recylce bin;\r\n4. otherwise, throw in trash;').save()
        CategoryInstructions(
            category=Category.objects.get(id=3), instructions='1. make sure item  does not contain electronic components;\r\n2. clean item;\r\n3. if item is large, make it smaller;\r\n4. dispose in recycle bin while being cautious not to get cut').save()
        CategoryInstructions(
            category=Category.objects.get(id=4), instructions='1. wash container;\r\n2. DO NOT BREAK;\r\n3. place in recycle bin;').save()
        CategoryInstructions(
            category=Category.objects.get(id=5), instructions='1. dispose in trash bin 5').save()
        CategoryInstructions(
            category=Category.objects.get(id=6), instructions='1. dispose in trash bin 6').save()

        # print(Category.objects.values_list('name'))
        # print(CategoryInstructions.objects.values_list(
        #     'category', 'instructions'))
        # mock returned json
        update_mock = open('Components/mocks/update_mock.json')
        mock = json.load(update_mock)

        # get request
        response = self.client.get(self.path)
        print(response.content.decode('utf8'))
        # assert values returned are correct
        self.assertCountEqual(response.content.decode('utf8'), mock)

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
