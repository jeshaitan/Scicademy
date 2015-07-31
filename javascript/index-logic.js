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

	   	$('#signInBox').load('sign_in.html').dialog({
		modal: true,
		draggable:true,
		resizable:false,
		minWidth: 400,
		autoOpen: false,
	}); //end dialog
	
function sisoopen() {
	console.log("sign in button clicked");
	evt.preventDefault();
	$('#signInBox').load('sign_in.html').dialog('open');
}	
	$('#siso').click(function(evt) {
		
	}); //end signup click dialog open
			
	$('#signInForm').submit(function(evt) {
		$('#signinBox').load('sign_in.html').dialog('close');
	}); //end dialog close

	$('#signInButton').load('sign_in.html').button();
	var schools=["Great Neck South High School", "Great Neck North High School", "Jericho High School"];
	$('#school').load('sign_in.html').autocomplete({source:schools});

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
