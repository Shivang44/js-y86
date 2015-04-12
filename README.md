js-y86 (for cmsc216)
======
---
**Disclaimer** I forked this project in April of 2015. It is somewhat modified from the version found [here](https://github.com/xsznix/js-y86)

##Introduction
js-y86 is an assembler and simulator written in Javascript. It supports:

-	All of the original y86 instructions plus cmovX
-	Breakpoints via `brk`
-	Step-by-step execution
-	Inspect the contents of the registers, flags, and memory after every instruction
-	Manually pause if you get stuck in an infinite loop
-	Syntax highlighting
-	See your (hopefully useful) compile errors as you type
-	Input-Output:
    - rdch
    - wrch
    - rdint
    - wrint	
-	Additional Instructions:
    - Multl
    - Divl
    - Modl
    	
##How to use it
[See it in action](https://jgluck.github.io/js-y86/) or [read the documentation on the Wiki](https://github.com/jdg/js-y86/wiki).
