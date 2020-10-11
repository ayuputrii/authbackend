const db = require('../Helpers/db');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authModel = {
    register: (body) => {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, function(err, salt) {
                const { password } = body
                bcrypt.hash(password, salt, function(err, hashedPassword) {
                    const newBody = {...body, password: hashedPassword }
                    if (err) {
                        reject(err)
                    }
                    const query = "INSERT INTO users SET ?";
                    db.query(query, newBody, (err, data) => {
                        if (!err) {
                            resolve(newBody)
                        } else {
                            reject(err)
                        }
                    })
                })
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

                        bcrypt.compare(password, dataUser.password, (err, result) => {
                            if (err) {
                                reject("Password doesn't Match!");
                            } else {
                                if (!result) {
                                    reject(err)
                                } else {
                                    const mysql = 'SELECT * FROM users WHERE password = ?';
                                    db.query(mysql, dataUser.password, (err, data) => {
                                        if (!err) {
                                            resolve(token)
                                        } else {
                                            reject("Password doesn't Match!");
                                        }
                                    });
                                }
                            }
                        });
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
                db.query(`UPDATE users SET ? WHERE id = ${id}`, newBody, (err, data) => {
                    if (!err) {
                        resolve(newBody);
                    } else {
                        reject(err);
                    }
                });
            });
        });
    },

    delete: (setData) => {
        return new Promise((resolve, reject) => {
            const mysql = "DELETE FROM users WHERE id = ?";
            db.query(mysql, setData, (err, data) => {
                if (!err) {
                    resolve(data);
                } else {
                    reject(err.message);
                }
            });
        });
    },
}

module.exports = authModel

// route.use('/users', userController.getAllusers);
// route.use('/users', userController.getAllusers);