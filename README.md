# ng-event-bus JS 1.0
ng-event-bus JS is a two way message passing library which uses the infrastructure of Angular JS 1. It coordinates the communication of between independent software parts. With this way, we can create isolated components that send events for each other easily. ng-event-bus JS aims to provide an abstraction layer for this communication. This small library has dependency for Angular JS 1. If we would like to use it, we have to include Angular JS 1 in projects.

Angular JS has message passing system which has '$broadcast, $emit and $on' methods. It uses Pub/Sub (Publisher/Subscriber) desing pattern. 'ng-event-bus' uses these methods oftenly.

ng-event-bus JS basic capabilities:

- You can send message immediately
- You can send message with a timeout value
- You can use $rootScope global glue object for message passing
- You can use $scope local glue object for message passing
- Parent component can communicate with child components
- A child component can send event message to its parent
- You send event message globally in your application

ng-event-bus JS is a modular software part. You can include this JS file in your projects. After that, start to use it fastly! It is so simple!


ng-event-bus JS 1.0 Integration Steps

```html
<script src="ng-event-bus.js"></script>
```

As you guess, we included javascript file in a HTML page. After that, ng-event-bus JS creates an Angular Module that named as 'angularEventbusModule'.

If you would like to use eventbus, we should add 'angularEventbusModule' as a dependency in your Angular JS project.

```javascript
var angularEventBusLabModule = angular.module('angularlab', [angularEventbusModule.EVENT_BUS_MODULE_NAME]);
```
In above code part, we added module as dependency. 'angularEventbusModule.EVENT_BUS_MODULE_NAME' denotes the name of event bus module.

Injecting Event Bus

```javascript
angularEventBusLabModule.controller('searchBoxController', ['$scope', 'eventBus', searchBoxController]);
```
We can inject event bus easily.

```javascript
var searchBoxController = function($scope, eventBus) {
...

```

Then, we can use a concrete object of event bus that denoted 'eventBus' as a variable.


In this example, we fired an event message globally, It uses $rootScope object. 

```javascript
var searchBoxController = function($scope, eventBus) {

  var self = this;
  self.eventBus = eventBus;
  
  $scope.typedText = '';
  
  $scope.textChange = function() {
  
	  self.eventBus.broadcastEventViaRootScope('filter-list', $scope.typedText);
  }
  
}
  
angularEventBusLabModule.controller('searchBoxController', ['$scope', 'eventBus', searchBoxController]);
```



