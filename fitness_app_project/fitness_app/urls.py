from django.urls import path
from . import views

urlpatterns = [
    ############## LOG IN/LOG OUT###############
    path('', views.landing, name="landing"),
    path('about/', views.about, name="about"),
    path('login/', views.login_view, name="login"),
    path('signup/', views.signup_view, name="signup"),
    path('logout/', views.logout_view, name="logout"),
    ############# HOMEPAGE ##############
    path('homepage/', views.homepage, name="homepage"),
    ############# PROFILE ###############
    path('user/<username>/', views.dashboard, name='dashboard'),
    path('user/<username>/deletemeal/<int:id>', views.delete_meal, name='delete_meal'),
    path('user/<username>/deletecircuit/<int:id>', views.delete_circuit, name='delete_circuit'),
    path('user/<username>/deletefood/<int:id>', views.delete_food, name='delete_food'),
    path('user/<username>/deleteworkout/<int:id>', views.delete_workout, name='delete_workout'),
    ############# FOOD API #################
    path('api/food/find/<str:food>', views.find_food, name='find_food'),
    path('api/food/save/<username>', views.save_food, name='save_food'),
    path('meals/', views.mealForm, name="meals"),
    ############# WORKOUT API #################
    path('api/workout/find/<str:muscle>', views.find_workout, name='find_workout'),
    path('api/workout/save/<username>', views.save_workout, name='save_workout'),
    path('circuits/', views.circuitForm, name="circuits"),
    ############ CUSTOM MEALS AND CIRCUITS API ###################
    path('api/custommeals/', views.custom_meals, name="custommeals"),
    path('api/meal/save/<username>', views.save_meal, name="save_meal"),
    path('api/customcircuits/', views.custom_circuits, name="customcircuit"),
    path('api/circuit/save/<username>', views.save_circuit, name="save_circuit"),

]
