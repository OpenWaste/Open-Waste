import base64
import io
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Components.models import Category, CategoryInstructions, ImageSubmission, DWUser
from Components.serializer import ImageRecognitionSerializer
from rest_framework.parsers import MultiPartParser
from Components.machine_learning.predictor import Predictor
from django.contrib.auth import authenticate
from django.core.mail import send_mail


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
            email = request.data['email']
            
            # get the category selected
            category_selected = Category.objects.get(name=category)
            user = DWUser.objects.get(email=email)

            ImageSubmission(
                category=category_selected,
                submission_Image=image,
                submitted_by=user
            ).save()

            # success: 200 OK
            return Response(
                {"Successfully submitted"},
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
            category = Category.objects.values_list('name')
            category_list = [item for sublist in category for item in sublist]
            category_instructions = CategoryInstructions.objects.values_list(
                'category', 'instructions')

            returned_category_instructions = []
            for ci in category_instructions:
                category = Category.objects.get(pk=ci[0])
                returned_category_instructions.append({category.name, ci[1]})

            # success: 200 OK
            return Response({"categories": category_list, "category_instructions": returned_category_instructions}, status=status.HTTP_200_OK)

        except Exception as e:
            # error: 404 NOT FOUND
            return Response({e.__class__.__name__: str(e)},
                            status=status.HTTP_404_NOT_FOUND)

class ResetPassword(APIView):

    def post(self, request):
        try:
            # requested email
            email = request.data['email']

            # sends an email to the request email (subject, message, from, to)
            send_mail(
                'Password reset',
                'You requested a password reset. Here is your passcode: 123456',
                'DigiWaste Concordia',
                [email],
                fail_silently=False,
                )
        # success: 200 OK
            return Response(
                        {"The email has been sent"},
                        status=status.HTTP_200_OK
                        )
        except Exception as e:
            # error: 400 BAD REQUEST
            return Response(
                {e.__class__.__name__: str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )