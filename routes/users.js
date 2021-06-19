let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.status(200).json({users: "bob"});
    //res.send('respond with a resource');
});

router.post('/login', function (req, res) {
    if (true) {
        res.status(200)
    } else {
        res.status(401).send('Unauthorized')
    }
})

module.exports = router;
