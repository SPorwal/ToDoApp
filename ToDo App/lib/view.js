// Define model
var TodoModel = Backbone.Model.extend({
	// Defaults standards
	defaults : {
		id : "",
		title : "",
		completed : false
	}
});

// Create a collection and make an object of it.

// Define collections
var TodoCollections = Backbone.Collection.extend({
	model : TodoModel
});
var todoCol = new TodoCollections();

var TodoView = Backbone.View.extend({
	el : "body",

	events : {
		'click .btn' : 'addTasks',
		'change input[type="checkbox"]' : 'removeTasks'
	},

	initialize : function() {
		var self = this;
		_.bindAll(self, 'render');
		self.render();
	},

	render : function() {
		// Rendering the first template on the page load
		var self = this;
		var template = _.template($(".todoInput").html());
		$(".listInput").html(template);
	},

	addTasks : function() {
		// Code for adding the task
		var titleVal = $('#tfAddTasks').val();
		var count = todoCol.length + 1;
		if (titleVal !== "") {
			// Creating a new model for every new task
			var todoModelTask = new TodoModel({
				title : titleVal,
				id : count
			});
			console.log(todoModelTask.attributes);

			// Showing the task on the html page by adding the template
			var template = _.template($(".todoTemplate").html(), {
				title : titleVal,
				id : count
			});

			todoCol.add(todoModelTask);
			console.log(JSON.stringify(todoCol.toJSON()));

			$(".listItems").append(template);
			$('#tfAddTasks').val("");
		} else {
			// do nothing
		}

	},

	removeTasks : function(e) {
		// Code for removing the task
		var retrieveModel = todoCol.get(e.target.id);
		var taskStatus = retrieveModel.get('completed');
		if (taskStatus === false) {
			retrieveModel.set({
				completed : true
			});
			$(e.target).closest("div").fadeOut("slow");
		} else {
			retrieveModel.set({
				completed : false
			});
		}
		console.log(JSON.stringify(todoCol.toJSON()));

	}
});

$(document).ready(function() {
	new TodoView();
});
