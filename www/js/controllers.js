angular.module('starter.controllers', [])

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
  $scope.list = [{id: 1, name: 'Fantasy Fabric Dress', imgUrl: 'http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=86316898', price: '$46'}, 
                {id: 2, name: 'Floral Embroidery Silk Top Blouse', imgUrl: 'http://thumbs.ebaystatic.com/images/g/5l0AAOSwRgJXhQCx/s-l225.jpg', price: '$23'},
                {id: 3, name: 'Ripped Trousers in Black', imgUrl: 'https://cdnd.lystit.com/photos/0ceb-2016/01/26/zara-black-ripped-trousers-product-1-609239874-normal.jpeg', price: '$23'},
                {id: 4, name: 'Leather High Heel Ankle Black', imgUrl: 'https://cdnd.lystit.com/photos/8c44-2015/09/03/zara-black-leather-high-heel-ankle-boots-leather-high-heel-ankle-boots-product-6-288278930-normal.jpeg', price: '$23'}];
});
