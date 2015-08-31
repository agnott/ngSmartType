angular.module('ngSmartType')
.directive('ngSmartType', ['$filter', function($filter){
	return {
		scope: {
			dict: '=ngSmartTypeDict',
			model: '=ngSmartTypeModel',
			placeholder: '@ngSmartTypePlaceholder'
		},
		controller: function($scope){
			var self = this;
			self.model = null;
		},
		controllerAs: 'ngST',
		bindToController: true,
		link: function($scope, $el, $attr, self){
			$el[0].style.position = $el[0].style.position || 'relative';
			$el[0].getElementsByClassName('ngSmartTypeInput')[1].placeholder = self.placeholder || '';
			
			//Resort and lowercase list when necessary
			$scope.$watch(function(){return self.dict},function(){
				self.dict.sort();
			});
			
			//On change
			$scope.$watch(function(){return self.model},function(){
				self.model = (self.model)? self.model.toLowerCase() : '';
				//If the string is empty or undefined
				if( angular.isUndefined(self.model) || self.model === '' ){
					self.suggested = '';
					return;
				}
				//Find the correct word
				for( var i=0; i<self.dict.length; i++ ){
					if( self.dict[i].toLowerCase().indexOf(self.model) === 0 && self.dict[i].length > self.model.length ){
						self.suggested = self.dict[i].toLowerCase();
						return;
					}
				}
				//If no other conditions are satisfied
				self.suggested = '';
			});
							
			//On tab, auto-complete
			self.keys = function($event){
				if($event.which === 9 && self.suggested !== self.model && self.suggested){
					$event.preventDefault();
					self.model = self.suggested;
				}
			}			
		},
		templateUrl:'/shared/js/ngSmartType/ngSmartType.template.html'
	}
}]);
loaded('ngSmartType.directive.js');