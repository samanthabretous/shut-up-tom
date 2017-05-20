const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Shut Up Tom' });
});

router.get('/dashboard', (req, res) => {
  res.render('dashboard', { title: 'Shut Up Tom - Dashboard' });
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

module.exports = router;
