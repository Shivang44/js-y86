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

var INSTR = {};

INSTR[0] = function() {
	STAT = 'HLT';
	//print("Program halted");
};
INSTR[1] = function() {
	//NOP
};
INSTR[2] = function() {
	switch (this.fn) {
		case 0:
			// RRMOVL
			REG[this.rB] = getRegister(this.rA);
			break;
		case 1:
			// CMOVLE
			if (SF === 1 || ZF === 1) {
				REG[this.rB] = getRegister(this.rA);
			}
			break;
		case 2:
			// CMOVL
			if (SF === 1) {
				REG[this.rB] = getRegister(this.rA);
			}
			break;
		case 3:
			// CMOVE
			if (ZF === 1) {
				REG[this.rB] = getRegister(this.rA);
			}
			break;
		case 4:
			// CMOVNE
			if (ZF === 0) {
				REG[this.rB] = getRegister(this.rA);
			}
			break;
		case 5:
			// CMOVGE
			if (SF === 0 || ZF === 1) {
				getRegister(this.rB) = getRegister(this.rA);
			}
			break;
		case 6:
			// CMOVG
			if (SF === 0 && ZF === 0) {
				REG[this.rB] = getRegister(this.rA);
			}
			break;
	}
};
INSTR[3] = function() {
	REG[this.rB] = this.V;
};
INSTR[4] = function() {
	var valA = getRegister(this.rA)
	if (this.rB == 8) { //label move
		ST(this.D, valA, 4);
	} else {
		var valB = getRegister(this.rB),
			valE = valB + this.D;
		ST(valE, valA, 4);
	}
};
INSTR[5] = function() {
	if (this.rB == 8) { //label move
		REG[this.rA] = LD(this.D);
	} else {
		var valB = getRegister(this.rB),
			valE = valB + this.D;
		REG[this.rA] = LD(valE);
	}
};

INSTR[6] = function() {
	var valA = getRegister(this.rA),
		valB = getRegister(this.rB),
		sgnA, sgnB, sgnR, signBit = 0x80000000;
	switch (this.fn) {
		case 0:
			sgnA = !!(valA & signBit);
			sgnB = !!(valB & signBit);
			REG[this.rB] += getRegister(this.rA);
			sgnR = !!(getRegister(this.rB) & signBit);
			OF = +(sgnA && sgnB && !sgnR ||
				!sgnA && !sgnB && sgnR)
			break;
		case 1:
			sgnA = !!(valA & signBit);
			sgnB = !!(valB & signBit);
			REG[this.rB] -= getRegister(this.rA);
			sgnR = !!(getRegister(this.rB) & signBit);
			OF = +(sgnA && sgnB && !sgnR ||
				!sgnA && !sgnB && sgnR)
			break;
		case 2:
			REG[this.rB] = getRegister(this.rA) & getRegister(this.rB);
			break;
		case 3:
			REG[this.rB] = getRegister(this.rA) ^ getRegister(this.rB);
			break;
		case 4:
			REG[this.rB] = getRegister(this.rA) * getRegister(this.rB);
			break;
		case 5:
			REG[this.rB] = getRegister(this.rB) / getRegister(this.rA);
			break;
		case 6:
			REG[this.rB] = getRegister(this.rB) % getRegister(this.rA);
			break;
	}
	SF = getRegister(this.rB) & 0x80000000 ? 1 : 0;
	ZF = getRegister(this.rB) === 0 ? 1 : 0;
};
INSTR[7] = function() {
	switch (this.fn) {
		case 0:
			// JMP
			PC = this.Dest;
			break;
		case 1:
			// JLE
			if (SF === 1 || ZF === 1) {
				PC = this.Dest;
			}
			break;
		case 2:
			// JL
			if (SF === 1) {
				PC = this.Dest;
			}
			break;
		case 3:
			// JE
			if (ZF === 1) {
				PC = this.Dest;
			}
			break;
		case 4:
			// JNE
			if (ZF === 0) {
				PC = this.Dest;
			}
			break;
		case 5:
			// JGE
			if (SF === 0 || ZF === 1) {
				PC = this.Dest;
			}
			break;
		case 6:
			// JG
			if (SF === 0 && ZF === 0) {
				PC = this.Dest;
			}
			break;
	}
};
INSTR[8] = function() {
	var valB = getRegister(4),
		valE = valB - 4;
	ST(valE, PC, 4);
	REG[4] = valE;
	PC = this.Dest;
};
INSTR[9] = function() {
	var valA = getRegister(4),
		valB = getRegister(4),
		valE = valB + 4,
		valM = LD(valA);
	REG[4] = valE;
	PC = valM;
};
INSTR[10] = function() {
	var valA = getRegister(this.rA),
		valB = getRegister(4),
		valE = valB - 4;
	ST(valE, valA, 4);
	REG[4] = valE;
};
INSTR[11] = function() {
	var valA = getRegister(4),
		valB = getRegister(4),
		valE = valB + 4,
		valM = LD(valA);
	REG[4] = valE;
	REG[this.rA] = valM;
};

