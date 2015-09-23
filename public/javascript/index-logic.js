$(document).ready(function() {
	var currentUser = JSON.parse(localStorage.getItem("user"));
	$('.navigation').html(
		'<ul id="navlist" class="sm sm-simple">\
  			<li><a href="index.html">Home</a></li>\
			<li><a href="submit.html" id="submitLink">Submit Research</a></li>\
			<li id="aboutli"><a href="about.html">About Us</a></li>\
			<li><a href="" id="siso">Sign In or Register</a></li>\
		</ul>'
	);
	var signInHtml = '';
	var signInHtmlEnd =
	'<div class="credentialsTable">\
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
					<input id="saveForm" class="button_text signRegisterBut" type="submit" name="submit" value="Register"/>\
			</li>\
				</ul>\
			</form>\
			</div>\
			<div class="verticalSeparator" id="separateSignIn"></div>\
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
			<input type="submit" id="signInButton" name="signInButton" class="signRegisterBut" value="Sign In">\
			</div>\
		</form>\
		</div>\
		</div>';
	var currentLink = window.location.href;
	if (currentUser == null && (currentLink.indexOf('submit.html') != -1 || currentLink.indexOf('poster.html') != -1)){
		signInHtml = signInHtml + '<center><div id="alerttext"><p id="alerttext" style="display: inline-block">You must have an account to submit a paper.&nbsp;&nbsp;</p><a href="index.html">Return to home page</a></div></center>' +signInHtmlEnd;
	}
	else{
		signInHtml += signInHtmlEnd;
	}
	$('#signInBox').html(signInHtml);

	if (currentUser != null) {
		document.getElementById('siso').innerHTML = "Sign Out";
		$('#aboutli').closest('li').after('<li><a href="user.html?id='+currentUser._id+'">'+currentUser.firstname+'</a></li>');
	}

	$('#siso').click(function(event) {
		event.preventDefault();
		if(currentUser == null) {
			$('#signInBox').dialog('open');
			$('#element_2_1').focus();
		}
		else { //sign out
			localStorage.clear();
			location.reload();
		}
	});

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
		resizable:false,
		minWidth: 800,
		minHeight: 650,
		autoOpen: false,
		show: 'fade',
		hide: 'drop'
	}); //end dialog

	$('#registerClick').click(function(event){
		event.preventDefault();
		$('#signInBox').dialog('open');
		$('#email').focus();
	});

	$(document).on("click", ".searchBoxSubmit", function(event){
		event.preventDefault();
		query=$('#searchBox').val();
		var searchType = $("input[name=searchTypeOptions]:checked").val();
		console.log(searchType);
		switch(searchType) {
			case "All":
				var type = 1;
				break;
			case "Title":
				var type = 2;
				break;
			case "Keyword":
				var type = 3;
				break;
			case "Author":
				var type = 4;
			  break;
			default:
				var type = 1;
		}
		console.log(type + "TYPE!")
		window.location.href = "results.html?type="+type+"query="+query;
	});

	$('#signInForm').submit(function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		readSignInForm($('#signInForm'));
		$('#signinBox').dialog('close');
	});

	$('#form_1039889').submit(function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		readSubmitPaperForm($('#form_1039889'));
	});

	$('#form_1037235').submit(function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		readRegisterForm($('#form_1037235'));
		window.location.href = "index.html";
	});

	$('.signRegisterBut').button();

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
	if (headText.indexOf('fancybox.css')<0){
		$('head').append('<link href="css/jquery.fancybox.css" rel="stylesheet">');
	}
	if (headText.indexOf('jquery.fancybox.pack.js')<0){
		$('head').append('<link href="javascript/jquery.fancybox.pack.js" rel="stylesheet">');
	}

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
	var signinEmail = $('#email').val();
	console.log('read from sign in!');
	var signinEmail = $("#email").val();
	var signinPassword = $("#password").val();
	requestUser(signinEmail, signinPassword);
}

