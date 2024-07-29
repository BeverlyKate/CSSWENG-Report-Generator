import express from "express";
const app = express();
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: true }));
import { IncomingForm } from "formidable";
import repairModel from "../models/repairSchema.js";
import repairIdModel from "../models/repairIdSchema.js";

export async function insertRepair(excelValues) {
    console.log("this is the final value ", excelValues);
    const excelValuesLength = excelValues.length;
    console.log("this is json length = ", excelValuesLength);
    let dataToSave = new Array();
    
    //Iterate of the length of excel values. Starts from 1 because of an additional automatic entry and excelValuesLength - 1
    //because of another additional automatic entry
    for(let i = 1; i < excelValuesLength - 1; i += 24){
        //If all of the inputs in a row = "NULL", do not enter into DB. Otherwise, insert into DB
        if((excelValues[i] && excelValues[i+1] && excelValues[i+2] && excelValues[i+3] && excelValues[i+4] 
            && excelValues[i+5] && excelValues[i+6] && excelValues[i+7] && excelValues[i+8] && excelValues[i+9] 
            && excelValues[i+10] && excelValues[i+11] && excelValues[i+12] && excelValues[i+13] 
            && excelValues[i+14] && excelValues[i+15] && excelValues[i+16] && excelValues[i+17] 
            && excelValues[i+18] && excelValues[i+19] && excelValues[i+20] && excelValues[i+21] 
            && excelValues[i+22] && excelValues[i+23]) == "NULL") {
            console.log("no input");
        } else {
            // Create new repair model
            const newRepairId = new repairIdModel();
            
            await newRepairId.save().then(newRepairId => {
                // console.log(newRepairId);
            }).catch(error => {
                console.log("Repair ID creation error: " + error);
                const errorMessage = "Repair ID creation error";
                res.render("import", {error: errorMessage});
            });

            try {
                let repairDateFinished;
                let repairDateReturned;
                if(excelValues[i+13] != "NULL") {
                    repairDateFinished = new Date(Math.round((excelValues[i+13] - 25569)*86400*1000)).toLocaleDateString();
                    console.log("repair date finished = " + repairDateFinished);
                };

                if(excelValues[i+21] != "NULL") {
                    repairDateReturned = new Date(Math.round((excelValues[i+21] - 25569)*86400*1000)).toLocaleDateString();
                    console.log("repair date returned = " + repairDateReturned);
                };
                const newRepair = {
                    repairId: newRepairId.idCounter,
                    repairDate: new Date(Math.round((excelValues[i] - 25569)*86400*1000)).toLocaleDateString().split(" ").slice(1),
                    repairPLNumber: parseInt(excelValues[i+1]) ,
                    repairCustomer: excelValues[i+2],
                    repairItemModel: excelValues[i+3],
                    repairDescription: excelValues[i+4],
                    repairQuantity: parseInt(excelValues[i+5]),
                    repairUOM: excelValues[i+6],
                    repairPullOutBy: excelValues[i+7],
                    repairCategory1: excelValues[i+8],
                    repairCategory2: parseInt(excelValues[i+9]),
                    repairSerialNumber: parseInt(excelValues[i+10]),
                    repairJobOrderNumber: parseInt(excelValues[i+11]),
                    repairDateStarted: new Date(Math.round((excelValues[i+12] - 25569)*86400*1000)).toLocaleDateString().split(" ").slice(1),
                    repairDateFinished: repairDateFinished,
                    repairTechnician1: excelValues[i+14],
                    repairTechnician2: excelValues[i+15],
                    repairItemStatus: excelValues[i+16],
                    repairDeliveryStatus: excelValues[i+17],
                    repairRemarks: excelValues[i+18],
                    repairCost: parseInt(excelValues[i+19]),
                    repairReturnFormNumber: parseInt(excelValues[i+20]),
                    repairDateReturned: repairDateReturned,
                    repairStatus: excelValues[i+22],
                    repairDefect: excelValues[i+23]
                };
                dataToSave.push(newRepair);
            } catch(error) {
                console.log("Data to array insertion error: " + error);
                const errorMessage = "Data to array insertion error";
                res.render("import", {error: errorMessage});
            };
        };
    };
    
    //Insert new repair model into DB
    await repairModel.insertMany(dataToSave).then(insertedData => {
        // console.log(insertedData);
    }).catch(error => {
        console.log("Data insertion error: " + error);
        const errorMessage = "Data insertion error";
        res.render("import", {error: errorMessage});
    });
}

const importController = {
    //Import file into database
    importFile: async function(req, res) {
        console.log("post called");
        let form = new IncomingForm();
        try {
            form.parse(req, async function (err, fields, files) {
                //Parse passed JSON object
                let excelValues = JSON.parse(fields.excelValues);
                insertRepair(excelValues);
            });
        } catch(error) {
            console.log("Import file error: " + error);
            const errorMessage = "Import file error";
            res.render("import", {error: errorMessage});
        };
    },
};

//Export importController to be used
export default importController;