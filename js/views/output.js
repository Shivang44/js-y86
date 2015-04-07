var OutputView = Backbone.View.extend({
  className: 'output',

  initialize: function() {
    this.template = _.template($('#tmpl_output').html());
    this.render();
    this.output = "";
  },

  render: function() {

    if (!this.rendered) {
      this.$el.empty().append(this.template());
      this.rendered = true;
      this.$lineContainer = this.$('.lines');
    }
  },

  setOutput: function(output) {
    this.output = output;
    alert("Tried to set output");
  }


});