function readRegisterForm(form) {
	console.log('read from register');
	var firstname = $('#element_2_1').val(),
	    lastname = $('#element_2_2').val(),
	    is_highschool = $('#element_6_1').val(),
	    is_undergrad = $('#element_6_2').val(),
	    school = $('#element_7').val();
	if(is_highschool) {
		var grade = $('#element_1').val();
	}
	else {
		var grade = "undergrad"
	}
	var email = $('#element_3').val(),
	password = $('#element_5').val();

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;//jan -> 0 (+1)
	var yyyy = today.getFullYear();

	if(dd<10) {
    	dd='0'+dd
	}

	if(mm<10) {
    	mm='0'+mm
	}

	today = mm+'/'+dd+'/'+yyyy;

	var newuser = {"fnm": firstname, "lnm": lastname, "grd": grade,
				   "shl": school, "eml": email, "pwd": password, "pub": [],
				   "dte": today};
	addUser(newuser);
}

function readSubmitPaperForm(form) {
	var title = $('#title').val(),
		abstract = $('#element_2').val(),
		keywords = $('#element_9').val().split("\n"),
		authorsid = [$('#element_4_1').val()];

		for(var i = 0; i < $('.spawnUserID').length; i++) {
			authorsid.push($('.spawnUserID')[i].value);
		}

		var today = new Date(),
		    dd = today.getDate(),
				mm = today.getMonth()+1,
				yyyy = today.getFullYear();

		if(dd<10) {
    		dd='0'+dd;
		}

		if(mm<10) {
    		mm='0'+mm;
		}

		today = mm+'/'+dd+'/'+yyyy;
		$.ajax({
			url: '/getPdf',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify($(element_3).get(0).files[0]),
			dataType: 'json',
			success: function(response) {
				var paperdata = {
					"title": title,
					"authors": authorsid,
					"abstract": abstract,
					"keywords": keywords,
					"pdf": response,
					"date": today
				}
				addPaper(paperdata);
			}
		});
}


function addUser(newuser) {
	console.log("submitting new user to node server");

	$.ajax({
				url: '/addUser',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(newuser),
				dataType: 'json',
				success: returntoIndex
			});

	function returntoIndex(response) {
		document.location.href = "/index.html";
	}
}

function addPaper(newpaper) {
	console.log("submitting paper to node server");
	$.ajax({
				url: '/addPaper',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(newpaper),
				dataType: 'json',
				success: newsearchpaper
			});

	function newsearchpaper(response) {
		console.log("hello");
		document.location.href = "/results.html?query="+newpaper.title;
	}
}

function addPoster(newposter) {
	console.log("submitting poster to node server");
	$.ajax({
				url: '/addPoster',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(newposter),
				dataType: 'json',
				success: newsearchposter
			});

	function newsearchposter(response) {
		console.log("hello");
		document.location.href = "/results.html?query="+newposter.title;
	}
}

function requestUser(email, password) {
	var requser = {
		"email": email,
		"password": password
	}
	console.log('requesting user');
	$.ajax({
		url: '/getUser',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(requser),
		dataType: 'json',
		success: loginuser,
		error: giveloginerror
	});

	function giveloginerror(jqXHR, textStatus) {
		if (textStatus == 'parsererror'){
			if ($('.userPass').length == 0){
			$('#signInFormDiv').append('<p class="failedSignIn userPass" style="float:left;color:#f00;font-weight: bold;font-size: 9px;line-height: 9px;text-align:center;">No known user with above login credentials.</p>');
				if($('.unknownE').length > 0){
					$('.unknownE').remove();
				}
			}
			else{
				$('.userPass').effect('shake');
			}
			console.log('combo error');
		}
		else{
			if ($('.unknownE').length == 0){
			$('#signInFormDiv').append('<p class="failedSignIn unknownE" style="float:left;color:#f00;font-weight: bold;font-size: 9px;line-height: 9px;text-align:center;">Unknown error while loggin in. Try loggin in later</p>');
				if($('.userPass').length > 0){
					$('.userPass').remove();
				}
			}
			else{
				$('.unknownE').effect('shake');
			}
			console.log('other error');
		}
	}

	function loginuser(response) {
		console.log(response);
		user = JSON.stringify(response);
		localStorage.setItem("user", user);
		document.location.href = "/index.html";
	}
}
