from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Components.models import Category, Trash_Accepted
from Components.serializer import ImageRecognitionSerializer
from rest_framework.parsers import MultiPartParser
from Components.machine_learning.predictor import Predictor


class ImageRecognitionApiView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        # Validation (checks that an image was uploaded)
        s = ImageRecognitionSerializer(data=request.data)

        # This will return a 400 Bad Request if no image was uploaded. Method returns here if is_valid=False.
        s.is_valid(raise_exception=True)

        # Instantiate class used for image prediction
        p = Predictor()

        # Returns HTTP Success code 200 and ML prediction in the form of `"prediction":"glass"`
        return Response({"prediction": p.evaluate_image(request.data['image'])}, status=status.HTTP_200_OK)


class ImageSubmissionApiView(APIView):

    def post(self, request):
        try:
            # values
            category = request.data['category']
            image = request.data['image']

            # get the category selected
            category_selected = Category.objects.get(name=category)

            # store in database
            Trash_Accepted(
                name=category_selected,
                accepted_image=image
            ).save()

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
