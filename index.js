import express from "express";
import exphbs from "express-handlebars";
import session from "cookie-session";
import bodyParser from "body-parser";
import greetingRouters from "./routes/router.js";
import flash from "express-flash";
import dataFactory from "./data-factory.js";
import displayFactory from "./display-factory.js";
import pgPromise from "pg-promise";

const pgp = pgPromise({});

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:sap123@localhost:5432/my_regies';

const config = { 
	connectionString
}

if (process.env.NODE_ENV == 'production') {
	config.ssl = { 
		rejectUnauthorized : false
	}
}

let app = express();

const db = pgp(config);
const regiesDB = dataFactory(db);
const myRegies = displayFactory();

let regiesRouter = greetingRouters(regiesDB,myRegies);

//config express as middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//css public in use
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

// initialise session middleware - flash-express depends on it
app.use(session({
    secret: 'flash the mesaage',
    resave: false,
    saveUninitialized: true
    
    
}));

// initialise the flash middleware
app.use(flash());




app.use(express.static('public'));

app.get('/', regiesRouter.defaultRoute);
app.post('/action', regiesRouter.homePage);
app.post('/reg_numbers',regiesRouter.postRegies);
app.get('/reg_numbers', regiesRouter.fetchRegies);
app.get('/reset', regiesRouter.resetData);
app.get('/showAll', regiesRouter.showAll)




let PORT = process.env.PORT || 3007;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});