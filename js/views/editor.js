// 
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

var EditorView = Backbone.View.extend({
  initialize: function() {
    this.template = _.template($('#tmpl_editor').html());
    this.annotate = this._annotate.bind(this);
    $(window).on('resize', this.resizeEditor.bind(this));
    this.render();
  },

  render: function() {
    this.$el.empty().append(this.template({
      code: $('#default_y86_code').html()
    }));

    this.$editor = this.$('.code');
    this.editor = ace.edit(this.$editor.get(0));
    this.editor.setTheme('ace/theme/textmate');
    this.editor.getSession().setMode('ace/mode/y86');
    this.editor.on('change', this.deferredRecompile.bind(this));
    this.resizeEditor();
  },

  getSource: function() {
    return this.editor.getValue();
  },

  resizeEditor: function() {
    this.$editor.height($(window).height() - this.$editor.position().top);
  },

  deferredRecompile: function() {
    if (this.recompileTimeout)
      window.clearTimeout(this.recompileTimeout);
    this.recompileTimeout = window.setTimeout(this.annotate, 500);
  },

  _annotate: function() {
    var value = this.getSource();

    var errors = ASSEMBLE(value, true).errors;

    var errorObjs = _.map(errors, function(error) {
      return {
        row: error[0] - 1,
        column: 0, // not supported
        text: error[1],
        type: 'error'
      }
    });

    this.editor.getSession().setAnnotations(errorObjs);
  }
});
