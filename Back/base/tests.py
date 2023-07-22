from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from .models import Journal


class RegisterViewTestCase(TestCase):
    def test_successful_registration(self):
        client = APIClient()
        data = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "testpassword",
        }
        response = client.post("/register/", data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(User.objects.count(), 1)

    def test_registration_with_existing_email(self):
        client = APIClient()
        data = {
            "username": "existinguser",
            "email": "test@example.com",
            "password": "testpassword",
        }
        User.objects.create_user(
            username="existinguser", email="test@example.com", password="testpassword"
        )
        response = client.post("/register/", data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_registration_with_invalid_email(self):
        client = APIClient()
        data = {
            "username": "invaliduser",
            "email": "invalidemail",  
            "password": "testpassword",
        }
        response = client.post("/register/", data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class JournalModelTestCase(TestCase):
    def setUp(self):
        user = User.objects.create_user(
            username="testuser", email="test@example.com", password="testpassword"
        )
        Journal.objects.create(
            user=user, strategy="Test Strategy", instrument="Test Instrument"
        )

    def test_journal_model_str(self):
        journal = Journal.objects.get(strategy="Test Strategy")
        self.assertEqual(str(journal), "Test Strategy")


class JournalViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="testuser", email="test@example.com", password="testpassword"
        )
        self.client.force_authenticate(user=self.user)

    def test_journal_list_authenticated(self):
        response = self.client.get("/journal/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_journal_list_unauthenticated(self):
        self.client.logout()
        response = self.client.get("/journal/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_journal_detail_authenticated(self):
        journal = Journal.objects.create(
            user=self.user, strategy="Test Strategy", instrument="Test Instrument"
        )
        response = self.client.get(f"/journal/{journal.pk}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_journal_detail_unauthenticated(self):
        self.client.logout()
        journal = Journal.objects.create(
            user=self.user, strategy="Test Strategy", instrument="Test Instrument"
        )
        response = self.client.get(f"/journal/{journal.pk}/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
