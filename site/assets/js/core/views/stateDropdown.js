/**
 * Create a View to select information on States from a Country
 * Note: this would be keyed off of the country and update or not based on selection
 */
Rental.State = Marionette.ItemView.extend({
	template : Templates['state-dropdown'],
	tagName : 'div',
	className: 'row animate-slide-down',

	ui : {
		selectState : 'select#state-selector'
	},

	events : {
		'change @ui.selectState' : 'updateModelandView'
	},

	initialize: function(options) {
		this.model = this.options.model;
	},

	onDomRefresh: function() {
		$('select#state-selector').selectToAutocomplete();
		// Initialize with primary value in case user does not change it.
		Rental.rentalDetail.countryHasStates(this.ui.selectState.val());
	},

	updateModelandView: function() {
		Rental.rentalDetail.countryHasStates(this.ui.selectState.val());
	}
});