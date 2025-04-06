"""
URL configuration for leetpandas project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView, TokenVerifyView)
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from data.views import CurrentUserView
from data.views import RegisterView

schema_view = get_schema_view(
   openapi.Info(
      title="LeetPandas API",
      default_version='v1',
      description="API documentation for the LeetPandas platform",
      terms_of_service="",
      contact=openapi.Contact(email="nabinoli2004@gmail.com"),
      license=openapi.License(name=""),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),  # Anyone can access the docs
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    path('api/register/', RegisterView.as_view(), name='register'),

    #docs
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='swagger-ui'),  # Swagger UI endpoint
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='redoc-ui'),  # ReDoc UI (optional)
    path('api/user/', CurrentUserView.as_view(), name='current-user'),
]