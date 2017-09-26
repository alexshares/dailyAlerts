module.exports = function(app){
  // var reports = require('./controllers/reports.js');
  // app.get('/dailyAlerts', reports.getDailyAlerts);

  var uploads = require('./controllers/uploads.js');
  app.post('/uploadDailyData', uploads.uploadDailyData);
  app.get('/getUpload/:id', uploads.getUploadById);
  app.get('/getUploadByDate/:date', uploads.getUploadByDate);
  app.post('/getUploadByDateRange', uploads.getUploadByDateRange);
  app.get('/hello', uploads.hello);

  var reports = require('./controllers/reports.js');
  app.get('/dailyReview', reports.newDailyReview);

  var pixels = require('./controllers/pixels.js');
  app.get('/pixel/:id', pixels.findById);
  app.post('/pixel/:template/new', pixels.create);
  //app.get('/:id', pixels.render); // can't quite get this working due to a cast-Error on IDs. Returning wiht valid test data
}

