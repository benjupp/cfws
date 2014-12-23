

Crossfit Westside Website &copy; 2014 Mackenzie Kieran & Garret Schauteet

- unzip the site into project folder
- run ```npm install``` from main folder (contains package.json)
- make changes to files in /local. To test run ```node app```.
- to build: run ```gulp build``` from local. 
- to deploy after building, enter /app and commit the new build:
```
git add -A
git commit 
```
*note: these git commands are not mandatory, ensure all changes have been added and comitted before deploying.

To make the new build live run:
```git push heroku master``` from /app
