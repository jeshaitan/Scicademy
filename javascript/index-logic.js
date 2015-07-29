function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
} 

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
       		document.getElementById("si/so").innerHTML = "Sign In"  
    	}
    	else {
       		document.getElementById("si/so").innerHTML = "Sign Out"
    	}
	}
	else if(hasAccount == false) {
       	document.getElementById("si/so").href = "register.html"
    	document.getElementById("si/so").innerHTML = "Register Account"
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