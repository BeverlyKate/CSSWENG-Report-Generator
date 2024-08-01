const repairModel = require("../models/repairSchema.js");

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
            res.json(repair);
            res.render("table", {repair: repair});
        }).catch(error => {
            console.log("Getting all repairs error: " + error);//Copy this logic\
            const errorMessage = "Getting all repairs error";
            res.render("table", {error: errorMessage});//Copy this logic
        });
    },

    //Get Total Item Quantity Per Technician TIQPT
    getTotalItemQuantityPerTechnician: async function(req, res) {
        let dateFrom = new Date(req.body.dateFrom);
        let newDateTo = new Date(req.body.dateFrom);
        let dateTo;
        let repairTalliedQuantities = [];
        let technician = req.body.technician;
        let technicianArray = [];
        let technicianCount = 0;
        let distinctArray = [];
        let tempInt = 0;
        console.log(req.body);

        if(req.body.dateFrom.length = 4){
            dateTo = new Date(newDateTo.setFullYear(newDateTo.getFullYear() + 1));
        } else {
            dateTo = new Date(newDateTo.setMonth(newDateTo.getMonth() + 1));
        };

        if(technician == "default") {
            //Find all unique repair technicians
            await repairModel.find({}).distinct("repairTechnician1").then(async repairTechnician1 => {
                // console.log(repairTechnician1);
                //Add repairTechnician1 to technician array
                for(i = 0; i < repairTechnician1.length; i++) {
                    technicianArray[technicianCount] = repairTechnician1[i];
                    technicianCount++;
                }
            
                await repairModel.find({}).distinct("repairTechnician2").then(async repairTechnician2 => {
                    // console.log(repairTechnician2);
                    //Add repairTechnician2 to technician array
                    for(i = 0; i < repairTechnician2.length; i++) {
                        technicianArray[technicianCount] = repairTechnician2[i];
                        technicianCount++;
                    }

                    //Clear all duplicate entries in technician array
                    distinctArray = clearDuplicates(technicianArray);
                    console.log("distinct array = " + distinctArray);

                    //Find all repairs associated with each unique repair technician with repairDate greater than dateFrom and 
                    //repairDate less than dateTo parameters
                    await repairModel.find({repairTechnician1: repairTechnician1, repairTechnician2: repairTechnician2, repairDate: {$gte: dateFrom, $lte: dateTo}}).then(repair => {
                        // console.log(repair);
                        // console.log("rep tech length = " + repairTechnician.length)
                        // console.log("rep length = " + repair.length)
                
                        //Iterate over the array of unique repair technicians
                        for(i = 0; i < distinctArray.length; i++) {
                            //Reset temporary int
                            tempInt = 0;
                            //Iterate over the array of repairs associated with each unique repair technician
                            for(j = 0; j < repair.length; j++) {
                                //If repair technician in array of unique repair technicians == repair technician in array of 
                                //repairs associated with each unique repair technician, add its repair quantity value to 
                                //temporary int
                                if((distinctArray[i] == repair[j].repairTechnician1) || (distinctArray[i] == repair[j].repairTechnician2)) {
                                    console.log("hatdog");
                                    tempInt += repair[j].repairQuantity;
                                };
                            };
                            
                            //Store temporary int to repairTalliedQuantities
                            repairTalliedQuantities[i] = tempInt;
                        };
                        console.log("tallied = " + repairTalliedQuantities);
                        console.log("repairTech1 = "  + repairTechnician1);
                        console.log("repairTech2 = "  + repairTechnician2);
                        console.log("unique technicains = " + distinctArray);
                        //Send to hbs template used
                        res.render("TIQPT", {date: req.body.dateFrom, repairTechnician1: repairTechnician1, repairTechnician2: repairTechnician2, repairTalliedQuantities: repairTalliedQuantities, distinctArray: distinctArray, notDefault: false});
                    }).catch(error => {
                        console.log("Finding repairModel repairTechnician 1 repairTechnician 2 error: " + error);
                        const errorMessage = "Finding repairModel repairTechnician 1 repairTechnician 2 error";
                        res.render("TIQPT", {error: errorMessage});
                    });
                }).catch(error => {
                    console.log("Finding repairModel repairTechnician 2 error: " + error);
                    const errorMessage = "Finding repairModel repairTechnician 2 error";
                    res.render("TIQPT", {error: errorMessage});
                });
            }).catch(error => {
                console.log("Finding repairModel repairTechnician 1 error: " + error);
                const errorMessage = "Finding repairModel repairTechnician 1 error";
                res.render("TIQPT", {error: errorMessage});
            });
        } else {
            //Find all repairs associated with the technician parameter with repairDate greater than dateFrom and repairDate 
            //less than dateTo parameters
            await repairModel.find({ $or:[{repairTechnician1: technician}, {repairTechnician2: technician}], repairDate: {$gte: dateFrom, $lte: dateTo}}).then(repair => {
                //Iterate over the array of repairs associated with each unique repair technician
                for(i = 0; i < repair.length; i++) {
                    //If repair technician in array of unique repair technicians == repair technician in array of repairs
                    //associated with each unique repair technician, add its repair quantity value to temporary int
                    if((technician == repair[i].repairTechnician1) || (technician == repair[i].repairTechnician2)) {
                        console.log("hatdog");
                        tempInt += repair[i].repairQuantity;
                    };
                };

                //Store temporary int to repairTalliedQuantities
                repairTalliedQuantities = tempInt;

                console.log("tallied = " + repairTalliedQuantities);
                //Send to hbs template used
                res.render("TIQPT", {date: req.body.dateFrom, repairTechnician: technician, repairTalliedQuantities: repairTalliedQuantities, notDefault: true});
            }).catch(error => {
                console.log("Finding repairModel repairTechnician 1 or repairTechnician 2 error" + error);
                const errorMessage = "Finding repairModel repairTechnician 1 or repairTechnician 2 error";    
                res.render("TIQPT", {error: errorMessage});
            });
        };
    },

    //Get Total Item Quantity Per Item Model Per Technician TIQPMPT
    getTotalItemQuantityPerItemModelPerTechnician: async function(req, res) {
        let dateFrom = new Date(req.body.dateFrom);
        let newDateTo = new Date(req.body.dateFrom);
        let dateTo;
        let repairTalliedQuantities = [];
        let technician = req.body.technician;
        let status = req.body.taskType;
        let itemModel = req.body.category1;
        let tempInt = 0;
        console.log(req.body);

        if(req.body.dateFrom.length = 4){
            dateTo = new Date(newDateTo.setFullYear(newDateTo.getFullYear() + 1));
        } else {
            dateTo = new Date(newDateTo.setMonth(newDateTo.getMonth() + 1));
        };

        //Find all repairs associated with the required inputs taken from the request parameters with repairDate greater than 
        //dateFrom and repairDate less than dateTo parameters
        await repairModel.find({ $or:[{repairTechnician1: technician}, {repairTechnician2: technician}], repairItemModel: itemModel, repairStatus: status, repairDate: {$gte: dateFrom, $lte: dateTo}}).then(repair => {
            // console.log(repair);
            //Iterate over the array of repairs associated with the required inputs taken from the request parameters
            for(i = 0; i < repair.length; i++) {
                //If technician parameter == repair technician in array of repairs associated with the required inputs taken from
                //the request parameters and itemModel parameter == repair item model in array of repairs associated with the
                //required inputs taken from the request parameters, add its repair quantity value to temporary int
                if((technician == repair[i].repairTechnician1 && itemModel == repair[i].repairItemModel) ||
                technician == repair[i].repairTechnician2 && itemModel == repair[i].repairItemModel) {
                    tempInt += repair[i].repairQuantity;
                };
            };
            //Store temporary integer to repairTalliedQuantities
            repairTalliedQuantities[0] = tempInt;
            console.log("tallied = " + repairTalliedQuantities);

            //Send to hbs template used
            res.render("TIQPMPT", {date: req.body.dateFrom, repairTechnician: technician, repairItemModel: itemModel, repairTalliedQuantities: repairTalliedQuantities});
        }).catch(error => {
            console.log("Finding repairModel repairTechnician 1 or repairTechnician 2 with item model, status, and date error: " + error);
            const errorMessage = "Finding repairModel repairTechnician 1 or repairTechnician 2 with item model, status, and date error";    
            res.render("TIQPMPT", {error: errorMessage});
        }); 
    },

    //Get Average Working Days Per Technician AWDPT
    getAverageWorkingDaysPerTechnician: async function(req, res) {
        let dateFrom = new Date(req.body.dateFrom);
        let newDateTo = new Date(req.body.dateFrom);
        let dateTo;
        let repairAverageWorkingDays = [];
        let technician = req.body.technician;
        let technicianArray = [];
        let technicianCount = 0;
        let distinctArray = [];
        let tempInt1 = 0;
        let tempInt2 = 0;
        let averageWorkingDays = 0;

        if(req.body.dateFrom.length = 4){
            dateTo = new Date(newDateTo.setFullYear(newDateTo.getFullYear() + 1));
        } else {
            dateTo = new Date(newDateTo.setMonth(newDateTo.getMonth() + 1));
        };

        if(technician == "default") {
            //Find all unique repair technicians
            await repairModel.find({}).distinct("repairTechnician1").then(async repairTechnician1 => {
                // console.log(repairTechnician1);
                //Add repairTechnician1 to technician array
                for(i = 0; i < repairTechnician1.length; i++) {
                    technicianArray[technicianCount] = repairTechnician1[i];
                    technicianCount++;
                }
                
                await repairModel.find({}).distinct("repairTechnician2").then(async repairTechnician2 => {
                    // console.log(repairTechnician2);
                    //Add repairTechnician2 to technician array
                    for(i = 0; i < repairTechnician2.length; i++) {
                        technicianArray[technicianCount] = repairTechnician2[i];
                        technicianCount++;
                    }
                
                    //Clear all duplicate entries in technician array
                    distinctArray = clearDuplicates(technicianArray);
                    console.log("distinct array = " + distinctArray);
                
                    //Find all repairs associated with each unique repair technician with repairDate greater than dateFrom and 
                    //repairDate less than dateTo parameters
                    await repairModel.find({repairTechnician1: repairTechnician1, repairTechnician2: repairTechnician2, repairDate: {$gte: dateFrom, $lte: dateTo}}).then(repair => {
                        // console.log(repair);
                        //Iterate over the array of unique repair technicians
                        for(i = 0; i < distinctArray.length; i++) {
                            //Reset temporary int
                            tempInt1 = 0;
                            tempInt2 = 0;
                            //Iterate over the array of repairs associated with each unique repair technician
                            for(j = 0; j < repair.length; j++) {
                                //If repair technician in array of unique repair technicians == repair technician in array of 
                                //repairs associated with each unique repair technician, add its repair quantity value to 
                                //temporary int
                                if((distinctArray[i] == repair[j].repairTechnician1) || (distinctArray[i] == repair[j].repairTechnician2)) {
                                    if(repair[j].repairDateFinished == "NaN") {

                                    } else {
                                        tempInt1 += parseInt(repair[j].repairDateStarted);
                                        tempInt2 += parseInt(repair[j].repairDateFinished);
                                    };
                                    // console.log(tempInt1);
                                    // console.log(tempInt2);
                                };
                            };
                            //Average working days = summation of date finished - summation of date started
                            averageWorkingDays = (tempInt2 - tempInt1) / repair.length;
                
                            //Store averageWorkingDays to repairAverageWorkingDays
                            repairAverageWorkingDays[i] = averageWorkingDays;
                        };
                    }).catch(error => {
                        console.log("Finding repairModel repair technician 1, repair technician 2, and repair date error: " + error);
                        const errorMessage = "Finding repairModel repair technician 1, repair technician 2, and repair date error";    
                        res.render("AWDPT", {error: errorMessage});
                    });
                }).catch(error => {
                    console.log("Finding repairModel repair technician 2 error: " + error);
                    const errorMessage = "Finding repairModel repair technician 2 error";    
                    res.render("AWDPT", {error: errorMessage});
                });
                console.log("tallied = " + repairAverageWorkingDays);
                //Send to hbs template used
                res.render("AWDPT", {date: req.body.dateFrom, repairTechnician: distinctArray, repairAverageWorkingDays: repairAverageWorkingDays, notDefault: false});
            }).catch(error => {
                console.log("Finding repairModel repair technician 1 error: " + error);
                const errorMessage = "Finding repairModel repair technician 1 error";    
                res.render("AWDPT", {error: errorMessage});
            });
        } else {
            //Find all repairs associated with each unique repair technician with repairDate greater than dateFrom and 
            //repairDate less than dateTo parameters
            await repairModel.find({ $or:[{repairTechnician1: technician}, {repairTechnician2: technician}], repairDate: {$gte: dateFrom, $lte: dateTo}}).then(repair => {
                // console.log(repair)
                //Iterate over the array of repairs associated with each unique repair technician
                for(i = 0; i < repair.length; i++) {
                    //If repair technician in array of unique repair technicians == repair technician in array of repairs
                    //associated with each unique repair technician, add its repair quantity value to temporary int
                    if((technician == repair[i].repairTechnician1) || (technician == repair[i].repairTechnician2)) {
                        if(repair[i].repairDateFinished == "NaN") {

                        } else {
                            tempInt1 += parseInt(repair[i].repairDateStarted);
                            tempInt2 += parseInt(repair[i].repairDateFinished);
                        };
                        // console.log(tempInt1);
                        // console.log(tempInt2);
                    };
                };
                //Average working days = summation of date finished - summation of date started
                averageWorkingDays = (tempInt2 - tempInt1) / repair.length;
                console.log(tempInt2 - tempInt1)
                console.log(averageWorkingDays);

                //Store averageWorkingDays to repairAverageWorkingDays
                repairAverageWorkingDays = averageWorkingDays;

                // console.log("tallied = " + repairAverageWorkingDays);
                //Send to hbs template used
                res.render("AWDPT", {date: req.body.dateFrom, repairTechnician: technician, repairAverageWorkingDays: repairAverageWorkingDays, notDefault: true});
            }).catch(error => {
                console.log("Finding repairModel repairTechnician 1 or repairTechnician 2 with date error: " + error);
                const errorMessage = "Finding repairModel repairTechnician 1 or repairTechnician 2 with date error";    
                res.render("AWDPT", {error: errorMessage});
            });
        };
    },

    getTotalItemQuantityPerItemModel: async function(req, res) {
        let category1 = req.body.category1;
        let dateFrom = new Date(req.body.dateFrom);
        let newDateTo = new Date(req.body.dateFrom);
        let dateTo;
        let repairTalliedQuantities = [];
        let tempInt = 0;
        console.log("I am in tiqpm" + req.body.category1)

        if(req.body.dateFrom.length = 4){
            dateTo = new Date(newDateTo.setFullYear(newDateTo.getFullYear() + 1));
        } else {
            dateTo = new Date(newDateTo.setMonth(newDateTo.getMonth() + 1));
        };
        console.log("date from: " + dateFrom);
        console.log("date to: "+ dateTo);
    
        if(category1 == "default") {
            //Find all unique repair item models
            await repairModel.find({}).distinct("repairItemModel").then(async repairItemModel => {
                console.log(repairItemModel);
                //Find all repairs associated with each unique repair item model with repairDate greater than dateFrom and 
                //repairDate less than dateTo parameters
                await repairModel.find({repairItemModel: repairItemModel, repairDate: {$gte: dateFrom, $lte: dateTo}}).then(repair => {
                    console.log(repair);
                    //Iterate over the array of unique repair item models
                    for(let i = 0; i < repairItemModel.length; i++) {
                        //Reset temporary int
                        tempInt = 0;
                        //Iterate over the array of repairs associated with each unique repair item model
                        for(let j = 0; j < repair.length; j++) {
                            //If repair item model in array of unique repair item models == repair technician in array of repairs
                            //associated with each unique repair item model, add its repair quantity value to temporary int
                            if(repairItemModel[i] == repair[j].repairItemModel) {
                              console.log("true")
                                tempInt += repair[j].repairQuantity;
                            };
                        };
                        //Store temporary int to repairTalliedQuantities
                        repairTalliedQuantities[i] = tempInt;
                    };

                    console.log("tallied = " + repairTalliedQuantities);
                    //Send to hbs template used
                    res.render("IQPM", {date: req.body.dateFrom, repairItemModel: repairItemModel, repairTalliedQuantities: repairTalliedQuantities});
                }).catch(error => {
                    console.log("Cannot find Repair Item Model error: " + error);
                    const errorMessage = "Cannot find Repair Item Model error";    
                    res.render("IQPM", {error: errorMessage});
                });
            }).catch(error => {
                console.log("Cannot find all Repair Item Models error: " + error);
                const errorMessage = "Cannot find all Repair Item Models error";    
                res.render("IQPM", {error: errorMessage});
            });
        } else {
            //Find all unique repair item models
            await repairModel.find({}).distinct("repairItemModel").then(async repairItemModel => {
                console.log(repairItemModel);
                //Find all repairs associated with each unique repair item model and the category1 parameter with repairDate 
                //greater than dateFrom and repairDate less than dateTo parameters
                console.log(dateFrom)
                console.log(dateTo)
                await repairModel.find({repairItemModel: repairItemModel, repairDate: {$gte: dateFrom, $lte: dateTo}, repairCategory1: category1}).then(repair => {
                    // repair = repair;
                    console.log(repair);
                    //Iterate over the array of unique repair item models
                    for(let i = 0; i < repairItemModel.length; i++) {
                        //Reset temporary int
                        tempInt = 0;
                        //Iterate over the array of repairs associated with each unique repair item model
                        for(let j = 0; j < repair.length; j++) {
                            //If repair item model in array of unique repair item models == repair technician in array of repairs
                            //associated with each unique repair item model, add its repair quantity value to temporary int
                            if(repairItemModel[i] == repair[j].repairItemModel) {
                              console.log("true")
                                tempInt += repair[j].repairQuantity;
                            };
                        };
                        //Store temporary int to repairTalliedQuantities
                        repairTalliedQuantities[i] = tempInt;
                    };
                    console.log("tallied = " + repairTalliedQuantities);
                    //Send to hbs template used
                    res.render("IQPM", {category: category1, date: req.body.dateFrom, repairItemModel: repairItemModel, repairTalliedQuantities: repairTalliedQuantities});
                }).catch(error => {
                    console.log("Cannot find Repair Item Model error: " + error);
                    const errorMessage = "Cannot find Repair Item Model error";    
                    res.render("IQPM", {error: errorMessage});
                });
            }).catch(error => {
                console.log("Cannot find all Repair Item Models error: " + error);
                const errorMessage = "Cannot find all Repair Item Models error";    
                res.render("IQPM", {error: errorMessage});
            });
        };
    },

    getTopDefectsPerItemModel: async function(req, res) {
        let status = req.body.taskType;
        let itemModel = req.body.itemModel;
        let category1 = req.body.category1;
        let dateFrom = new Date(req.body.dateFrom);
        let newDateTo = new Date(req.body.dateFrom);
        let dateTo;
        let repairTalliedQuantities = [];
        let tempInt = 0;
        let tempArray = [];

        if(req.body.dateFrom.length = 4){
            dateTo = new Date(newDateTo.setFullYear(newDateTo.getFullYear() + 1));
        } else {
            dateTo = new Date(newDateTo.setMonth(newDateTo.getMonth() + 1));
        };

        if(itemModel == "default") {
            //Find all unique repair item models
            await repairModel.find({}).distinct("repairItemModel").then(async repairItemModel => {
                // console.log(repairItemModel);
                // console.log(repairItemModel.length)
        
                //Find all unique repair defects
                await repairModel.find({}).distinct("repairDefect").then(async repairDefect => {
                    // console.log(repairDefect);
                    // console.log(repairDefect.length);

                    //Find all repairs associated with each unique repair item model, each unique repair defect and the 
                    //category1 parameter with repairDate greater than dateFrom and repairDate less than dateTo parameters
                    console.log(dateFrom)
                    console.log(dateTo)
                    await repairModel.find({repairItemModel: repairItemModel, repairDefect: repairDefect, repairDate: {$gte: dateFrom, $lte: dateTo}, repairStatus: status, repairCategory1: category1}).then(repair => {
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
                                for(let k = 0; k < repair.length; k++) {
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
                            //Store repairDefect[i] to repairDefect key
                            tempArray.repairDefect = repairDefect[i];
                            //Store accumulated quantity to repairDefectQuantity key
                            tempArray.repairDefectQuantity = tempInt;
                            // console.log(tempArray)
                            //Store temporary array to repairTalliedQuantities
                            repairTalliedQuantities[i] = tempArray
                        };
                        //Iterate over the repair item models and Sort repairTalliedQuantities in descending order
                        repairTalliedQuantities = repairTalliedQuantities.sort(compareNumbers);
                        console.log("tallied = " + JSON.stringify(repairTalliedQuantities));
                        //Send to hbs template used
                        res.render("TDPM", {category: category1, date: req.body.dateFrom, repairItemModel: repairItemModel, repairDefect: repairDefect, repairTalliedQuantities: JSON.stringify(repairTalliedQuantities), repairTalliedQuantitiesArray: repairTalliedQuantities});
                    }).catch(error => {
                        console.log("Cannot find Repair Item Model defect, date, status, and category error: " + error);
                        const errorMessage = "Cannot find Repair Item Model defect, date, status, and category error";    
                        res.render("TDPM", {error: errorMessage});
                    });
                }).catch(error => {
                    console.log("Cannot find all Repair Defects error: " + error);
                    const errorMessage = "Cannot find all Repair Defects error";    
                    res.render("TDPM", {error: errorMessage});
                });
            }).catch(error => {
                console.log("Cannot find all Repair Item Models error: " + error);
                const errorMessage = "Cannot find all Repair Item Models error";    
                res.render("TDPM", {error: errorMessage});
            });
        } else if(category1 == "default") {
            //Find all unique repair item models
            await repairModel.find({}).distinct("repairItemModel").then(async repairItemModel => {
                // console.log(repairItemModel);
                //Find all unique repair defects
                await repairModel.find({}).distinct("repairDefect").then(async repairDefect => {
                    console.log(repairDefect)
                    //Find all repairs associated with the itemModel parameter and each unique repair defect with repairDate 
                    //greater than dateFrom and repairDate less than dateTo parameters
                    await repairModel.find({repairItemModel: itemModel, repairDefect: repairDefect, repairDate: {$gte: dateFrom, $lte: dateTo}, repairStatus: status}).then(repair => {
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
                                        tempInt += repair[k].repairQuantity;   
                                    };
                                };
                            //Store repairDefect[i] to repairDefect key
                            tempArray.repairDefect = repairDefect[i];
                            //Store accumulated quantity to repairDefectQuantity key
                            tempArray.repairDefectQuantity = tempInt;
                            // console.log(tempArray)
                            //Store temporary array to repairTalliedQuantities
                            repairTalliedQuantities[i] = tempArray
                            };
                        };
                        //Sort repairTalliedQuantities in descending order
                        repairTalliedQuantities = repairTalliedQuantities.sort(compareNumbers);
                        console.log("tallied = " + JSON.stringify(repairTalliedQuantities));
                        //Send to hbs template used
                        res.render("TDPM", {item: itemModel, date: req.body.dateFrom, repairItemModel: repairItemModel, repairDefect: repairDefect, repairTalliedQuantities: JSON.stringify(repairTalliedQuantities)});
                    }).catch(error => {
                        console.log("Cannot find Repair Item Model defect, date, and status error: " + error);
                        const errorMessage = "Cannot find Repair Item Model defect, date, status error";    
                        res.render("TDPM", {error: errorMessage});
                    }); 
                }).catch(error => {
                    console.log("Cannot find all Repair Defects error: " + error);
                    const errorMessage = "Cannot find all Repair Defects error";    
                    res.render("TDPM", {error: errorMessage});
                });
            }).catch(error => {
                console.log("Cannot find all Repair Item Models error: " + error);
                const errorMessage = "Cannot find all Repair Item Models error";    
                res.render("TDPM", {error: errorMessage});
            });
        };
    },

    getPendingStatusPerItemModel: async function(req, res) { //PTPM
        let status = req.body.taskType;
        let itemModel = req.body.itemModel;
        let category1 = req.body.category1;
        let dateFrom = new Date(req.body.dateFrom);
        let newDateTo = new Date(req.body.dateFrom);
        let dateTo;
        let repairTalliedQuantities = [];
        let tempArray = [];

        if(req.body.dateFrom.length = 4){
            dateTo = new Date(newDateTo.setFullYear(newDateTo.getFullYear() + 1));
        } else {
            dateTo = new Date(newDateTo.setMonth(newDateTo.getMonth() + 1));
        };
        console.log("date from: " + dateFrom);
        console.log("date to: "+ dateTo);
        
        if(itemModel == "default") {
            //Find all unique repair item models
            await repairModel.find({}).distinct("repairItemModel").then(async repairItemModel => {
                console.log(repairItemModel);
                //Find all repairs associated with each unique repair item model and the category1 parameter with repairDate 
                //greater than dateFrom and repairDate less than dateTo parameters
                await repairModel.find({repairItemModel: repairItemModel, repairDate: {$gte: dateFrom, $lte: dateTo}, repairStatus: status, repairCategory1: category1}).then(repair => {
                    // console.log(repair);
                    console.log("rep tech = " + repair)
                    console.log("rep tech length = " + repair.length)
                    console.log("repairModel length = " + repair.length)
                    //Iterate over the array of repairs associated with each unique repair item model
                    for(let i = 0; i < repair.length; i++) {
                        //Store repair item model and its status to tempArray
                        tempArray = [];
                        tempArray[0] = repair[i].repairItemModel;
                        tempArray[1] = repair[i].repairItemStatus;
                        //Store temporary array to repairTalliedQuantities
                        repairTalliedQuantities[i] = tempArray;
                        console.log("hi2: "+ i);
                    };
                    console.log("tallied = " + repairTalliedQuantities);
                    //Send to hbs template used
                    res.render("PTPM", {category: category1, date: req.body.dateFrom, repairItemModel: repairItemModel, repairTalliedQuantities: repairTalliedQuantities});
                }).catch(error => {
                    console.log("Cannot find Repair Item Model with date, status, and category error: " + error);
                    const errorMessage = "Cannot find Repair Item Model with date, status, and category error";    
                    res.render("PTPM", {error: errorMessage});
                });
            }).catch(error => {
                console.log("Cannot find all Repair Item Models error: " + error);
                const errorMessage = "Cannot find all Repair Item Models error";    
                res.render("PTPM", {error: errorMessage});
            });
        } else if(category1 == "default") {
            //Find all unique repair item models
            await repairModel.find({}).distinct("repairItemModel").then(async repairItemModel => {
                // console.log(repairItemModel);
                //Find all repairs associated with the itemModel parameter with repairDate greater than dateFrom and repairDate 
                //less than dateTo parameters
                await repairModel.find({repairItemModel: itemModel, repairDate: {$gte: dateFrom, $lte: dateTo}, repairStatus: status}).then(repair => {
                    // console.log(repairModel);
                
                    //Iterate over the array of repairs associated with each unique repair item model
                    for(let i = 0; i < repair.length; i++) {
                        //Store repair item model and its status to tempArray
                        tempArray = [];
                        tempArray[0] = repair[i].repairItemModel;
                        tempArray[1] = repair[i].repairItemStatus;
                        //Store temporary array to repairTalliedQuantities
                        repairTalliedQuantities[i] = tempArray;
                    };
                    console.log("tallied = " + repairTalliedQuantities);
                    //Send to hbs template used
                    res.render("PTPM", {item: itemModel, date: req.body.dateFrom, repairItemModel: repairItemModel, repairTalliedQuantities: repairTalliedQuantities});
                }).catch(error => {
                    console.log("Cannot find Repair Item Model with date, and status error: " + error);
                    const errorMessage = "Cannot find Repair Item Model with date, and status error";    
                    res.render("PTPM", {error: errorMessage});
                });
            }).catch(error => {
                console.log("Cannot find all Repair Item Models error: " + error);
                const errorMessage = "Cannot find all Repair Item Models error";    
                res.render("PTPM", {error: errorMessage});
            });
        };
    },
};

//Export repairController to be used
module.exports = repairController;