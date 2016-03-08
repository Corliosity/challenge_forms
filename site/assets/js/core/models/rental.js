/**
 * Rental Details Model
 * Using model binding to update view or model when either changes
 * Validate on click of button for each page to retain some state
 */
Rental.RentalDetail = Backbone.Model.extend({
	
	// Create defaults to have some data on screen
	defaults: {
		rentalCountry : "",
		rentalState : "",
		rentalReturnCountry  : "",
		shouldSelectState: false,
		rentalCarType : "GroupA",
		rentalCarModel : "",
		rentalOfficePickup : "",
		isAirport : false,
		rentalOfficeReturn : "",
		collectOn : "",
		returnOn : "",
		avisMemberID : "",
		customerName : "",
		needMessaging : false
	},

	initialize: function() {
		// Setup stickit model binding here
		// Create validation calls
		this.listenTo(this, 'change:rentalCountry', this.hasExtra, this);
	},

	countryHasStates: function(data) {
		// If a country has states
		// Modify the rental country and return country to append the state selected by users
		this.set('rentalState', data);
		this.set('rentalReturnCountry', this.get('rentalCountry') + ' ' + data);
	},

	getRentalCountry : function() {
		return this.get('rentalCountry');
	},

	hasExtra: function() {
		if (this.getRentalCountry() === 'Germany' || this.getRentalCountry() === 'Austria' || this.getRentalCountry() === 'Switzerland') {
			// add attribute for messages
			this.set('needMessaging', true);
		} else if (this.getRentalCountry() === 'United States' || this.getRentalCountry() === 'United Kingdom') {
			// add attribute 
			this.set('shouldSelectState', true);
		}
	},

	showErrors: function(errors) {
		// Update view with errors
		this.trigger('model:errors', errors);
	},

	// Basic validation at the moment
	// try to abstract 'business logic' out
	validateFields: function() {
		// Do Validation Work here
		var errors = [];
		var attrs = this.attributes;

		_.mapObject(attrs, function(val, key) {
			console.log('My Key %s and My Values %s', key, val);
			if (val === "" || val === undefined) {
				if (key === '') {

				}
				errors.push(key);
			}
		});
		if (errors.length === 0) {
			this.trigger('model:isSaved');
		} else {
			this.showErrors(errors);
		}
	}

});