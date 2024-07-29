const mainController = {
    //Login feature
    login: async function(req, res) {
        res.render("login");    
    },

    //Load Home Page
    getMain: async function(req, res) {
        let username = req.body.username;
        let password = req.body.password;

        if(username == "Admin") { 
            if(password == 12345678) {
                res.render("home");
            } else {
                const errorMessage = "Invalid username or password";
                res.render("login", {error: errorMessage});
            }
        } else {
            const errorMessage = "Invalid username or password";
            res.render("login", {error: errorMessage});
        };
    },

    getImport: async function(req, res) {
        res.render("import");
    },

    getHome: async function(req, res) {
        res.render("home");
    }
};

//Export mainController to be used
module.exports = mainController;