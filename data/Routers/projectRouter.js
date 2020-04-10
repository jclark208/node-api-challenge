const express = require('express');

const Projects = require('../helpers/projectModel');


const router = express.Router();

router.use(express.json());

// get all projects
router.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: 'Oh look no projects because you suck'})
    })
})
// get project by id
router.get('/:id', validateProjectId, (req, res) => {
    Projects.get(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Well that didnt exist try again'})
    })
})
//get project actions
router.get('/:id/actions', validateProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Oh look you messed something up'})
    })
})
// add new project
router.post('/', validateProject, (req, res) => {
    Projects.insert(req.body)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Clearly you cant read the instructions'})
    })
})
// update project
router.put('/:id', validateProject, validateProjectId, (req, res) => {
    Projects.update(req.params.id, req.body)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Clearly you cant read the instructions'})
    })
})
// delete project
router.delete('/:id', validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Immortal Object'})
    })
})
// custom middleware
function validateProjectId(req, res, next) {
    if (req.params.id) {
        req.project = req.params.id;
        next();
    } else {
        res.status(400).json({message: 'Invalid project id'})
    }
}

function validateProject(req, res, next) {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({message: 'Provide project name and description'});
    } else {
        next();
    }
}


module.exports = router; 