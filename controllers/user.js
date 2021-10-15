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

// exports.read = (req, res) => {
//     req.profile.hashed_password = undefined;
//     return res.json(req.profile);
// };

// exports.update = (req, res) => {
//     // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
//     const { name, phone } = req.body;
//     console.log("name", name)
//     console.log("phone", phone)


//     User.find({ _id: req.user._id }, (err, user) => {
//         if (err || !user) {
//             return res.status(400).json({
//                 error: 'User not found'
//             });
//         }
//         user.phone = phone;



//         if (!name) {
//             return res.status(400).json({
//                 error: 'Name is required'
//             });
//         } else {
//             user.name = name;
//         }

        
//         user.save((err, updatedUser) => {
//             if (err) {
//                 console.log('USER UPDATE ERROR', err);
//                 return res.status(400).json({
//                     error: 'User update failed'
//                 });
//             }
//             // updatedUser.hashed_password = undefined;
//             // updatedUser.salt = undefined;
//             res.json(updatedUser);
//         });
//     });
// };
exports.update = (req, res) => {
    // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
    const { name, phone } = req.body;
    console.log("name", name)
    console.log("phone", phone)



    User.findOne({ _id: req.user._id }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
         user.phone = phone;
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


exports.updatePassword = (req, res) => {
    const { password, cPassword } = req.body;
    console.log("password", password)
    console.log("cPassword", cPassword)
    User.findOne({ _id: req.user._id }, (err, pass) => {
        if (err || !pass) {
            return res.status(400).json({
                err: 'User not found'
            });
        }


        if (password == cPassword) {
            if (password.length < 6) {
                return res.status(400).json({
                    error: 'Password should be min 6 characters long'
                });
            } else {
                pass.password = password;
            }
        }
        else {
            return res.status(400).json({
                error: 'Password not matched'
            });
        }

        pass.save((err, updatedPassword) => {
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



