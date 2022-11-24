from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from . import views

app_name = 'accounts'
urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path('signup/', include('dj_rest_auth.registration.urls')),
    # path('signout/', views.signout),
    path('profile/<str:nickname>/', views.profile),
    path('profile/<str:nickname>/update/', views.profile_image_change),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 

