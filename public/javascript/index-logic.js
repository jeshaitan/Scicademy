function completeSchool(allSchools, req) {
    var schoolList = [];
    var allSchools = allSchools[0]; //allSchools is an array in another array initially
    for (var i = 0; i < allSchools.length; i++) {
        var compareReq = req.term.toLowerCase().trim();  //make the search term lowercase and remove spaces
        var curSchool = allSchools[i];  //set the current school being compared to the i'th school out of all schools
        if (curSchool.toLowerCase().indexOf(compareReq) != -1 || compareReq.indexOf(curSchool.toLowerCase()) != -1) {
            schoolList.push(curSchool);
        }
    }
    return schoolList;
}

function unique_ify(list) {
    var seen = {};
    var out = [];
    var len = list.length;
    var j = 0;
    for (var i = 0; i < len; i++) {
        var item = list[i];
        if (seen[item] !== 1) {
            seen[item] = 1;
            out[j++] = item;
        }
    }
    return out;
}

var currentUser = JSON.parse(localStorage.getItem("user"));
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
            <li id="li_6" >\
                <label class="description required" id="element_6_label" for="element_6">What is your current student status?</label>\
                <span>\
                <div id="highCol">\
                    <input id="element_6_1" name="highCol" class="element radio highColRadio required" type="radio" value="1" />\
                    <label class="choice" for="element_6_1">High School</label>\
                    <input id="element_6_2" name="highCol" class="element radio highColRadio" type="radio" value="2" />\
                    <label class="choice" for="element_6_2">Undergrad</label>\
                    <input id="otherStudent" name="highCol" class="element radio highColRadio" type="radio" value="3" />\
                    <label class="choice" for="element_6_3">Other (student)</label>\
                    <input id="notStudent" name="highCol" class="element radio highColRadio" type="radio" value="4" />\
                    <label class="choice" for="element_6_4">Not a student</label>\
                </div>\
                </span>\
            </li>\
            <li id="li_1">\
            <label class="description required" for="element_1">What grade are you in? </label>\
            <div>\
            <select class="btn btn-primary dropdown-toggle" id="element_1" name="grade"> \
                <option value="9" >9</option>\
                <option value="10" >10</option>\
                <option value="11" >11</option>\
                <option value="12" selected>12</option>\
            </select>\
            </div> \
            <p class="guidelines" id="guide_13" style = "width:114px; length: 108px;"><small>If you are currently on summer vacation, then enter the grade that you will be in the upcoming year. Otherwise, enter the grade you are currently in.</small></p>\
            </li>\
            <li>\
            <div>\
            <input type="text" id="referral" name= "refer" class="element text" maxlength="255" size="21" value=""/ placeholder="Referrer (optional)">\
            </div><p class="guidelines" id="guide_refer"><small>The name of the person who referred you to create an account on Scicademy, if applicable.</small></p>\
            </li>\
            <li id="li_3" class="userSignUpDiv">\
            <span>\
            <div>\
                <input id="element_3" name="element_3" class="element text medium required email" type="text" maxlength="255" value=""/ placeholder="Email">\
            </div> \
            </li>		<li id="li_4" >\
            <div>\
                <input id="element_4" name="element_4" class="element text medium required" type="password" maxlength="255" value=""/ placeholder="Password"> \
            </div><p class="guidelines" id="guide_4"><small>Your password must have at least 6 characters and contain at least one number.</small></p>\
            </li>		<li id="li_5" >\
            <div>\
                <input id="element_5" name="element_5" class="element text medium required" type="password" maxlength="255" value=""/ placeholder="Confirm Password"> \
            </div> \
            </li>\
            <li id="termsAgree" style="width:100%;">\
                <div style="display:inline-block;margin-left:1px;" id="errorParent">\
                    <input type="checkbox" name="agree" value="agree" id="agree">\
                    <div id="agreeText" style="margin-left:23px;margin-top:-17px;"><p style="margin-top:-20px;margin-left:8px;">I agree to the <a href="TermsandConditions.html" target="_blank" style="color:blue;">Terms and Conditions</a></p></div>\
                </div>\
            </li>\
            <li class="buttons">\
                    <input type="hidden" name="form_id" value="1037235" />\
                    <input id="saveForm" class="button_text signRegisterBut btn btn-primary btn-xs" type="submit" name="submit" value="Register"/>\
                    <img src="../images/spinTrans.gif" id="registerSpin" style="margin-top:19px;margin-left:37px;" />\
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
                <input type="submit" id="signInButton" name="signInButton" class="signRegisterBut btn btn-primary btn-xs" value="Sign In">\
                <img src="../images/spinTrans.gif" id="signInSpin" style="margin-top:19px;margin-left:37px;" />\
            </div>\
        </form>\
        </div>\
        </div>';

