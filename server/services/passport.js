const passport = require("passport");
const LocalStrategy = require("passport-local");
const mongoose = require("mongoose");
const User = mongoose.model("User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    (req, email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          // there is already a user with the same email
          return done(null, false, { message: "Email already in use." });
        } else {
          let username = req.body.username;
          let newUser = new User();
          newUser.username = username;
          newUser.email = email;
          newUser.password = newUser.generateHash(password);
          newUser.resetPasswordToken = "";
          newUser.resetPasswordExpires = "";
          newUser
            .save()
            .then(user => {
              return done(null, user, { message: "User signed up" });
            })
            .catch(err => {
              console.log("There was an error saving the user ", err);
              return done(null, false, {
                message: "Error saving the new user"
              });
            });
        }
      });
    }
  )
);

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    (req, username, password, done) => {
      User.findOne({ username, username }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          return done(null, false, { message: "This email is not in use." });
        }
        // we have a user
        console.log("Attempting to login user: ");
        console.log("   email: " + user.email);
        console.log("   password: " + password);
        console.log("   hash: " + user.password);
        const hash = user.password; // this is the hashed pasword saved to the user
        if (!user.validPassword(password, hash)) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user, { message: "User logged in." });
      });
    }
  )
);

module.exports = passport;
