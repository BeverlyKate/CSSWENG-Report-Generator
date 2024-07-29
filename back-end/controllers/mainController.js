const bcrypt = require('bcrypt') 
const User = require('../models/userSchema.js');

const mainController = {
    //Login feature
    login: async function(req, res) {
        res.render("login");    
    },

    //Load Home Page
    getMain: async function(req, res) {
        let username = req.body.username;
        let password = req.body.password;

        try {
            let user;
            console.log(username)

            user = await User.findOne({ userName: username });

            console.log(user)
            
            if (!user) {
              const error = "Invalid username";
              return res.render('login', { error });
            }

            const passwordMatch = await bcrypt.compare(password, user.passwordHash);
            console.log(password)
            console.log(user.passwordHash)
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
        res.render("import");
    },

    getHome: async function(req, res) {
        res.render("home");
    },

    getRecovery: async function(req, res) {
        res.render("recovery");
    },

    postRecovery: async function(req, res) {
        const { email, username, password, retypePassword } = req.body;

        if (password !== retypePassword) {
            return res.render('recovery', { error: 'Passwords do not match' });
        }

        try {
            const user = await User.findOne({ userName: username, email: email });
            if (!user) {
                return res.render('recovery', { error: 'User not found' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            user.passwordHash = hashedPassword;
            await user.save();

            res.render('login', { error: 'Password reset successful! Please login with your new password.' });
        } catch (error) {
            console.error('Error during password recovery:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    getRegister: async function(req, res) {
        res.render("register");
    },

    postRegister: async function(req, res) {
        const { email, username, password, retypePassword, role } = req.body;

        if (password !== retypePassword) {
            return res.render('register', { error: 'Passwords do not match' });
        }

        try {
            const existingUser = await User.findOne({ userName: username });
            if (existingUser) {
                return res.render('register', { error: 'Username already exists' });
            }

            const existingEmail = await User.findOne({ email: email });
            if (existingEmail) {
                return res.render('register', { error: 'Email already in use' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                email: email,
                userName: username,
                passwordHash: hashedPassword,
                role: role
            });

            await newUser.save();

            res.render('login', { error: 'Registration successful! Please login.' });
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).send('Internal Server Error');
        }
    }
};

//Export mainController to be used
module.exports = mainController;