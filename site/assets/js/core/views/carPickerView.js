/**
 * Car selector - Display car models to user with side by side comparisons of each type
 * Collection view passed into composite to allow user to re-select Car grouping
 *
 */
Rental.CarPicker = Marionette.CompositeView.extend({
	
	template : Templates['car-composite-view'],

	childView : Rental.CarView,
	childViewContainer : '#car-selection-area',

	ui : {
		carRentalDropdown : '#carSelection'
	},

	events : {
		'change @ui.carRentalDropdown' : 'updateView'
	},

	initialize: function (options) {
		var setStartingSelection = Rental.rentalDetail.get('rentalCarType');
		this.collection = options.collection;
	},

	updateView: function(event) {
		var carSelection = this.ui.carRentalDropdown.val().toUpperCase();
		console.log(Rental.Cars[carSelection]);
		this.collection.reset(Rental.Cars[carSelection]);

		console.log(this.collection);
	}
});