/**
 * Routes that are used by the applicaiton
 * Note that these are major view changes
 */
Rental.Router = Marionette.AppRouter.extend({

	controller : Rental.Controller,
	
	appRoutes : {
		"" : "rentalInfo",
		"/page1" : "rentalInfo",
		"/page2" : "personalInfo",
		"/page3" : "confirmationPage",
		"car-rental" : "carInformation"
	}
});