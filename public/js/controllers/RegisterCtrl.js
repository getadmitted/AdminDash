angular.module('RegisterCtrl', []).controller('RegisterController', ['$scope','$http','$location',function($scope,$http,$location) {


	$scope.studentRegisterData={};
	$scope.editorRegisterData={};
	$scope.acfMemberRegisterData={};
		$scope.acfRegisterData={};





	$scope.registerStudent=function(){
		$http.post("/api/registerStudent/",$scope.studentRegisterData)
		.success(function(data){
			console.log("Successfully Registered Student");
				$scope.studentRegisterData={};
				$location.path('/');

		})
		.error(function(data){
			console.log("Something Went Wrong, Could not register Student.");
				$scope.studentRegisterData={};
				$location.path('/');

		});
};

	$scope.registerEditor=function(){

			$http.post("/api/registerEditor/",$scope.editorRegisterData)
		.success(function(data){
			console.log("Successfully Registered Editor");
				$scope.editorRegisterData={};
				$location.path('/');

		})
		.error(function(data){
			console.log("Something Went Wrong, Could not register user.");
				$scope.editorRegisterData={};
				$location.path('/');
	});
};


	$scope.registerACFmember=function(){

		$http.post("/api/registerACFmember/",$scope.acfMemberRegisterData)
		.success(function(data){
			console.log("Successfully Registered ACF member");
			alert("Successfully Registered ACF member");
				$scope.acfMemberRegisterData={};
				$location.path('/');

		})
		.error(function(data){
			console.log("Something Went Wrong, Could not register user.");
				$scope.acfMemberRegisterData={};
				$location.path('/');
	});
};


$scope.registerACF=function(){

		$http.post("/api/registerACF/",$scope.acfRegisterData)
		.success(function(data){
			console.log("Successfully Registered ACF ");
			alert("Successfully Registered ACF ");
				$scope.acfRegisterData={};
				$location.path('/');

		})
		.error(function(data){
			console.log("Something Went Wrong, Could not register user.");
				$scope.acfRegisterData={};
				$location.path('/');
	});
};


}]);