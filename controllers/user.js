const User = require('../models/users');



exports.read = (req, res) => {
    const userId = req.params.id;
    User.findById(userId).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    });
};

exports.update = (req, res) => {
    // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
    const { name,  mobile, address } = req.body;

    User.findOne({ _id: req.user._id }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        user.mobile = mobile;
        user.address = address;
        
        if (!name) {
            return res.status(400).json({
                error: 'Name is required'
            });
        } else {
            user.name = name;
        }

        // if (password == cPassword ) {
        //     if (password.length < 6) {
        //         return res.status(400).json({
        //             error: 'Password should be min 6 characters long'
        //         });
        //     } else {
        //         user.password = password;
        //     }
        // }
        // else{
        //     return res.status(400).json({
        //         error: 'Password not matched'
        //     });
        // }


        user.save((err, updatedUser) => {
            if (err) {
                console.log('USER UPDATE ERROR', err);
                return res.status(400).json({
                    error: 'User update failed'
                });
            }
            // updatedUser.hashed_password = undefined;
            // updatedUser.salt = undefined;
            res.json(updatedUser);
        });
    });
};

// exports.update = async (req, res) => {
    
// } 

exports.updatePassword = (req, res) => {
    const { password, cPassword } = req.body;
    User.findOne({ _id: req.user._id }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
       

        if (password == cPassword ) {
            if (password.length < 6) {
                return res.status(400).json({
                    error: 'Password should be min 6 characters long'
                });
            } else {
                user.password = password;
            }
        }
        else{
            return res.status(400).json({
                error: 'Password not matched'
            });
        }

        user.save((err, updatedPassword) => {
            if (err) {
                console.log('Password  UPDATE ERROR', err);
                return res.status(400).json({
                    error: 'Password update failed'
                });
            }
            updatedPassword.hashed_password = undefined;
            updatedPassword.salt = undefined;
            res.json(updatedPassword);
        });
    });
}


