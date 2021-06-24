let express = require('express');
const MongoClient = require('mongodb').MongoClient;
let router = express.Router();
var ObjectId = require('mongodb').ObjectID;

const url = "mongodb://localhost:27017/";
const dbName = 'advizDB'
const contactsCollections = 'contacts'

router.get('/', function (req, res) {
    if (req.query.hasOwnProperty('userId')) {
        let requestedUserId = req.query.userId
        MongoClient.connect(url, {useUnifiedTopology: true},
            function (err, client) {
                if (err) throw err
                let db = client.db(dbName);
                db.collection(contactsCollections).find({owner: requestedUserId}).toArray(
                    function (err, result) {
                        if (err) throw err
                        if (result.length == 0) {
                            res.sendStatus(404)
                        } else {
                            //TODO Fragen fragen warum .send() err auslößt
                            res.json(result)
                        }
                        client.close();
                    }
                )
            }
        )
    } else {
        res.sendStatus(400)
    }

})

router.post('/', function (req, res) {
    MongoClient.connect(url, {useUnifiedTopology: true},
        function (err, client) {
            if (err) throw err
            let db = client.db(dbName);
            db.collection(contactsCollections).insertOne(req.body, function (err, result) {
                if (err) throw err
                else
                    res.sendStatus(201);
                //TODO db.close oder client.close
                client.close();
            })
        }
    )

})

router.delete('/:id', function (req, res) {
    let contactId = req.params.id;
    MongoClient.connect(url, {useUnifiedTopology: true}, function (err, client) {
        if (err) throw err
        let db = client.db(dbName);
        db.collection(contactsCollections).deleteOne({_id: ObjectId(contactId)}, function (err, result) {
            if (err) throw err
            console.log(result)
            res.sendStatus(204)
            client.close()
        })
    })
})

router.put('/:id', function (req, res) {
    let contactId = req.params.id;
    MongoClient.connect(url, {useUnifiedTopology: true}, function (err, client) {
        if (err) throw err
        let query = {_id: ObjectId(contactId)}
        let updatedContact = req.body
        let db = client.db(dbName)
        db.collection(contactsCollections).updateOne(query, {$set: updatedContact}, function (err, result) {
            if (err) throw err
            res.sendStatus(204)
            client.close()
        })
    })
})

const contactsNEW = [
    {
        id: 1,
        firstName: 'Maxime',
        lastName: 'Musterfrau',
        street: 'Sonnenalle',
        number: '12',
        zip: '12345',
        city: 'Berlin',
        state: 'Berlin',
        country: 'Deutschland',
        owner: 'admina',
        private: true
    },
    {
        id: 2,
        firstName: 'Todd',
        lastName: 'Chavez',
        street: 'Carl-Herz-Ufer',
        number: '25',
        zip: '10961',
        city: 'Berlin',
        state: 'Berlin',
        country: 'Deutschland',
        owner: 'admina',
        private: false
    },
    {
        id: 3,
        firstName: 'Jo',
        lastName: 'Guenther',
        street: "Mittenwalder Straße",
        number: '12',
        zip: '23433',
        city: 'Berlin',
        state: 'Berlin',
        country: 'Deutschland',
        owner: 'normalo',
        private: true
    },
    {
        id: 4,
        firstName: 'Hans',
        lastName: 'Herbert',
        street: 'Pfarrstraße',
        number: '113',
        zip: '10961',
        city: 'Berlin',
        state: 'Berlin',
        country: 'Deutschland',
        owner: 'normalo',
        private: false
    }
]

module.exports = router;

//TODO app.listen(port, () => {
//     console.log('Example app listening on port ' + port + '!');
// });