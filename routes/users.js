let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.status(200).json({users: "bob"});
    //res.send('respond with a resource');
});

router.post('/login', function (req, res) {
    let loginCredential = req.body
    let validatedCredentials = isLoginCredentialValid(loginCredential)
    if (validatedCredentials.loginValid) {
        res.status(200).json(validatedCredentials.user)
    } else {
        res.status(401).send('Unauthorized')
    }
})

function isLoginCredentialValid(loginCredentials) {
    let validatedCredentials = null
    validatedCredentials.loginValid = false
    users.forEach(function (user) {
        if (user.name == loginCredentials.name && user.password == loginCredentials.password) {
            validatedCredentials.loginValid = true;
            validatedCredentials.user = user
        }
    })
    return validatedCredentials
}

module.exports = router;