INSTR[14] = function() {
	switch (this.fn) {
		case 0:
			// BRK
			STAT = 'DBG';
			break;
		case 1:
			// BRKLE
			if (SF === 1 || ZF === 1) {
				STAT = 'DBG';
			}
			break;
		case 2:
			// BRKL
			if (SF === 1) {
				STAT = 'DBG';
			}
			break;
		case 3:
			// BRKE
			if (ZF === 1) {
				STAT = 'DBG';
			}
			break;
		case 4:
			// BRKNE
			if (ZF === 0) {
				STAT = 'DBG';
			}
			break;
		case 5:
			// BRKGE
			if (SF === 0 || ZF === 1) {
				STAT = 'DBG';
			}
			break;
		case 6:
			// BRKG
			if (SF === 0 && ZF === 0) {
				STAT = 'DBG';
			}
			break;
	}
};

INSTR[15] = function() {
	switch (this.fn) {
		case 0:
			// rdch
			window.input_flag = false
			$("#input_box").prop("disabled", false);
			$("#input_box").attr('maxlength', 1);
			$('#input_box').qtip({
				content: {
					text: 'Enter a character'
				},
				show: true,
				style: {
					classes: 'qtip-bootstrap',
				},
				position: {
					my: 'top right',
					at: 'bottom left'
				}
			});
			$("#input_box").focus()
			STAT = 'I/O'
			var timer = setInterval(function(rA) {
				box = $("#input_box")
				if (window.input_flag) {
					if (box.val() == "") {
						window.REG[rA] = 10;
					} else {
						window.REG[rA] = box.val().charCodeAt(0);
					}
					window.input_flag = false
					box.val("")
					$(".qtip").remove();
					box.prop("disabled", true)
					window.STAT = 'AOK'
					Backbone.Events.trigger('app:redraw');
					clearInterval(timer);
				}
			}, 100, this.rA);

			break;
		case 1:
			// wrch
			out_s = String.fromCharCode(getRegister(this.rA))
				// alert(out_s);
			print(out_s);
			window.OUTPUT += out_s
			window.app.vent.trigger("output:updated")
			break;
		case 2:
			// rdint
			window.input_flag = false
			$("#input_box").prop("disabled", false);
			$("#input_box").attr('maxlength', 80);
			$('#input_box').qtip({
				content: {
					text: 'Enter an integer'
				},
				show: true,
				style: {
					classes: 'qtip-bootstrap',
				},
				position: {
					my: 'top right',
					at: 'bottom left'
				}
			});
			$("#input_box").focus()
			STAT = 'I/O'
			var timer = setInterval(function(rA) {
				box = $("#input_box")
				if (window.input_flag) {
					window.input_flag = false
					result = parseInt(box.val());
					if (result == NaN) {
						box.val("");
					} else if (Number(result) === result && result % 1 === 0) { //checknumbernss
						window.REG[rA] = result;
						box.val("")
						box.prop("disabled", true)
						$(".qtip").remove();
						window.STAT = 'AOK'
						Backbone.Events.trigger('app:redraw');
						clearInterval(timer);
					} else {
						box.val("")
					}
				}
			}, 100, this.rA);


			break;
		case 3:
			//wrint
			out_s = getRegister(this.rA).toString()
				// alert(out_s);
			print(out_s);
			window.OUTPUT += out_s
			window.app.vent.trigger("output:updated")
			break;
	}
};
