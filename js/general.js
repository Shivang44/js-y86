// Copyright (c) 2015 Jonathan Donnelly Gluck
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// General constants and functions
var INSTRUCTION_LEN = [1, 1, 2, 6,
		6, 6, 2, 5,
		5, 1, 2, 2,
		1, 1, 1, 2
	],
	num2reg = ['%eax', '%ecx', '%edx', '%ebx', '%esp', '%ebp', '%esi', '%edi',
		'%NoReg'
	],
	inst2num = {
		'halt': 0,
		'nop': 1,

		'rrmovl': 2,
		'cmovle': 2,
		'cmovl': 2,
		'cmove': 2,
		'cmovne': 2,
		'cmovge': 2,
		'cmovg': 2,

		'irmovl': 3,
		'rmmovl': 4,
		'mrmovl': 5,

		'addl': 6,
		'subl': 6,
		'andl': 6,
		'xorl': 6,
		'multl': 6, //cmsc216
		'divl': 6,
		'modl': 6,


		'jmp': 7,
		'jle': 7,
		'jl': 7,
		'je': 7,
		'jne': 7,
		'jge': 7,
		'jg': 7,

		'call': 8,
		'ret': 9,
		'pushl': 10,
		'popl': 11,

		'brk': 14,
		'brkle': 14,
		'brkl': 14,
		'brke': 14,
		'brkne': 14,
		'brkge': 14,
		'brkg': 14,

		'rdch': 15,
		'wrch': 15,
		'rdint': 15,
		'wrint': 15
	},
	inst2fn = {
		'addl': 0,
		'subl': 1,
		'andl': 2,
		'xorl': 3,
		'multl': 4,
		'divl': 5,
		'modl': 6,

		'rrmovl': 0,
		'cmovle': 1,
		'cmovl': 2,
		'cmove': 3,
		'cmovne': 4,
		'cmovge': 5,
		'cmovg': 6,

		'jmp': 0,
		'jle': 1,
		'jl': 2,
		'je': 3,
		'jne': 4,
		'jge': 5,
		'jg': 6,

		'brk': 0,
		'brkle': 1,
		'brkl': 2,
		'brke': 3,
		'brkne': 4,
		'brkge': 5,
		'brkg': 6,

		'rdch': 0,
		'wrch': 1,
		'rdint': 2,
		'wrint': 3
	};

function print(x) {
	return console.log(x);
}

function printRegisters(registers) {
	print(reg2str(registers));
}

function reg2str(registers) {
	var result = ''
	for (r in registers) {
		if (r.length === 1) {
			result += (num2reg[r] + ': ' + registers[r].toString(16));
		} else {
			result += (r + ': ' + registers[r].toString(16));
		}
		result += '\n';
	}
	return result;
}

function printMemory() {
	var i = 0,
		str = '';
	for (b in MEMORY) {
		if (i % 4 === 0 && i > 0) {
			print('PC = ' + (i - 4) + ' | ' + str);
			str = '';
		}
		str += num2hex(MEMORY[b]);
		i++;
	}
	//print(MEMORY);
}

function num2hex(num) {
	var result = num.toString(16);
	return result.length % 2 === 1 ? '0' + result : result;
}

function toBigEndian(hexstr) {
	var i, result = '';
	if (hexstr.length % 2 === 1) {
		hexstr = '0' + hexstr;
	}
	for (i = hexstr.length; i > 0; i -= 2) {
		result += hexstr.substr(i - 2, 2);
	}
	return result;
}

function toLittleEndian(hexstr) {
	return toBigEndian(hexstr);
}

function hexstr2num(h) {
	return parseInt(x, 16);
}

// Parse a number that is either in base 10 or in base 16 with '0x' in front.
function parseNumberLiteral(str) {
	if (isNaN(str))
		throw new Error('Not a number: ' + str);
	else if (str.length > 2 && str.substr(0, 2) === '0x')
		return parseInt(str, 16);
	else
		return parseInt(str, 10);
}

function padHex(num, width) {
	var result = num ? num.toString(16) : '0';
	while (result.length < width) {
		result = '0' + result;
	}
	return result;
}

function padLEHex(num, width) {
	var result = num ? num.toString(16) : '0';
	while (result.length < width) {
		result = result + '0';
	}
	return result;
}
