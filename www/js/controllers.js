angular.module('starter.controllers', [])


.controller('MapCtrl', function($scope, $state, $cordovaGeolocation,$state) {
  var options = {timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

      var latLng = new google.maps.LatLng(47.3741135, 8.5381864);

      var myStyles =[
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
              { visibility: "off" }
        ]
    }
];

      var mapOptions = {
        center: latLng,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        styles: myStyles
      };

      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);


      var spotList = [
          {
            name: "Massimo Dutti",
            lat:47.3736348,
            lng:8.5374256
          },
          {
            name: "Zara Home",
            lat:47.3743618,
            lng:8.5381145
          },
          {
            name: "Modissa",
            lat:7.3736348,
            lng:8.5374256
          },
          {
            name: "BIG",
            lat:47.373824,
            lng:8.5378641
          },
          {
            name: "Mango",
            lat:47.3748039,
            lng:8.53842
          },
          {
            name: "Victorinox",
            lat:47.3741345,
            lng:8.5389725
          },
          {
            name: "H&M",
            lat:47.3742135,
            lng:8.5388864
          },

      ]




      for( var i = 0; i < spotList.length; i++){

        (function(index) {
              // passes the `for` loop index into a function closure
              // so it is uniquely preserved for each event handler
              var element =  spotList[index];

                var mapLabel = new MapLabel({
                  text: element.name,
                  position: new google.maps.LatLng(element.lat, element.lng),
                  map: $scope.map,
                  fontSize: 20,
                  align: 'right'
              });

                var marker = new google.maps.Marker();
                 marker.bindTo('map', mapLabel);
                 marker.bindTo('position', mapLabel);
                 marker.addListener('click', function() {
                 $state.go('shopSelected',{name:element.name});


              });
          })(i);



      }




    }, function(error){
      console.log("Could not get location");
    });
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('ShopingListCtrl', function($scope) {
  $scope.list = [{id: 1, name: 't-shirt'}, {id: 2, name: 'blaus'}];
})


.controller('ShopSelectedCtrl', function($scope,$state,ionicToast,$stateParams) {

  $scope.shopName = $stateParams.name;
  $scope.startShoping = function(){
  ionicToast.show('Enjoy your shopping at ' + $stateParams.name, 'middle', false, 2500);    $state.go("shoping");
  }
});
