const express = require("express")
const path = require('path')
const app = express()
const port = 3000

var multer = require('multer'); 
var http = require('http')

app.set("views", path.join("./","views"))
app.set("view engine", "ejs")

var storeFile = multer.diskStorage({
	destination: function (req, file, cb) {
		
		cb(null, "uploads")
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname+ "-" + ".txt")
	}
})

var upload = multer({
	storage: storeFile, 
}).single("medBill"); 

app.get("/",function(req, res){
	res.render("Signup"); 
})

app.post("/uploadMedicalBill", function (req, res, next) {
	upload(req, res, function(err) {
		if(err) {
			res.send(err)
		}
		else {
			res.send("Success: Medical Bill Uploaded")
		}
	})
})

app.listen(3000, function(error) {
	if(error) throw error
		console.log("Server created on port 3000")
})

