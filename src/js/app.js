(function () {
  var app = angular.module("weatherApp", []);

  app.controller("placeController", ["$http", function($http) {
    var place = this;
    this.unit = "metric";
    this.forecastDays = "7";
    this.lang = "en";
    this.forecast = [];

    this.submitForecast = function(query) {
      if (typeof query.name !== "undefined" && query.name !== "") {
          var queryNameSearch = query.name;
          if (typeof query.countryCode !== "undefined" && query.countryCode !== "") {
            queryNameSearch += ',' + place.countryCode;
          }
          $http.get("http://api.openweathermap.org/data/2.5/weather", {
            params: {
              q: queryNameSearch,
              units: place.unit,
              lang: place.lang
            }})
            .success(function(data) {
              place.nameResults = data.name;
              place.unitResults = place.unit;
              place.currentWeather = data;
            });
          $http.get("http://api.openweathermap.org/data/2.5/forecast/daily", {
            params: {
              q: queryNameSearch,
              units: place.unit,
              cnt: place.forecastDays,
              lang: place.lang
            }})
            .success(function(data) {
              place.forecast = data.list;
            });
      } else if (typeof query.lat !== "undefined" && typeof query.lon !== "undefined") {
        $http.get("http://api.openweathermap.org/data/2.5/weather", {
          params: {
            lat: query.lat,
            lon: query.lon,
            units: place.unit,
            lang: place.lang
          }})
          .success(function(data) {
            place.nameResults = data.name;
            place.unitResults = place.unit;
            place.currentWeather = data;
          });
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
  }]);
})();
