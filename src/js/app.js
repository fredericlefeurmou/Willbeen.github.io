(function () {
  var app = angular.module("weatherApp", []);

  app.controller("PlaceController", ["$http", function($http) {
    var place = this;
    this.tab = 1;
    this.unit = "metric";
    this.forecastDays = "7";
    this.lang = "en";
    this.forecast = [];

    this.submitForecast = function(query) {
      if (place.tab === 1 &&  typeof query.name !== "undefined" && query.name !== "") {
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
      } else if (place.tab === 2 && typeof query.lat !== "undefined" && typeof query.lon !== "undefined") {
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

    this.isSet = function(tabName){
      return this.tab === tabName;
    };

    this.setTab = function(newValue){
      this.tab = newValue;
    };
  }]);
})();
