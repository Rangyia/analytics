# :zap: Company Analytics

* PostgreSQL Express React Node (PERN) full-stack app, integrates React frontend with Node.js backend that is deployed to Heroku.
*** Note: to open web links in a new window use: _ctrl+click on link_ /  _cmd+click on link_**

## :books: General info

### Backend

* PostgreSQL needs to be installed and running - I started it from my Windows 10 PostgreSQL 13 dropdown option 'SQL shell (psql)'
* Postman used to test the backend before frontend was available

### Frontend

* React frontend includes a display of analytics for a given company
* [JavaScript XML (JSX)](https://reactjs.org/docs/introducing-jsx.html) used to write HTML elements in Javascript
* [React Fragments](https://reactjs.org/docs/fragments.html) used to show table of analytics as a row with columns in the DDM

## :signal_strength: Technologies - Backend

* [PostgreSQL v13](https://www.postgresql.org/)
* [PostgreSQL Installer](https://www.postgresqltutorial.com/install-postgresql/)
* [Express.js middleware v4](https://expressjs.com/)
* [Node.js v15](https://nodejs.org/es/)
* [Nodemon](https://www.npmjs.com/package/nodemon) npm module so backend server will automatically restart after code changes
* [Postman API](https://www.postman.com/downloads/) to simulate a frontend

## :signal_strength: Technologies - Frontend

* [React framework v17](https://reactjs.org/)
* [Bootstrap v4](https://getbootstrap.com/) component library ==> Need to get

## :floppy_disk: Dev Setup - Backend

* Install dependencies using `npm i`
* Install [nodemon](https://www.npmjs.com/package/nodemon) globally if you don't already have it
* Install [PostgreSQL](https://www.postgresql.org/) & run it (requires the password you created during installation)
* Add database access credentials to `db.js` - recommend installing [npm dotenv](https://www.npmjs.com/package/dotenv) & using .env to hide credentials if commiting to Github
* Postgresql shell commands: `\l` list all databases. `\c` database1 connect to database1. `\dt` inspect tables. `\d+` inspect table & show relation information. `\q` to quit
* From root run `nodemon server` for a dev server
* `http://localhost:5000/` can be accessed for CRUD operations such as POST, GET, PUT, DELETE etc. using Postman

## :floppy_disk: Dev Setup - Frontend

* Change to `client` directory
* Install dependencies using `npm i`.
* run `npm start`. Frontend will open at `http://localhost:3000/`

## :floppy_disk: Push to GitHub

* Questions should contact Jess on how to pull and push

## :cool: Features - Backend

* All data stored in PostgreSQL database that can also be viewed and changed from the PostgreSQL shell (psql)

## :cool: Features - Frontend

* React app created from the command prompt using [Create React App](https://reactjs.org/docs/create-a-new-react-app.html)
* Uses the [Bootstrap basic table](https://www.w3schools.com/bootstrap/bootstrap_tables.asp) to list analytics
* [Bootstrap 4 Modal](https://www.w3schools.com/bootstrap4/bootstrap_modal.asp) dialog box

## :clap: Inspiration/General Tools

* [The Stoic Programmers, PERN Stack Course - PostgreSQL, Express, React, and Node](https://www.youtube.com/watch?v=ldYcgPKEZC8&t=116s)
* [React documentation](https://reactjs.org/docs/getting-started.html)
* [Enable Emmet support for JSX in Visual Studio Code | React](https://medium.com/@eshwaren/enable-emmet-support-for-jsx-in-visual-studio-code-react-f1f5dfe8809c)
* [js-beautify for VS Code](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify)
