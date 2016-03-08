/**
 * On update of hash trigger a method for updating the views on screen
 */
Rental.Controller = {
	
	rentalInfo: function() {
		Rental.mainView.appPage.reset();

		Rental.applicationState.set('title', 'Rental Information');
		var view = new Rental.PageOne();
		Rental.mainView.appPage.show(view);
	},

	carInformation: function() {

		Rental.mainView.appPage.reset();

		Rental.applicationState.set('title', 'Car Selection');
		
		var group = Rental.rentalDetail.get('rentalCarType').toUpperCase();
		var collection = new Rental.Cars(Rental.Cars[group]);
		var view = new Rental.CarPicker({ collection : collection });

		Rental.mainView.appPage.show(view);
	},

	personalInfo: function() {

	},

	confirmationPage: function() {
	
	}

};