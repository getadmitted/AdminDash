angular.module('MainCtrl', ['ngCookies']).controller('MainController',['$scope','$http','$cookieStore','$location','$route','$rootScope', function($scope,$http,$cookieStore,$location,$route,$rootScope) {

	$scope.tagline = 'Admin Dashboard';	



	  $scope.$on('$viewContentLoaded', function(){
	  		if($cookieStore.get('id')){
			
		console.log($cookieStore.get('id'));
		$http.post("/api/getUser",{'id':$cookieStore.get('id')})
		.success(function(data){
			console.log(data);
			 $scope.isAdmin=(data.role=="admin");
		})
			.error(function(data){
				console.log('Something Went Wrong '+data);
				 $scope.isAdmin=false;
			});

			}
		    
    	});

$scope.xss={};

$scope.logout=function(){
	console.log("Successfully Logged Out");
	$http.post('/api/logout',{})
	.success(function(data){
		console.log("Successully Logged Out");
		$cookieStore.remove('id');
		$scope.getAdmin();	
		$scope.Users=[];
		$location.path('/');

	})
	.error(function(data){
		console.log("Logout Failed: "+data);
	});
}


 $scope.getAllUsers=function(){

			console.log("About to Start Getting All Users: "+$cookieStore.get('id'));
	 		$http.post("/api/getAllUsers",{'id':$cookieStore.get('id')})

	 		.success(function(data){
	 			console.log("Successfully Got All Users");
	 			
	 			$scope.Users=data;
	 	
	 		
 		})
	 		.error(function(data){
	 			$location.path('/');
	 			console.log("Failed To Get Users");

	 		});

	 
 }


	$scope.getUser=function(){
		if($cookieStore.get('id')){
	
		$http.post("/api/getUser",{'id':$cookieStore.get('id')})
		.success(function(data){
			$scope.currentUser= data.name;
		})
			.error(function(data){
				console.log('Something Went Wrong '+data);
			});

			}
		}

		$scope.getAdmin=function(){
		$scope.isAdmin=false;
		if($cookieStore.get('id')){
			
	
		$http.post("/api/getUser",{'id':$cookieStore.get('id')})
		.success(function(data){
		
			 $scope.isAdmin=(data.role=="admin");
		})
			.error(function(data){
				console.log('Something Went Wrong '+data);
				 $scope.isAdmin=false;
			});

			}
		}

}]);