$(document).ready(function() {
    var currentLink = window.location.href;
    var shakeSign = false;
    if (currentUser == null && (currentLink.indexOf('submit.html') != -1 || currentLink.indexOf('poster.html') != -1)) {
        signInHtml += '<center><div id="alertDiv"><p id="alerttext" class="alertP">You must have an account to submit a paper.&nbsp;&nbsp;</p><a href="index.html" style="z-index: 99999">Return to home page</a></div></center>' + signInHtmlEnd;
        shakeSign = true;
    } else {
        signInHtml += signInHtmlEnd;
    }
    $('#signInBox').html(signInHtml);
    if (shakeSign) {
        $('#alertDiv').effect("bounce", {
            times: 3
        }, 1200);
    }
    if (currentUser != null && !($("#navlist #nameli").length)) {
        document.getElementById('siso').innerHTML = "Sign Out";
        $('#aboutli').closest('li').after('<li><a href="user.html?id=' + currentUser._id + '" id="nameli">' + currentUser.firstname + '</a></li>');
    }
    $('#signInBox').dialog({
        modal: true,
        resizable: false,
        minWidth: 800,
        minHeight: 'auto',
        autoOpen: false,
        close: function(event, ui) {
            $('.failedSignIn').remove();
        },
        show: 'fade',
        hide: 'drop'
    });
    $('#signInSpin').hide();
    $('#registerSpin').hide();
    $('#registerClick').click(function(event) {
        event.preventDefault();
        $('#signInBox').dialog('open');
        $('#email').focus();
    });

    $('.sm').smartmenus({
        showFunction: function($ul, complete) {
            $ul.slideDown(250, complete);
        },
        hideFunction: function($ul, complete) {
            $ul.slideUp(250, complete);
        }
    });

    $(document).on("click", ".searchBoxSubmit", function(event) {
        event.preventDefault();
        query = $('#searchBox').val();
        var searchType = $("input[name=searchTypeOptions]:checked").val();
        switch (searchType) {
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
        window.location.href = "results.html?type=" + type + "?filter=?page=1?query=" + query;
    });

    $('#signInForm').submit(function(event) {
        $('#signInButton').hide();
        $('#signInSpin').show();
        $('.userPass').remove();
        event.preventDefault();
        event.stopImmediatePropagation();
        readSignInForm($('#signInForm'));
        $('#signinBox').dialog('close');
    });

    var submitted = false;
    $('#form_1037235').submit(function(event) {
        $('#saveForm').hide();
        $('#registerSpin').show();
        event.preventDefault();
        event.stopImmediatePropagation();
        readRegisterForm($('#form_1037235'));
    });
    //start html injection prevention
    //$(':text').change(function() {
    //    console.log('changed');
    //    var inputText = $(this).val();
    //    $(this).val($($.parseHTML(inputText)).text());
    //});
    $(':text').on('input propertychange paste keyup', function() {
        var inputText = $(this).val();
        $(this).val($($.parseHTML(inputText)).text());
    });
    //end html detection prevention

    //begin script for adding/removing school field
    $('input').on('ifChanged', function(event) {
        var isStudent = parseInt($('input[name=highCol]:checked','#form_1037235').val()) <= 3; //values 1,2, and 3 indicate they're a student
        var schoolFieldPresent = $('#li_7').length != 0;
        if (!schoolFieldPresent && isStudent) {   //check if school field doesn't already exist and the value selected indicates that the user is a student
            var schoolString = '<li id="li_7" >';   //separate this string into multiple lines because it's easy to read and proper styling in google's style guide
            //it's also better than using / at the end of each line because this method can survive compression
            schoolString += '<div>';
            schoolString += '<input id="element_7" name="element_7" class="element text large required" type="text" maxlength="255" value=""/ placeholder="School">';
            schoolString += '</div>';
            schoolString += '</li>';
            //School and summer session field
            schoolString += '<li id ="schoolSessionLi">';
            schoolString += '<label class = "description required" id="element_13_label" for = "element_13">Is school currently in session (including during vacations and weekends), or are you on summer break?</label>';
            schoolString +='<span>';
            schoolString +='<div id = "schoolSession">';
            schoolString +='<input id = "element_13_1" name = "schoolSession" class = "element radio required" type = "radio" value = "1" />';
            schoolString +='<label class = "choice" for = "element_13_1">School is still in session.</label>';
            schoolString +='<input id = "element_13_2" name = "schoolSession" class = "element radio" type = "radio" value = "0" />';
            schoolString +='<label class = "choice" for = "element_13_2">I am on summer break.</label>';
            schoolString +='</div>';
            schoolString +='<p class="guidelines" id="guide_13" style = "width:89px; length: 129px;"><small>This information will be used to update your grade automatically during the summer.</small></p>';
            schoolString +='</span>';
            schoolString +='</li>';
            $('#li_6').after(schoolString);
            $('input[name=schoolSession]').iCheck({
                checkboxClass: 'icheckbox_flat-blue',
                radioClass: 'iradio_flat-blue'
            });
        }
        else if (schoolFieldPresent && !isStudent){  //if the school field is present and they're not a student
            $('#li_7').remove();
            $('#schoolSessionLi').remove();
        }
    });
    //end script for adding/removing school field
    var headText = $('head').html();
    var bodyText = $('body').html();
    if (headText.indexOf('href="css/searchBox.css"') < 0) {
        $('head').append('<link rel="stylesheet" href="css/searchBox.css" type="text/css" />');
    }

    if (headText.indexOf('jquery.validate.min.js') < 0) {
        $('head').append('<script src="libs/jquery.validate.min.js" type="text/javascript"></script>');
    }

    if (headText.indexOf('javascript/view.js') < 0) {
        $('head').append('<script src="javascript/view.js" type="text/javascript"></script>');
    }

    if (headText.indexOf('view.css') < 0) {
        $('head').append('<link href="css/view.css" rel="stylesheet">');
    }
    if (headText.indexOf('flat/blue.css') < 0) {
        $('head').append('<link href="css/flat/blue.css" rel = "stylesheet" type = "text/css">');
        $('head').append('<script src="libs/icheck.min.js" type = "text/javascript"></script>');
    }

    //start register javascript
    $('#li_1').hide();


    $.validator.addMethod("isValidEmail", function(value, element) {
        var emailRegex = /(?:(?:\r\n)?[ \t])*(?:(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*)|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*:(?:(?:\r\n)?[ \t])*(?:(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*)(?:,\s*(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*))*)?;\s*)/
        var email = value.match(emailRegex);
        return this.optional(element) || email;
    }, "");

    jQuery.validator.addMethod("hasNumber", function(value, element) {
        var noNums = value.search(/\d/) == -1; //if true, then no numbers
        return !noNums;
    }, "");

    jQuery.validator.addMethod("notJustNums", function(value, element) {
        var isNum = /^\d+$/;
        var number = isNum.test(value); //check to see if it's only numbers
        return !number;
    }, "");

    $('#element_1').selectmenu({
        width: 62,
        icons: {
            button: "ui-icon-circle-triangle-s"
        } //end icons
    }); //end selectmenu
    // $('#saveForm').button();
    $('#form_1037235').validate({
        rules: {
            element_3: { //email
                isValidEmail: true
            },

            element_4: { //password
                minlength: 6,
                hasNumber: true,
                notJustNums: true
            },
            element_5: { //confirm password
                equalTo: '#element_4'
            },
            element_6: { //radio button for highschool or college
                required: true
            },

            element_13: {
                required: true
            },

            agree: {
                required: true
            }
        }, //end rules
        messages: {
            element_3: { //email
                required: "This field is required.",
                isValidEmail: "Please enter a valid email address."
            },
            element_4: {
                hasNumber: "Make sure that your password contains at least one number.",
                notJustNums: "Your password cannot contain only numbers.",
                minlength: "Your password must contain at least six characters."
            },
            element_5: {
                equalTo: "The passwords do not match."
            },
            element_6: { //radio button for highschool or college
                required: "Please choose an option."
            }
        }, //end messages
        errorPlacement: function(error, element) {
                if (element.is(":radio") || element.is(":checkbox")) {
                    error.appendTo(element.parent().parent());
                } else {
                    error.insertAfter(element);
                }
            } //end error placement
    }); //end validate

    function getvalues(f) {
        var form = $("#" + f);
        var str = '';
        $("input:not('input:submit')", form).each(function(i) {
            str += '\n' + $(this).prop('name') + ': ' + $(this).val();
        });
        return str;
    }

    var isvalidate = false;
    var submitClicked = false;
    $('#saveForm').click(function(e) {
        submitClicked = true;
        $('#form_1037235').validate();
        var isvalidate = $("#form_1037235").valid();
        if (isvalidate == false) {
            e.preventDefault();
            $('.buttons').append('<p id="incompleteRegister">One or more fields are still invalid.</p>');
        }
    });
    $('#form_1037235').change(function() {
        if (isvalidate == false && submitClicked == true) {
            isvalidate = $("#form_1037235").valid();
            if (isvalidate == true) {
                $('#incompleteRegister').remove();
            }
        }
    });

    $('.sm').smartmenus({
        showFunction: function($ul, complete) {
            $ul.slideDown(250, complete);
        },
        hideFunction: function($ul, complete) {
            $ul.slideUp(250, complete);
        }
    }); //end smartmenus
    $('input').iCheck({
        checkboxClass: 'icheckbox_flat-blue',
        radioClass: 'iradio_flat-blue'
    });
    $('input').on('ifChanged', function(event) {
        if ($('input[name="highCol"]:checked').val() == "1") {
            $('#li_1').slideDown();
        } else {
            $('#li_1').slideUp();
        }
        if ($('input[name="element_14"]:checked').val() == "isPDF") { //is your file a pdf or word?
            $('#convertToPDF').slideUp();
            $('#li_3').slideDown();
        } else if ($('input[name="element_14"]:checked').val() == "isWord") {
            $('#li_3').slideUp();
            $('#convertToPDF').slideDown();
        }
    });
    //end register JavaScript

    $('#siso').click(function(event) {
        event.preventDefault();
        if (currentUser == null) {
            $('#signInBox').dialog({
                modal: true,
                resizable: false,
                minWidth: 800,
                minHeight: 'auto',
                autoOpen: false,
                close: function(event, ui) {
                    $('.failedSignIn').remove();
                },
                show: 'fade',
                hide: 'drop'
            }).dialog('open');
            $('#element_2_1').focus();
        } else { //sign out
            localStorage.clear();
            location.reload();
        }
    });
    //bodyText = bodyText.replace('<li><a href="awards.html">Monetary Awards</a></li>', '');
    //$('body').html(bodyText);
    $('.awardsTab').remove();
    //$.get("http://ipinfo.io", function (response) {
    //    if (response.city.indexOf('New Hyde') != -1 || response.city.indexOf('Port Washington') != -1 || response.city.indexOf('Merrick') != -1 || response.city.indexOf('Manhasset') != -1 || response.city.indexOf('Great Neck') != -1) { //if they are in these locations, then don't show the awards
    //        bodyText = bodyText.replace('<li><a href="awards.html">Monetary Awards</a></li>', '');
    //        //$('body').html(bodyText);
    //        $('.awardsTab').remove();
    //    }
    //}, "jsonp");
    //http.get('http://ipinfo.io', function(res) {
    //    console.log(res.city);
    //        if (response.city.indexOf('New Hyde') != -1 || response.city.indexOf('Port Washington') != -1 || response.city.indexOf('Manhasset') != -1 || response.city.indexOf('Great Neck') != -1) { //if they are in these locations, then don't show the awards
    //            bodyText = bodyText.replace('<li><a href="awards.html">Monetary Awards</a></li>', '');
    //            $('body').html(bodyText);
    //        }
    //})
});

$(window).load(function() {

    function getPapers() {
        $.ajax({
            url: '/getPaper',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                "searchType": "every"
            }),
            dataType: 'json',
            success: function(curs) {
                var papers = [];
                for (var i = 0; i < curs.length; i++) {
                    papers.push(curs[i].title);
                }
                localStorage["papers"] = JSON.stringify(papers);
                var fromStorage = "[" + localStorage["papers"] + "]";
                var papers = JSON.parse(fromStorage);
                $('#searchBox').autocomplete({
                    source: papers[0]
                });
            }
        });
    }

    if (!localStorage["papers"]) {
        if (window.location.pathname.indexOf('/index.html')) {
            getPapers();
        } else {
            getPapers();
        }
    } else {
        var fromStorage = "[" + localStorage["papers"] + "]";
        var papers = JSON.parse(fromStorage);
        $('#searchBox').autocomplete({
            source: papers[0]
        });
    }

    if (!localStorage["schools"]) {
        $.ajax({
            url: '/getSchools',
            type: 'POST',
            data: {},
            dataType: 'json',
            contentType: 'application/json',
            success: function(curs) {
                var schools = [];
                for (var i = 0; i < curs.length; i++) {
                    schools.push(curs[i].school);
                }
                schools = unique_ify(schools);
                localStorage.setItem("schools", JSON.stringify(schools));
                var fromStorage = "[" + localStorage["schools"] + "]";
                schools = JSON.parse(fromStorage);
                $('#element_7').autocomplete({
                    source: function(req, resp) {
                        resp(completeSchool(schools, req).slice(0, 10));  //limit to 10 results max
                    }
                });
            }
        });
    } else {
        var fromStorage = "[" + localStorage["schools"] + "]";
        var schools = JSON.parse(fromStorage);
        $('#element_7').autocomplete({
            source: function(req, resp) {
                resp(completeSchool(schools, req).slice(0, 10)); //limit to 10 results max
            }
        });
    }
});

