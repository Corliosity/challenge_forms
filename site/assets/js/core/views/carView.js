/**
 * Individual Car View - styled to provide equal comparison of each car type
 * Allow for selection and update of main Rental Model
 */
Rental.CarView = Marionette.ItemView.extend({
	
	template : Templates['car-details'],
	className : 'medium-4 columns delay-animate',

	ui : {
		selectThisCar : ".js-select-car"
	},

	events : {
		'click @ui.selectThisCar' : 'updateRentalInfo'
	},

	initialize: function() {
		this.options.carGroup = 'Group' + this.model.get('group');
		this.options.carType = this.model.get('model') + ' ' + this.model.get('type');

	},

	updateRentalInfo : function() {

		Rental.rentalDetail.set({
			'rentalCarType': this.options.carGroup,
			'rentalCarModel': this.options.carType
		});

		Backbone.history.navigate('', {trigger : true});
	}
});