let express = require('express');
let router = express.Router();

router.get('/', function (req, res) {
    let requestedUserId = req.query.userId
    let filteredContacts = contactsNEW.filter(function (contact) {
        return contact.owner == requestedUserId
    })
    res.status(200).json(filteredContacts)
})

router.post('/', function (req, res) {
    res.status(201)
})

router.delete('/:id', function (req, res) {
    let contactId = req.params.id;
    res.status(204)
})

router.put('/:id', function (req, res) {
    let contactId = req.params.id;
    res.status(204)
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