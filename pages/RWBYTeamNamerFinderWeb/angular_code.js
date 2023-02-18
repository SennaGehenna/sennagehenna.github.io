angular.module("teamNames",[])
.controller("TeamNamesController", function TeamNamesController($scope){

    $scope.firstName1 = ""
    $scope.lastName1 = ""
    $scope.firstName2 = ""
    $scope.lastName2 = ""
    $scope.lastName3 = ""
    $scope.firstName3 = ""
    $scope.lastName4 = ""
    $scope.firstName4 = ""
    

    $scope.enforceLeader = false
    
    $scope.teams = []
   


    $scope.getTeamNames = function(){

      var n1= new Name($scope.firstName1.trim(), $scope.lastName1.trim())
      var n2= new Name($scope.firstName2.trim(), $scope.lastName2.trim())
      var n3= new Name($scope.firstName3.trim(), $scope.lastName3.trim())
      var n4= new Name($scope.firstName4.trim(), $scope.lastName4.trim())
      

      var foundTeams = getResults(n1,n2,n3,n4,$scope.enforceLeader,colors)

      $scope.teams = foundTeams

    }
})


/*
angular.module('todoApp', [])
.controller('TodoListController', function() {
  var todoList = this;
  todoList.todos = [
    {text:'learn AngularJS', done:true},
    {text:'build an AngularJS app', done:false}];

  todoList.addTodo = function() {
    todoList.todos.push({text:todoList.todoText, done:false});
    todoList.todoText = '';
  };

  todoList.remaining = function() {
    var count = 0;
    angular.forEach(todoList.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };

  todoList.archive = function() {
    var oldTodos = todoList.todos;
    todoList.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) todoList.todos.push(todo);
    });
  };
});

*/
