const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 
const port = 3000
const formidable = require('formidable');
const fs = require('fs');
const repairModel = require('../models/repairSchema.js');
const repairIdModel = require('../models/repairIdSchema.js');

async function insertRepair(excelValues) {
    // const hatdog = parseInt(excelValues[1]);
    // console.log(hatdog);
    console.log("this is the final value ", excelValues);
    const excelValuesLength = excelValues.length;
    console.log("this is json length = ", excelValuesLength);
    var dataToSave = new Array();
    
    //Iterate of the length of excel values. Starts from 1 because of an additional automatic entry and excelValuesLength - 1
    //because of another additional automatic entry
    for(i = 1; i < excelValuesLength - 1; i += 24){
        // console.log('help ' + excelValues[i]);

        //If all of the inputs in a row = "NULL", do not enter into DB. Otherwise, insert into DB
        if((excelValues[i] && excelValues[i+1] && excelValues[i+2] && excelValues[i+3] && excelValues[i+4] 
            && excelValues[i+5] && excelValues[i+6] && excelValues[i+7] && excelValues[i+8] && excelValues[i+9] 
            && excelValues[i+10] && excelValues[i+11] && excelValues[i+12] && excelValues[i+13] 
            && excelValues[i+14] && excelValues[i+15] && excelValues[i+16] && excelValues[i+17] 
            && excelValues[i+18] && excelValues[i+19] && excelValues[i+20] && excelValues[i+21] 
            && excelValues[i+22] && excelValues[i+23]) == "NULL") {
            console.log("no input");
        } else {
            // console.log("pl no = " + excelValues[i+1]);
            // console.log(parseInt(excelValues[i+1]));
            // console.log(typeof parseInt(excelValues[i+1]));
            // var repairDate = new Date(Math.round((dbNum - 25569)*86400*1000));
            // console.log("help me" + repairDate);
            //Create new repair model
            const newRepairId = new repairIdModel();
            
            await newRepairId.save().then(newRepairId => {
                // console.log(newRepairId);
            }).catch(error => {
                console.log("Repair ID creation error: " + error);
            });

            try {
                const newRepair = {
                    repairId: newRepairId.idCounter,
                    repairDate: parseInt(excelValues[i]),
                    // repairDate: addDays('1900-01-01', excelValues[i]?['Date']),
                    repairPLNumber: parseInt(excelValues[i+1]) ,//parseInt(excelValues[i+1]) 
                    repairCustomer: excelValues[i+2],
                    repairItemModel: excelValues[i+3],
                    repairDescription: excelValues[i+4],
                    repairQuantity: parseInt(excelValues[i+5]),//parseInt(excelValues[i+5])
                    repairUOM: excelValues[i+6],
                    repairPullOutBy: excelValues[i+7],
                    repairCategory1: excelValues[i+8],
                    repairCategory2: parseInt(excelValues[i+9]),
                    repairSerialNumber: parseInt(excelValues[i+10]), //commented out because can't be null entries
                    repairJobOrderNumber: parseInt(excelValues[i+11]), //commented out because can't be null entries
                    repairDateStarted: parseInt(excelValues[i+12]),
                    repairDateFinished: parseInt(excelValues[i+13]),
                    repairTechnician1: excelValues[i+14],
                    repairTechnician2: excelValues[i+15],
                    repairItemStatus: excelValues[i+16],
                    repairDeliveryStatus: excelValues[i+17],
                    repairRemarks: excelValues[i+18],
                    repairCost: parseInt(excelValues[i+19]), //commented out because can't be null entries
                    repairReturnFormNumber: parseInt(excelValues[i+20]), //commented out because can't be null entries
                    repairDateReturned: parseInt(excelValues[i+21]),
                    repairStatus: excelValues[i+22],
                    repairDefect: excelValues[i+23]
                };

                dataToSave.push(newRepair);
            } catch(error) {
                console.log(error);
            };
        };
    };
    
    //Insert new repair model into DB
    await repairModel.insertMany(dataToSave).then(insertedData => {
        // console.log(insertedData);
    }).catch(error => {
        console.log("Data insertion error: " + error);
    });
}

const importController = {
    //Get file from import.html and send it.
    getFile: function(req, res) {
        res.sendFile(__dirname +'/import.html');
    },

    //Import file into database
    importFile: async function(req, res) {
        console.log("post called");
        var form = new formidable.IncomingForm();
        try {
            form.parse(req, async function (err, fields, files) {
                //Parse passed JSON object
                var excelValues = JSON.parse(fields.excelValues);
                insertRepair(excelValues);
            });
        } catch(error) {
            console.log(error);
        };
    }
};

//Export importController to be used
module.exports = importController;