'use strict';

const mongoose = require('mongoose')
,	Saberes = require('../models/saberes-schema');

module.exports.createSaberes = (newSaberes, callback) => {
	newSaberes.save((callback) => {
		//if(err) throw err;
		//res.status(200).send("success");
		//return data;
		//console.log(data);
	});
};