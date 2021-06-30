let express = require('express');
const MongoClient = require('mongodb').MongoClient;
let router = express.Router();

const url = "mongodb://localhost:27017/";
const dbName = 'advizDB'
const usersCollections = 'users'

router.post('/login', function (req, res) {
    let loginCredential = req.body
    MongoClient.connect(url, {useUnifiedTopology: true},
        function (err, client) {
            if (err) throw err
            let db = client.db(dbName)
            db.collection(usersCollections)
                .findOne(loginCredential)
                .then(result => {
                    if (result == null) {
                        res.status(401).send('Unauthorized')
                    } else {
                        res.status(200).json(result)
                    }
                })
                .catch(err => {
                    res.status(401).send('Unauthorized')
                })
        })
})

module.exports = router;
