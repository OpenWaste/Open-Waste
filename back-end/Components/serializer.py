import base64

from rest_framework import serializers


class ImageRecognitionSerializer(serializers.Serializer):
    image = serializers.CharField()

    def validate_image(self, image: str):

        # All JPEG images in base64 format will start with this string
        if image.startswith("/9j/4AAQSkZJRgABA"):
            try:
                # Although an image can start with the correct prefix, it still needs to be a valid base64 string.
                # This try-except block will catch invalid base64 strings
                base64.b64decode(image)
                return image
            except:
                pass

        raise serializers.ValidationError("Invalid base64 jpeg image provided")

