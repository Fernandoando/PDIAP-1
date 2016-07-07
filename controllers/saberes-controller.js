'use strict';

const mongoose = require('mongoose')
,	Saberes = require('../models/saberes-schema');

module.exports.createSaberes = (newSaberes, callback) => {
	newSaberes.save((err, data) => {
		if(err) throw err;
		console.log(data);
	});
};