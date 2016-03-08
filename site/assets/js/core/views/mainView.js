Rental.MainView = Marionette.LayoutView.extend({

	template: Templates['page-template'],
	className: 'main-area',

	regions : {
		appPage : '#app-page',
		titleLocation : '#title-area'
	},

	initialize: function(options) {
		this.options = options;
	    return this;
	},

	onShow: function() {
		this.startSelectorRegion();
	},

	startSelectorRegion: function() {

		var title = new Rental.FormTitle();
		this.titleLocation.show(title);
	}
});