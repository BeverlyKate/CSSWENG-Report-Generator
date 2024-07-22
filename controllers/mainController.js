const bcrypt = require('bcrypt') 
const User = require('../models/userSchema');

const mainController = {
    //Login feature
    login: async function(req, res) {
        res.render('login');    
    },

    //Load Home Page
    getMain: async function(req, res) {
        username = req.body.username;
        password = req.body.password;
        
        try {
            console.log(username)
            const user = await User.findOne({ username });
            console.log(user)
      
            if (!user) {
              const error = "Invalid username";
              return res.render('login', { error });
            }
      
            const passwordMatch = await bcrypt.compare(password, user.passwordHash);
            console.log(password)
            console.log(passwordHash)
            if (passwordMatch) {
              return res.render('home');
            } else {
              const error = "Invalid Password";
              return res.render('login', { error });
            }
          } catch (error) {
            console.error('Error during login:', error);
            res.status(500).send('Internal Server Error');
          }
        },

    getImport: async function(req, res) {
        res.render('import');
    },

    getHome: async function(req, res) {
        res.render('home');
    }

};

//Export mainController to be used
module.exports = mainController;