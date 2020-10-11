const userModel = require('../Models/userModel');
const Response = require("../Helpers/response");

module.exports = {
    getAllusers: (req, res) => {
        userModel
            .getAllusers()
            .then((data) => res.send(data))
            .catch((err) => console.log(err));
    },

    update: (req, res) => {
        const { id } = req.params;
        authModel
            .update(req.body, id)
            .then((data) => {
                res.status(201).send({
                    success: true,
                    message: "Succesfully Update!",
                    data: data,
                });
            })
            .catch((err) => {
                console.log(err)
                res.send({
                    success: false,
                    mesage: err.message,
                });
            });
    },

};