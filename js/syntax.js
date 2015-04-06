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
