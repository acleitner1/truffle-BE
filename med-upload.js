const express = require("express")
const path = require('path')
const app = express()
const port = 3000
const fs = require('fs')

var multer = require('multer'); 
var http = require('http')

app.set("views", path.join("./","views"))
app.set("view engine", "ejs")

var maxSize = 1 * 1000 * 1000; 

var storeFile = multer.diskStorage({
	destination: function (req, file, cb) {
		
		cb(null, "uploads")
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname+ "-" + Date.now() + ".txt")
	}
})

var upload = multer({
	storage: storeFile, 
	limits: {fileSize: maxSize},
}).single("medBill"); 


app.get("/",function(req, res){
	res.render("Signup"); 
})

app.get("/getMedicalBill", function(req, res,next) {
	var fileList = []
        fs.readdir("./uploads", (error, files) => {
                if (error) console.log(error)
                files.forEach(function(file) {
			fileList.push(file)
			console.log(file)
		})
		res.send(fileList)
        })
	console.log(fileList)
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


