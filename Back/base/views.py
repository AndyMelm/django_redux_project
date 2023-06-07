from django.db import IntegrityError
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Journal
from rest_framework.views import APIView
from rest_framework import status
from .serializer import JournalSerializer
from django.contrib.auth.models import User



# @api_view(['GET'])
# @permission_classes([IsAuthenticated])


@api_view(['GET'])
def index(req):
    return Response("Welcome to Home Page")



@api_view(['POST'])
def register(request):
    try:
        user = User.objects.create_user(
            username=request.data['username'],
            email=request.data['email'],
            password=request.data['password']
        )
        user.is_active = True
        user.is_staff = False
        user.save()
        return Response({'message': 'Registration successful. You can now login.'})
    except IntegrityError:
        return Response({'message': 'Username is already taken. Please choose a different username.'}, status=400)
    except Exception as e:
        return Response({'message': 'An error occurred during registration.', 'error': str(e)}, status=500)


# def upload_image(request):
#     file = request.FILES.get('image')
#     if file:
#         # Handle the file upload logic here (e.g., saving the file to the appropriate location)
#         return Response({'message': 'Image uploaded successfully.'}, status=status.HTTP_200_OK)
#     else:
#         return Response({'message': 'No image file provided.'}, status=status.HTTP_400_BAD_REQUEST)


# @permission_classes([IsAuthenticated])
class JournalView(APIView):
    def get(self, request):
        my_model = Journal.objects.all()
        serializer = JournalSerializer(my_model, many=True)
        return Response(serializer.data)

    # def get(self, request):
    #     my_model = Journal.objects.filter(user_id=request.user.id)  # Filter journals by the current user's ID
    #     print(request.user)
    #     print(request.user.id)
    #     serializer = JournalSerializer(my_model, many=True)
    #     return Response(serializer.data)

    def post(self, request):
        serializer = JournalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        my_model = Journal.objects.get(pk=pk)
        serializer = JournalSerializer(my_model, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        my_model = Journal.objects.get(pk=pk)
        my_model.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # @staticmethod
    # def upload_image(request):
    #     file = request.FILES.get('image')
    #     if file:
    #         # Handle the file upload logic here (e.g., saving the file to the appropriate location)
    #         return Response({'message': 'Image uploaded successfully.'}, status=status.HTTP_200_OK)
    #     else:
    #         return Response({'message': 'No image file provided.'}, status=status.HTTP_400_BAD_REQUEST)

