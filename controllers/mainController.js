const mainController = {
    //Load Home Page
    getMain: async function(req, res) {
        res.render('home');
    },

    //Login feature
    login: async function(req, res) {
        res.render('login');
    },

    //Load Item Quantity Per Model Filter
    getItemQuantityPerModel: async function(req, res) {
        res.render('IQPM');
    },

    //Load Pending Tasks Per Model Filter
    getPendingTasksPerModel: async function(req, res) {
        res.render('PTPM');
    },

    //Load Top Defects Per Model Filter
    getTopDefectsPerModel: async function(req, res) {
        res.render('TDPM');
    }
};

//Export mainController to be used
module.exports = mainController;