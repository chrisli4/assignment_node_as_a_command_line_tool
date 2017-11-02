var cp = require('child_process');

var cmd = cp.spawn('ps', ['aux']);

cmd.on('error', (err) => {
	console.error(`${ err.stack }`);
});

cmd.stdout.on('data', (data) => {
	console.log(`Data: ${ data }`)
});

cmd.on('close', (code) => {
	console.log(`Child process exited with code: ${ code }`);
})