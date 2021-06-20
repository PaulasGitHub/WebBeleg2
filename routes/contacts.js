let express = require('express');
let router = express.Router();

router.get('/', function (req, res) {
    let requestedUserId = req.query.userId
    res.status(200)
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

module.exports = router;