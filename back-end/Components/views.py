from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Components.serializer import ImageRecognitionSerializer
from rest_framework.parsers import MultiPartParser
from Components.machine_learning.predictor import Predictor


class ImageRecognitionApiView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        s = ImageRecognitionSerializer(data=request.data) # Validation (checks that an image was uploaded)

        s.is_valid(raise_exception=True) # This will return a 400 Bad Request if no image was uploaded. Method returns here if is_valid=False.

        # Instantiate class used for image prediction
        p = Predictor()

        # Returns HTTP Success code 200 and ML prediction in the form of `"prediction":"glass"`
        return Response({"prediction": p.evaluate_image(request.data['image'])}, status=status.HTTP_200_OK)
