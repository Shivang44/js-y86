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

var ObjectCodeView = Backbone.View.extend({
  className: 'object-code',

  initialize: function(options) {
    this.template = _.template($('#tmpl_object_code').html());
    this.code = options.code;
    this.highlightedLines = {};
    this.initLines();
    this.listenTo(Backbone.Events, 'app:redraw', this.highlightCurrentLine);
    this.render();
  },

  render: function() {
    if (!this.rendered) {
      this.$el.empty().append(this.template());
      this.rendered = true;
      this.$lineContainer = this.$('.lines');
    }

    this.$lineContainer.empty().append(_.map(this.$lines, function($line) {
      return $line.$el;
    }));
  },

  setObjectCode: function(code) {
    this.code = code;
    this.initLines();
    this.render();
  },

  highlightCurrentLine: function() {
    var linesToHighlight = this.linesByLineNo[PC] || [];
    var linesToUnhighlight = this.highlightedLines;

    _.each(linesToUnhighlight, function($line) {
      $line.unhighlight();
    });

    _.each(linesToHighlight, function($line) {
      $line.highlight();
    });

    this.highlightedLines = linesToHighlight;

    // scroll into view
    var lineToScrollTo = linesToHighlight[linesToHighlight.length - 1];
    if (!lineToScrollTo)
      return;

    var $lineToScrollTo = lineToScrollTo.$el;

    var top = $lineToScrollTo.position().top;
    if (top < 0)
      this.$lineContainer.scrollTop($lineToScrollTo.index() * 15 - 40);
    else {
      var linesHeight = this.$lineContainer.height();
      if (top > linesHeight - 15)
        this.$lineContainer.scrollTop($lineToScrollTo.index() * 15 -
          linesHeight + 55);
    }
  },

  initLines: function() {
    this.$lines = [];
    this.linesByLineNo = {};

    if (this.code)
      if (this.code.errors.length === 0)
        _.each(this.code.obj, function(line) {
          var $line = new ObjectCodeLineView({
            line: line
          });
          this.$lines.push($line);
          var lineno = line.substring(2, 8).trim();
          var binary = line.substring(9, 22).trim();
          if (lineno && binary.trim().length) {
            var lineno = parseInt(lineno, 16);
            if (this.linesByLineNo[lineno])
              this.linesByLineNo[lineno].push($line);
            else
              this.linesByLineNo[lineno] = [$line];
          }
        }, this);
      else
        _.each(this.code.errors, function(error) {
          var $line = new ObjectCodeLineErrorView({
            error: error
          });
          this.$lines.push($line);
        }, this);
  }
});

var ObjectCodeLineView = Backbone.View.extend({
  className: 'object-code-line',

  initialize: function(options) {
    this.updateSource(options);
    this.render();
  },

  updateSource: function(options) {
    this.line = options.line;
  },

  render: function() {
    this.$el.text(this.line);
  },

  highlight: function() {
    this.$el.addClass('highlighted');
  },
  unhighlight: function() {
    this.$el.removeClass('highlighted');
  }
});

var ObjectCodeLineErrorView = Backbone.View.extend({
  className: 'object-code-line object-code-line-error',
  template: _.template($('#tmpl_object_code_error').html()),

  initialize: function(options) {
    this.options = {
      lineno: options.error[0],
      source: options.error[1]
    }
    this.render();
  },

  render: function() {
    this.$el.empty().append(this.template(this.options));
  }
});
