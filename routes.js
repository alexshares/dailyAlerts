module.exports = function(app){
  var reports = require('./controllers/reports.js');
  app.get('/dailyAlerts', reports.getDailyAlerts);

  var uploads = require('./controllers/uploads.js');
  app.post('/uploadDailyData', uploads.uploadDailyData);

}

