const authModel = require('../Models/authModel');
const Response = require("../Helpers/response");
module.exports = {
    register: (req, res) => {
        authModel
            .register(req.body)
            .then((data) => {
                res.status(201).send({
                    success: true,
                    message: "Register Successfully",
                    data: data,
                });
            })
            .catch((err) => {
                res.send({
                    success: false,
                    message: err.message,
                });
            });
    },

    login: (req, res) => {
        authModel
            .login(req.body)
            .then((data) => {
                res.status(200).send({
                    success: true,
                    message: "Login Successfully",
                    token: data,
                });
            })
            .catch((err) => {
                console.log(err)
                res.send({
                    success: false,
                    message: err.message,
                });
            });
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

    delete: (req, res) => {
        authModel
            .delete(req.params.id)
            .then((data) => {
                res.status(200).send({
                    success: true,
                    message: "Delete Was Delete",
                });
            })
            .catch((err) => {
                res.send({
                    success: false,
                    message: "Data Has Been Deleted!",
                });
            });
    },
};