#Phonebook app#

Link to online application : https://boiling-sands-07334.herokuapp.com/api/persons 

Commands: 
```
heroku open
```

```
heroku logs -t
```

Start debugging
```
node --inspect index.js
```

```
npm run dev -> runs nodemon
```

This doesn't work:
    "build:ui": "rm -rf build && cd ../FullStackOpen/part2/phonebook && npm run build --prod && xcopy /E build ..\\..\\..\\Phonebook",
    "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push && npm run deploy",


Create production build
```
npm run build:ui
```
Release to heroku
```
npm run deploy
```
Create production build and release to heroku
```
npm run deploy:full
```

Showing heroku logs
```
npm run logs:prod
```