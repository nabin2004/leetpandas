from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.serializers import ModelSerializer, ValidationError
from data.serializers import StatsSerializer, LeaderboardUserSerializer  
from data.models import Stats

class CurrentUserView(APIView):
    """
    get:
    Return the currently authenticated user's username and email.

    This endpoint requires a valid JWT token in the Authorization header.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "username": user.username,
            "email": user.email,
        })
    

class RegisterSerializer(ModelSerializer):
    """
    Serializer for registering a new user.

    Validates that the email is unique.
    """
    class Meta:
        model = User
        fields = ("username", "email", "password")

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise ValidationError("Email already exists.")
        return value

class RegisterView(APIView):
    """
    post:
    Register a new user account.

    Accepts username, email, and password. Validates unique email.
    On success, returns a 201 status with a success message.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user  # Get the current logged-in user
        try:
            stats = Stats.objects.get(user=user)  # Get the stats for the current user
            serializer = StatsSerializer(stats)  # Serialize the stats data
            return Response(serializer.data, status=200)
        except Stats.DoesNotExist:
            return Response({"detail": "Stats not found for this user."}, status=404)
        
class LeaderboardView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        stats = Stats.objects.select_related('user').order_by('-questions_solved')[:200]
        serializer = LeaderboardUserSerializer(stats, many=True)
        return Response(serializer.data)