function readSignInForm(form) {
    var signinEmail = $('#email').val();
    var signinEmail = $("#email").val();
    var signinPassword = $("#password").val();
    requestUser(signinEmail, signinPassword);
}
var searchFName = '';
var searchLName = '';
var searchSchool = '';

function readRegisterForm(form) {
    var firstname = $('#element_2_1').val(),
        lastname = $('#element_2_2').val(),
        is_highschool = ($('#element_6_1').is(':checked')),
        school = $('#element_7').val(),
	      referrer = $('#referral').val();
    if (is_highschool) {
        var grade = $('#element_1').val();
    }
    else if ($('#element_6_2').is(':checked')){
        var grade = "undergrad"
    }
    else if ($('#otherStudent').is(':checked')){
        var grade = "student"
    }
    else {
        var grade = "Nonstudent";
    }
    var email = $('#registerFormDiv #element_3').val(),
        password = $('#element_5').val();

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //jan -> 0 (+1)
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = mm + '/' + dd + '/' + yyyy;

    var isSummer = ($('#element_13_2').is(':checked'));
    var newuser = {
        "fnm": firstname,
        "lnm": lastname,
        "grd": grade,
        "shl": school,
        "eml": email,
        "pwd": password,
        "dte": today,
        "isSum": isSummer,
	      "referrer": referrer
    };
    searchFName = firstname;
    searchLName = lastname;
    searchSchool = school;
    //start testing here
    addUser(newuser);
}

