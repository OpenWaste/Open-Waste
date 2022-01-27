import base64
import io
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Components.models import Category, Image_Submission, DWUser
from Components.serializer import ImageRecognitionSerializer
from rest_framework.parsers import MultiPartParser
from Components.machine_learning.predictor import Predictor
from django.contrib.auth import authenticate


class CreateUser(APIView):
    def post(self, request):
        try:
            # values
            username = request.data['username']
            email = request.data['email']
            password = request.data['password']

            # create user
            user = DWUser.objects.create_user(username,
                                              email,
                                              password)

            # store
            user.save()

            # success: 200 OK
            return Response({"Successfully created account."},
                            status=status.HTTP_200_OK)

        except Exception as e:
            # error: 400 BAD REQUEST
            return Response(
                {e.__class__.__name__: str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


class AuthenticateUser(APIView):
    def post(self, request):
        try:
            # values
            username = request.data['username']
            password = request.data['password']

            # authenticate
            user = authenticate(username=username,
                                password=password)

            # success: 200 OK
            if user is not None:
                return Response({"Successfully authenticated the credentials."},
                                status=status.HTTP_200_OK)
            else:
                return Response({"Authentication failed."},
                                status=status.HTTP_401_UNAUTHORIZED)

        except Exception as e:
            # error: 400 BAD REQUEST
            return Response(
                {e.__class__.__name__: str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


class UpdatePassword(APIView):
    def patch(self, request):
        try:
            # values
            username = request.data['username']
            new_password = request.data['password']

            user = DWUser.objects.get(username=username)

            # change password
            user.set_password(new_password)

            user.save()

            # success: 200 OK
            return Response({"Successfully changed password."},
                            status=status.HTTP_200_OK)

        except Exception as e:
            # error: 400 BAD REQUEST
            return Response(
                {e.__class__.__name__: str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

class GetUserInfo(APIView):
    def post(self, request):
        try:
            # values
            username = request.data['username']

            # find row with the username passed
            user = DWUser.objects.get(username=username)

            # get user info
            info = {
                "email": user.email
                }

            # success: 200 OK
            return Response(info,
                            status=status.HTTP_200_OK)

        except Exception as e:
            # error: 400 BAD REQUEST
            return Response(
                {e.__class__.__name__: str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


class UpdateUsernameAndEmail(APIView):
    def patch(self, request):
        try:
            # values
            old_username = request.data['old_username']
            new_username = request.data['new_username']
            email = request.data['email']

            # get user
            user = DWUser.objects.get(username=old_username)

            # store new values
            user.username = new_username
            user.email = email
            user.save()

            # success: 200 OK
            return Response({"Successfully updated username and email."},
                            status=status.HTTP_200_OK)

        except Exception as e:
            # error: 400 BAD REQUEST
            return Response(
                {e.__class__.__name__: str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


class DeleteUser(APIView):

    def delete(self, request):
        try:
            # values
            username = request.data['username']

            # get user
            user = DWUser.objects.get(username=username)
            user.delete()

            # success: 200 OK
            return Response(
                {"The user is deleted."},
                status=status.HTTP_200_OK
            )
        except DWUser.DoesNotExist:
            # success: 200 OK
            return Response(
                {"The user does not exist."},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            # error: 400 BAD REQUEST
            return Response(
                {e.__class__.__name__: str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


class ImageRecognitionApiView(APIView):

    def post(self, request):
        # Validation (checks that an image was uploaded)
        s = ImageRecognitionSerializer(data=request.data)

        # This will return a 400 Bad Request if no image was uploaded. Method returns here if is_valid=False.
        s.is_valid(raise_exception=True)

        # Instantiate class used for image prediction
        p = Predictor()

        # Returns HTTP Success code 200 and ML prediction in the form of `"prediction":"glass"`
        return Response({"prediction": p.evaluate_image(io.BytesIO(base64.b64decode(s.validated_data.get('image'))))}, status=status.HTTP_200_OK)


class ImageSubmissionApiView(APIView):

    def post(self, request):
        try:
            # values
            category = request.data['category']
            image = request.data['image']

            # get the category selected
            category_selected = Category.objects.get(name=category)

            # store in database
            # TODO: modify to match Image_Submission model (in models.py)
            # Image_Submission(
            #     name=category_selected,
            #     accepted_image=image
            # ).save()

            # success: 200 OK
            return Response(
                {"category": category,
                 "image": image.name},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            # error: 400 BAD REQUEST
            return Response(
                {e.__class__.__name__: str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


class UpdateApiView(APIView):

    def get(self, request):
        try:
            # values
            data = Category.objects.values_list('name')
            unravelled_list = [item for sublist in data for item in sublist]

        # success: 200 OK
            return Response({"categories": unravelled_list}, status=status.HTTP_200_OK)

        except Exception:
            # error: 404 NOT FOUND
            return Response({"Not Found"},
                            status=status.HTTP_404_NOT_FOUND)
