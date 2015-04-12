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

 var InspectorView = Backbone.View.extend({
 	initialize: function() {
 		this.template = _.template($('#tmpl_inspector').html());
 		this.bytes = [];
 		this.objectCode = [];
 		this.registers = new RegistersView();
 		this.output = new OutputView();
 		this.$objcode = new ObjectCodeView(this.objectCode);
 		this.listenTo(Backbone.Events, 'app:redraw', this.updateRegisters);
 		$(window).on('resize', this.resizeObjectView.bind(this));
 		this.render();
 	},

 	render: function() {
 		this.$el.empty().html(this.template());

 		this.$('.object').append(this.$objcode.$el);
 		this.$('.output-wrapper').append(this.output.$el);
 		this.$('.registers-wrapper').append(this.registers.$el);
 		window.setTimeout(function() {
 			this.resizeObjectView();
 		}.bind(this), 0);
 	},

 	updateRegisters: function() {
 		this.registers.render();
 	},

 	setObjectCode: function(code) {
 		this.objectCode = _.clone(code);

 		this.objectCode.obj = _.map(code.obj.split('\n'));

 		this.$objcode.setObjectCode(this.objectCode);
 	},

 	resizeObjectView: function() {
 		var $lines = this.$objcode.$('.lines-wrapper');
 		$lines.height((($(window).height() - $lines.position().top - this.$(
 			'.registers-wrapper').height()) / 3) * 2);
 		var $output = this.output.$('.output-wrapper');
 		$output.height((($(window).height() - $lines.position().top - this.$(
 			'.registers-wrapper').height()) / 3) * 1);
 	},

 });
