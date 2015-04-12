// Copyright(c) 2015 Jonathan Donnelly Gluck
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files(the "Software"), to deal in
// 	the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and / or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// 	The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

var OutputView = Backbone.View.extend({
	className: 'output',

	initialize: function() {
		this.template = _.template($('#tmpl_output').html());
		this.output = "hi";
		this.render(this);

		window.app.vent.on("output:updated", this.render, this)
			// this.$el.html( this.template );
	},

	render: function(context) {

		if (!this.rendered) {
			// this.$el.empty().append(this.template());
			this.rendered = true;
			this.$lineContainer = this.$('.lines');
		}
		this.output = {
			output: window.OUTPUT.replace("\n", "<br>")
		};
		this.$el.empty().append(this.template(this.output))
	},



});
