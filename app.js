var app = new Vue({
	el: "#app",
	data: {
		showingAddModal: false,
		showingEditModal: false,
		showingDeleteModal: false,
		errorMessage: "",
		successMessage: "",
		users: [],
		newUser: {username: "", email: "", mobile: ""},
		clickedUser: {},
	},

	mounted: function(){
		console.log("mounted");
		this.getAllUsers();
	},

	methods: {
		getAllUsers: function() {
			axios.get("http://localhost/vuejs-curd-with-raw-php/api.php?action=read")
			.then(function(response){
				console.log(response);
				if(response.data.error) {
					app.errorMessage = response.data.message;
				} else {
					app.users = response.data.users;
				}
			})
		},

		saveUser: function() {
			var formData = app.toFormData(app.newUser);

			axios.post("http://localhost/vuejs-curd-with-raw-php/api.php?action=create", formData)
			.then(function(response){
				app.newUser = {username: "", email: "", mobile: ""};
				if(response.data.error) {
					app.errorMessage = response.data.message;
				} else {
					app.successMessage = response.data.message;
					app.getAllUsers();
					 
				}
			})
		},

		updateUser: function() {
			var formData = app.toFormData(app.clickedUser);

			axios.post("http://localhost/vuejs-curd-with-raw-php/api.php?action=update", formData)
			.then(function(response){
				app.clickedUser = {};
				if(response.data.error) {
					app.errorMessage = response.data.message;
				} else {
					app.successMessage = response.data.message;
					app.getAllUsers();
					 
				}
			})
		},

		deleteUser: function() {
			var formData = app.toFormData(app.clickedUser);

			axios.post("http://localhost/vuejs-curd-with-raw-php/api.php?action=delete", formData)
			.then(function(response){
				app.clickedUser = {};
				if(response.data.error) {
					app.errorMessage = response.data.message;
				} else {
					app.successMessage = response.data.message;
					app.getAllUsers();
					 
				}
			})
		},

		selectUser: function(user) {
			app.clickedUser = user;
		},

		toFormData: function(obj) {
			var form_data = new FormData();
			for (var key in obj) {
				form_data.append(key, obj[key]);
			}
			return form_data;
		},

		clearMessage: function() {
			app.errorMessage = "";
			app.successMessage = "";
		},

	}
});