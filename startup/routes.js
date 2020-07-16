const express = require('express');
const bodyParser = require('body-parser');

const test = require('../routes/Test.js');

module.exports = app => {
	app.use(bodyParser.json());

	require('../db/conn');
	require('../routes/Test.js')(app);
	require('../routes/cleanerAPI')(app);
	require('../routes/contactListAPI.js')(app);
	require('../routes/noteAPI')(app);
	require('../routes/propertyManagerAPI')(app);

	require('../routes/mediasoupAPI')(app);

	/**
	 * Error handler.
	 */
	app.use(
		(error, req, res, next) =>
		{
			if (error)
			{
				logger.warn('Express app %s', String(error));

				error.status = error.status || (error.name === 'TypeError' ? 400 : 500);

				res.statusMessage = error.message;
				res.status(error.status).send(String(error));
			}
			else
			{
				next();
			}
		});
}