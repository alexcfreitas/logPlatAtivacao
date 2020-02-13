const model = require('./utils/csvFields');
const { Parser } = require('json2csv');
const fs = require('fs');
const logAnalitico = require('./logAnalitico');

const init = async () => {
	const registrosData = await logAnalitico.obterRegistros();

	const registros = logAnalitico.processarRegistros(registrosData);

	const parser = new Parser({
		fields: model.fields,
		unwind: ['psup', 'prod', 'clivouc']
	});

	const csv = parser.parse(registros);

	return fs.writeFile('registros.csv', csv, function(err) {
		if (err) throw err;
		console.log('registros file saved');
	});
};

init();
