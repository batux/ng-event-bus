var angularEventBusLabModule = angular.module('angularlab', [angularEventbusModule.EVENT_BUS_MODULE_NAME]);

var searchBoxController = function($scope, eventBus) {

  var self = this;
  self.eventBus = eventBus;
  
  $scope.typedText = '';
  
  $scope.textChange = function() {
  
	  self.eventBus.broadcastEventViaRootScope('filter-list', $scope.typedText);
  }
  
}
  
angularEventBusLabModule.controller('searchBoxController', ['$scope', 'eventBus', searchBoxController]);
  
  
  var listboxController = function($scope, eventBus) {
  	
    var self = this;
    self.eventBus = eventBus;
  
  	self.sourceItems = ['Apple', 'Banana', 'Kiwi', 'Orange'];
    
    $scope.filteredItems = self.sourceItems;
    
    self.filterItems = function(e, typedText) {
    	
      if(!typedText) {
      	$scope.filteredItems = self.sourceItems;
        return;
      }
      
      var filteredItems = [];
      
      for(var i=0; i < self.sourceItems.length; i++) {
      	
        var item = self.sourceItems[i];
      	
        if(item.toLowerCase().indexOf(typedText.toLowerCase()) > -1) {
      		filteredItems.push(item);
        }
      }
      
      $scope.filteredItems = filteredItems;
    }
    
    self.eventBus.subscribeToEvent('filter-list', $scope, self.filterItems);
    
  }
  
angularEventBusLabModule.controller('listboxController', ['$scope', 'eventBus', listboxController]);