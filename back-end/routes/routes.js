const express = require('express');
const app = express.Router();
// const { default: importController } = await import('../controllers/importController.mjs');
// const importController = await import(importControllerPath);
async function dynamicImport() {
    try {
      // Dynamically import the module
        const { default: importController } = await import('../controllers/importController.mjs');
  
      // Now you can use the methods from importController
    //   importController.getFile
        app.post('/importFile', importController.importFile);
      // ... other logic ...
  
    } catch (error) {
      console.error('Error importing importController:', error);
    };
};
  
dynamicImport();
const mainController = require('../controllers/mainController.js');
const repairController = require('../controllers/repairController.js');

//Open Login
app.get('/', mainController.login);
//Open Home
app.post('/login', mainController.getMain);
//Item Quantity Per Model
app.post('/IQPMpost', repairController.getTotalItemQuantityPerItemModel);
//Top Defects per Model
app.post('/TDPMpost', repairController.getTopDefectsPerItemModel);
//Pending Tasks per Model
app.post('/PTPMpost', repairController.getPendingStatusPerItemModel);
//Total Item Quantity Per Technician
app.post('/TIQPTpost', repairController.getTotalItemQuantityPerTechnician);
//Total item quantity per model per technician
app.post('/TIQPMPTpost', repairController.getTotalItemQuantityPerItemModelPerTechnician);
//Average working days per technician
app.post('/AWDPTpost', repairController.getAverageWorkingDaysPerTechnician);

app.get('/table', repairController.getAllRepairs);

app.get('/import', mainController.getImport);

app.get('/home', mainController.getHome);

// app.get('/IQPM', mainController.generateIQPM(reportParameters));

module.exports = { app, dynamicImport };