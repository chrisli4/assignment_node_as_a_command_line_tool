const parse = (args) => {

	const flag = args[2].indexOf('-') === 0;
	const help = args[3] === '-h' || args[3] === '--help';
	const helpInfo = args[2] === '-h' || args[2] === '--help';
	const interact = args[2] === '-i' || args[2] === '--interactive';
	const version = args[2] === '-v' || args[2] === '--version';
	const dbug = args[2] === '-d' || args[2] === '--debug';

	const op = flag ? args[3] : args[2];
	const x = flag ? args[4] : args[3];
	const y = op === 'sqrt' ? '' : flag ? args[5] : args[4];

	if(flag && op === 'sqrt') remain = args.slice(5);
	if(flag && op !== 'sqrt') remain = args.slice(6);
	if(!flag && op !== 'sqrt') remain = args.slice(5);
	if(!flag && op === 'sqrt') remain = args.slice(4);

	return {
		'flag': flag,
		'version': version,
		'debug': dbug,
		'interact': interact,
		'helpInfo': helpInfo,
		'help': help,
		'op': op,
		'x': x,
		'y': y,
		'remain': remain
	};
}

const compute = (op, x, y) => {
	
	const add = (x, y) => parseInt(x) + parseInt(y);
	const sub = (x, y) => parseInt(x) - parseInt(y);
	const mult = (x, y) => parseInt(x) * parseInt(y);
	const div = (x, y) => parseInt(x) / parseInt(y);
	const pow = (x, y) => Math.pow(parseInt(x), parseInt(y));
	const sqrt = (x) => Math.sqrt(x);

	switch(op) {
		case 'add': return add(x, y); 
		case 'sub': return sub(x, y); 
		case 'mult': return mult(x, y); 
		case 'div': return div(x, y); 
		case 'pow': return pow(x, y);
		case 'sqrt': return sqrt(x);
		default: break;
	};
}

const dbug = (op, x, y, ans) => {
	console.log(`# ${ op } ${ x } ${ y } => ${ ans }`);
}

const help = (input) => {
	if(input.version) {
		console.log(`=> 1.0`);
	}
	else if(input.helpInfo) {
		console.log(`=> usage: node calc.js [ -d or -i ] [ add/sub/mult/div/sqrt/pow ] [ value ] [ value ] [ add/sub/mult/div/sqrt/pow ] [ value ]`);
		console.log(`=> more information: node calc.js [ -i -d ] [ -h]`);
	}
	else if(input.debug) {
		console.log(`=> In debug mode the intermediary values and functions being calculated and performed are output as they are executed.`);
	}
	else if(input.interact) {
		console.log(`=> Enable interactive mode, allows user to perform and chain mathematical operations in real time. Restart calculator to perform a new series of operations.`);
	} 
	else {
		console.log(`=> Not a valid command`);
	}
}

const initRun = (op, x, y, flag = false) => {
	let ans = compute(op, x, y);
	flag && dbug(op, x, y, ans);
	
	return ans;
}

const loopRun = (ans, arr, flag = false) => {
	for(var i = 0; i < arr.length;) {
		let temp = ans;
		let y = arr[i] === 'sqrt' ? '' : arr[i + 1];
		ans = compute(arr[i], ans, y);
		flag && dbug(arr[i], temp, y, ans);

		if(arr[i] === 'sqrt') i++;
		else i += 2;
		}

	return ans;
}

const interact = () => {
	process.stdin.resume();
	process.stdin.setEncoding('utf8');

	let initEntry = true;
	var ans;

	process.stdin.on('data', (data) => {
		data = data.trim().split(' ');

		if(data[0] === 'done') {
			console.log('Goodbye!');
			process.stdin.pause();
		} else {

			let op = data[0];
			let x = data[1];
			let y = op === 'sqrt' ? '' : data[2];
			let arr = op === 'sqrt' ? data.slice(2) : data.slice(3);

			if(initEntry) {
				ans = initRun(op, x, y);
				initEntry = false;
			} else {
				ans = loopRun(ans, data);
			}

			console.log(`ANSWER: ${ ans }`);
		}
	});
}

const input = parse(process.argv);

if(input.version || input.helpInfo || (input.flag && input.help)) {
	help(input);
}
else if(input.interact) {
	interact();
} 
else {
	const initial = initRun(input.op, input.x, input.y, input.flag);
	const final = loopRun(initial, input.remain, input.flag);
	console.log(`ANSWER: ${ final }`);
}