function readSubmitPaperForm(form) {
    var title = $('#title').val(),
        abstract = $('#element_2').val(),
        keywords = [],
        subject = $("input[name=subjectArea]:checked").val(),
        authorsid = [],
        tempAuthors = [],
        institution = $('#inst').val();
    keywords = $("#li_9 .tagit-label").map(function() {
        return $(this).text();
    }).get();

    for (var i = 0; i < $('.spawnUserID').length; i++) {
        authorsid.push($('.spawnUserIDh')[i].value);
    }

    authorsid = unique_ify(authorsid);
    authorsid.push(JSON.parse(localStorage.getItem('user'))._id); //add self to authors list
    console.log(authorsid);

    for (var i = 0; i < currentAuthors.length; i++) {
        var authId = currentAuthors[i].id;
        authorsid.push(authId);
        if (authId === 0 || authId === '0') {
            var tempAuthor = {
                firstName: currentAuthors[i].firstName,
                lastName: currentAuthors[i].lastName,
                school: currentAuthors[i].school,
                name: currentAuthors[i].name
            };
            tempAuthors.push(tempAuthor);
        }
    }
    var today = new Date(),
        dd = today.getDate(),
        mm = today.getMonth() + 1,
        yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    var upvotes = 0;
    var viewCounter = 0;
    var upvoted = [];
    today = mm + '/' + dd + '/' + yyyy;
    var formData = new FormData();
    formData.append('pdf', $(element_3)[0].files[0]);
    $.ajax({
        url: '/addPdf',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
            var paperdata = {
                "title": title,
                "authors": authorsid,
                "abstract": abstract,
                "keywords": keywords,
                "subject": subject,
                "institution": institution,
                "tempAuthors": tempAuthors,
                "pdf": response,
                "date": today,
                "views": viewCounter,
                "upvotes": upvotes,
                "upvoted": upvoted
            };
            addPaper(paperdata);
        }
    });
}

