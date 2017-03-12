angular.module('starter.controllers', [])


.controller('MapCtrl', function($scope, $state, $cordovaGeolocation,$state,$cordovaNfc,$cordovaNfcUtil) {
  var options = {timeout: 10000, enableHighAccuracy: true};



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




  $cordovaNfc.then(function(nfcInstance){


    //Use the plugins interface as you go, in a more "angular" way
    nfcInstance.addNdefListener(function(event){
      //Callback when ndef got triggered
    })
    .then(
      //Success callback
      function(event){
        console.log("bound success");
      },
      //Fail callback
      function(err){
        console.log("error");
      });
  });

  $cordovaNfcUtil.then(function(nfcUtil){
      console.log( nfcUtil.bytesToString("some bytes") )
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

.controller('ShoppingListCtrl', function($scope,$cordovaBarcodeScanner,ionicToast) {
  $scope.allList =
  [
    {id: 1, name: 'Fantasy Fabric Dress', imgUrl: 'http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=86316898', price: 46},
    {id: 2, name: 'Floral Embroidery Silk Top Blouse', imgUrl: 'http://thumbs.ebaystatic.com/images/g/5l0AAOSwRgJXhQCx/s-l225.jpg', price: 23},
    {id: 3, name: 'Ripped Trousers in Black', imgUrl: 'https://cdnd.lystit.com/photos/0ceb-2016/01/26/zara-black-ripped-trousers-product-1-609239874-normal.jpeg', price: 23},
    {id: 4, name: 'Leather High Heel Ankle Black', imgUrl: 'https://cdnd.lystit.com/photos/8c44-2015/09/03/zara-black-leather-high-heel-ankle-boots-leather-high-heel-ankle-boots-product-6-288278930-normal.jpeg', price: 23}
  ];

  $scope.list = [];

  $scope.scanNFC = function(){

    ionicToast.show('NFC tag read correctly', 'bottom', false, 1000);
    var indice =  Math.floor(Math.random() * ($scope.allList.length - 0)) + 0;
    var json = JSON.stringify($scope.allList[indice]);

    var copy = JSON.parse(json);
    copy.id = $scope.list.length + 1;
    copy.$$hashKey = undefined;
    $scope.list.push(copy);

  }
  $scope.takePhoto = function(){

    if(ionic.Platform.isIOS() || ionic.Platform.isAndroid()){

      $cordovaBarcodeScanner
      .scan()
      .then(function(barcodeData) {
        // Success! Barcode data is here
        var indice =  Math.floor(Math.random() * ($scope.list.length - 0 + 1)) + 0;
        var json = JSON.stringify($scope.list[indice]);
        var copy = JSON.parse(json);
        copy.id = $scope.list.length + 1;
        copy.$$hashKey = undefined;
        $scope.list.push(copy);

      }, function(error) {

        // An error occurred
      });
    }
    else{
      var indice =  Math.floor(Math.random() * ($scope.list.length - 0 + 1)) + 0;
      var json = JSON.stringify($scope.list[indice]);

      var copy = JSON.parse(json);
      copy.id = $scope.list.length + 1;
      copy.$$hashKey = undefined;
      $scope.list.push(copy);
    }


  }

  $scope.total = function() {
    var total = 0;
    for (var i = 0; i < $scope.list.length; i++) {
      total += $scope.list[i].price;
    }

    return total;
  }
})


.controller('ShopSelectedCtrl', function($scope,$state,ionicToast,$stateParams) {

  $scope.shopName = $stateParams.name;
  $scope.startshopping = function(){
    ionicToast.show('Enjoy your shopping at ' + $stateParams.name, 'bottom', false, 2500);    $state.go("recommendation-list");
  }

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('RecommendationListCtrl', function($scope) {
  $scope.list = [{id: 1, name: 'Hat with Leather details', imgUrl: 'http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=96161043', price: 46, hasSale: false, points: 0},
                {id: 1, name: 'Pleated Mini Skirt', imgUrl: 'http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=86317292', price: 46, hasSale: false, points: 3},
                {id: 1, name: 'Scarve', imgUrl: 'http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=164909253', price: 12, salePrice: 8, hasSale: true, points: 0}];
})

.controller('PrizeCtrl', function($scope) {
})

.controller('PointsCtrl', function($scope) {
});
