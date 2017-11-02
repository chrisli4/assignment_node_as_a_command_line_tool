var cp = require('child_process');

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', (data) => {
	data = data.trim();

	if(data === '\\q' || data === 'quit'){
		process.stdin.pause();
	} else {

		let parseData = data.split(' ');
		let command = parseData[0];
		let args = parseData[1] ? [parseData[1]] : [];

		const cmd = cp.spawn(command, args);

		cmd.on('error', (err) => {
			console.error(`${ err.stack }`);
		});

		cmd.stdout.on('data', (data) => {
			console.log(`Data: ${ data }`);
		});

		cmd.on('close', (code) => {
			console.log(`Child process exited with code: ${ code }`);
		});
	}	

});
