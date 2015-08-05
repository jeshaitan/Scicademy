$(document).ready(function() {
	$('.navigation').html(
		'<ul class="sm sm-simple">\
  			<li><a href="index.html">Home</a></li>\
			<li>\
			 	<a href="">User</a>\
			 	<ul>\
			        <li><a href="submit.html">Submit Research</a></li>\
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
			<input type="submit" id="signInButton" name="signInButton" value="Sign In" onclick="readSignInForm(this.form)">\
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
		autoOpen: false
	}); //end dialog
	
	$('#siso').click(function(evt) {
		evt.preventDefault();
		$('#signInBox').dialog('open');
	
	}); //end signup click dialog open
		
	$('#signInForm').submit(function(evt) {
		$('#signinBox').dialog('close');
	}); //end dialog close

	$('#signInButton').button();

}); 


function readSignInForm(form) {
	console.log('read from sign in');
	var signinEmail = form.email.value;
	var signinPassword = form.password.value;
	requestUser(signinEmail, signinPassword);
}

function readRegisterForm(form) {
	console.log('read from register');
	var firstName = form.firstname.value;
	var lastname = form.lastname.value;
	var is_highschool = form.highschool.value;
	var is_undergrad = form.undergrad.value;
	if(is_highschool) {
		var grade = form.grade.value;
	}
	var email = form.email.value;
	var password = form.password2.value;
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
