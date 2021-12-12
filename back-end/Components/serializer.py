from rest_framework import serializers


class ImageRecognitionSerializer(serializers.Serializer):
    image = serializers.CharField()
