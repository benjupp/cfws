

Crossfit Westside Website &copy; 2014 Mackenzie Kieran & Garret Schauteet

- unzip the site into project folder
- run ```npm install``` from main folder (contains package.json)
- make changes to files in /local. To test run ```node app```.
- to build: run ```gulp build``` from local. 
- to deploy after building, enter /app and run:
```
git add -A
git commit 
git push heroku master
```
*note: these git commands are not mandatory, ensure all changes have been added and comitted before deploying.
