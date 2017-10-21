/**
 * ng-event-bus JS 1.0
 * 
 * @Developed by batux
 * @Contact Batuhan Duzgun
 * @Email: batuhan.duzgun@windowslive.com
 * 
 * @Copyright (c) 2017
 * 
 */

var angularEventbusModule = (function() {
	
	var angularEventbusModuleName = 'angularEventbusModule';
	var angularEventbusModule = angular.module(angularEventbusModuleName, []);
	
	angularEventbusModule.EVENT_BUS_MODULE_NAME = angularEventbusModuleName;

	var eventBusProcessorController = function($rootScope, $timeout) {

		  var self = this;
		  
		  self.ngEventbusApiFunctions = {};
		  
		  self.exportApiFunction = function(apiFunctionName, apiFunction) {
		
			  if(!apiFunctionName && !apiFunction) {
				  return;
			  }
	
			  if(typeof apiFunctionName === 'string') {
				  self.ngEventbusApiFunctions[apiFunctionName] = apiFunction;
			  }
		  }
			
		  self.forwardEventViaBus = function(scope, eventName, eventMessage, forwardEventFunction) {
			  
			  if (!scope) {
				  return;
			  }
			  
			  forwardEventFunction.apply(scope, [eventName, eventMessage]);
		  }
		  
		  self.transferEventByForwardFunction = function(scope, eventName, eventMessage, timeoutInMilliseconds, forwardEventFunction) {
			  
			  if (timeoutInMilliseconds && timeoutInMilliseconds > 0) {
				  $timeout(self.forwardEventViaBus, timeoutInMilliseconds, true, scope, eventName, eventMessage, forwardEventFunction); 
			  }
			  else {
				  var argumentsOfForwardEvent = [scope, eventName, eventMessage, forwardEventFunction];
				  self.forwardEventViaBus.apply(null, argumentsOfForwardEvent);
			  }
		  }
		  
		// Exported API Function
		  self.broadcastEventViaRootScope = function(eventName, eventMessage, timeoutInMilliseconds) {
			
			  var argumentsOfTransferEvent = [$rootScope, eventName, eventMessage, timeoutInMilliseconds, $rootScope.$broadcast];
			  
			  self.transferEventByForwardFunction.apply(null, argumentsOfTransferEvent);
		  }
		  
		  // Exported API Function
		  self.broadcastEventViaOwnScope = function(eventName, scope, eventMessage, timeoutInMilliseconds) {

			  var argumentsOfTransferEvent = [scope, eventName, eventMessage, timeoutInMilliseconds, scope.$broadcast];
			  
			  self.transferEventByForwardFunction.apply(null, argumentsOfTransferEvent);
		  }
		  
		  // Exported API Function
		  self.emitEventViaRootScope = function(eventName, eventMessage) {

			  var argumentsOfTransferEvent = [$rootScope, eventName, eventMessage, timeoutInMilliseconds, $rootScope.$emit];
			  
			  self.transferEventByForwardFunction.apply(null, argumentsOfTransferEvent);
		  }
		  
		  // Exported API Function
		  self.emitEventViaOwnScope = function(eventName, scope, eventMessage) {

			  var argumentsOfTransferEvent = [scope, eventName, eventMessage, timeoutInMilliseconds, scope.$emit];
			  
			  self.transferEventByForwardFunction.apply(null, argumentsOfTransferEvent);
		  }
		  
		  // Exported API Function
		  self.subscribeToEvent = function(eventName, scope, subscriptionCallback) {
		  	
			  scope.$on(eventName, subscriptionCallback);
		  }
	  
		  self.exportApiFunction('broadcastEventViaRootScope', self.broadcastEventViaRootScope);
		  self.exportApiFunction('broadcastEventViaOwnScope', self.broadcastEventViaOwnScope);
		  self.exportApiFunction('emitEventViaRootScope', self.emitEventViaRootScope);
		  self.exportApiFunction('emitEventViaOwnScope', self.emitEventViaOwnScope);
		  self.exportApiFunction('subscribeToEvent', self.subscribeToEvent);
		  
		  return self.ngEventbusApiFunctions;
	}
	
	angularEventbusModule.factory('eventBus', ['$rootScope', '$timeout', eventBusProcessorController]);
	
	return angularEventbusModule;
	
})();