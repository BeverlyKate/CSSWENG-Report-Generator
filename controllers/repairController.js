const repairModel = require('../models/repairSchema.js');
// const repairIdModel = require('../models/repairIdSchema.js');

//Returns the compared values in descending order
function compareNumbers(a, b) {
    return b.repairDefectQuantity - a.repairDefectQuantity;
};

//Clears and returns all duplicate technician entries
function clearDuplicates(technician) {
    var distinctArray = [];
    var count = 0;
   
  // Start only when a repeated value is not encountered
    var start = false;
   
    //Iterate over technician array
    for (i = 0; i < technician.length; i++) {
        //Iterate over distinct array
        for (j = 0; j < distinctArray.length; j++) {
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
            console.log("Getting all repairs error: " + error);
        });
    },

    getPendingStatusPerItemModel: async function(req, res) { //PTPM
        console.log(req.body.dateFrom);
        console.log("length" + req.body.dateFrom.length);
        console.log(req.body.dateTo);
        if(req.body.dateFrom.length = 4){
            var dateFrom = new Date(req.body.dateFrom);
            var newDateTo = new Date(req.body.dateFrom);
            var dateTo = new Date(newDateTo.setFullYear(newDateTo.getFullYear() + 1));
        } else {
            var dateFrom = new Date(req.body.dateFrom);
            var newDateTo = new Date(req.body.dateFrom);
            var dateTo = new Date(newDateTo.setMonth(newDateTo.getMonth() + 1));
        }

        var category1 = req.body.category1;

        console.log("date from: " + dateFrom);
        console.log("date to: "+ dateTo);
    
        console.log(req.body);

        var status = req.body.taskType;
        var itemModel = req.body.itemModel;
        var category1 = req.body.category1;
        
        if(itemModel == "default") {
            //Find all unique repair item models
            await repairModel.find({}).distinct('repairItemModel').then(async repairItemModel => {
                 console.log("hi0: "+repairItemModel);
                var repairTalliedQuantities = [];
                
                //Find all repairs associated with each unique repair item model and the category1 parameter with repairDate 
                //greater than dateFrom and repairDate less than dateTo parameters
                await repairModel.find({repairItemModel: repairItemModel, repairDate: {$gte: dateFrom, $lt: dateTo}, repairStatus: status, repairCategory1: category1}).then(repair => {
                    var repair = repair;
                    // console.log(repair);
                    console.log("rep tech = " + repairItemModel)
                    console.log("rep tech length = " + repairItemModel.length)
                    console.log("rep length = " + repair.length)
                    console.log("hi1: "+ repair);
                    //Iterate over the array of repairs associated with each unique repair item model
                    for(i = 0; i < repair.length; i++) {
                        //Store repair item model and its status to tempArray
                        tempArray = [];
                        tempArray[0] = repair[i].repairItemModel;
                        tempArray[1] = repair[i].repairItemStatus;
                        //Store temporary array to repairTalliedQuantities
                        repairTalliedQuantities[i] = tempArray;
                        console.log("hi2: "+ i);
                    };
                });
                console.log("tallied = " + repairTalliedQuantities);
                //Send to hbs template used
                res.render('PTPM', {category: category1, date: req.body.dateFrom, repairItemModel: repairItemModel, repairTalliedQuantities: repairTalliedQuantities});
            });
        } else if(category1 == "default") {
            //Find all unique repair item models
            await repairModel.find({}).distinct('repairItemModel').then(async repairItemModel => {
                // console.log(repairItemModel);
                var repairTalliedQuantities = [];
                
                //Find all repairs associated with the itemModel parameter with repairDate greater than dateFrom and repairDate 
                //less than dateTo parameters
                await repairModel.find({repairItemModel: itemModel, repairDate: {$gte: dateFrom, $lt: dateTo}, repairStatus: status}).then(repair => {
                    var repair = repair;
                    // console.log(repair);
                    // console.log("rep tech length = " + repairItemModel.length)
                    // console.log("rep length = " + repair.length)
                
                    //Iterate over the array of repairs associated with each unique repair item model
                    for(i = 0; i < repair.length; i++) {
                        //Store repair item model and its status to tempArray
                        tempArray = [];
                        tempArray[0] = repair[i].repairItemModel;
                        tempArray[1] = repair[i].repairItemStatus;
                        //Store temporary array to repairTalliedQuantities
                        repairTalliedQuantities[i] = tempArray;
                    };
                });
                console.log("tallied = " + repairTalliedQuantities);
                //Send to hbs template used
                res.render('PTPM', {item: itemModel, date: req.body.dateFrom, repairItemModel: repairItemModel, repairTalliedQuantities: repairTalliedQuantities});
            });
        };
    },
};

//Export repairController to be used
module.exports = repairController;