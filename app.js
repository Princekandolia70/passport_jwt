require('dotenv').config();
//import database connection file here 
require('./connection')
const express = require("express")
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
const logger = require('./logger')
const passport = require('./passportConfig');
const session = require('express-session')
const middleware = require('./middleware')
const schema = require('./schema/schema')

app.use(session({
	resave: false,
	saveUninitialized: true,
	secret: 'abcdefedsdssdsd'
}));

app.use(passport.initialize());

const PORT = process.env.PORT || 8000

listenServer();

//function to listen to server
function listenServer() {
	app.listen(PORT, () => {
		logger.info((`server is listenining on port ${PORT}`));
	});
}

var blog = require('./controller/blog');

// route for google authentication
app.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
	"/auth/google/callback",
	passport.authenticate('google', { session: false, scope: ['profile', 'email'] }),
	(req, res) => {
		res.redirect("/profile/");
	}
);
app.get("/profile", (req, res) => {
	res.send("Welcome , user login successfully");
});


// route for api
app.get("/getblogs", middleware.isSignedIn, blog.getBlogs)

app.post("/addblogs", middleware.isSignedIn, blog.addBlogs)

app.put("/updateblogs/:id", middleware.isSignedIn, middleware.validation(schema.updateSchema), blog.updateBlogs)

app.delete("/deleteblogs/:id", middleware.isSignedIn, middleware.validation(schema.deleteSchema), blog.deleteBlogs)
