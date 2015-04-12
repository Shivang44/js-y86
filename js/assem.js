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

var ASSEM = [];

(function() {
	function padq(n) {
		if (n.length === 8) return n;
		// else return toBigEndian(padHex(n, 8));
		else return padLEHex(n, 8);
	}

	ASSEM[0] = function() {
		return '00';
	};

	ASSEM[1] = function() {
		return '10';
	};

	ASSEM[2] = function() {
		return '2' + this.fn + this.rA + this.rB;
	};

	ASSEM[3] = function() {
		return '308' + this.rB + padq(this.V);
	};

	ASSEM[4] = function() {
		return '40' + this.rA + this.rB + padq(this.D);
	};

	ASSEM[5] = function() {
		if (this.D == -1) {
			return '50' + this.rA + this.rB
		} else {
			return '50' + this.rA + this.rB + padq(this.D);
		}
	};

	ASSEM[6] = function() {
		return '6' + this.fn + this.rA + this.rB;
	};

	ASSEM[7] = function() {
		return '7' + this.fn + padq(this.Dest);
	};

	ASSEM[8] = function() {
		return '80' + padq(this.Dest);
	};

	ASSEM[9] = function() {
		return '90';
	};

	ASSEM[10] = function() {
		return 'a0' + this.rA + 'f';
	};

	ASSEM[11] = function() {
		return 'b0' + this.rA + 'f';
	};

	ASSEM[14] = function() {
		return 'e' + this.fn;
	}

	ASSEM[15] = function() {
		return 'f' + this.fn + this.rA + 'f';
	}
})();
