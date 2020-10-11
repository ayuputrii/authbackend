const db = require('../Helpers/db');
const userRoute = require('../Routes/userRoutes');

const userModel = {
    getAllusers: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users', (err, res) => {
                if (!err) {
                    resolve(res)
                }
                console.log(err)
            })
        })
    },

    login: (body) => {
        return new Promise((resolve, reject) => {
            const { email, password } = body
            const query = "SELECT * FROM users WHERE email = ?";
            db.query(query, email, (err, data) => {
                let dataUser = data[0]
                if (!data.length) {
                    console.log(data);
                    reject("Email doesn't Match!")
                } else {
                    if (!err) {
                        const token = jwt.sign({
                            id: dataUser.id,
                            email: dataUser.email,
                        }, process.env.SECRET_KEY);
                        jwt.sign(token, process.SECRET_KEY, function(err, decoded) {
                            if (!err) {
                                reject(token);
                            } else {
                                reject(err);
                            }
                        })
                    } else {
                        reject(err);
                    }
                }
            });
        });
    },

    update: (body, id) => {
        return new Promise((resolve, reject) => {
            const { password } = body;
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                const newBody = {...body, password: hashedPassword };
                console.log(newBody);
                if (err) {
                    reject(err);
                }
                db.query(`UPDATE users SET ? WHERE id = ${id}`, newBody, (err, res) => {
                    if (!err) {
                        resolve(res);
                    } else {
                        reject(err);
                    }
                });
            });
        });
    },
}

module.exports = userModel

// route.use('/users', userController.getAllusers);