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
  const getTeamInfo = (req, res, page) => {
    const databaseService = registry.get('mongo');

    if(databaseService) {
      request.get(`http://${databaseService.ip}:${databaseService.port}/api/team/${req.cookies.team_id}`)
      .then((success, failure) => {
        console.log(success.body);
        res.render(page, {
          title: `Shut Up Tom - ${page.toUpperCase()}`,
          team_name: success.body.team_name,
          channel: success.body.incoming_webhook.channel,
        });
      })
    } else {
      return setTimeout(() => getTeamInfo(req, res, page), 500);


    }

  };
  router.get('/dashboard', (req, res) => {
    getTeamInfo(req, res, 'dashboard');
  });

  router.get('/info', (req, res) => {
    getTeamInfo(req, res, 'info');
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
