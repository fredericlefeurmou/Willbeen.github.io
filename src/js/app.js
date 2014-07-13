(function () {
  var app = angular.module("weatherApp", []);

  app.controller("placeController", ["$http", function($http) {
    var place = this;
    this.units = "celcius";
    forecastDays = 7;
    this.forecast = [];

    this.submitForecast = function(placeName) {
      $http.get("http://api.openweathermap.org/data/2.5/forecast/daily", {params: {q: placeName, units: place.units, cnt: place.forecastDays}})
        .success(function(data) {
          console.log(data);
          place.name = data.city.name;
          place.forecast = data.list;
        });
    };
  }]);
})();
