const express = require('express');
const app = express.Router();
const importController = require('../controllers/importController.js');
const mainController = require('../controllers/mainController.js');
const repairController = require('../controllers/repairController.js');

//Open Login
app.get('/', mainController.login);
//Open Home
app.post('/login', mainController.getMain);
//Import file and insert into DB
app.post('/importFile', importController.importFile);
// app.get('/insertRepair/:excelValues', repairController.insertRepair);
app.get('/table', repairController.getAllRepairs);

app.get('/import', mainController.getImport);

app.get('/home', mainController.getHome);

// app.get('/IQPM', mainController.generateIQPM(reportParameters));


module.exports = app;