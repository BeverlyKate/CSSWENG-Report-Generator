const repairModel = require('../models/repairSchema.js');

//Returns the compared values in descending order
function compareNumbers(a, b) {
    return b.repairDefectQuantity - a.repairDefectQuantity;
};

//Clears and returns all duplicate technician entries
function clearDuplicates(technician) {
    let distinctArray = [];
    let count = 0;
   
  // Start only when a repeated value is not encountered
    let start = false;
   
    //Iterate over technician array
    for(let i = 0; i < technician.length; i++) {
        //Iterate over distinct array
        for(let j = 0; j < distinctArray.length; j++) {
            if (technician[i] == distinctArray[j]) {
                start = true;
            };
        };
        count++;
        //Push if no duplicates
        if (count == 1 && start == false) {
          distinctArray.push(technician[i]);
        };
        start = false;
        count = 0;
    };
   
    console.log(distinctArray);
    
    return distinctArray;
};

const repairController = {
    //Get all repairs and display
    getAllRepairs: async function(req, res) {
        //Find all repairs
        await repairModel.find({}).then(repair => {
            console.log(repair);
            
            //Send to hbs template used
            res.render('table', {repair: repair});
        }).catch(error => {
            console.log("Getting all repairs error: " + error);//Copy this logic
            res.render('table', {error: error});//Copy this logic
        });
    },

    getTotalItemQuantityPerItemModel: async function(req, res) {
        let category1 = req.body.category1;
        let dateFrom;
        let dateTo;
        let newDateTo;
        let repairTalliedQuantities = [];
        let tempInt = 0;

        if(req.body.dateFrom.length = 4){
            dateFrom = new Date(req.body.dateFrom);
            newDateTo = new Date(req.body.dateFrom);
            dateTo = new Date(newDateTo.setFullYear(newDateTo.getFullYear() + 1));
        } else {
            dateFrom = new Date(req.body.dateFrom);
            newDateTo = new Date(req.body.dateFrom);
            dateTo = new Date(newDateTo.setMonth(newDateTo.getMonth() + 1));
        }

        console.log("date from: " + dateFrom);
        console.log("date to: "+ dateTo);
    
        if(category1 == "default") {
            //Find all unique repair item models
            await repairModel.find({}).distinct('repairItemModel').then(async repairItemModel => {
                console.log(repairItemModel);
                //Find all repairs associated with each unique repair item model with repairDate greater than dateFrom and 
                //repairDate less than dateTo parameters
                await repairModel.find({repairItemModel: repairItemModel, repairDate: {$gte: dateFrom, $lt: dateTo}}).then(repair => {
                    repair = repair;
                    // console.log(repair);
                    // console.log("rep tech length = " + repairItemModel.length)
                    // console.log("rep length = " + repair.length)
                
                    //Iterate over the array of unique repair item models
                    for(let i = 0; i < repairItemModel.length; i++) {
                        //Reset temporary int
                        tempInt = 0;
                        //Iterate over the array of repairs associated with each unique repair item model
                        for(let j = 0; j < repair.length; j++) {
                            //If repair item model in array of unique repair item models == repair technician in array of repairs
                            //associated with each unique repair item model, add its repair quantity value to temporary int
                            if(repairItemModel[i] == repair[j].repairItemModel) {
                                // console.log("hatdog");
                                tempInt += repair[j].repairQuantity;
                            };
                        };
                        //Store temporary int to repairTalliedQuantities
                        repairTalliedQuantities[i] = tempInt;
                    };
                }).catch(error => {
                    console.log("Cannot find Repair Item Model error: " + error);
                });
                console.log("tallied = " + repairTalliedQuantities);
                //Send to hbs template used
                res.render('IQPM', {date: req.body.dateFrom, repairItemModel: repairItemModel, repairTalliedQuantities: repairTalliedQuantities});
            }).catch(error => {
                console.log("Cannot find all Repair Item Models error: " + error);
            });
        } else {
            //Find all unique repair item models
            await repairModel.find({}).distinct('repairItemModel').then(async repairItemModel => {
                // console.log(repairItemModel);
                //Find all repairs associated with each unique repair item model and the category1 parameter with repairDate 
                //greater than dateFrom and repairDate less than dateTo parameters
                await repairModel.find({repairItemModel: repairItemModel, repairDate: {$gte: dateFrom, $lt: dateTo}, repairCategory1: category1}).then(repair => {
                    repair = repair;
                    // console.log(repair);
                    // console.log("rep tech length = " + repairItemModel.length)
                    // console.log("rep length = " + repair.length)
                
                    //Iterate over the array of unique repair item models
                    for(let i = 0; i < repairItemModel.length; i++) {
                        //Reset temporary int
                        tempInt = 0;
                        //Iterate over the array of repairs associated with each unique repair item model
                        for(let j = 0; j < repair.length; j++) {
                            //If repair item model in array of unique repair item models == repair technician in array of repairs
                            //associated with each unique repair item model, add its repair quantity value to temporary int
                            if(repairItemModel[i] == repair[j].repairItemModel) {
                                // console.log("hatdog");
                                tempInt += repair[j].repairQuantity;
                            };
                        };
                        //Store temporary int to repairTalliedQuantities
                        repairTalliedQuantities[i] = tempInt;
                    };
                }).catch(error => {
                    console.log("Cannot find Repair Item Model error: " + error);
                });
                console.log("tallied = " + repairTalliedQuantities);
                //Send to hbs template used
                res.render('IQPM', {category: category1, date: req.body.dateFrom, repairItemModel: repairItemModel, repairTalliedQuantities: repairTalliedQuantities});
            }).catch(error => {
                console.log("Cannot find all Repair Item Models error: " + error);
            });
        };
    },

    getTopDefectsPerItemModel: async function(req, res) {
        let status = req.body.taskType;
        let itemModel = req.body.itemModel;
        let category1 = req.body.category1;
        let dateFrom;
        let newDateTo;
        let dateTo;
        let repairTalliedQuantities = [];
        let tempInt = 0;
        let tempArray = [];

        if(req.body.dateFrom.length = 4){
            dateFrom = new Date(req.body.dateFrom);
            newDateTo = new Date(req.body.dateFrom);
            dateTo = new Date(newDateTo.setFullYear(newDateTo.getFullYear() + 1));
        } else {
            dateFrom = new Date(req.body.dateFrom);
            newDateTo = new Date(req.body.dateFrom);
            dateTo = new Date(newDateTo.setMonth(newDateTo.getMonth() + 1));
        }

        // console.log("date from: " + dateFrom);
        // console.log("date to: "+ dateTo);
        // console.log(status);
        // console.log(itemModel);
        // console.log(category1);

        if(itemModel == "default") {
            //Find all unique repair item models
            await repairModel.find({}).distinct('repairItemModel').then(async repairItemModel => {
                // console.log(repairItemModel);
                // console.log(repairItemModel.length)
        
                //Find all unique repair defects
                await repairModel.find({}).distinct('repairDefect').then(async repairDefect => {
                    // console.log(repairDefect);
                    // console.log(repairDefect.length);

                    //Find all repairs associated with each unique repair item model, each unique repair defect and the 
                    //category1 parameter with repairDate greater than dateFrom and repairDate less than dateTo parameters
                    await repairModel.find({repairItemModel: repairItemModel, repairDefect: repairDefect, repairDate: {$gte: dateFrom, $lt: dateTo}, repairStatus: status, repairCategory1: category1}).then(repair => {
                        // console.log(repair);
                    
                        //Iterate over the array of unique repair item models
                        for(let i = 0; i < repairDefect.length; i++) {
                            //Reset temporary array
                            tempArray = {};
                            //Reset temporary int
                            tempInt = 0;
                            //Iterate over the array of unique repair defects
                            for(let j = 0; j < repairItemModel.length; j++) {
                                //Iterate over the array of repairs associated with each unique repair item model and each unique
                                //repair defect
                                // console.log("length" + repair.length)
                                for(let k = 0; k < repair.length; k++) {
                                    // console.log(repairItemModel[j], repair[k].repairItemModel)
                                    // console.log(repairDefect[i], repair[k].repairDefect)
                                    //If repair item model in array of unique repair item models == repair item model in array of 
                                    //repairs associated with each unique repair item model and repair defect in array of unique
                                    //repair defects == repair defect in array of repairs associated with each unique repair
                                    //defect, increment the temporary int to count its occurence
                                    if(repairItemModel[j] == repair[k].repairItemModel && repairDefect[i] == repair[k].repairDefect) {
                                        console.log("repair k defect =" + repair[k].repairDefect);
                                        tempInt += repair[k].repairQuantity;
                                    };
                                };
                                
                            };
                            // console.log("temp int " + tempInt)
                            //Store repairDefect[i] to repairDefect key
                            tempArray.repairDefect = repairDefect[i];
                            //Store accumulated quantity to repairDefectQuantity key
                            tempArray.repairDefectQuantity = tempInt;
                            // console.log(tempArray)
                            //Store temporary array to repairTalliedQuantities
                            repairTalliedQuantities[i] = tempArray
                        };
                    }).catch(error => {
                        console.log(error);
                    });
                    console.log("tallied = " + JSON.stringify(repairTalliedQuantities));
                    //Iterate over the repair item models and Sort repairTalliedQuantities in descending order
                    repairTalliedQuantities = repairTalliedQuantities.sort(compareNumbers);
                    console.log("tallied = " + JSON.stringify(repairTalliedQuantities));
                    //Send to hbs template used
                    res.render('TDPM', {category: category1, date: req.body.dateFrom, repairItemModel: repairItemModel, repairDefect: repairDefect, repairTalliedQuantities: JSON.stringify(repairTalliedQuantities), repairTalliedQuantitiesArray: repairTalliedQuantities});
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                console.log(error);
            });
        } else if(category1 == "default") {
            //Find all unique repair item models
            await repairModel.find({}).distinct('repairItemModel').then(async repairItemModel => {
                // console.log(repairItemModel);
        
                //Find all unique repair defects
                await repairModel.find({}).distinct('repairDefect').then(async repairDefect => {
                    console.log(repairDefect)
                    //Find all repairs associated with the itemModel parameter and each unique repair defect with repairDate 
                    //greater than dateFrom and repairDate less than dateTo parameters
                    await repairModel.find({repairItemModel: itemModel, repairDefect: repairDefect, repairDate: {$gte: dateFrom, $lt: dateTo}, repairStatus: status}).then(repair => {
                        // console.log(repair);
                    
                        //Iterate over the array of unique repair item models
                        for(let i = 0; i < repairDefect.length; i++) {
                            //Iterate over the array of unique repair defects
                            for(let j = 0; j < repairItemModel.length; j++) {
                                //Reset temporary array
                                tempArray = {};
                                //Reset temporary int
                                tempInt = 0;
                                //Iterate over the array of repairs associated with each unique repair item model and each unique
                                //repair defect
                                for(let k = 0; k < repair.length; k++) {
                                    //If repair item model in array of unique repair item models == repair item model in array of 
                                    //repairs associated with each unique repair item model and repair defect in array of unique
                                    //repair defects == repair defect in array of repairs associated with each unique repair
                                    //defect, increment the temporary int to count its occurence
                                    if(repairItemModel[i] == repair[k].repairItemModel && repairDefect[j] == repair[k].repairDefect) {
                                        // console.log("repair defect =" + repair[k].repairDefect);
                                        tempInt += repair[k].repairQuantity;   
                                    };
                                };
                            // console.log("temp int " + tempInt)
                            //Store repairDefect[i] to repairDefect key
                            tempArray.repairDefect = repairDefect[i];
                            //Store accumulated quantity to repairDefectQuantity key
                            tempArray.repairDefectQuantity = tempInt;
                            // console.log(tempArray)
                            //Store temporary array to repairTalliedQuantities
                            repairTalliedQuantities[i] = tempArray
                            };
                        };
                    }).catch(error => {
                        console.log(error);
                    }); 
                    //Sort repairTalliedQuantities in descending order
                    repairTalliedQuantities = repairTalliedQuantities.sort(compareNumbers);
                    console.log("tallied = " + JSON.stringify(repairTalliedQuantities));
                    //Send to hbs template used
                    res.render('TDPM', {item: itemModel, date: req.body.dateFrom, repairItemModel: repairItemModel, repairDefect: repairDefect, repairTalliedQuantities: JSON.stringify(repairTalliedQuantities)});
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                console.log(error);
            });
        };
    },

    getPendingStatusPerItemModel: async function(req, res) { //PTPM
        let status = req.body.taskType;
        let itemModel = req.body.itemModel;
        let category1 = req.body.category1;
        let dateFrom;
        let newDateTo;
        let dateTo;
        let repairTalliedQuantities = [];
        let repairModel;
        let tempArray = [];

        if(req.body.dateFrom.length = 4){
            dateFrom = new Date(req.body.dateFrom);
            newDateTo = new Date(req.body.dateFrom);
            dateTo = new Date(newDateTo.setFullYear(newDateTo.getFullYear() + 1));
        } else {
            dateFrom = new Date(req.body.dateFrom);
            newDateTo = new Date(req.body.dateFrom);
            dateTo = new Date(newDateTo.setMonth(newDateTo.getMonth() + 1));
        }
        console.log("date from: " + dateFrom);
        console.log("date to: "+ dateTo);
        
        if(itemModel == "default") {
            //Find all unique repair item models
            await repairModel.find({}).distinct('repairItemModel').then(async repairItemModel => {
                console.log(repairItemModel);
                //Find all repairs associated with each unique repair item model and the category1 parameter with repairDate 
                //greater than dateFrom and repairDate less than dateTo parameters
                await repairModel.find({repairItemModel: repairItemModel, repairDate: {$gte: dateFrom, $lt: dateTo}, repairStatus: status, repairCategory1: category1}).then(repair => {
                    repairModel = repair;
                    // console.log(repair);
                    console.log("rep tech = " + repairItemModel)
                    console.log("rep tech length = " + repairItemModel.length)
                    console.log("repairModel length = " + repairModel.length)
                    //Iterate over the array of repairs associated with each unique repair item model
                    for(let i = 0; i < repairModel.length; i++) {
                        //Store repair item model and its status to tempArray
                        tempArray = [];
                        tempArray[0] = repairModel[i].repairItemModel;
                        tempArray[1] = repairModel[i].repairItemStatus;
                        //Store temporary array to repairTalliedQuantities
                        repairTalliedQuantities[i] = tempArray;
                        console.log("hi2: "+ i);
                    };
                }).catch(error => {
                    console.log(error);
                });
                console.log("tallied = " + repairTalliedQuantities);
                //Send to hbs template used
                res.render('PTPM', {category: category1, date: req.body.dateFrom, repairItemModel: repairItemModel, repairTalliedQuantities: repairTalliedQuantities});
            }).catch(error => {
                console.log(error);
            });
        } else if(category1 == "default") {
            //Find all unique repair item models
            await repairModel.find({}).distinct('repairItemModel').then(async repairItemModel => {
                // console.log(repairItemModel);
                
                //Find all repairs associated with the itemModel parameter with repairDate greater than dateFrom and repairDate 
                //less than dateTo parameters
                await repairModel.find({repairItemModel: itemModel, repairDate: {$gte: dateFrom, $lt: dateTo}, repairStatus: status}).then(repair => {
                    repairModel = repair;
                    // console.log(repairModel);
                    // console.log("rep tech length = " + repairItemModel.length)
                    // console.log("rep length = " + repairModel.length)
                
                    //Iterate over the array of repairs associated with each unique repair item model
                    for(let i = 0; i < repairModel.length; i++) {
                        //Store repair item model and its status to tempArray
                        tempArray = [];
                        tempArray[0] = repairModel[i].repairItemModel;
                        tempArray[1] = repairModel[i].repairItemStatus;
                        //Store temporary array to repairTalliedQuantities
                        repairTalliedQuantities[i] = tempArray;
                    };
                }).catch(error => {
                    console.log(error);
                });
                console.log("tallied = " + repairTalliedQuantities);
                //Send to hbs template used
                res.render('PTPM', {item: itemModel, date: req.body.dateFrom, repairItemModel: repairItemModel, repairTalliedQuantities: repairTalliedQuantities});
            }).catch(error => {
                console.log(error);
            });
        };
    },
};

//Export repairController to be used
module.exports = repairController;