from django.urls import path
from . import views
urlpatterns = [
        path('repo-sec', views.repo_sec, name='repo-sec'),
        path('repo-gen', views.repo_gen, name='repo-gen'),
        path('description', views.description, name='description'),
        path('genuineness_check', views.genuineness_check, name='genuineness_check'),
        ]
