angular.module('AboutCtrl', ['ngRoute']).controller('AboutController', ['$scope','$http','$location',function($scope,$http,$location) {


	$scope.studentData={};
	$scope.editorData={};
	$scope.acfData={};
	$scope.acfMemberData={};


	$scope.clickedStudent=false;
	$scope.clickedEditor=false;
	$scope.clickedACF=false;
	$scope.clickedACFmember=false;



$scope.loadACFMemberInfo=function(){
		//Refactor this code into data service:
	$http.post('/api/loadACFMemberInfo',$scope.acfMemberData)

	.success(function(data){
		console.log('Successfully loaded all ACF Member info');
		$scope.acfMemberData=data;
		$scope.clickedACFmember=true;
		console.log(data);
	})
	.error(function(data){
		console.log('There was an error');
		console.log(data);
	});
}

$scope.loadACFInfo=function(){
		//Refactor this code into data service:
	$http.post('/api/loadACFInfo',$scope.acfData)

	.success(function(data){
		console.log('Successfully loaded all ACF info');
		$scope.acfData=data;
		$scope.clickedACF=true;
		console.log(data);
	})
	.error(function(data){
		console.log('There was an error');
		console.log(data);
	});
}

	$scope.removeStudentFromEditor=function(studentId,editorId){

		console.log(editorId);
		$http.post('/api/removeStudentFromEditor',{sID:studentId,eID:editorId})
		.success(function(data){
			console.log("Successfully Removed Student From Editor");
			
		})
		.error(function(data){
			console.log("There was an error unlinking the student from Editor");
		});
	}

	$scope.addStudentToEditor=function(studentId,editorId){
		$http.post('/api/addStudentToEditor',{sID:studentId,eID:editorId})
		.success(function(data){
			console.log('Successfully linked Student to Editor');
		})
		.error(function(){
			console.log('Could Not Link Student');
		})
	}

$scope.loadEditorInfo=function(){

		//Refactor this code into data service:
	$http.post('/api/loadEditorInfo',$scope.editorData)

	.success(function(data){
		console.log('Successfully loaded all editor info');
		$scope.editorData=data;
		$scope.clickedEditor=true;
		console.log(data);
	})
	.error(function(data){
		console.log('There was an error');
		console.log(data);
	});

	}

		$scope.updateEditorInfo=function(){

		$http.post('/api/updateEditorInfo',$scope.selectedEditor)
		.success(function(data){
			console.log('successfully updated Editor');
			alert('Successfully updated Editor');
		})
		.error(function(data){
			console.log(data);
			$location.path('/');
		});


	}



	$scope.loadStudentInfo=function(){

		//Refactor this code into data service:
	$http.post('/api/loadStudentInfo',$scope.studentData)

	.success(function(data){
		console.log('Successfully loaded all student info');
		$scope.studentData=data;
		$scope.clickedStudent=true;
		console.log(data);
	})
	.error(function(data){
		console.log('There was an error');
		console.log(data);
	});

	}


	$scope.updateStudentInfo=function(){

		$http.post('/api/updateStudentInfo',$scope.selectedStudent)
		.success(function(data){
			console.log('successfully updated Student');
			$location.path('/about');
		})
		.error(function(data){
			console.log(data);
			$location.path('/');
		});


	}



}]);

