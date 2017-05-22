const router = require('express').Router();
const request = require('superagent');

module.exports = (registry) => {
  router.get('/', (req, res) => {
    // user has already been authorize
    if (req.cookies.team_id) {
      res.redirect(`/dashboard`);
    } else {
      res.render('index', {
        title: 'Shut Up Tom',
        indexPage: 'logo__container-index',
        indexBody: 'index'
      });
    }
  });

  router.get('/dashboard', (req, res) => {
    const databaseService = registry.get('mongo');

    // get team infomation
    request.get(`http://${databaseService.ip}:${databaseService.port}/api/team/${req.cookies.team_id}`)
    .then((success, failure) => {
      res.render('dashboard', {
        title: 'Shut Up Tom - Dashboard',
        team_name: req.body.team_name,
      });
    })
  });

  router.get('/custom-messages', (req, res) => {
    res.render('customMessages', { title: 'Shut Up Tom - Custom Messages' });
  });

  router.get('/graph', (req, res) => {
    res.render('graph', { title: 'Shut Up Tom - Graph' });
  });

  router.get('/schedule', (req, res) => {
    res.render('schedule', { title: 'Shut Up Tom - Schedule' });
  });
  return router
}
