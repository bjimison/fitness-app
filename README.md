# Suite Health

## Introductions

> This app was created as a resource for ourselves and anybody else pursuing a healthy lifestyle. We wanted to create a centralized space where we could quickly search up exercises and food macros as well as save our own for future reference. You can view this app live on heroku [here]().

## Technologies Used

* HTML
* CSS
* JavaScript
* jQuery
* Python
* Django
* PostgreSQL

## Existing Features

* User account creation/storage
* User authentication on signup
* Options to search 3rd party databases for food macros and exercises
* Allows users to save any result to a user specific dashboard
* Allows users to create custom workout/circuits and custom meals and save them for future reference.
* Two scrollable feeds on the homepage featuring custom circuits and meals made by other users.
* ChatBot that user can interact with that helps navigate the user around the app.

## Planned Features

> We believe that one of the major aspects of maintaining a healthy lifestyle is doing it with your friends. We plan to incorporate a social aspect to this app that allows users to connect with and friend each other. We would also like to incorporate a forum system to allow users to post and interact with the Suite Health community.


## Installation and Deployment

> To run this app on your local system, fork or clone the repository [here](https://github.com/gabe-ng/fitness-app). On your local system, navigate to the project directory within your terminal and set up a virtual environment as well as create a postgreSQL database named 'fitness_app'. Then change directories into the fitness_app folder containing your manage.py and install the necessary requirements located in the requirements.txt using `pip install`. After your environment is activated, run `python3 manage.py migrate` to migrate all the necessary models. Now run `python3 manage.py runserver` and the app should be accessible on localhost:8000 in your browser.

## Wireframes and User stories

![alt text](/wireframes/wireframe_landing.jpg)

![alt text](/wireframes/wireframe_home_page.jpg)

![alt text](/wireframes/wireframe_profile.jpg)

![alt text](/wireframes/ERD_tables.jpg)

![alt text](/wireframes/ERD_diagram.jpg)

## Contributors

* [Brady](https://github.com/bjimison)
* [Gabe](https://github.com/gabe-ng)
* [Riley](https://github.com/RP2)
* [Tevin](https://github.com/t10chap)

## Acknowledgements

* [Edamam](https://www.edamam.com/) - Food Database API
* [Workout Manager](https://wger.de/en/software/features) - Exercise Database API
* [Dialogflow](https://dialogflow.com/) - ChatBot API

> Also a special thanks to [Isha Arora](https://github.com/ishaarora01) and [Kenny Bushman](https://github.com/kbbushman) for all their guidance/assistance in creating this app.
