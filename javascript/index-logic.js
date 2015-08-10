$(document).ready(function() {
	$('.navigation').html(
		'<ul class="sm sm-simple">\
  			<li><a href="index.html">Home</a></li>\
			<li>\
			 	<a href="">User</a>\
			 	<ul>\
			        <li><a href="submit.html">Submit Research</a></li>\
			        <li><a href="poster.html">Submit Poster</a></li>\
			 		<li><a href="edit.html">Edit Account</a></li>\
			 	</ul>\
			</li>\
			<li><a href="about.html">About</a></li>\
			<li><a href="" id="siso">Sign In</a></li>\
			<li><a href="register.html">Sign Up</a></li>\
		</ul>'
	);
	$('#signInBox').html(
		'<h4 id="signInHeader">Sign In</h3>\
		<hr>\
		<form id="signInForm" method="post" action="">\
			<!-- <span><label class="description" for="email">Email</label></span> -->\
			<div>\
			<input type="text" id="email" name= "email" maxlength="255" size="16" value="" placeholder="email">\
			</div>\
			<!-- <span><label class="description" for="name">Password</label></span> -->\
			<div>\
			<input type="password" id="password" name="password" maxlength="255" size="16" value="" placeholder="password">\
			</div>\
			<div>\
			<input type="submit" id="signInButton" name="signInButton" value="Sign In">\
			</div>\
		</form>\
			<a href="register.html"><p>Don\'t have an account? Register here</p></a>'
		);
	
	$('[title]').tooltip();
	$('.sm').smartmenus( {
		showFunction: function($ul, complete) {
			$ul.slideDown(250,complete);
		},
		hideFunction: function($ul, complete) {
			$ul.slideUp(250, complete);
		}
	}); 
	var papers=['The Effect of Music on Memory', 'Music on Time Perception', 'Productivity and Music', 'Not What You Think: Music and Memory', 'Cosmic Radiation and Ice: The Space Miracle'];
	$('#searchBox').autocomplete({source:papers});

	$('#signInBox').dialog({
		modal: true,
		draggable:true,
		resizable:false,
		minWidth: 400,
		autoOpen: false,
		show: 'fade', 
		hide: 'drop'
	}); //end dialog
	
	$('#siso').click(function(event) {
		event.preventDefault();
		$('#signInBox').dialog('open');
	
	});
	$('#searchBoxSubmit').click(function(){
		window.location.href = "results.html";
	})
	$('#signInForm').submit(function(event) {
		event.preventDefault();
		readSignInForm(document.getElementById('signInForm'));
		$('#signinBox').dialog('close');
	});

	$('#form_1037235').submit(function(event) {
		event.preventDefault();
		readRegisterForm(document.getElementById('form_1037235'));
	});

	$('#signInButton').button();

}); 

function readSignInForm(form) {
	console.log('read from sign in');
	var signinEmail = form.elements["email"].value;
	var signinPassword = form.elements["password"].value;
	requestUser(signinEmail, signinPassword);
}

function readRegisterForm(form) {
	console.log('read from register');
	var firstName = $('#element_2_1').val();
	var lastname = $('#element_2_2').val();
	var is_highschool = $('#element_6_1').val();
	var is_undergrad = $('#element_6_2').val();
	if(is_highschool) {
		var grade = $('#element_1').val();
	}
	var email = $('#element_3').val();
	var password = $('#element_5').val();
}

function requestUser(email, password) {
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "http://localhost:8888/getUser/" + email + "/" + password, true);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
           console.log(xmlhttp.responseText);
        }
	}
	xmlhttp.send();
}
