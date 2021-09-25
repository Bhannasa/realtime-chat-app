var express = require('express');
var router = express.Router();
const getUserName = require('../middleware/authID');
const { getDatabase, ref , child ,get, update  } = require("firebase/database");


router.post("/addPeople", getUserName, async (req, res) => {

	try {
		const db=getDatabase();
        const userSnap=await get(child(ref(db),`users/${req.username}`));
		const userData = userSnap.val();

		var arr = userData.chats;
		if(!arr)	arr=[];
		if (arr.indexOf(req.body.user) != -1) {
			res.send("Chat Exists");
			return;
		}
		arr.push(req.body.user);

		const updates={};
        updates[`users/${req.username}/chats`]=arr;
        update(ref(getDatabase()),updates);

		res.send({ "success" : "Chat Added Successfully"})
	} catch(error) {
		console.log(error)
		res.status(400).send({ error: "Something Wrong! Please try again after some time" });
	}
})

router.post("/getUser", getUserName, async (req, res) => {

	try {
		const db=getDatabase();
        const userSnap=await get(child(ref(db),`users/${req.body.user}`));
		const userData = userSnap.val();
		res.status(200).json({ 'profilePicUrl': userData.profilePicUrl, 'name': userData.name, 'lastSeen': userData.lastSeen });

	} catch (error) {
		console.log(error);
		res.status(400).send({ error: "Something Wrong! Please try again after some time" });
	}
})

router.get("/alluser", async (req, res) => {
	try {
		const db=getDatabase();
        const userSnap=await get(child(ref(db),`users/`));
		const userShot=userSnap.val();
		var users = []
		for(var id in userShot){
			users.push(id);
		}
		res.send({ "users": users });

	} catch (error) {
		console.log(error);
		res.status(400).send({ error: "Something Wrong! Please try again after some time" });
	}
})

module.exports = router;
