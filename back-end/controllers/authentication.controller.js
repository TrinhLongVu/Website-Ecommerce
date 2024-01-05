const jwt = require('jsonwebtoken');
exports.fail = (req, res) => {
    res.json({
        status: "failed",
    })
}

exports.success = (req, res) => {
    const id = req.user._id;
    const token = jwt.sign({
        id
    }, 'your-secret-key', {
        expiresIn: '5h'
    });
    res.cookie('token', token, { expires: new Date(Date.now() + 60 * 1000)});
    res.json({
        token
    });
}

exports.signup = async (req, res) => {
    try {
        const {
            UserName,
            Password,
            ConfirmPassword
        } = req.body;
        if (!UserName || !Password || !ConfirmPassword) {
            return res.status(400).json({
                status: "fail",
                msg: "Please fill full information",
            });
        }
        const isTaken = await User.findOne({
            UserName
        });

        if (isTaken) {
            return res.status(400).json({
                status: "fail",
                msg: "Username is already taken",
            });
        }

        if (Password != ConfirmPassword) {
            return res.status(400).json({
                status: "fail",
                msg: "incorrect Confirm Password",
            });
        }

        const NewBody = {
            UserName: UserName,
            Password: Password,
        }
        const saltRounds = 10
        bcrypt.hash(NewBody.Password, saltRounds, async function (err, hash) {
            if (err) {
                return next(err);
            }
            const newUser = await User.create({
                UserName: NewBody.UserName,
                Password: hash
            });

            res.status(201).json({
                status: 'Create success',
                data: {
                    user: newUser
                }
            })
        })

    } catch (err) {
        res.status(400).json({
            status: "fail",
            msg: err
        })
    }
}