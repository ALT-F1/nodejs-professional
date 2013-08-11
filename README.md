Sample code heavily based on the Professional Node JS book and the Secrets of the JavaScript Ninja book
=======================================================================================================

What is this?
=============

+ useful to learn [NodeJS] and how to write simple Create/Retrieve/Update/Delete applications
+ web apps using [NodeJS], [Jade], [Express], [Async] and [MongoDB]
+ heavily based on the [Professional Node JS book] and a bit of help from the [Secrets of the JavaScript Ninja book]

Who are we?
===========
+ We at [ALT-F1] are studying those [JavaScript] technologies. We thought it was a simple way to 

How much time?
==============
+ We needed 5 working days to develop, understand, fine tune the code you have in front of you

Which tools have we used to code?
=================================
+ in a first stage we have used [Sublime Text 2]
+ then we moved to [WebStorm IDE] at the very last stage due to our inability to debug [Jade] scripts

Early difficulties?
===================
+ [Jade] scripts were very hard to understand
+ the debug of [Jade] is painful i.e. we lose too much time correcting tabulations vs. spaces !!!!
+ The syntax of [JavaScript] functions is quite unusual, hopefully the first chapters of [Secrets of the JavaScript Ninja book] are goldmine to understand them
+ the code of the [Professional Node JS book] doesn't fit today' versions of the tools which obliged us to debug the code
+ We didn't find a decent debugger (read visual) step by step of NodeJS scripts
+ Understand how [Grunt] works, but we have deleted this part of scripts for the moment

The future?
===========
+ Use [Grunt], [Jasmine], [Istanbul], [Karma], [Mocha] and many others to operate the code and run a standard software-engineered' company

How to install?
===============

Prerequisite
------------
+ install [NodeJS], it should install [NPM] too

Check versions of your tools
----------------------------
+ on my computer (but other versions might work too ?!?
	+ ```npm -v``` - use "1.3.5"
	+ ```node -v``` - use "v0.10.15"

chap_20-HTTP_Middleware
-----------------------
+ run any ```node <name file>.js``` application
+ open the web browser on the right port, read the command line. e.g. ```http://localhost:<port>```

chap_21-Express
---------------

+ ```npm install```
+ ```node app```
+ open the web browser on the right port, read the command line. e.g. ```http://localhost:<port>```

chap_25-MongoDB
---------------

+ ```npm install```
+ update ```app.js``file 
    + update the line accordingly : ```var dbURL = 'mongodb://<login>:<password>@dharma.mongohq.com:<port>/<database name>';```
+ ```node app```
+ open the web browser on the right port, read the command line. e.g. ```http://localhost:<port>```

JavaScriptNinja
---------------
+ based on the [Secrets of the JavaScript Ninja book]
+ Easy way to test assertions
+ standalone html pages including javascripts
+ open the web pages ```EqualityinJS.html```
+ open the web pages ```HowFunctionsAreDeclared.html```

Event-driven architecture
-------------------------
In event-driven programming you start by defining the code that will be executed when an event occurs, then put that code inside a function, and finally pass that function as an argument to be called later. See chapter 2 of the [Professional Node JS book]
...
This shows that by using the closure pattern, you can have the best of both worlds: You can do
event-driven programming without having to maintain the state by passing it around to functions.
A JavaScript closure keeps the state for you.

Functional requirements
-----------------------

01. you can login, logout
02. you can delete a user from the database 
03. you can create a user

Technical requirements
----------------------

### Web application

+ Strict Model - View - Controller separation

+ Programming languages
    + [Javascript] v1.8 (I guess)

+ Frameworks
    + [MongoDB]
        + [MongoHQ], a MongoDB as a Service 
    + [Express] framework 
    + [NodeJS] v0.10.2
    + [NPM] Node Package Manager

CHANGELOG
=========

v2013-08-11

+ update the name of the directories
+ clean credentials
+ check package.json are correct
+ improve ergonomics of the application (e.g. display credentials available, improve error texts ...)
+ upload v1 on github

v2013-08-10 early morning

+ the code is up and running
+ the search articles functionality should be called like this '''http://localhost:3000/articles/search?q=<query>
    + todo: add a search box inside the header

v2103-08-09 

+ Starts [Professional Node JS book] chapter 25: Connecting to [MongoDB] Using [Mongoose]
+ create "03.Express_app mongodb" app
    + some requirements
        + use of [MongoDB], [Mongoose]
+ add article data model and functionalities - see page 341 "Referencing Other Documents Using DB Refs"

v2013-08-08 end of Ramadan

+ Successfully end the chapter 21 of the [Professional Node JS book]: Making a Web Application

v2013-08-07

+ work on chapter 21 of the [Professional Node JS book]: Making a Web Application
Using [Express]
    + many issues appear as 
        + [Professional Node JS book] is incorrect and documentation of [Jade] is very poor
        + [Professional Node JS book] is based on [Express] 2x and I use [Express] 3x
    + some requirements
        + in-memory object like users.json
        + routes management
        + use of [Jade], [Express]
        + functional requirements
            + user list
            + CRUD users
            + login
v2013-08-06

+ Complete chapter 20 of the [Professional Node JS book]: Building and Using HTTP Middleware [Connect]
+ starts chapter 21 of the [Professional Node JS book]: Making a Web Application Using [Express]
+ create "02.Express_app" app
+ Use of [Jade] node template engine

v2013-08-05

+ add test case using [Karma]
+ find/learn/implement many [Grunt] components
      

v2013-08-04

+ create "01.HTTP_Middleware" app
+ created hello_world_app' node displaying a simple "hello world" 
+ Based on [Professional Node JS book] Part V "Building web application"
+ created reply_text module
+ create a middleware component that introduces a header into the response header section


---------------------------------------
[ALT-F1]: http://www.alt-f1.be
[AngularJS]: http://angularjs.org/
[Async]: https://npmjs.org/package/async
[Blanket]: http://blanketjs.org/
[Connect]: http://www.senchalabs.org/connect/
[Express]: http://expressjs.com/
[Google Compute Engine API]: https://developers.google.com/compute/docs/api/libraries
[Google Compute Engine]: https://cloud.google.com/products/compute-engine
[Grunt-cli]: http://gruntjs.com/getting-started
[Grunt-init]: http://gruntjs.com/project-scaffolding
[Grunt]: http://gruntjs.com/
[Istanbul]: https://github.com/gotwarlost/istanbul
[Jade]: http://jade-lang.com/
[Jasmine]: http://pivotal.github.io/jasmine/
[Javascript]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[Karma]: http://karma-runner.github.io/
[log4js]: https://github.com/nomiddlename/log4js-node
[Mocha]: http://visionmedia.github.io/mocha/
[MongoDB]: http://www.mongodb.org/
[MongoHQ]: https://www.mongohq.com
[MongoLab]: https://mongolab.com
[Mongoose]: http://mongoosejs.com/
[NodeJS]: http://www.nodejs.org
[NPM]: http://npmjs.org/
[OpenShift]: http://www.openshift.com
[Professional Node JS book]: http://astore.amazon.fr/i14ynet-21/detail/1118185463
[Python]: http://www.python.org
[Request]: https://npmjs.org/package/request
[Secrets of the JavaScript Ninja book]: http://astore.amazon.fr/i14ynet-21/detail/193398869X
[Should]: https://github.com/visionmedia/should.js
[Ubuntu]: http://www.ubuntu.com/