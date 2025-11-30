const User = require("../models/user");

// ⭐ SIGNUP CONTROLLER
module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;

        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        console.log(registeredUser);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        });

    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

// ⭐ RENDER SIGNUP PAGE
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

// ⭐ RENDER LOGIN PAGE
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

// ⭐ LOGIN CONTROLLER (FIXED NAME)
module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

// ⭐ LOGOUT CONTROLLER
module.exports.logout = async (req, res, next) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged out successfully!");
        res.redirect("/listings");
    });
};
