var express = require('express');

var app = express();
const path = require('path');
const assert = require('assert');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

var apidb;
var db;

const MongoClient = require('mongodb').MongoClient;
const DB_url = "mongodb://loststars:123456@ds119129.mlab.com:19129/loststar"

const userCollName = 'Users';


const publicUrl = path.join(__dirname, 'public/');

app.use(cookieParser());
app.use(express.static(publicUrl));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false, strict: false}));

app.get('/register', function(req, res) {
    res.sendfile(publicUrl+'index.html');
});

app.get('/login', function(req, res) {
    res.sendfile(publicUrl+'index.html');
});

app.get('/logout', function(req, res) {
	res.clearCookie("User");
	res.redirect('/index.html')
})
//get favourite
app.get('/account', function(req, res) {
	user = req.cookies.User;
	db.collection('Users').find({"username": user}).toArray(function(err, results){
		console.log(results[0].fav);
		res.render("fav.ejs", {fav: results});
	})
})
//get comments
app.get('/account', function(req, res) {
	user = req.cookies.User;
	db.collection('Users').find({"username": user}).toArray(function(err, results){
		console.log(results[0].comment);
		res.render("fav.ejs", {comment: results});
	})
})
//show comments
app.get('/account', function(req, res) {
	user = req.cookies.User;
	db.collection('Users').find({"username": user}).toArray(function(err, results){
		console.log(results[0].comment);
		var i = 1;
    	for (var key in result[0].comment) {
			var rowID = i;
			var username = result[0].comment[key].name;
			var msg = comment[0].comment[key].msg;
			var markup =
			"<tr" + " id=" + rowID + ">"
			+ "<td>" + userName + "</td>"
			+ "<td>" + msg + "</td>"
			+ "</tr>";
			$("#sharing-table > tbody:last-child").append(markup);
			i++;
		}
	})
})

//add comment
app.get('/comments/:username/:msg',function(req,res){
	var user = req.cookies.User;
	var name = req.params.username;
	var msg = req.params.msg;
	if (name != '' && msg != '') {
		db.collection('Users').find({"username": user}).toArray(function(err, results){
			var orifv = results[0].comment;
			orifv.push({"name":name, "msg":msg});
			console.log("add comment")
			db.collection('Users').updateOne({"username": user}, {$set: {"comment": orifv}})
		})
	}
})

//delete comment
app.post('/comment/:index', (req,res) => {
	var user = req.cookies.User;
	var key = req.params.index;
	console.log(key);
	db.collection('Users').find({'username': user}).toArray(function(err,results){
		var orifv = results[0].comment;
		orifv.splice(key,1);
		db.collection('Users').updateOne({"username":user}, {$set: {"comment": orifv}})
		console.log("deleted");
		res.redirect("/account");
	})
})

//add favourite
app.get('/favourite/:title/:artist', function(req, res){
	var user = req.cookies.User;
	var title = req.params.title;
	var artist = req.params.artist;
	db.collection('Users').find({"username": user}, {"_id": 0, "fav": 1}).toArray(function(err, results){
		var orifv = results[0].fav;
		orifv.push({"title":title, "artist":artist});
		console.log("add fav")
		db.collection('Users').updateOne({"username": user}, {$set: {"fav": orifv}})
		res.redirect("/");
	})
})


//delete favourite
app.post('/favourite/:index',(req,res) => {
	var user = req.cookies.User;
	var key = req.params.index;
	console.log(key);
	db.collection('Users').find({"username": user},{"_id": 0, "fav":1}).toArray(function(err,results){
		var orifv = results[0].fav;
		orifv.splice(key,1);
		db.collection('Users').updateOne({"username":user},{$set: {"fav": orifv}});
		console.log("deleted");
		res.redirect("/account");

	})

});
//login, checking password
app.post('/login', function(req, res) {
	let name = req.body.username;
	let pwd = req.body.password;
	db.collection('Users').find({"username": name, "password": pwd}).toArray(function(err, results){
		if(results.length == 0){
			console.log("wrong user");
			res.redirect('/passwordNoMatch.html');
		}else{
			res.cookie('User', name);
			res.redirect('/index.html');
		}
	})
})

app.post('/register', (req, res) => {


	let name = req.body.username;
	let pwd = req.body.password;
    let re_pwd = req.body.re_password;
	MongoClient.connect(DB_url, function(err, result) {
		if(err) throw err;

  		// assert.equal(null, err);

		client = result;
		db = client.db("loststar");

  		collection = db.collection(userCollName);
		collection.find({"username": name}).toArray(function(err, docs) {
    		assert.equal(err, null);
    		//assert.equal(2, docs.length);
    		console.log("Found the following records");
    		console.dir(docs);
    		//callback(docs);

		if(docs !== undefined && docs !== null && docs.length > 0) {

			res.sendFile(publicUrl + "/usernameExists.html");
			//SHOULD NOT CREATE NEW USER
			// SAME NAME

		}else{

			if(pwd === re_pwd){

				//req.session.userName = name;

				var usr = {
					username: req.body.username,
					password: req.body.password,
					fav: [],
					comment:[]
				};

				db.collection(userCollName).insertOne(usr, function(err, result){
					assert.equal(null, err);
				 	console.log('user inserted');
				});
				res.redirect('/index.html');
			}

			 else{
			 	res.sendFile(publicUrl + "/passwordNoMatch.html");
			// 	// PWD is not equal to RE_PWD
			 }
		}
		//client.close();
	});
});
});

MongoClient.connect(DB_url, (err, database) => {
	if(err) return console.log(err)
	db = database;
	console.log("created");
	app.listen(3000,() => {
		console.log("l 3000")
	})
})

// app.listen(3000);