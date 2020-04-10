const express = require('express');

const Actions = require('../helpers/actionModel');

const router = express.Router();

router.use(express.json());

function validateAction(req, res, next) {
    if (!req.body.project_id || !req.body.description || ! req.body.notes) {
        res.status(400).json({message: `Notes description and product id idiot! For the love of god its a miracle you got this far.`});
    } else if (req.body.description.length > 128) {
        res.status(400).json({message: 'Alright skippy its limited to 128 characters'});
    } else {
        next();
    }
}

function validateActionId(req, res, next) {
    if (req.params.id) {
        next()
    } else {
        res.status(400).json({message: "Invalid action id"})
    }
}
// get all actions
router.get('/', (req, res) => {
    Actions.get()
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Just like the number of friends you have, we couldnt find any actions'})
    })
})
// get action by id
router.get('/:id', validateActionId, (req, res) => {
    Actions.get(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Couldnt find your stupid action'})
    })
})
// add new action
router.post('/', validateAction, (req, res) => {
    Actions.insert(req.body)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Maybe you should read the damn rquirements'})
    })
})
// update action
router.put('/:id', validateAction, validateActionId, (req, res) => {
    Actions.update(req.params.id, req.body)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Clearly you fucked up'})
    })
})
// delete action
router.delete('/:id', validateActionId, (req, res) => {
    Actions.remove(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Immortal Object'})
    })
})

module.exports = router; 