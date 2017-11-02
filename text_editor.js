const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf8');

var userInput;

fs.mkdir('./data', (err, folder) => {
	if(err) {
		if(err.code === 'EEXIST') {
			console.error('./data directory exists');
		}
		else {
			console.log(err);
		}
	} else {
		console.log(folder);
	}
});

process.stdin.on('data', (str) => {
	str = str.trim();
	if(str === '\\q') {
		process.stdin.pause();

	fs.appendFile('./data/input.txt', userInput, (err) => {
		if(err) console.log(err)
		console.log('File Written!');
	});

	} else {
		userInput += str + '\n';
		console.log(userInput);
	}
});