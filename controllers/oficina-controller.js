'use strict';

const mongoose = require('mongoose')
,	Oficina = require('../models/oficina-schema');

module.exports.createOficina = (newOficina, callback) => {
	newOficina.save((err, data) => {
		if(err) throw err;
		console.log(data);
	});
};