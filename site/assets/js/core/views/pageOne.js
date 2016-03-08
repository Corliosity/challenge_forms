/**
 * Layout View of Page one of Rental Form
 * Holds information for Country selections, states, and car grouping
 * Use the stickit Library to provide two-way data binding
 */
Rental.PageOne = Marionette.LayoutView.extend({
	template: Templates['page-one-template'],
	className: 'page-one-area panel fade-in',

	events: {
		'click .js-next' : 'saveAndValidate',
		'click .js-car-select' : 'selectCar',
		'click .js-return-location' : 'addReturnFields'
	},

	ui : {
		carSelect : '#car-selector'
	},

	regions : {
		countrySelector : '#country-selector',
		stateSelector : '#state-selector',
		rentalSelector : '#rental-selector',
		returnRental : '#rental-return'
	},

	// Setup bindings for Stickit model binding
	bindings : {
		'[name="country-selector"]' : 'rentalCountry',
		'[name="state-selector"]' : 'rentalState',
		'[name="return-country"]' : 'rentalReturnCountry',
		'[name="car-selector"]' : 'rentalCarType',
		'[name="collectionDate"]' : 'collectOn',
		'[name="carReturnDate"]' : 'returnOn'
	},

	initialize: function(options) {
		this.options = options;
		this.model = Rental.rentalDetail;
		this.listenTo(this.model, 'change:rentalCountry', this.updateView);
		this.listenTo(this.model, 'model:errors', this.showError);
		this.listenTo(this.model, 'model:isSaved', this.moveToNextPage);
	    return this;
	},

	updateView: function() {
		console.log('View changes');
		if (this.model.get('shouldSelectState')) {
			// show state selector
			var stateSelect = new Rental.State();
			this.stateSelector.show(stateSelect);

		} else if (this.model.get('showMessage')) {
			// Show country specific messaging
		}
	},

	onDomRefresh: function() {
		this.getCountryDropdown();
		this.stickit(this.model);
	},


	getCountryDropdown: function() {
		var view = new Rental.Country({model: this.model});

		this.countrySelector.show(view);
	},

	selectCar : function(event) {
		event.preventDefault();

		Backbone.history.navigate('car-rental', {trigger : true });
	},

	saveAndValidate: function() {
		// Note in interest of the user there should be a method to save 
		// NON PERSONAL data to their localstorage for convenience usage
		// Here we will just validate the model

		//Ensure when dates are sent to model they are converted to Date Time Stamp
		this.model.validateFields();
	},

	addReturnFields: function(event) {
		event.preventDefault();

		var viewReturn = new Rental.State();

		// Note would need to pass in param to ensure labels says Return Location
		this.returnRental.show(viewReturn);

	},

	showError: function(data) {
		// update view with class to show errors
		_.each(data, function(element, index, list) {
			$('.' + element).addClass('err-highlight');
			$('.' + element).parent().append('<div class="text-color-blood"><p class="text-italic font-italic">Required</p></div>');
		});
	},

	moveToNextPage: function() {
		Backbone.history.navigate('car-rental', {trigger : true});
	},

	onDestroy: function() {
		this.unstickit();
	}
});