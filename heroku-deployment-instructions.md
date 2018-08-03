heroku create fitness_app
git status (Nothing to commit, working tree clean)
git remote -v (To check that remote is there. Should be automatic)
git push heroku master
heroku open (Launches App in browser)
Create "Procfile" in "fitness_app" folder
Within it do:
web: gunicorn producthunt.wsgi
