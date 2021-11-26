from rest_framework import serializers


class ImageRecognitionSerializer(serializers.Serializer):
    image = serializers.ImageField(allow_empty_file=False)
