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

var RegistersView = Backbone.View.extend({
  className: 'registers',

  initialize: function() {
    this.template = _.template($('#tmpl_registers').html());
    this.render();
  },

  render: function() {
    var registers = {
      eax_hex: '0x' + padHex(REG[0].toString(16), 8),
      eax_dec: (REG[0] >> 0).toString(10),
      ecx_hex: '0x' + padHex(REG[1].toString(16), 8),
      ecx_dec: (REG[1] >> 0).toString(10),
      edx_hex: '0x' + padHex(REG[2].toString(16), 8),
      edx_dec: (REG[2] >> 0).toString(10),
      ebx_hex: '0x' + padHex(REG[3].toString(16), 8),
      ebx_dec: (REG[3] >> 0).toString(10),
      esp_hex: '0x' + padHex(REG[4].toString(16), 8),
      esp_dec: (REG[4] >> 0).toString(10),
      ebp_hex: '0x' + padHex(REG[5].toString(16), 8),
      ebp_dec: (REG[5] >> 0).toString(10),
      esi_hex: '0x' + padHex(REG[6].toString(16), 8),
      esi_dec: (REG[6] >> 0).toString(10),
      edi_hex: '0x' + padHex(REG[7].toString(16), 8),
      edi_dec: (REG[7] >> 0).toString(10),

      sf: SF,
      zf: ZF,
      of: OF,
      stat: STAT,
      err: ERR,
      pc: '0x' + padHex(PC.toString(16), 4)
    };

    this.$el.empty().append(this.template(registers));
  }
});
