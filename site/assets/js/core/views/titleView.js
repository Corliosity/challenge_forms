Rental.FormTitle = Marionette.ItemView.extend({
	
	template: Templates['title-template'],
	tagName: 'div',
	className: 'medium-4 columns medium-centered',
	bindings : {
		'[name=title]' : 'title'
	},

	initialize: function() {
		this.model = Rental.applicationState;
		this.listenTo(this.model, 'change:title', this.render);
	}
});