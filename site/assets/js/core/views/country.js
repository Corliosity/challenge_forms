/**
 * Country Selector - Will provide with country of rental information for rental from and return to
 * On select will update model
 */
Rental.Country = Marionette.ItemView.extend({
	template : Templates['country-dropdown'],
	tagName : 'div',
	className: 'row',

	ui : {
		selectCountry : 'select#country-selector'
	},

	events : {
		'change @ui.selectCountry' : 'updateModelandView'
	},

	initialize: function(options) {
		this.model = this.options.model;

		this.stickit();
	},

	onDomRefresh: function() {
		$('select#country-selector').selectToAutocomplete();
	},

	updateModelandView: function() {
		this.model.set('rentalCountry',this.ui.selectCountry.val());
		this.model.set('rentalReturnCountry', this.ui.selectCountry.val());
	},

	onDestroy: function() {
		this.unstickit();
	}
});