const express = require("express");
const router = express.Router();
const passport = require("passport");

// Current
router.get("/", (req, res) => {
    return res.send({user: req.user})
})

// Logout
router.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy();
    res.send({message: "Succesfully logged out."})
})

// Local login
router.post("/login", (req, res, next) => {
	passport.authenticate("local-login", (err, user, info) => {
		if (err) {
			return res.status(500).send({ message: "Error" });
		}
		if (!user) {
			if (info.message === "Incorrect password.") {
				// Incorrect password
				return res.status(401).send({message: info.message});
			}
			else {
				// Email is not linked to account
				return res.status(404).send({ message: info.message });
			}
		} else {
			req.login(user, err => {
				if (err) {
					return res.status(500).send({ message: "error" });
				}
				return res.status(200).send({ message: info.message, user: req.user });
			});
		}
	})(req, res, next);
});

// Local signup
router.post("/signup", (req, res, next) => {
	passport.authenticate("local-signup", (err, user, info) => {
		if (err) {
			return res.send({ message: "error" });
		}
		if (!user) {
			// A user with the same email already exists
			return res.status(403).send({ message: info.message });
		} else {
			req.login(user, err => {
				if (err) {
					return res.status(500).send({ message: "error" });
				}
				return res.send({ message: info.message, user: user });
			});
		}
	})(req, res, next);
});

module.exports = router;
