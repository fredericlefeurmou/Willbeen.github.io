(function () {
	var app = angular.module("weatherApp", []);

	app.controller("PlaceController", ["$http", function($http) {
		var place = this;
		this.tab = 1;
		this.unit = "metric";
		this.forecastDays = "7";
		this.langage = "en";
		this.forecast = [];

		this.submitForecast = function(query) {
			// Forecast by city name
			if (place.tab === 1 &&  typeof query.name !== "undefined" && query.name !== "") {
					var queryNameSearch = query.name;
					if (typeof query.countryCode !== "undefined" && query.countryCode !== "") {
						queryNameSearch += ',' + place.countryCode;
					}
					// Returns current weather
					$http.get("http://api.openweathermap.org/data/2.5/weather", {
						params: {
							q: queryNameSearch,
							units: place.unit,
							lang: place.langage
						}})
						.success(function(data) {
							place.nameResults = data.name;
							place.unitResults = place.unit;
							place.currentWeather = data;
						});
					// Returns forecast
					$http.get("http://api.openweathermap.org/data/2.5/forecast/daily", {
						params: {
							q: queryNameSearch,
							units: place.unit,
							cnt: place.forecastDays,
							lang: place.langage
						}})
						.success(function(data) {
							place.forecast = data.list;
						});
			// Forecast by geographic coordinates
			} else if (place.tab === 2 && typeof query.lat !== "undefined" && typeof query.lon !== "undefined") {
				// Returns current weather
				$http.get("http://api.openweathermap.org/data/2.5/weather", {
					params: {
						lat: query.lat,
						lon: query.lon,
						units: place.unit,
						lang: place.langage
					}})
					.success(function(data) {
						place.nameResults = data.name;
						place.unitResults = place.unit;
						place.currentWeather = data;
					});
				// Returns forecast
				$http.get("http://api.openweathermap.org/data/2.5/forecast/daily", {
					params: {
						lat: query.lat,
						lon: query.lon,
						units: place.unit,
						cnt: place.forecastDays
					}})
					.success(function(data) {
						place.forecast = data.list;
					});
			}
		};

		this.isSet = function(tabName){
			return this.tab === tabName;
		};

		this.setTab = function(newValue){
			this.tab = newValue;
		};
	}]);
})();
