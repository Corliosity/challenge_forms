/**
 * Begin initialization of application
 * Ensure that any data recieved is not cached so fresh information can be consumed when app reloads
 */
_.extend(Rental, {
	_inializeApp : function() {
		$.ajaxSetup({
			cache: 'false',
			setHeaders: {
				'Application-Name' : 'Rental - Relex'
			}
		});

		Rental.applicationState = new Rental.ApplicationState();
		Rental.rentalDetail = new Rental.RentalDetail();
		
		Rental.mainView = new Rental.MainView({ model: Rental.rentalDetail });
		Rental.appRegion.show(Rental.mainView);

		
		Rental.router = new Rental.Router();
		Backbone.history.start();
	}
});

// Note this is being removed in Marionette 3.0.0 
// Will need to work out alternative method for initailizer
Rental.addInitializer(function() {
	Rental._inializeApp();
});

$(document).ready(function() {
	Rental.start();
});