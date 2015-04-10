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
    this.output = {output: window.OUTPUT.replace("\n","<br>")};
    this.$el.empty().append(this.template(this.output))
  },




});
