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


var AppView = Backbone.View.extend({
	initialize: function() {
		window.app = this;
		this.vent = _.extend({}, Backbone.Events);
		this.template = _.template($('#tmpl_app').html());
		this.editor = new EditorView();
		this.inspector = new InspectorView();
		this.memview = new MemoryView();

		this.listenTo(Backbone.Events, 'app:redraw', this.redrawButtons);

		this.render();
	},

	events: {
		'click .compile': 'compile',
		'click .reset': 'reset',
		'click .continue': 'continue',
		'click .step': 'step'
	},

	render: function() {
		this.$el.empty().append(this.template());
		this.$('.editor').empty().append(this.editor.$el);
		this.$('.inspector').empty().append(this.inspector.$el);
		this.$('.memory').empty().append(this.memview.$el);
		this.redrawButtons();
	},

	compile: function() {
		var obj = ASSEMBLE(this.editor.getSource());
		this.inspector.setObjectCode(obj);

		if (obj.errors.length === 0)
			INIT(obj.obj);

		Backbone.Events.trigger('app:redraw');
		this.$('.continue span').text('Start');
	},

	reset: function() {
		RESET();
		this.$('.continue span').text('Start');

		Backbone.Events.trigger('app:redraw');
	},

	continue: function() {
		if (IS_RUNNING()) {
			PAUSE();
		} else if (STAT === 'AOK' || STAT === 'DBG') {
			this.$('.continue span').text('Pause');
			this.$('.step').addClass('disabled');
			RUN(this.triggerRedraw);
		}
	},

	step: function() {
		if (!IS_RUNNING() && (STAT === 'AOK' || STAT === 'DBG')) {
			STEP();
			Backbone.Events.trigger('app:redraw');
		}
	},

	triggerRedraw: function() {
		Backbone.Events.trigger('app:redraw');
	},

	redrawButtons: function() {
		if (STAT === 'AOK' || STAT === 'DBG') {
			this.$('.continue span').text('Continue');
			this.$('.step, .continue').removeClass('disabled');
		} else {
			this.$('.step, .continue').addClass('disabled');
		}
	}
});
