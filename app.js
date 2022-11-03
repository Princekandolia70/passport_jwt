require('dotenv').config();
//import database connection file here 
require('./connection')
const express = require("express")
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
const yup = require('yup')
const logger = require('./logger')

const PORT = process.env.PORT || 8000

listenServer();

//function to listen to server
function listenServer() {
	app.listen(PORT, () => {
		logger.info((`server is listenining on port ${PORT}`));
	});
}

const schema = yup.object({
	body: yup.object({
		title: yup.string().required(),
		content: yup.string().required(),
		blogImage: yup.string().optional()
	})
});

const validation = (schema) => async (req, res, next) => {
	try {
		await schema.validate({
			body: req.body,
			query: req.query,
			params: req.params,
		});
		return next();
	} catch (err) {
		return res.status(500).json({ type: err.name, message: err.message });
	}
};

var blog = require('./controller/blog');

// routes of api

app.get("/getblogs", blog.getBlogs)

app.post("/addblogs", validation(schema), blog.addBlogs)

app.put("/updateblogs/:id", blog.updateBlogs)

app.delete("/deleteblogs/:id", blog.deleteBlogs)
