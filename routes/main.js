const express = require('express')
const router = express.Router()
const ProjectController = require('../controllers/ProjectController')



router.get('/', (req, res) => {
    const data = req.context; 
    const prjctrl = new ProjectController();
    prjctrl.get()
    .then(projects => {
        data ['projects'] = projects
        res.render('index', data)
    })
    .catch(err => {
        res.send('Error!')
    })  
})

router.get('/project/:slug', (req, res) => {
    const data = req.context
    const projectSlug = req.params.slug

    const projectCtr = new ProjectController()
    projectCtr.get({slug: projectSlug})
    .then(project => {
        if (project.lenght == 0) {
            throw new Error('Project not found!!')
            return;
        }

        
        data['project'] = project[0]
        res.render('project', data)
    })
    .catch(err => {
        res.send('Oooops!!'+err.message)
    })
})


module.exports = router