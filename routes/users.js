let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.status(200).json({users: "bob"});
    //res.send('respond with a resource');
});

router.post('/login', function (req, res) {
    let loginCredential = req.body
    let validatedCredential = isLoginCredentialValid(loginCredential)
    if (validatedCredential.loginValid) {
        res.status(200).json(validatedCredential.user)
    } else {
        res.status(401).send('Unauthorized')
    }
})

function isLoginCredentialValid(loginCredentials) {
    let validatedCredential = null
    validatedCredential.loginValid = false
    users.forEach(function (user) {
        //TODO Check if loginCredentials.name is still valid
        if (user.userId == loginCredentials.name && user.password == loginCredentials.password) {
            validatedCredential.loginValid = true;
            validatedCredential.user = user
        }
    })
    return validatedCredential
}

const usersNEW = [
    {
        userId: 'admina',
        firstName: 'Paula',
        lastName: 'Paetzold',
        password: 'pass123',
        isAdmin: true
    },
    {
        userId: "normalo",
        firstName: 'Karl',
        lastName: 'Schulz',
        password: "pass321",
        isAdmin: false
    }
]

module.exports = router;
