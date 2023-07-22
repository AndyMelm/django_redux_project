from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Journal
from rest_framework.views import APIView
from rest_framework import status
from .serializer import JournalSerializer
from django.contrib.auth.models import User
from django.core.validators import validate_email
from django.core.exceptions import ValidationError


@api_view(["GET"])
def index(req):
    return Response("Welcome to Home Page")


@api_view(["POST"])
def register(request):
    try:
        email = request.data["email"]
        username = request.data["username"]

        validate_email(email)  # Perform email validation

        # Check if the email already exists
        if User.objects.filter(email=email).exists():
            return Response(
                {
                    "message": "Email is already in use. Please choose a different email."
                },
                status=400,
            )

        # Check if the username already exists
        if User.objects.filter(username=username).exists():
            return Response(
                {
                    "message": "Username is already taken. Please choose a different username."
                },
                status=400,
            )

        # Create the new user
        user = User.objects.create_user(
            username=username, email=email, password=request.data["password"]
        )
        user.is_active = True
        user.is_staff = False
        user.save()

        return Response({"message": "Registration successful. You can now login."})
    except ValidationError:
        return Response({"message": "Invalid email address."}, status=400)
    except Exception as e:
        return Response(
            {"message": "An error occurred during registration.", "error": str(e)},
            status=500,
        )


class JournalView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        user = request.user
        if pk is not None:
            if user.id != int(pk):
                return Response(
                    {"detail": "You are not authorized to access this resource."},
                    status=status.HTTP_403_FORBIDDEN,
                )
            my_model = Journal.objects.filter(user=user)
            serializer = JournalSerializer(my_model, many=True)
        else:
            my_model = Journal.objects.filter(user=user)
            serializer = JournalSerializer(my_model, many=True)
        return Response(serializer.data)

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


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_id(request):
    user_id = request.user.id
    return Response({"user_id": user_id})
