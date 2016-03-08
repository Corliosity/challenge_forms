/**
 * Application State
 * Any global values that can change through the lifecycle
 * This includes the title of each page, or a language change
 */
Rental.ApplicationState = Backbone.Model.extend({
	defaults: {
		title: '',
		language: '',
		name: ''
	}
});