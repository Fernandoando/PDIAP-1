'use strict';

const mongoose = require('mongoose')
,	Schema = mongoose.Schema;

const Admin2Schema = new Schema({
	username: {
		type: String
	},
	password: {
		type: String
	}
}, { collection: 'admin2Collection' });

const Avaliador2 = module.exports = mongoose.model('Admin2', Admin2Schema);