from django.test import TestCase, Client
from django.core.files.uploadedfile import SimpleUploadedFile
from Components.models import Category


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
