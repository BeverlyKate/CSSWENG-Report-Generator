const express = require('express');
const app = express();
const importController = require('../controllers/importController.js');
const mainController = require('../controllers/mainController.js');
const repairController = require('../controllers/repairController.js');

//Open Home
app.get('/', mainController.getMain);
//Open IQPM
app.get('/IQPM', mainController.getItemQuantityPerModel);
//Open PTPM
app.get('/PTPM', mainController.getPendingTasksPerModel);
//Open TDPM
app.get('/TDPM', mainController.getTopDefectsPerModel);
//Import file and insert into DB
app.post('/importFile', importController.importFile);
// app.get('/insertRepair/:excelValues', repairController.insertRepair);
app.get('/table', repairController.getAllRepairs);
app.get('/name of action or url', repairController.getTotalItemQuantityPerTechnician);
app.get('/name of action or url', repairController.getTotalItemQuantityPerItemModelPerTechnician);
app.get('/name of action or url', repairController.getAverageWorkingDaysPerTechnician);
app.get('/name of action or url', repairController.getTotalItemQuantityPerItemModel);
app.get('/name of action or url', repairController.getTopDefectsRegardlessOfItemModel);
app.get('/name of action or url', repairController.getTopDefectsPerItemModel);
app.get('/name of action or url', repairController.getPendingStatusPerItemModel);

module.exports = app;