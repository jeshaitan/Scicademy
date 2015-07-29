$(document).ready(function() {
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
}); 

var signedin = false;
var hasAccount = false;

function initSiso() {
	if(hasAccount == true) {
    	if(signedin == false) {
       		$('#si/so').innerHTML = "Sign In"  
    	}
    	else {
       		$('#si/so').innerHTML = "Sign Out"
    	}
	}
	else if(hasAccount == false) {
       	$('#si/so').href = "register.html"
    	$('#si/so').innerHTML = "Register Account"
	}
}

function sisoClick() {
    if(hasAccount == true) {
		if(signedin == true) {
			signedin = true;
			location.reload()
		}
		else {
			signedin = false;
			location.reload()
		}
    }
}