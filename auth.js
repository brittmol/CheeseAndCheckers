const { User } = require('./db/models')

// Persisting user's login state

// This creates an auth key and adds who is logged in
const loginUser = (req, res, user) => {
    req.session.auth = { userId: user.id }
    // req.session.save(()=> res.redirect('/'))
}

const logoutUser = (req, res) => {
    delete req.session.auth;
};

const requireAuth = (req, res, next) => {
    if (!res.locals.authenticated) {
        return res.redirect('/users/login');
    }
    return next();
};

// to retrieve the user's information from the database
// if they're authenticated
const restoreUser = async (req, res, next) => {
    // Log the session object to the console
    // to assist with debugging.
    console.log(req.session);

    // if auth key exists, find user
    if (req.session.auth) {
        const { userId } = req.session.auth
        try {
            const user = await User.findByPk(userId)
            // if user exists, authenticated = true
            if (user) {
                res.locals.authenticated = true
                res.locals.user = user
                next()
            }
        // if there is no user, then authenticated = false
        } catch (err) {
            res.locals.authenticated = false
            next(err)
        }
    // if auth key does NOT exist, then authenticated = false
    } else {
        res.locals.authenticated = false;
        next()
    }
}


module.exports = {
    loginUser,
    logoutUser,
    restoreUser,
    requireAuth,
}
