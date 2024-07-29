const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController.js');
const repairController = require('../controllers/repairController.js');

// Define routes first
router.get('/', mainController.login);
router.post('/login', mainController.getMain);
router.post('/IQPMpost', repairController.getTotalItemQuantityPerItemModel);
router.post('/TDPMpost', repairController.getTopDefectsPerItemModel);
router.post('/PTPMpost', repairController.getPendingStatusPerItemModel);
router.post('/TIQPTpost', repairController.getTotalItemQuantityPerTechnician);
router.post('/TIQPMPTpost', repairController.getTotalItemQuantityPerItemModelPerTechnician);
router.post('/AWDPTpost', repairController.getAverageWorkingDaysPerTechnician);
router.get('/table', repairController.getAllRepairs);
router.get('/import', mainController.getImport);
router.get('/home', mainController.getHome);
router.get('/', mainController.getRecovery);
router.post('/recovery', mainController.postRecovery);

// Dynamic import example (if needed)
// This method should be avoided for route definitions
async function dynamicImport() {
    try {
        const { default: importController } = await import('../controllers/importController.mjs');
        router.post('/importFile', importController.importFile);
    } catch (error) {
        console.error('Error importing importController:', error);
    }
}

// Invoke dynamicImport if needed in specific situations
dynamicImport();

module.exports = router;