function addUser(newuser) {
    $.ajax({
        url: '/addUser',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(newuser),
        dataType: 'json',
        success: function(res) {
            $('#registerSpin').hide();
            $('#saveForm').show();
            if (Object.getOwnPropertyNames(res).length == 0) { //DOESN'T WORK ON SUBMIT PAGE WHEN EVERYTHING IN SIGN IN FORM FILLED OUT (Object.getOwnPropertyNames(res).length == 0) {
                $('.userSignUpDiv div').append('<label id="element_3-error" class="error" for="element_3" style="display: block;">An account with this email already exists.</label>');
            } else {
                document.location.href = "/index.html";
                localStorage.setItem('registerComplete', '1');
                localStorage.setItem('fName', searchFName);
                localStorage.setItem('lName', searchLName);
                localStorage.setItem('school', searchSchool);
                localStorage.setItem('curID', res._id);
                requestUser(newuser.eml, newuser.pwd);
            }
        }
    });
}

function addPaper(newpaper) {
    $.ajax({
        url: '/addPaper',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(newpaper),
        dataType: 'json',
        success: newsearchpaper
    });

    function newsearchpaper(response) {
        $('#submitSpin').hide();
        $('#submitSaveForm').show();
        $('#submitComplete').dialog('open');
    }
}

function requestUser(email, password) {
    var requser = {
        "email": email,
        "password": password
    };
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
        $('#signInButton').show();
        $('#signInSpin').hide();
        if (textStatus == 'parsererror') {
            if ($('.userPass').length == 0) {
                $('#signInFormDiv').append('<p class="failedSignIn userPass" style="float:left;color:#f00;font-weight: bold;font-size: 12px;line-height: 9px;text-align:center;">No known user with above login credentials.</p>');
                if ($('.unknownE').length > 0) {
                    $('.unknownE').remove();
                }
            } else {
                $('.userPass').effect('shake');
            }
        } else {
            if ($('.unknownE').length == 0) {
                $('#signInFormDiv').append('<p class="failedSignIn unknownE" style="float:left;color:#f00;font-weight: bold;font-size: 12px;line-height: 9px;text-align:center;">Unknown error. Please try logging in later</p>');
                if ($('.userPass').length > 0) {
                    $('.userPass').remove();
                }
            } else {
                $('.unknownE').effect('shake');
            }
        }
    }

    function loginuser(response) {
        user = JSON.stringify(response);
        localStorage.setItem("user", user);
        document.location.href = "/index.html";
    }
}
