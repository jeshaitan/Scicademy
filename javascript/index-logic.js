$(document).ready(function() {
	$('.navigation').html('<ul class="sm sm-simple"><li><a href="index.html">Home</a></li><li><a href="">User</a><ul><li><a href="submit.html">Submit Research</a></li><li><a href="edit.html">Edit Account</a></li></ul></li><li><a href="about.html">About</a></li><li><a href="" onclick="sisoopen()" id="siso">Sign In</a></li><li><a href="register.html">Sign Up</a></li></ul>');
	$('#signInBox').html('<h4 id="signInHeader">Sign In</h3><hr><form id="signInForm" method="post" action=""><div><input type="text" id="email" name= "email" maxlength="255" size="16" value="" placeholder="email"></div><div><input type="password" id="password" name="password" maxlength="255" size="16" value="" placeholder="password"></div><div><input type="submit" id="signInButton" name="signInButton" value="Sign In"></div></form><a href="register.html"><p>Don\'t have an account? Register here</p></a>');
	/** if you ever want to add more tabs, here's the original navBar code. Javascript can't have strings over one line
	<ul class="sm sm-simple">
  			<li><a href="index.html">Home</a></li>
			<li>
			 	<a href="">User</a>
			 	<ul>
			        <li><a href="submit.html">Submit Research</a></li>
			 		<li><a href="edit.html">Edit Account</a></li>
			 	</ul>
			</li>
			<li><a href="about.html">About</a></li>
			<li><a href="" onclick="sisoopen()" id="siso">Sign In</a></li>
			<li><a href="register.html">Sign Up</a></li>
	</ul>
	
	and here's original signInBox
	
	<h4 id="signInHeader">Sign In</h3>
		<hr>
		<form id="signInForm" method="post" action="">
			<!-- <span><label class="description" for="email">Email</label></span> -->
			<div>
			<input type="text" id="email" name= "email" maxlength="255" size="16" value="" placeholder="email">
			</div>
			<!-- <span><label class="description" for="name">Password</label></span> -->
			<div>
			<input type="password" id="password" name="password" maxlength="255" size="16" value="" placeholder="password">
			</div>
			<div>
			<input type="submit" id="signInButton" name="signInButton" value="Sign In">
			</div>
		</form>
			<a href="register.html"><p>Don't have an account? Register here</p></a>
		**/
	
	
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
		modal: false,
		draggable:true,
		resizable:false,
		minWidth: 400,
		autoOpen: false
	}); //end dialog
	
function sisoopen() {
	console.log("sign in button clicked");
	//jeshaitan, this fuunction wasn't running so I moved it to the siso.click
	}
	
$('#siso').click(function(evt) {
	evt.preventDefault();
	$('#signInBox').dialog('open');
	
}); //end signup click dialog open
		
$('#signInForm').submit(function(evt) {
	$('#signinBox').dialog('close');
}); //end dialog close

$('#signInButton').button();


}); 
function requestUser(username, password, school) {
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "http://localhost:8888/getUser/" + username + "/" + password, true);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
           currentUser = xmlhttp.responseText;
        }
	}
	xmlhttp.send();
}
