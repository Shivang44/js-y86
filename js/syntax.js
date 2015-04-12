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

var SYNTAX = {};

SYNTAX['halt'] = [];
SYNTAX['nop'] = [];

SYNTAX['rrmovl'] = ['rA', 'rB'];
SYNTAX['cmovle'] = ['rA', 'rB'];
SYNTAX['cmovl'] = ['rA', 'rB'];
SYNTAX['cmove'] = ['rA', 'rB'];
SYNTAX['cmovne'] = ['rA', 'rB'];
SYNTAX['cmovge'] = ['rA', 'rB'];
SYNTAX['cmovg'] = ['rA', 'rB'];

SYNTAX['irmovl'] = ['V', 'rB'];
SYNTAX['rmmovl'] = ['rA', 'D(rB)'];
SYNTAX['mrmovl'] = ['D(rB)', 'rA'];

SYNTAX['addl'] = ['rA', 'rB'];
SYNTAX['subl'] = ['rA', 'rB'];
SYNTAX['xorl'] = ['rA', 'rB'];
SYNTAX['andl'] = ['rA', 'rB'];

SYNTAX['jmp'] = ['Dest'];
SYNTAX['jle'] = ['Dest'];
SYNTAX['jl'] = ['Dest'];
SYNTAX['je'] = ['Dest'];
SYNTAX['jne'] = ['Dest'];
SYNTAX['jge'] = ['Dest'];
SYNTAX['jg'] = ['Dest'];

SYNTAX['call'] = ['Dest'];
SYNTAX['ret'] = [];
SYNTAX['pushl'] = ['rA'];
SYNTAX['popl'] = ['rA'];

SYNTAX['brk'] = [];
SYNTAX['brkle'] = [];
SYNTAX['brkl'] = [];
SYNTAX['brke'] = [];
SYNTAX['brkne'] = [];
SYNTAX['brkge'] = [];
SYNTAX['brkg'] = [];

//cmsc216
SYNTAX['multl'] = ['rA', 'rB']
SYNTAX['divl'] = ['rA', 'rB']
SYNTAX['modl'] = ['rA', 'rB']

SYNTAX['wrch'] = ['rA']
SYNTAX['rdch'] = ['rA']
SYNTAX['wrint'] = ['rA']
SYNTAX['rdint'] = ['rA']
