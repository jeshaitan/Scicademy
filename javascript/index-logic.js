$(document).ready(function() {
	var currentUser = null;
	$('.navigation').html(
		'<ul class="sm sm-simple">\
  			<li><a href="index.html">Home</a></li>\
			<li><a href="submit.html">Submit Paper</a></li>\
			<li><a href="poster.html">Submit Poster</a></li>\
			<li><a href="about.html">About</a></li>\
			<li><a href="" id="siso">Sign In</a></li>\
			<li><a href="" id="registerClick">Sign Up</a></li>\
		</ul>'
	);
	// <label class="description required">First Name</label>\ old label
	// <label class="description required" for="element_7">School </label>\
	//<label class="description required" for="element_5">Confirm Password </label>\	
	$('#signInBox').html(
		'<table class="credentialsTable">\
		<tr>\
		<td>\
		<div id="registerFormDiv">\
		<h4 class="signInHeader">Register</h4>\
		<form id="form_1037235" class="appnitro"  method="post" action="">\
				<ul >\
			<li id="li_2" >\
			<span>\
			<div>\
				<input type="text" id="element_2_1" name= "fname" class="element text required" maxlength="255" size="21" value=""/ placeholder="First Name">\
			</div>\
			</span>\
			<span>\
			<div>\
				<input type="text" id="element_2_2" name= "lname" class="element text required" maxlength="255" size="21" value=""/ placeholder="Last Name">\
			</div>\
			</span>\
			</li>\
			<li id="li_7" >\
			<div>\
			<input id="element_7" name="element_7" class="element text large required" type="text" maxlength="255" value=""/ placeholder="School">\
			</div>\
			</li>\
			<li id="li_6" >\
				<label class="description required" id="element_6_label" for="element_6">Are you a High School student or an Undergrad? </label>\
				<span>\
				<div id="highCol">\
					<input id="element_6_1" name="highCol" class="element radio highColRadio" type="radio" value="1" />\
					<label class="choice" for="element_6_1">High School</label>\
					<input id="element_6_2" name="highCol" class="element radio highColRadio" type="radio" value="2" />\
					<label class="choice" for="element_6_2">Undergrad</label>\
				</div>\
				</span>\
			</li>\
			<li id="li_1">\
			<label class="description required" for="element_1">What grade are you in? </label>\
			<div>\
			<select class="element select small" id="element_1" name="grade"> \
				<option value="9" >9</option>\
				<option value="10" >10</option>\
				<option value="11" >11</option>\
				<option value="12" selected>12</option>\
			</select>\
			</div> \
			</li>		<li id="li_3" >\
			<div>\
				<input id="element_3" name="element_3" class="element text medium required email" type="text" maxlength="255" value=""/ placeholder="Email">\
			</div> \
			</li>		<li id="li_4" >\
			<div>\
				<input id="element_4" name="element_4" class="element text medium required" type="password" maxlength="255" value=""/ placeholder="Password"> \
			</div><p class="guidelines" id="guide_4"><small>Your password must be between 6 and 18 characters and contain at least one number</small></p> <!-- should passwords be able to contain spaces?-->\
			</li>		<li id="li_5" >\
			<div>\
				<input id="element_5" name="element_5" class="element text medium required" type="password" maxlength="255" value=""/ placeholder="Confirm Password"> \
			</div> \
			</li>\
						<li class="buttons">\
					<input type="hidden" name="form_id" value="1037235" />\
					<input id="saveForm" class="button_text" type="submit" name="submit" value="Register"/>\
			</li>\
				</ul>\
			</form>\
			</div>\
			</td>\
			<td>\
			<div class="verticalSeparator" id="separateSignIn"></div>\
			</td>\
			<td>\
			<div id="signInFormDiv">\
			<h4 class="signInHeader">Sign In</h4>\
			<form id="signInForm" method="post" action="">\
			<!-- <span><label class="description" for="email">Email</label></span> -->\
			<div>\
			<input type="text" id="email" name= "email" maxlength="255" size="16" value="" class="element text medium required email" placeholder="Email">\
			</div>\
			<!-- <span><label class="description" for="name">Password</label></span> -->\
			<div>\
			<input type="password" id="password" name="password" maxlength="255" size="16" value="" class="element text medium required email" placeholder="Password">\
			</div>\
			<div>\
			<input type="submit" id="signInButton" name="signInButton" value="Sign In">\
			</div>\
		</form>\
		</div>\
		</td>\
			</table>'
		
		
		);
	
	if (currentUser != null) {
		document.getElementById('#siso').innerHTML("Sign Out");
	}

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
		minWidth: 800,
		minHeight: 650,
		autoOpen: false,
		show: 'fade', 
		hide: 'drop'
	}); //end dialog
	
	$('#siso').click(function(event) {
		event.preventDefault();
		if(currentUser == null) {
			$('#signInBox').dialog('open');
			$('#element_2_1').focus();
		}
		else {
			currentUser = null;
			location.reload();
		}
	});
	
	$('#registerClick').click(function(event){
		event.preventDefault();
		$('#signInBox').dialog('open');
		$('#email').focus();
		
	});
	
	$(document).on("submit", ".searchForm", function(event){
		event.preventDefault();
		window.location.href = "results.html";
	});
	
	$(document).on("click", ".searchBoxSubmit", function(event){
		event.preventDefault();
		window.location.href = "results.html";
	});
	
	$('#signInForm').submit(function(event) {
		event.preventDefault();
		readSignInForm(document.getElementById('signInForm'));
		$('#signinBox').dialog('close');
		location.reload();
	});

	$('#form_1037235').submit(function(event) {
		event.preventDefault();
		readRegisterForm(document.getElementById('form_1037235'));
		window.location.href = "index.html";
	});

	$('#signInButton').button();
	
	//add in missing files for sign in
	var headText= $('head').html();
	if (headText.indexOf('href="css/searchBox.css"')<0){
		$('head').append('<link rel="stylesheet" href="css/searchBox.css" type="text/css" />');	
	}
	
	if (headText.indexOf('jquery.validate.min.js')<0){
		$('head').append('<script src="libs/jquery.validate.min.js" type="text/javascript"></script>');	
	}
	
	if (headText.indexOf('javascript/view.js')<0){
		$('head').append('<script src="javascript/view.js" type="text/javascript"></script>');	
	}
	
	if (headText.indexOf('view.css')<0){
		$('head').append('<link href="css/view.css" rel="stylesheet">');	
	}
	
	// if (headText.indexOf('signInCss.css')<0){
		// $('head').append('<link href="css/signInCss.css" rel="stylesheet">');	
	// }
	//end add in
	
	 $('#separateSignIn').position({
		 my: "left top",
		 at: "right+337 top",
		 of: $("#registerFormDiv")
	 });
	
	// $('#password').position({
		// my: "left top",
		// at: "right top",
		// of: $("#element_2_2")
	// });
	
	
	//start register javascript
	$('#li_1').hide();
			jQuery.validator.addMethod("isValidEmail", function(value, element) {
			var emailRegex= /(?:(?:\r\n)?[ \t])*(?:(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*)|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*:(?:(?:\r\n)?[ \t])*(?:(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*)(?:,\s*(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*))*)?;\s*)/
			var email=value.match(emailRegex);
			return this.optional(element) || email;
			}, "");
			
			jQuery.validator.addMethod("hasNumber", function(value, element) {
			var noNums= value.search(/\d/) == -1;  //if true, then no numbers
			return !noNums;
			}, "");
			
			jQuery.validator.addMethod("notJustNums", function(value, element) {
			var isNum = /^\d+$/;
			var number=isNum.test(value); //check to see if it's only numbers
			return !number;
			}, "");
			
			$('#element_1').selectmenu({
				width: 62,
				icons: {
					button: "ui-icon-circle-triangle-s"
				}//end icons
			}); //end selectmenu
			$('#saveForm').button();
			$('#form_1037235').validate({
				rules: {
					element_3: { //email
						isValidEmail : true 
					},
				
					element_4: { //password
						minlength: 6,
						maxlength: 18,
						hasNumber : true,
						notJustNums: true
					},
					element_5: { //confirm password
						equalTo: '#element_4'
					},
					element_6: { //radio button for highschool or college
						required:true
					}
				},//end rules
				messages: {
					element_3:{ //email
						required: "This field is required",
						isValidEmail: "Please enter a valid email address"
					},
					element_4: {
						hasNumber: "Make sure that your password contains at least one number",
						notJustNums: "Your password cannot contain only numbers",
						minlength: "Your password must contain at least six characters",
						maxlength: "Your password must be under 18 characters"
					},
					element_5: {
						equalTo: "The passwords do not match"
					},
					element_6: { //radio button for highschool or college
						required: "Please choose either High School or Undergrad"
					}
				},//end messages
				errorPlacement: function(error, element) {
					if (element.is(":radio") || element.is(":checkbox")){
						error.appendTo(element.parent());
					}
					else{
						error.insertAfter(element);
					}
				} //end error placement
			}); //end validate
			
			$('[title]').tooltip();
			
			$('.sm').smartmenus({
				showFunction: function($ul, complete){
					$ul.slideDown(250,complete);
				},
				hideFunction: function($ul, complete){
					$ul.slideUp(250, complete);
				}
			}); //end smartmenus
			
			var schools=[]; //PUT THE ARRAY OF SCHOOLS HERE *****************************************************************************
			$('#element_7').autocomplete({
				source:schools
			});
			
			$(':radio').click(function() {
				if ($('input[name="highCol"]:checked').val()=="1"){
					$('#li_1').slideDown();
				}
				else{
					$('#li_1').slideUp();
				}
			
			}) //end high school or undergrad click
	
	//end register javascript
	
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
	var school = $('#element_7').val();
	if(is_highschool) {
		var grade = $('#element_1').val();
	}
	else {
		var grade = "undergrad"
	}
	var email = $('#element_3').val();
	var password = $('#element_5').val();
	addUser(firstName, lastname, grade, school, email, password);
}

function addUser(fnm, lnm, grd, shl, eml, pwd) {
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "http://localhost:8888/addUser/" + eml + "/" + pwd + "/"
														 + fnm + "/" + lnm + "/"
														 + shl + "/" + grd + "/", true);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
           console.log(xmlhttp.responseText);
        }
	}
	xmlhttp.send();
}

function requestUser(email, password) {
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "http://localhost:8888/getUser/" + email + "/" + password, true);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
           user = JSON.parse(xmlhttp.responseText);
           console.log(user);
           currentUser = user;
        }
	}
	xmlhttp.send();
}
