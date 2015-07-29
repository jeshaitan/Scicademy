var currentUser;
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

	if(currentUser != null) {	
	    document.getElementById('si/so').href = "index.html"
	    document.getElementById('si/so').innerHTML = "Sign Out";
   	}
}); 

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

function requestUser(firstname, lastname, school) {
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "http://localhost:8888/getUser/" + firstname + "/" + lastname + "/" + school, true);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
           currentUser = xmlhttp.responseText;
        }
	}
	xmlhttp.send();
}
