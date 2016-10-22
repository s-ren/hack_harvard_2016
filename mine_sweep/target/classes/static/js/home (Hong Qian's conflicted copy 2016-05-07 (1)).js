//var userPwd = {};

//user information
var email;
var contact = "000-000-0000";
var username = "lmhly";
var password;
var subscribe = false;//boolean
var history; //history is a list of strings?

//other variables.
var prevName;
var prevEmail;
var prevContact = '0000000000';
var btnWidth;
var buysell = {};
var buyorsell;
var currDate = new Date();
//var resetEmail = "";

function checkLogin(){
	if (sessionStorage.getItem('user_email')==null ||sessionStorage.getItem('user_email')==null){
		$.mobile.changePage($("#login-page"));
	}
}

function resetProfile(email, contact, username, subscribe) {
	var postParameters = {email: email, contact: contact, username: username, subscribe: subscribe};
	$.post("/changeinfo", postParameters, function(responseJSON) {
		var done = JSON.parse(responseJSON).done;
	});
}

function countStar(star) {
	if (star == -1) {
		return 'no rating.'
	} else if (star == 0) {
		return '&#x2606;';
	} else if (star == 1) {
		return '&#9733; &#x2606; &#x2606; &#x2606; &#x2606;';
	} else if (star == 2) {
		return '&#9733; &#9733; &#x2606; &#x2606; &#x2606;';
	} else if (star == 3) {
		return '&#9733; &#9733; &#9733; &#x2606; &#x2606;';
	} else if (star == 4) {
		return '&#9733; &#9733; &#9733; &#9733; &#x2606;';
	} else {
		return '&#9733; &#9733; &#9733; &#9733; &#9733;';
	}
}

$(document).on("pagebeforecreate",function(event){
  checkLogin();
}); 

$( document ).on( "pagecontainerbeforeload", function( event, data ) {
	console.log("load")
	
})

$(document).on("pagecreate", "#resetpwd-page", function(){
	//console.log('here in resetpwd-page');
	var resetEmail = $("#reset-email").text();
	//console.log(resetEmail);
	$("#resetpwd-submit").click(function(){
		var resetPwd = $("#resetpwd-pwd").val();
		console.log("newpwd: " + resetPwd + " email: " + resetEmail);
		var postParameters = {email: resetEmail, pwd: resetPwd};
		$.post("/userforgetpwd",postParameters,function(responseJSON){
			//console.log('here in user forget pwd');
			var done = JSON.parse(responseJSON).done;
			$("#reset-scd").css('display', 'block');
		});
	});

	$("#backtologin-submit").click(function(){
		$(location).attr('href', '/home#login-page');
		//alert('here!');
	});
});

$(document).on("pagecreate", "#verify-page", function(){
	$("#backtologin-submit").click(function(){
		$(location).attr('href', '/home#login-page');
		//alert('here!');
	});
});

function checkLoginEmail(email) {
	var emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
	if (!email.match(emailPattern)) {
		$("#login-error").html('<span style="font-weight: bold">Email is not valid</span><br>Please enter a valid brown email address');
		return false;
	}
	var edu = email.substring(email.length-10, email.length);
	console.log("edu: " + edu);
	if (edu != "@brown.edu") {
		$("#login-error").html('<span style="font-weight: bold">Email is not valid</span><br>Please enter a valid brown email address');
		return false;
	}
	return true;
}

function checkSignupEmail(email) {
	console.log('1 in email');
	var emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
	if (!email.match(emailPattern)) {
		$("#signup-error").html('<span style="font-weight: bold">Email is not valid</span><br>Please enter a valid brown email address');
		return false;
	}
	var edu = email.substring(email.length-10, email.length);
	console.log("edu: " + edu);
	if (edu != "@brown.edu") {
		$("#signup-error").html('<span style="font-weight: bold">Email is not valid</span><br>Please enter a valid brown email address');
		return false;
	}
	console.log('in email');
	return true;
}

// function checkLoginPwd(pwd) {
// 	if (pwd == "") {
// 		$("#login-error").html('<span style="font-weight: bold">Password is not valid</span><br>Password cannot be empty');
// 		return false;
// 	}
// }

function checkSignupPwd(pwd) {
	console.log('1 in pwd');
	if (pwd == "") {
		$("#signup-error").html('<span style="font-weight: bold">Password is not valid</span><br>Password cannot be empty');
		return false;
	}
	console.log('in pwd');
	return true;
}


//only accepts characters, underscore and numbers yet.
function checkSignupUsername(username) {
	console.log('1 in username');
	var pattern = /^\w+$/;
	if (!username.match(pattern)) {
		$("#signup-error").html('<span style="font-weight: bold">Username is not valid</span><br>It should only contains underline and characters');
		return false;
	}
	console.log('in username');
	return true;
}

function checkProfileUsername(username) {
	//console.log('1 in username');
	var pattern = /^\w+$/;
	if (!username.match(pattern)) {
		$("#profile-error").html(
			'<span style="font-weight: bold">' +
			'Input is not valid' + 
			'</span>' + 
			'<br>Username should only contains underline and characters. ' + 
			'And password should have 10 digits');
		return false;
	}
	console.log('in username');
	return true;
}

$(document).on("pageshow", "#home-page", function(){
	console.log('in home page');
	if (sessionStorage.getItem("user_name")!=null && sessionStorage.getItem("user_email")!= null){
		$.mobile.changePage($("#page_buy_1"));
	}
	$("#buy-button").click(function(){
		console.log('buybutton clicked');
		buyorsell = 1;
		$.mobile.changePage($("#login-page"));
	});
	$("#sell-button").click(function(){
		buyorsell = 0;
		$.mobile.changePage($("#login-page"));
	});
});

$(document).on("pagecreate", "#login-page", function(){

	$("#login-user").focus(function(){
		//console.log('login-user focus');
		$("#login-user").val('@brown.edu');
	})

	$("#login-submit").click(function(){
		$("#login-error").html('');
		var enteredEmail = $("#login-user").val();
		var pwd = $.trim($("#login-pwd").val()).replace(/\s/g, '+');
		if (!checkLoginEmail(enteredEmail)) {
			console.log('email invalid');
			return;
		}
		//email = enteredEmail;
		console.log(email + " " + pwd);
		var postParameters = {email: enteredEmail, pwd: pwd};

		//this variable is used to indicate if the login is valid.
		var validlogin;
		$.post("/userlogin",postParameters,function(responseJSON){
			//username = JSON.parse(responseJSON).user.name;
			if (JSON.parse(responseJSON).error != undefined) {
				$("#login-error").html('<span style="font-weight: bold">Login failed</span>Please check your email and password.<br>');
			} else {

				//$(".alert-dot").css('display', 'block');
				//console.log('before alert p');
				var isComment = JSON.parse(responseJSON).comment;
				console.log('commentDone: ' + isComment);
				if (isComment == false) {
					$(".alert-p").html();
					$(".alert-p").html('Orders &#10071;');
				}
				// $(".alert-p").html();
				// $(".alert-p").html('Orders &#10071;');

				username = JSON.parse(responseJSON).user.name;
				console.log('login username: ' + username);
				contact = JSON.parse(responseJSON).user.contact;
				//history = JSON.parse(responseJSON).user.history;
				subscribe = JSON.parse(responseJSON).user.subscribe;

				// subscribe = JSON.parse(responseJSON).subscribe;
				sessionStorage.removeItem("user_email");
				sessionStorage.user_email = enteredEmail;

				sessionStorage.removeItem("contact");
				sessionStorage.contact = contact;
				console.log("newest contact :" + contact);

				sessionStorage.removeItem("subscribe");
				sessionStorage.subscribe = subscribe;

				sessionStorage.removeItem("user_name");
				sessionStorage.user_name = username;
				//console.log()

				console.log("login info: " + enteredEmail + " " + username + " " + subscribe + " " +contact);

				email = enteredEmail;
				console.log('in userlogin: ' + email);
				password = pwd;

				//var buy = true;
				//var postParameters = {email: email};
				//send a request to server to change to Hong's buy page.
				// $.get("/buy", postParameters, function(responseJSON){
				// 	//var done = JSON.parse(responseJSON).done;
				// });

				//$.redirect("/buy", {email: email});
				//buysell[email] = "login";
				//$(location).attr('href', '/home#page_buy_1');
				console.log('buyorsell: ' + buyorsell);
				if (buyorsell == 1) {
					buysell[email] = 1;
					$.mobile.changePage($("#page_buy_1"));
				} else {
					buysell[email] = 0;
					$.mobile.changePage($("#page_sell_1"));
				}

				//$.mobile.changePage($("#page_buy_1"));
			}
		});

		//$.mobile.changePage($("#delivery-page"));
	})
});

$(document).on("pagecreate", "#signup-page", function(){

	$("#signup-user").focus(function(){
		//console.log('signup-user focus');
		$("#signup-user").val('@brown.edu');
	});
	// $("#signup-user").focusout(function(){
	// 	//console.log('signup-user focus');
	// 	$("#signup-user").prop('placeholder','Brown Email');
	// });
	//e.preventDefault();
	$("#signup-submit").click(function(){
		$("#signup-error").html('');
		var username = $.trim($("#signup-name").val()).replace(/\s/g, '+');
		var enteredEmail = $.trim($("#signup-user").val()).replace(/\s/g, '+');
		var pwd = $.trim($("#signup-pwd").val()).replace(/\s/g, '+');
		var subscribe = document.getElementById("subscribe").checked;
		var gender = $('input[name="gender"]:checked').val();

		console.log(username + " " + enteredEmail + " " + pwd + " " + subscribe + " "+gender);
		
		if (!checkSignupEmail(enteredEmail)) {
			console.log('email invalid');
			return;
		} else if (!checkSignupPwd(pwd)) {
			console.log('pwd invalid');
			return;
		} else if (!checkSignupUsername(username)) {
			console.log('username invalid');
			return;
		}
		email = enteredEmail;

		var postParameters = {username: username, email: email, pwd: pwd, subscribe: subscribe,gender:gender};
		$.post("/signupemail", postParameters, function(responseJSON){
			var done = JSON.parse(responseJSON).done;
			console.log("signup: " + done);
		});


		$.mobile.changePage($("#signupwait-page"));

		// console.log('after email');
		// var postParameters = {username: username, email: email, pwd: pwd, subscribe: subscribe};
		// console.log(postParameters);
		// $.post("/usersignup",postParameters,function(responseJSON){
		// 	console.log('reaches here');
		// 	var success = JSON.parse(responseJSON).success;
		// 	console.log(success);
		// })
	})
});

// $(document).on("pagecreate", "#signupwait-page", function(){

// });

$(document).on("pagecreate", "#forgetpwd-page", function(){
	//e.preventDefault();
	$("#forgetpwd-submit").click(function(){
		$("#forgetpwd-processing").css('display', 'block');
		var email = $("#forgetpwd-user").val();
		//resetEmail = email;
		console.log(email);
		var postParameters = {email: email};
		$.post("/passwordemail",postParameters,function(responseJSON){
			var done = JSON.parse(responseJSON).done;
			$.mobile.changePage($("#resetpwdwait-page"));
			//var done = JSON.parse(responseJSON).done;
		})
	});
});

$(document).on("pagecreate", "#changepwd-page", function(){
	//e.preventDefault();
	$("#changepwd-submit").click(function(){
		$("#changepwd-error").html('');
		var prevPwd = $.trim($("#prev-pwd").val()).replace(/\s/g, '+');
		var newPwd = $.trim($("#new-pwd").val()).replace(/\s/g, '+');
		var reNewPwd = $.trim($("#re-new-pwd").val()).replace(/\s/g, '+');
		if (newPwd != reNewPwd) {
			$("#changepwd-error").html('<span style="font-weight: bold">Passwords do not match</span><br> You must enter the same password twice in order to confirm it.');
			return;
		} else if (password != prevPwd) {
			$("#changepwd-error").html('<span style="font-weight: bold">Current Password Not Correct</span><br> You must enter your current password correctly.');
		}
		$("#changepwd-error").html('<span style="font-weight: bold">Processing</span><br> Please wait.');
		console.log("change: " + prevPwd + " " + newPwd + " " + reNewPwd + " " + email);
		var postParameters = {prevPwd: prevPwd, newPwd: newPwd, email: email};
		// $.post("/userforgetpwd",postParameters,function(responseJSON){
			$("#changepwd-error").html('<span style="font-weight: bold">Password Changed Successfully.</span>')
		// })
	})
});

function revertTime(time) {
	var newTime = time.substring(0, 3);
	newTime += ' ';
	newTime += time.substring(3, 6);
	newTime += ' ';
	newTime += time.substring(6, 8);
	newTime += ' ';
	newTime += time.substring(8, 10);
	newTime += ':';
	newTime += time.substring(10, 12);
	newTime += ':';
	newTime += time.substring(12, 14);
	newTime += ' ';
	newTime += time.substring(14, 17);
	newTime += ' ';
	newTime += time.substring(17, time.length);
	return newTime;
}

function getComment(){
	var info= $("#info").val();
	var commentId = $("input:hidden[name=commentId]").val();
	var fromTime = revertTime(commentId);
	var userType = $("input:hidden[name=userType]").val();
	var userTypeToReturn;
	console.log('usertype: ' + userType);
	if (userType == 'Bought') {
		userTypeToReturn = 'seller';
	} else if (userType == 'Sold') {
		userTypeToReturn = 'buyer';
	}
	var userEmail = $("input:hidden[name=userEmail]").val();
	//alert('info :' + info + ' from: ' + fromTime + ' ' + userType + ' ' + userEmail);
	var completed = $("#completed").is(':checked');

	if (completed == true) {
		completed = false;
	} else {
		completed = true;
	}
	
	console.log('completed: ' + completed);
	var completedSend;
	if (completed == true) {
		completedSend = 1;
	} else {
		completedSend = 0;
	}
	//alert('info :' + info + ' from: ' + fromTime + ' ' + userTypeToReturn + ' ' + userEmail + ' ' + completed + ' ' + starRating);

	var postParameters = {user: userTypeToReturn, time: fromTime, rating: starRating, comment: info, email: userEmail, complete: completedSend};
	$.post("/addcomment", postParameters, function(responseJSON){
		var done = JSON.parse(responseJSON).done;
		starRating = 5;
		console.log('uncommented: ' + uncommented);
		uncommented = uncommented - 1;
		if (uncommented == 0) {
			//$(".alert-p").html();
			$(".alert-p").html('Orders');
		}
		$('#' + commentId + 'comment').remove();
		$('#' + commentId).remove();
	});
	//alert(id);

}

var starRating = 5;
var uncommented = 0;

function getRating(id) {

	for (var j = 1; j <=id; j++) {
		$("#star" + j).removeClass('fa-star-o').addClass('fa-star');
	}

	for (var i = 5; i > id; i--) {
		$("#star" + i).removeClass('fa-star').addClass('fa-star-o');
	}
	starRating = id;
	//return id;
}

function checkComplete() {

	console.log('in check completed');

	var isCompleted = $("#completed").is(':checked');
	console.log(isCompleted);
	if (isCompleted == 'true' || isCompleted == true) {
		console.log('completed true');
		//$("#completed").prop('checked', false);
		$("#completed").prop('data-cacheval', 'false');
		$("#completed-label").removeClass('ui-checkbox-on').addClass('ui-checkbox-off');
	} else if (isCompleted == 'false' || isCompleted == false) {
		console.log('completed false');
		//$("#completed").prop('checked', true);
		$("#completed").prop('data-cacheval', 'true');
		$("#completed-label").removeClass('ui-checkbox-off').addClass('ui-checkbox-on');
	}

}

function deleteOrderOffer(id) {
	console.log('delete order offer id: ' + id);
	id = id.substring(0, id.length-6);
	console.log(id);
	$("#delete-popup").popup("open");
	$("#delete-popup #remove").click(function(){
		$("#" + id).remove();
	});
	var type = id.substring(id.length-5, id.length);
	var time = revertTime(id.substring(0, id.length-5));
	console.log('type: ' + type + 'time: ' + time);
	var postParameters = {type: type, time: time}
	$.post("/deletedeal", postParameters, function(responseJSON){	
		var done = JSON.parse(responseJSON).done;
	});
}

function generateStars(num) {
	var starsHtml = '<div id="history-stars">';
	var stars = [];
	for (var i = 1; i <= num; i++) {
		starsHtml += '<i class="fa fa-star"></i>&nbsp;&nbsp;';
	}
	for (var j = 5; j> num; j--) {
		starsHtml += '<i class="fa fa-star-o"></i>&nbsp;&nbsp;';
	}
	starsHtml += '</div>';
	console.log('starsHtml: ' + starsHtml);
	return starsHtml;
	// '<i class="fa fa-star"></i>&nbsp;&nbsp;' + 
	// '<i id="star2" class="fa fa-star"></i>&nbsp;&nbsp;' + 
	// '<i id="star3" class="fa fa-star"></i>&nbsp;&nbsp;' + 
	// '<i id="star4" class="fa fa-star"></i>&nbsp;&nbsp;' + 
	// '<i id="star5" class="fa fa-star"></i>' + 
	// '</div>' + 
}

$(document).on("pageshow", "#orders-page", function(){

	var commentInfo = {};

	$("#changepwd-error").html('');
	//console.log()
	$(".delete").on("tap", function(e){
		//alert("taped!");
		console.log('to delete');
		var toDelete = $(this).parent().attr("id");
		console.log('toDelete: ' + toDelete);
		$("#delete-popup").popup("open");
		//$("#order-id").remove();
	});
	var history;
	console.log('in orders-page');
	var postParameters = {email: sessionStorage.user_email};
	$.post("/getdeals", postParameters, function(responseJSON){
		$("#orders-ul").empty();
		$("#deals-history").empty();
		console.log('in get deals');
		var orders = JSON.parse(responseJSON).orders;
		var offers = JSON.parse(responseJSON).offers;
		history = JSON.parse(responseJSON).history;
		console.log('length: ' + orders.length + ' ' + offers.length + ' ' + history.length);
		//console.log(orders[0].duration);
		if (orders.length != 0) {
			console.log(orders[0].duration);
			for (var i = 0; i < orders.length; i++) {
				console.log('order time: ' + orders[i].time);
				var trimedOrderTime = $.trim(orders[i].time).replace(/[:]/g, '').replace(/\s/g, '');
				console.log('trimed order time: ' + trimedOrderTime);
				var li = document.createElement('li');
	        	li.setAttribute("class", "ui-li-has-alt ui-first-child ui-last-child");
	        	li.setAttribute("id", trimedOrderTime + "order");
		        li.innerHTML = '<a href="#" class="ui-btn" >' + 
		         			'<h3>Buy Pending:</h3><p style="font-size: 15px; text-align: left">' + 
		         			'Eatery: ' + orders[i].eatery + 
		         			'<br>Duration: ' + orders[i].duration + 'min' + 
		         			'<br>Time: ' + orders[i].time + 
		         			'</p>' + 
		         			'<a href="#"' + 
		         			' id="' + trimedOrderTime + 'orderdelete" data-rel="popup" data-icon="delete"' + 
		         			' aria-haspopup="true" aria-owns="delete-popup"' + 
		         			' aria-expanded="false"' + 
		         			'onclick="deleteOrderOffer(this.id)"' + 
		         			' class="ui-btn ui-btn-icon-notext ui-icon-delete delete" title=“”>::after</a>';
		        $("#orders-ul").append(li);
			}
		}
		if (offers.length != 0) {
			console.log(offers[0].duration);
			for (var j = 0; j < offers.length; j++) {
				console.log('offer time: ' + offers[j].time);
				var trimedOfferTime = $.trim(offers[j].time).replace(/[:]/g, '').replace(/\s/g, '');
				var li = document.createElement('li');
				li.setAttribute("id", trimedOfferTime + "offer");
	        	li.setAttribute("class", "ui-li-has-alt ui-first-child ui-last-child");
		        li.innerHTML = '<a href="#" class="ui-btn" >' + 
		         			'<h3>Sell Pending:</h3><p style="font-size: 15px; text-align: left">' + 
		         			'Eatery: ' + offers[j].eatery + 
		         			'<br>Duration: ' + offers[j].duration + 'min' + 
		         			'<br>Time: ' + offers[j].time + 
		         			'</p><a href="#" data-rel="popup" ' + 
		         			'id="' + trimedOfferTime + 'offerdelete"' + 
		         			'data-icon="delete" aria-haspopup="true" aria-owns="delete-popup" ' +
		         			'onclick="deleteOrderOffer(this.id)"' + 
		         			'aria-expanded="false" ' + 
		         			'class="ui-btn ui-btn-icon-notext ui-icon-delete delete" title=“”>::after</a>';
		        $("#orders-ul").append(li);
			}
		}
		console.log('history length: ' + history.length);
		if (history.length != 0) {

			//var uncommented = 0;

			for (var p = 0; p < history.length; p++) {
				var star;
				var buyOrSell;
				var isSell = true;
				var name;
				var contact;
				var email;
				var isCommented;
				var comment;
				//var histRating;
				console.log('user-email in history: ' + sessionStorage.user_email);
				console.log('sellerEmail in history: ' + history[p].sellerEmail);
				if (history[p].sellerEmail == sessionStorage.user_email) {
					console.log('Im seller');
					name = history[p].buyerName;
					buyOrSell = "Sold";
					console.log('buyorsell1: ' + buyOrSell);
					contact = history[p].buyerContact;
					email = history[p].buyerEmail;
					star = countStar(history[p].buyerRating);
					comment = history[p].sellerComment;
					//histRating = 
					if (history[p].buyerComment == 'No comment yet.') {
						isCommented = false;
					} else {
						isCommented = true;
					}

				} else if (history[p].buyerEmail == sessionStorage.user_email){
					console.log('Im buyer');
					name = history[p].sellerName;
					buyOrSell = "Bought";
					email = history[p].sellerEmail;
					contact = history[p].sellerContact;
					star = countStar(history[p].sellerRating);
					comment = history[p].buyerComment;
					if (history[p].sellerComment == 'No comment yet.') {
						isCommented = false;
					} else {
						isCommented = true;
					}
				}
				console.log('buy or sell 1.5: ' + buyOrSell);

				var prep;

				if (buyOrSell == 'Bought') {
					prep = "from";
				} else {
					prep = "to";
				}

				var li = document.createElement("li");
	         	li.setAttribute("class", "ui-li-static ui-body-inherit ui-first-child ui-last-child");
	         	li.innerHTML = '<h3 style="font-weight: bold">'+ buyOrSell  + ' credit ' + prep + '</h3>' + 
	         	'<p style="font-size: 15px">' + 
	         	name + 
	         	'<br>' + 
	         	'Contact: ' + contact + 
	         	'<br>' + 
	         	'Rating: ' + star + 
	         	'<br>' + 
	         	'Price: ' + history[p].price + 
	         	'<br>' + 
	         	'Dining Hall: ' + history[p].eatery + 
	         	'<br>' + 
	         	'Comment Received: ' + comment + 
	         	'<br>' + 
	         	'Time: '  + history[p].time; 
	         	$("#deals-history").append(li);

	         	//put in profile

	         	//var star = countStar(data.rating);
	         	console.log('buyOrSell 1.6: ' + buyOrSell);

	         	if (isCommented == false) {
	         		uncommented += 1;
	         		var com = 'comment';
	         		var li = document.createElement("li");
		         	li.setAttribute("class", "ui-li-has-alt ui-first-child ui-last-child");
		         	var trimedTime = $.trim(history[p].time).replace(/[:]/g, '').replace(/\s/g, '');
		         	console.log('trimed time: ' + trimedTime);
		         	li.setAttribute("id", trimedTime);
		         	li.innerHTML = '<a href="#" class="ui-btn" >' +
		         	'<h3>'+ buyOrSell  + ' credit</h3>' + 
		         	'<p style="font-size: 15px; text-align: left">' + 
		         	name + 
		         	'<br>' + 
		         	'Dining Hall: ' + history[p].eatery + 
		         	'<br>' + 
		         	'Time: '  + history[p].time + 
		         	'</p><a id="'  + trimedTime + 'commentbtn" href="#" data-rel="popup" data-icon="comment" aria-haspopup="true" aria-owns="delete-popup" aria-expanded="false" class="ui-btn ui-btn-icon-notext ui-icon-comment" title=“”>::after</a>'; 
		         	$("#uncommented-ul").append(li); //id = timecomment;

		         	console.log('history[p].time: ' + history[p].time);
		         	var commentBtn = 'commentBtn';

		         	var dealInfo = [buyOrSell, email];
		         	console.log(dealInfo[0]);
		         	commentInfo[trimedTime] = dealInfo;

		         	console.log('buyOrSell 1.75: ' + buyOrSell);

		         	$("#" + trimedTime + "commentbtn").click(function(){

		         		//var commentBtn = 'commentBtn';



		         		$(".comments").remove();
		         		//console.log('clicked: ' + this.id.substring(0, this.id.length-10));
		         		var commentID = this.id.substring(0, this.id.length-10);

		         		var dealInfo = commentInfo[commentID];
		         		var buyOrSell = dealInfo[0];
		         		var email = dealInfo[1];
		         		console.log('dealInfo: ' + buyOrSell + ' ' + email);

		         		var sellerOrBuyer;
		         		if (buyOrSell == "Bought") {
		         			sellerOrBuyer = "seller";
		         		} else if (buyOrSell == "Sold") {
		         			sellerOrBuyer = "buyer";
		         		}

		         		var li = document.createElement("li");
		         		li.setAttribute("class", "ui-li-static ui-body-inherit ui-first-child ui-last-child comments");
		         		li.setAttribute("id", commentID + "comment");
		         		console.log(trimedTime);
		         		console.log('useremail: ' + email);
		         		//li.setAttribute("c)
		         		li.innerHTML = '<form id="' + commentID + 'form">' + 
            				'<div class="ui-field-contain">' + 
            				// '<label style="text-align: center">Rate and Comment</label>' + 
              				'<fieldset data-role="controlgroup" class="ui-controlgroup ui-controlgroup-vertical ui-corner-all" style="margin-bottom: 10px; margin-top: 0px;">' + 
          					'<div class="ui-controlgroup-controls" style="width: 100%; margin-top: 0px">' + 
          					'<div class="ui-checkbox">' + 
          					'<label for="completed" id="completed-label"' + 
          					'class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-first-child ui-last-child ui-checkbox-on" >Is the order completed?</label>' + 
          					'<input onclick="checkComplete()" style="margin-left: 5px" type="checkbox" name="completed" id="completed" data-cacheval="true">' + 
        					'</div>' + 
        					'</div>' + 
        					'</fieldset>' + 
        					'<div id="star-rating" style="text-align: center">' + 
        					'<label>------ Please Leave Your Rating ------</label>' + 
        					'<div id="stars">' + 
        					'<i id="star1" onclick="getRating(1)" class="fa fa-star"></i>&nbsp;&nbsp;' + 
        					'<i id="star2" onclick="getRating(2)" class="fa fa-star"></i>&nbsp;&nbsp;' + 
        					'<i id="star3" onclick="getRating(3)" class="fa fa-star"></i>&nbsp;&nbsp;' + 
        					'<i id="star4" onclick="getRating(4)" class="fa fa-star"></i>&nbsp;&nbsp;' + 
        					'<i id="star5" onclick="getRating(5)" class="fa fa-star"></i>' + 
        					'</div>' + 
        					'</div>' + 
              				'<textarea name="addComment" id="info" ' + 
              				'class="ui-input-text ui-shadow-inset ui-body-inherit ui-corner-all ui-textinput-autogrow" ' + 
              				'style="height: 52px" ' + 
              				'placeholder="please comment on the deal and the ' + sellerOrBuyer + '">' + 
              				'</textarea>' + 
              				'<input type="hidden" name="commentId" value=' + commentID + '>' + 
              				'<input type="hidden" name="userType" value="' + buyOrSell +'"">' + 
              				'<input type="hidden" name="userEmail" value="' + email + '">' + 
							'</div>' + 
							'<button onclick="getComment()" type="button" data-role="none" class="ui-btn commentBtn" id="' + commentBtn + '" ' + 
              				'style="margin-top: 5px" ' + 
              				'>Submit Comment</button></form>';
              			console.log('buyorSell2: ' + buyOrSell);
              			// document.getElementById('combutton').addEventListener('click', function(){
              			// 	alert('submit!');
              			// });
						// 	alert('submit!');
						// 	console.log('submit!');
						// 	var value = $("input[name=commentId]").val();
						// 	console.log('value: ' + value);
						// });
              			//console.log(li.innerHTML);
		         		$("#" + commentID).after(li);

		         	});

					// $("#info").on('input', function(){
					// 	alert('info input!');
					// });
					//alert('aha here!!');

					// $(".ui-btn").click(function(){
					// 	alert('click btn!');
					// })

					// $("#" + commentBtn).click(function(){
					// 	alert('submit!');
					// 	console.log('submit!');
					// 	var value = $("input[name=commentId]").val();
					// 	console.log('value: ' + value);
					// });
		         	console.log('reaches after comment');
	         	} else {
	         		var commentToMe;
	         		if (buyOrSell == 'Bought') {
	         			commentToMe = history[p].buyerComment;
	         		} else if (buyOrSell == 'Sold'){
	         			commentToMe = history[p].sellerComment;
	         		}

	         		console.log("hist num: " + p);

	         		if (p < 4) {
	         			$("#more-div").css('display', 'block');
	         			// var next = '<li class="ui-li-static ui-body-inherit ui-first-child">' + 
	         			// '<a class="ui-btn ui-shadow ui-icon-arrow-d ui-btn-icon-left ui-corner-all"style="background-color: rgba(200, 255, 255, 0.5);' + 
	         			// 'height: 20px; width: 100%; text-align: center; list-style: none">More' + 
	         			// '</a>' + 
	         			// '</li>';
	         			// $("#rating-ol").append(next);
	         			var profileComment = '<li class="ui-li-static ui-body-inherit ui-first-child hidden-comments">' + 
			         		'<h4>' + name + '</h4>' + 
			         		'<p style="font-size: 15px">' + 
			         		star + 
			         		'<br>&nbsp; &nbsp; &nbsp; &nbsp;' + commentToMe + '</p>' + 
			         		'</li>'
			         	$("#rating-ol").append(profileComment);

	         		} else {
	         			var profileComment = '<li style="display:none" class="ui-li-static ui-body-inherit ui-first-child">' + 
			         		'<h4>' + name + '</h4>' + 
			         		'<p style="font-size: 15px">' + 
			         		star + 
			         		'<br>&nbsp; &nbsp; &nbsp; &nbsp;' + commentToMe + '</p>' + 
			         		'</li>'
			         	$("#rating-ol").append(profileComment);
	         		}

	         		// var profileComment = '<li style="display:none" class="ui-li-static ui-body-inherit ui-first-child hidden-comments">' + 
		         	// 	'<h4>' + name + '</h4>' + 
		         	// 	'<p style="font-size: 15px">' + 
		         	// 	star + 
		         	// 	'<br>&nbsp; &nbsp; &nbsp; &nbsp;' + commentToMe + '</p>' + 
		         	// 	'</li>'
		         	// $("#rating-ol").append(profileComment);
	         	}

			}
		}
	});

	$("#rating-ol").on('scrollstop', function(){
		//alert("stop!");
		console.log($("#rating-ol").height());
		if ($("rating-ol").height() > 200){
			alert('bottom!');
		}
	});

	// $("#star1").click(function(){
	// 	alert('1');
	// });
	// $("#star2").click(function(){
	// 	alert('2');
	// });
	// $("#star3").click(function(){
	// 	alert('3');
	// });
	// $("#star4").click(function(){
	// 	alert('4');
	// });
	// $("#star5").click(function(){
	// 	alert('5');
	// });

//alert('aha!');
	// console.log('history length: ' + history.length);
	// for (var q = 0; q < history.length; q++) {
	// 	$("#" + history[q].time + "comment").click(function(){
	// 		console.log('clicked!');
 //     		alert('clicked!');
 //     	});
	// }

	//$("#")
});

$(document).on("pageshow", "#profile-page", function(){
	
	//preset the returned value from login.
	contact = "000-000-0000";//placeholder
	$("#profile-subscribe").prop('checked', subscribe);
	$("#profile-name").text(sessionStorage.user_name);
	console.log('init sessionStorage contact' + sessionStorage.contact);
	if (sessionStorage.contact == '0000000000') {
		console.log('in profile contact');
		$("#profile-contact").html('000000000');
		$("#profile-contact").css('color', 'grey');
	} else {
		console.log('in contact true');
		$("#profile-contact").css('color', 'black');
		$("#profile-contact").html(sessionStorage.contact);
	}
	// $("#profile-contact").css('color', 'black');
	// $("#profile-contact").text(sessionStorage.contact);
	$("#profile-email").text(sessionStorage.user_email);


	$("#profile-name").on("tap", function(e){
		e.preventDefault();
		//alert('tap');
		if ($(this).text() != '') {
			prevName = $(this).text();
		}
		//prevName = $(this).text();
		//alert(prevEmail);
		//alert("email: " + email);
		//$(this).css('border', 'none');
		$(this).html('');
		$('<input></input>').attr({
			'type': 'text',
			'name': 'profile-name',
			'id': 'profile-name-in',
			'value': prevName
		}).appendTo("#profile-name");
		$('#profile-name-in').focus();
		$(this).css('border', 'none');
	});

	$(document).on('blur', '#profile-name-in', function(){
		//alert(prevEmail);
		var newName = $(this).val();
		sessionStorage.user_name = newName;
		//alert(newEmail)
		$("#profile-name").html('');
		$("#profile-name").html(newName);
		if (newName == "" && prevName == "") {
			$("#profile-name").html('tap to add username');
		} else if (newName === "" || !checkProfileUsername(newName)){
			//alert(prevEmail);
			//$("#profile-name").css("color", "#c2c2c2");
			$("#profile-name").html(prevName);
			sessionStorage.user_name = prevName;
		}
		$("#profile-name").css('border-bottom', '1px solid #989797');
		username = newName;
		//sessionStorage.user_name = 

		resetProfile(email, sessionStorage.contact, sessionStorage.user_name, subscribe);

	});

	$("#profile-contact").on("tap", function(e){
		$("#profile-contact").css('color', 'black');
		e.preventDefault();
		//alert('tap');
		prevContact = $(this).text();
		//alert(prevEmail);
		//alert("email: " + email);
		//$(this).css('border', 'none');
		$(this).html('');
		$('<input></input>').attr({
			'type': 'text',
			'name': 'profile-contact',
			'id': 'profile-contact-in',
			'value': prevContact
		}).appendTo("#profile-contact");
		$('#profile-contact-in').focus();
		$(this).css('border', 'none');
	});

	$(document).on('blur', '#profile-contact-in', function(){
		//alert(prevEmail);
		var newContact = $(this).val();
		console.log('new contact ' + newContact);
		sessionStorage.contact = newContact;
		console.log('prev contact' + prevContact);
		//alert(newEmail)
		$("#profile-contact").html('');
		$("#profile-contact").html(newContact);
		if (newContact == "" && prevContact == "") {
			$("#profile-contact").html('0000000000');
		} else if (newContact === ""){
			console.log('new contact = null');
			//alert(prevEmail);
			//$("#profile-contact").css("color", "#c2c2c2");
			//$("#profile-contact").html(contact);
			$("#profile-contact").html(prevContact);
			sessionStorage.contact = prevContact;
			//$("#profile-contact").css('color', 'grey');
		}
		//sessionStorage.contact = newContact;
		console.log('reset contact blur: ' + sessionStorage.contact);
		$("#profile-contact").css('border-bottom', '1px solid #989797');

		//contact = newContact;
		resetProfile(email, sessionStorage.contact, sessionStorage.user_name, subscribe);

	});

	$("#profile-subscribe").change(function(){
		console.log(this.checked);
		subscribe = this.checked;
		resetProfile(email, contact, username, subscribe);
		//var postParameters = {subscribe: subscribe};
		// $.post("/userforgetpwd",postParameters,function(responseJSON){

		// })
	});

	$("#logout-submit").click(function(){
		sessionStorage.removeItem('user_email');
		sessionStorage.removeItem('user_name');
		sessionStorage.removeItem('contact');
		sessionStorage.removeItem('subscribe');
		console.log('logout.');
		console.log(sessionStorage)
		$.mobile.changePage($("#home-page"));
	});
});





//localStorage.removeItem("request");
request = JSON.parse(localStorage.request||'{}');
localStorage.request = JSON.stringify(request);

$( document ).on( "pageshow", "#page_buy_1", function(event) {
	console.log(sessionStorage.user_email)
	console.log('in pagebuy1: ' + email);
  $("#progress_bar").progressbar({
     value: 25
  });

  $(".meet_up_confirm").tap(function(){
    request = JSON.parse(localStorage.request);
    request.method="meet";
    delete request.address;

    localStorage.request = JSON.stringify(request);
  })

  $(".deliver_confirm").tap(function(){
    request = JSON.parse(localStorage.request);
    request.method="deliver";
    localStorage.request = JSON.stringify(request);
  })

});


$( document ).on( "pageinit", "#page_deliver", function(event) {
  
  $("#progress_bar_deliver").progressbar({
     value: 37.5
  });

  locations=["Young Orchard Ave 010", "Marcy House: Wriston Quad", "Vartan Gregorian Quad A (New Dorm A)", "Richmond St 233", "Graduate Ctr A", "Davol Sq 003", "Young Orchard Ave 002", "Barbour Hall", "Sharpe House", "George St 180", "Peter Green House", "Hegeman Hall", "Brown St 068.5", "Caswell Hall", "Geo-Chem Bldg", "Manning Hall", "Ship St 070", "New Pembroke No. 4", "Bio-Med Grimshaw-Gudewicz", "Brown Stadium", "Perkins Hall", "Jameson-Mead: Keeney Quad", "Littlefield Hall", "University Hall", "List (Albert & Vera) Art Building", "Maddock Alumni Center", "Harkness House: Wriston Quad", "Sears House: Wriston Quad", "Watson Center For Information Tech", "Morrison-Gerard Studio", "Slater Hall", "George St 163", "Blistein House", "Waterman St 133", "Norwood House", "Goddard House: Wriston Quad", "Hope College", "Machado (Antonio) House", "Fones Alley 008", "Charlesfield St 059", "Miller Hall", "Metcalf Hall", "Bio-Med ACF", "Chapin House: Wriston Quad", "Dyer St 200", "Benevolent St 026", "Barus & Holley", "Manning St 029", "Faculty Club", "Giddings House", "Stimson Ave 002", "Emery: Pembroke Quad", "Rhode Island Hall", "Horace Mann House", "Robinson Hall", "Steinert Center", "Brook St 341", "Sciences Library", "Waterman St 094", "Bowen St 219", "Benevolent St 005", "OMAC Athletic Center", "Graduate Ctr D", "Prospect House", "Nelson Fitness Center", "Manning St 037", "Lincoln Field Building", "Lyman Hall", "Barus Building", "Metcalf Research Building", "Kassar (Edward W.) House", "Archibald-Bronson: Keeney Quad", "Granoff Ctr For The Creative Arts", "Walter Hall", "South Main St 121", "Sidney E. Frank Hall Life Sciences", "Meehan Auditorium", "Hoppin (Thomas P.) House", "New Pembroke No. 2", "Haffenreffer Barn", "Wilson Hall", "Diman House: Wriston Quad", "Meiklejohn House", "Graduate Ctr E", "Minden Hall", "Brown St 111", "Benevolent St 020", "West House", "Angell St 195", "Verney-Woolley Hall (VDub)", "Marston Hall", "Broadway 233", "Olney House: Wriston Quad", "George St 067", "Bio-Med Ctr", "MacMillan Hall", "Angell St 169", "Marston Boathouse", "Rochambeau House", "Waterman St 137", "MacFarlane House", "Brown Office Bldg", "Grant Fulton", "John Hay Library", "Morriss Hall: Pembroke Quad", "Arnold Lab", "Salomon Hall (Main Green)", "Medical Research Lab", "Faunce House", "Rockefeller Library", "Brown St 070", "Dyer House", "Urban Environmental Lab", "Gerard House, Samuel N.", "Thayer St 315", "Pizzitola", "Benoni Cooke House", "Orwig Music Hall", "Ladd Observatory", "5th Ave 500", "Andrews Hall", "Brook St 333", "Smith-Buonanno Hall", "King House", "Montgomery St 601", "Young Orchard Ave 004", "Graduate Ctr C", "Alumnae Hall", "Maxcy Hall", "George St 025", "Buxton House: Wriston Quad", "New Pembroke No. 3", "Waterman St 085", "Lippitt House", "Thayer St 135", "Nicholson House", "Graduate Ctr B", "Haffenreffer Outing Reservation Fac", "John St 050", "Pembroke Hall", "J. Walter Wilson Building", "Champlin: Pembroke Quad", "Vartan Gregorian Quad B (New Dorm B)", "Hemisphere Bldg", "T.F. Green Hall","Annmary Brown Memorial Library", "Everett-Poland: Keeney Quad", "Hope St 190", "Elm St 110", "Waterman St 131", "George St 182", "Waterman St 070", "Woolley Hall: Pembroke Quad", "Wayland House: Wriston Quad", "Partridge Hall & Annex", "Shirley Miller House", "Haffenreffer Museum Collections Res", "Churchill House", "John Carter Brown Library", "Sharpe Refectory (Ratty)", "Corliss-Brackett", "Feinstein", "Sayles Hall", "Prince Engineering Lab", "Richmond St 222 (Med Ed)", "Watson Institute", "George St 155", "New Pembroke No. 1", "Mencoff Hall", "Wilbour Hall"];

  $("#autocorrect").autocomplete({
  	 open: function(event, ui) {
        $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
     },
     minLength:3,
     source: locations,
     select:function(){
      $("#address_confirm").css("display","block");
     }
  });

  $("#autocorrect").keyup(function(){
    var text =  $("#autocorrect").val().trim();
    if(locations.indexOf(text)!=-1){
      $("#address_confirm").css("display","block");
    } else{
      $("#address_confirm").css("display","none");
    }
  })

  $('.ui-menu-item').click(function(){
    var text = $('.ui-menu-item').text()
    $("autocorrect").text(text);
    $("#address_confirm").css("display","block");
  })

  $('.ui-autocomplete').css({'fontSize': '1em', 'width': $(window).width()-16*2 ,'height':"auto",'background-color':'none'});

  $('#address_confirm').click(function(){
    request = JSON.parse(localStorage.request);
    request.address = $("#autocorrect").val();  
    localStorage.request = JSON.stringify(request);
  })

});


$( document ).on( "pageinit", "#page_buy_2", function(event) {

  $("#progress_bar_2").progressbar({
    value: 50
  });

  $(".andrews").click(function(){
    request = JSON.parse(localStorage.request);
    request.eatery = "Andrews Commons";  
    localStorage.request = JSON.stringify(request);
    //console.log(request);
  });

  $(".blueroom").click(function(){
    request = JSON.parse(localStorage.request);
    request.eatery = "Blueroom";  
    localStorage.request = JSON.stringify(request);
    //console.log(request);
  });

  $(".josiahs").click(function(){
    request = JSON.parse(localStorage.request);
    request.eatery = "Josiah's";  
    localStorage.request= JSON.stringify(request);
    //localStorage.request = JSON.stringify(request);
  })

  $(".ratty").click(function(){
    request = JSON.parse(localStorage.request);
    request.eatery = "Ratty";  
    localStorage.request= JSON.stringify(request);
    //localStorage.request = JSON.stringify(request);
  })

  $(".vdub").click(function(){
    request = JSON.parse(localStorage.request);
    request.eatery = "V-Dub";  
    localStorage.request= JSON.stringify(request);
    //localStorage.request = JSON.stringify(request);
  })


});

$( document ).on( "pageshow", "#page_buy_3", function(event) {

  $("#progress_bar_3").progressbar({
    value: 75
  });

  $("#menu_fieldset").empty();
  
  //$("#menu_fieldset").append("<legend>What do you wanna eat?</legend>");
  //$("#menu_fieldset").append("<legend style='margin-top: 10px;margin-bottom: 10px;''>Total: <span style='color:#9D8189'>$0.00</span></legend>");

  //$('#page_buy_3').append("<p>"+request.eatery+"</p>");
  request = JSON.parse(localStorage.request);
  console.log(request);
  var eatery = request.eatery;
  var date = new Date();
  var day = date.getDay();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var time = (hour-2)*60+minute;

  request.day=day;
  request.time=time;

  //var map = {eatery:eatery,day:day,time:time}
  localStorage.request = JSON.stringify(request);
  //$.post("/getmenu",{eatery:localStorage.eatery},function(response){
  	//data = JSON.parse(response);
  	//var menu = data[0];
  	//var price = data[1];

  	var menu = ["炒粉","冷面","牛肉饭","猪头肉","狗肉火锅","羊蝎子"];
  	var prices = [19,23,34,43,32,25];

  	for(var i = 0; i<menu.length;i++){
  		//console.log(arrive);
  		var food = menu[i];
  		
  		var label = "<div class='ui-checkbox'> <label for="+ food + " style='font-weight: 400;'class='ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-right ui-checkbox-off ui-first-child'>"+ food;
  		if (prices.length>0){
  			var price = prices[i];
  			label += ": $"+ price;
  		}
  		label += "</label>";
  		
    	var input = "<input type='checkbox' name=" + food + " id=" + food + "></div>";

    	console.log(label+input);
    	$(label+input).appendTo($('#menu_fieldset')).trigger("create");
  	}

  //});


  var menu_order = {};
  var checked_count = 0;
  var total_price = 0.00;
  if (request.eatery =="Ratty" || request.eatery == "VDub"){
  	total_price = 7.3;
  }
  $('#price_span').text("$"+total_price);
  
  $('#menu :checkbox').click(function() {
    var $this = $(this);
    var id = $this.attr('name');
    console.log(id);
    // $this will contain a reference to the checkbox   
    if ($this.is(':checked')) {
        checked_count +=1;
        $('#menu_confirm').css("display","block");
        menu_order[id]=true;

        total_price += prices[menu.indexOf(id)];
        total_price = Math.abs(total_price.toFixed(2));

        $('#price_span').text("$"+total_price);

    } else {
         checked_count-=1;
         if(checked_count==0){
          $('#menu_confirm').css("display","none");
         }
         delete menu_order[id];
         
         total_price -= prices[menu.indexOf(id)];
         total_price=Math.abs(total_price.toFixed(2));

         $('#price_span').text("$"+ total_price);
    }
  });

  $('#menu_confirm').tap(function(){
    request = JSON.parse(localStorage.request);
    var menu_string = Object.keys(menu_order).join(' ');
    request.menu=menu_string;
    request.price = total_price;
    localStorage.request= JSON.stringify(request);
    console.log(request);
  })


})

$( document ).on( "pageshow", "#page_buy_4", function(event) {
  $("#progress_bar_4").progressbar({
     value: 95
  });

  $('#wrong_number').css("display","none");

  request = JSON.parse(localStorage.request);

  console.log(request);
  $("#price_span_2").text("$"+request.price);
  localStorage.request = JSON.stringify(request);


  // var contact = sessionStorage.contact;
  // console.log(contact);

  if(sessionStorage.contact.length==10 && sessionStorage.contact != 0000000000){
  	console.log("contact true");
  	$('#tel-1').val(sessionStorage.contact);
  };

  var tap_counter = 0;

  $('#payment_suggestion').tap(function(){
    if (tap_counter%2==0){
      $('#payment_suggestion_detail').css("display","block");
    } else{
      $('#payment_suggestion_detail').css("display","none");
    }
    tap_counter+=1;
  })

 //  var intervalFlag = 1;

	// var confirmInterval = setInterval(function(){
	// 	intervalFlag = 0;
	// 	console.log('in set interval');
	// 	clearInterval(confirmInterval);
	// }, 5000);

  $("#final_confirm").tap(function(){

  	if (intervalFlag == 0 ) {
  		console.log('two times too quick');
		return;
	}

	var intervalFlag = 0;

	var confirmInterval = setInterval(function(){
		intervalFlag = 1;
		console.log('in set interval');
		clearInterval(confirmInterval);
	}, 5000);
    
    var phone = $('#tel-1').val().trim();
    console.log("input contact: " + phone);
    console.log("email:" +sessionStorage.user_email);

    // if (!phone.match(/\d/g) || phone.length != 10) {
    // 	$('#wrong_number').css("display","block");
    // 	$('#wrong_number').css("color","red");
    // }

    
    if(phone.match(/\d/g) && phone.length==10){

      console.log('phone match pattern');

      sessionStorage.contact = phone;
      $("#profile-contact").html(sessionStorage.contact);


      $('#wrong_number').css("display","none");

      console.log("phone number"+phone);

      // var postParameters = {email: sessionStorage.user_email, contact: phone, username: sessionStorage.user_name, subscribe: sessionStorage.subscribe};

      // $.post("/changeinfo",postParameters,function(data){
      // 	console.log(data);
      // })

      request = JSON.parse(localStorage.request);
      request.phone=phone;
      request.duration = $('#duration').val();
      request.bound = $('#bound').val();
      console.log(request);
      console.log("session storage user_name buy: " + sessionStorage.user_name);
      localStorage.request = JSON.stringify(request)

      $.post("/placeorder",{
      	user:sessionStorage.user_email,
      	address:request.address,
      	eatery:request.eatery,
      	menu:request.menu,
      	duration:request.duration,
      	price:request.price,
      	priceBound:request.bound,
      	contact: sessionStorage.contact,
	    username: sessionStorage.user_name,
	    subscribe: sessionStorage.subscribe
      },function(response){
        data = JSON.parse(response);
        console.log(data);

        var address = window.location.href;
         console.log(address);


         for(var i = address.length; i>0; i--){
	     		if (address.charAt(i) == "#"){
	     			address = address.substring(0,i);
	     			break;
	     		}
	     }

         console.log(address);


        if (data.result == "nothing"){

        	$('#suggestion_mail').html(sessionStorage.user_email);

        	$(location).attr('href', address+"#page_confirm_false");

	    } else if(data.result == "match"){
	    	$("#match-username").html('Username: ' + data.sellerName);
         	displayRating(data.sellerRating);
         	$("#match-contact").html('Contact: ' + data.sellerContact);
	    	
         	$(location).attr('href', address+"#page_confirm_true");
         } else{

         	$('#suggestion_div').css('display','block')
         	sessionStorage.offerIds = JSON.stringify(data.offerIds);
         	sessionStorage.orderId= data.orderId;
         	sessionStorage.sellerNames = JSON.stringify(data.sellerNames);
         	sessionStorage.sellerRatings = JSON.stringify(data.sellerRatings);
         	sessionStorage.sellerContacts = JSON.stringify(data.sellerContacts);
         	sessionStorage.prices = JSON.stringify(data.prices);

         	for (var i = 0;i<data.sellerNames.length;i++){
         		
         		$("#li_"+(i+1)).css('display',"block");

         		$("#user_"+(i+1)).html(data.sellerNames[i]);
         		for (var j = 0; j<Math.floor(data.sellerRatings[i]);j++){
         			$("#li_"+(i+1) +" #star"+(j+1)).css("color","rgba(198,26,102,0.7)");
         		}

         		$("#price_"+(i+1)).html(data.prices[i]);
         	}

         	$(location).attr('href', address+"#page_confirm_false");

         }
      })
    } else{
    	console.log('wrong number');
      $('#wrong_number').css("display","block");
    }
  })

});



	
//
//SELL PART
//
//

offer = JSON.parse(localStorage.offer||'{}');
localStorage.offer = JSON.stringify(offer);

$( document ).on( "pageinit", "#page_sell_1", function(event) {
  $("#progress_bar_sell").progressbar({
     value: 35
  });

  $(".meet_up_confirm").tap(function(){
    offer = JSON.parse(localStorage.offer);
    offer.method="meet";
    offer.north_deliver = false;
    offer.south_deliver = false;
    offer.center_deliver = false;

    localStorage.offer = JSON.stringify(offer);

    console.log(offer)
  })

  $(".deliver_confirm").tap(function(){
    offer = JSON.parse(localStorage.offer);
    offer.method="meet_deliver";
    localStorage.offer = JSON.stringify(offer);

    console.log(offer)
  })

});

$( document ).on( "pageshow", "#page_sell_deliver", function(event) {
  
  offer = JSON.parse(localStorage.offer);

  offer.south_deliver = false;
  offer.north_deliver = false;
  offer.center_deliver=false;

  localStorage.offer = JSON.stringify(offer);


  $('#address_confirm_sell').css('display','none');

  $("#progress_bar_deliver_sell").progressbar({
     value: 60
  });

  var width = $(window).width()-16*2;

  var north_height = 360*width/564.0 + "px";
  var center_height = 335*width/564.0 +"px";
  var south_height = 299*width/564.0 +"px";

  $('#north_shadow').css("height",north_height);
  $('#center_shadow').css("height",center_height);
  $('#south_shadow').css("height",south_height);



  var north_counter = 0;
  var south_counter = 0;
  var center_counter =0;

  $('#north_shadow').click(function(){
  	if(north_counter%2==0){
  		$('#north_shadow').css("background","linear-gradient(rgba(240, 240, 240, 0), rgba(240, 240, 240, 0)),url('../image/north_new.jpeg')");
  		$('#north_shadow').css("background-size","100%");

  		$('#north_click').attr('src','../image/confirm.png');
  		//$('#north_check').css('display','block');
  	} else{
  		$('#north_shadow').css("background","linear-gradient(rgba(240, 240, 240, 0.5), rgba(240, 240, 240, 0.5)),url('../image/north_new.jpeg')");
		$('#north_shadow').css("background-size","100%");

		$('#north_click').attr('src','../image/click.png');

		//$('#north_check').css('display','none');
  		//$('#north_des').css('display','block');
  	}

  	north_counter+=1;

  	if(north_counter%2==0 && south_counter%2 == 0 && center_counter%2 == 0){
  		  $('#address_confirm_sell').css('display','none');
  	} else{
  		  $('#address_confirm_sell').css('display','block');
  	}
  });

  $('#center_shadow').click(function(){
  	if(center_counter%2==0){
  		$('#center_shadow').css("background","linear-gradient(rgba(240, 240, 240, 0), rgba(240, 240, 240, 0)),url('../image/center_new.jpeg')");
  		$('#center_shadow').css("background-size","100%");

  		$('#center_click').attr('src','../image/confirm.png');

  		//$('#center_des').css('display','none');
  		//$('#center_check').css('display','block');
  	} else{
  		$('#center_shadow').css("background","linear-gradient(rgba(240, 240, 240, 0.5), rgba(240, 240, 240, 0.5)),url('../image/center_new.jpeg')");
	  	$('#center_shadow').css("background-size","100%");

		$('#center_click').attr('src','../image/click.png');
		//$('#center_check').css('display','none');
  		//$('#center_des').css('display','block');
  	}
  	center_counter+=1;

  	if(north_counter%2==0 && south_counter%2 == 0 && center_counter%2 == 0){
  		  $('#address_confirm_sell').css('display','none');
  	} else{
  		  $('#address_confirm_sell').css('display','block');
  	}
  });

  $('#south_shadow').click(function(){
  	if(south_counter%2==0){
  		$('#south_shadow').css("background","linear-gradient(rgba(240, 240, 240, 0), rgba(240, 240, 240, 0)),url('../image/south_new.jpeg')");
    	$('#south_shadow').css("background-size","100%");

      	$('#south_click').attr('src','../image/confirm.png');

  		//$('#south_des').css('display','none');
  		//$('#south_check').css('display','block');
  	} else{
  		$('#south_shadow').css("background","linear-gradient(rgba(240, 240, 240, 0.5), rgba(240, 240, 240, 0.5)),url('../image/south_new.jpeg')");
		$('#south_shadow').css("background-size","100%");

		$('#south_click').attr('src','../image/click.png');
		//$('#south_check').css('display','none');
  		//$('#south_des').css('display','block');
  	}
  	south_counter+=1;

  	if(north_counter%2==0 && south_counter%2 == 0 && center_counter%2 == 0){
  		  $('#address_confirm_sell').css('display','none');
  	} else{
  		  $('#address_confirm_sell').css('display','block');
  	}
  });


  $('#address_confirm_sell').click(function(){
    offer = JSON.parse(localStorage.offer);
    if (north_counter % 2==1){
    	offer.north_deliver = true;
    } else{
    	offer.north_deliver = false;
    };

    if (south_counter % 2==1){
    	offer.south_deliver = true;
    } else{
    	offer.south_deliver = false;
    };

    if (center_counter % 2==1){
    	offer.center_deliver = true;
    } else{
    	offer.center_deliver = false;
    };

    localStorage.offer = JSON.stringify(offer);

    console.log(offer);
  });

});


$( document ).on( "pageshow", "#page_sell_2", function(event) {

  $("#progress_bar_2_sell").progressbar({
    value: 70
  });

  console.log("arrived")
  
  $('#page_sell_2 :checkbox').each(function(){
       $(this).attr('data-cacheval','true'); 
       console.log(this)
       console.log("uncheck");
  });

  var eateries = {};
  var checked_count = 0;

  $(':checkbox').change(function() {
  	console.log("get");
    var $this = $(this);
    var id = $this.attr('name');

    if ($this.is(':checked')) {

    	checked_count +=1;
        $('#menu_confirm_sell').css("display","block");

        eateries[id]=true;

    } else{

    	checked_count-=1;
        
        if(checked_count==0){
          $('#menu_confirm_sell').css("display","none");
        }
    }

   });

  $('#menu_confirm_sell').tap(function(){
    offer = JSON.parse(localStorage.offer);
    var eatery_string = Object.keys(eateries).join(',');
    offer.eatery=eatery_string;
    localStorage.offer= JSON.stringify(offer);
    console.log(offer);
  })

});

function displayRating(rating) {
	console.log('rating: ' + rating);
	$("#match-ratingstars").css('display', 'block');
	if (rating == 0) {
		$("#match-ratingstars").css('display', 'none');
		$("#match-ratingp").html('No current Rating');
	}
	for (var j = 1; j <=rating; j++) {
		$("#match-rating #star" + j).addClass('fa-star');
	}

	for (var i = 5; i > rating; i--) {
		$("#match-rating #star" + i).addClass('fa-star-o');
	}
}

$( document ).on( "pageshow", "#page_sell_3", function(event) {
	$("#progress_bar_3_sell").progressbar({
	    value: 90
	 });

	$('#wrong_number').css("display","none");

	var contact = sessionStorage.contact;
	console.log(contact);


  	if(contact!=null && contact != 0000000000 ){
  		$('#tel-1_sell').val(contact);
  	};


	var tap_counter = 0;

	$('#payment_suggestion_sell').tap(function(){
	  if (tap_counter%2==0){
	    $('#payment_suggestion_detail_sell').css("display","block");
	  } else{
	    $('#payment_suggestion_detail_sell').css("display","none");
	  }
	  tap_counter+=1;
	});

	//var intervalFlag = 1;

	// var confirmInterval = setInterval(function(){
	// 	intervalFlag = 0;
	// 	console.log('in set interval');
	// 	clearInterval(confirmInterval);
	// }, 5000);

	$("#final_confirm_sell").click(function(){

		if (intervalFlag == 0 ) {
			console.log('two clicks too quick');
			return;
		}

		var intervalFlag = 0;

		var confirmInterval = setInterval(function(){
			intervalFlag = 1;
			console.log('in set interval');
			clearInterval(confirmInterval);
		}, 5000);

		// if (intervalFlag == 0 ) {
		// 	console.log('two clicks too quick');
		// 	return;
		// }
    
	    var phone = $('#tel-1_sell').val().trim();
	    console.log(phone);
	    sessionStorage.contact = phone;

	    // if (!phone.match(/\d/g) || phone.length != 10) {
	    // 	$('#wrong_number_sell').css("display","block");
	    // 	$('#wrong_number_sell').css("color","red");
	    // }
	    //console.log()
	    
	    if(phone.match(/\d/g) && phone.length==10){

	       console.log("sessionS conta: " + sessionStorage.contact);
	       $("#profile-contact").html(sessionStorage.contact);
	       //consolg.log()

	       // var postParameters = {email: sessionStorage.user_email, contact: sessionStorage.contact, username: sessionStorage.user_name, subscribe: sessionStorage.subscribe};

	       // $.post("/changeinfo",postParameters,function(data){
	      	//  console.log(data);
	       // })

	      offer = JSON.parse(localStorage.offer);
	      $('#wrong_number_sell').css("display","none");
	      offer.phone=phone;
	      offer.creditNum = $("input[name=creditNum]:checked").val();
	      console.log(offer.creditNum)
	      offer.duration = $('#duration_sell').val();
	      offer.bound = $('#bound_sell').val();
	      console.log(offer);
	      localStorage.offer = JSON.stringify(offer)

	      //$(location).attr('href', 'http://stackoverflow.com')
	      console.log("session storage user_name sell: " + sessionStorage.user_name);
	      
	     $.post("/placeoffer",{
	     	user:sessionStorage.user_email,
	     	address:offer.address,
	     	eatery:offer.eatery,
	     	menu:offer.menu,
	     	duration:offer.duration,
	     	price:offer.price,
	     	bound:offer.bound,
	     	creditNum:offer.creditNum, 
	     	contact: sessionStorage.contact,
	     	username: sessionStorage.user_name,
	     	subscribe: sessionStorage.subscribe,
	     	north_deliver: offer.north_deliver,
	     	south_deliver: offer.south_deliver,
	     	center_deliver: offer.center_deliver
	     },function(response){
	         
	         data = JSON.parse(response);
	         //console.log(data.result);

	         var address = window.location.href;
	         console.log(address);

	         for(var i = address.length; i>0; i--){
	         		if (address.charAt(i) == "#"){
	         			address = address.substring(0,i);
	         			break;
	         		}
	         }

	         console.log(address);


	         if (data.result == "nothing"){

	         	$(location).attr('href', address+"#page_confirm_false");

	

	         } else if(data.result == "match"){
	         	$("#match-username").html('Username: ' + data.buyerName);
	         	displayRating(data.buyerRating);
	         	$("#match-contact").html('Contact: ' + data.buyerContact);
	         	
	         	$(location).attr('href', address+"#page_confirm_true");
	         } else{

	         	$('#suggestion_div').css('display','block')
	         	sessionStorage.orderIds = JSON.stringify(data.orderIds);
	         	sessionStorage.offerId= data.offerId;
	         	sessionStorage.buyerNames = JSON.stringify(data.buyerNames);
	         	sessionStorage.buyerRatings = JSON.stringify(data.buyerRatings);
	         	sessionStorage.buyerContacts = JSON.stringify(data.buyerContacts);
	         	sessionStorage.prices = JSON.stringify(data.prices);

	         	for (var i = 0;i<data.buyerNames.length;i++){
	         		
	         		$("#li_"+(i+1)).css('display',"block");

	         		$("#user_"+(i+1)).html(data.buyerNames[i]);
	         		
	         		for (var j = 0; j<Math.floor(data.buyerRatings[i]);j++){
	         			$("#li_"+(i+1) +" #star"+(j+1)).css("color","rgba(198,26,102,0.7)");
	         		}

	         		$("#price_"+(i+1)).html(data.prices[i]);
	         	}

         		$(location).attr('href', address+"#page_confirm_false");
	         }

	         console.log(response);
	      })
    	} else {
    		console.log('wrong number');
      		$('#wrong_number_sell').css("display","block");
    	};
 	})

})

$( document ).on( "pageshow", "#page_confirm_true", function(event) {
	uncommented +1;
	$(".alert-p").html();
	$(".alert-p").html('Orders &#10071;');
	$("#match-checkhistory").click(function(){
		var postParameters = {email: sessionStorage.user_email};
		$.post("/getdeals", postParameters, function(responseJSON){
			var history = JSON.parse(responseJSON).history;
			if (history.length != 0) {
				console.log('history length: ' + history.length);

			//var uncommented = 0;

				for (var p = 0; p < history.length; p++) {
					var star;
					var buyOrSell;
					var isSell = true;
					var name;
					var contact;
					var email;
					var isCommented;
					var comment;
					//var histRating;
					console.log('user-email in history: ' + sessionStorage.user_email);
					console.log('sellerEmail in history: ' + history[p].sellerEmail);
					if (history[p].sellerEmail == sessionStorage.user_email) {
						console.log('Im seller');
						name = history[p].buyerName;
						buyOrSell = "Sold";
						console.log('buyorsell1: ' + buyOrSell);
						contact = history[p].buyerContact;
						email = history[p].buyerEmail;
						star = countStar(history[p].buyerRating);
						comment = history[p].sellerComment;
						//histRating = 
						if (history[p].buyerComment == 'No comment yet.') {
							isCommented = false;
						} else {
							isCommented = true;
						}

					} else if (history[p].buyerEmail == sessionStorage.user_email){
						console.log('Im buyer');
						name = history[p].sellerName;
						buyOrSell = "Bought";
						//email = history[p].sellerEmail;
						//contact = history[p].sellerContact;
						star = countStar(history[p].sellerRating);
						comment = history[p].buyerComment;
						if (history[p].sellerComment == 'No comment yet.') {
							isCommented = false;
						} else {
							isCommented = true;
						}
					}
					var commentToMe;
		     		if (buyOrSell == 'Bought') {
		     			commentToMe = history[p].buyerComment;
		     		} else if (buyOrSell == 'Sold'){
		     			commentToMe = history[p].sellerComment;
		     		}
					var profileComment = '<li class="ui-li-static ui-body-inherit ui-first-child">' + 
			     		'<h4>' + name + '</h4>' + 
			     		'<p style="font-size: 15px">' + 
			     		star + 
			     		'<br>&nbsp; &nbsp; &nbsp; &nbsp;' + commentToMe + '</p>' + 
			     		'</li>'
			     	$("#match-rating-ol").append(profileComment);
			    }
			}
		});
		//console.log('clicked match history');
		// var profileComment = '<li class="ui-li-static ui-body-inherit ui-first-child">' + 
  //    		'<h4>' + name + '</h4>' + 
  //    		'<p style="font-size: 15px">' + 
  //    		star + 
  //    		'<br>&nbsp; &nbsp; &nbsp; &nbsp;' + commentToMe + '</p>' + 
  //    		'</li>'
  //    	$("#match-rating-ol").append(profileComment);
	});
});

$( document ).on( "pageshow", "#page_confirm_false", function(event) {

	$("#suggestion_div .ui-button").click(function(){
		var num = $(this).attr('id');
		var num = parseInt(num.split("_")[1])-1;
		console.log(num);
		console.log(sessionStorage);

		if (sessionStorage.getItem('sellerNames')!= null){
			$('#page_confirm_true #match-username').html('Username: ' + JSON.parse(sessionStorage.sellerNames)[num]);
			var stars = Math.floor(JSON.parse(sessionStorage.sellerRatings)[num]);
			for (var j = 0; j < stars;j++){
				$('#page_confirm_true #star'+(j+1)).addClass("fa-star");
			}
			$('#match-contact').html("Contact: " + JSON.parse(sessionStorage.sellerContacts)[num]);
		
			$.post('/putdeal',{offerID:JSON.parse(sessionStorage.offerIds)[num],orderID:sessionStorage.orderId,price:JSON.parse(sessionStorage.prices)[num]})

		} else{
			$('#page_confirm_true #match-username').html('Username: ' + sessionStorage.buyerNames[num]);
			var stars = Math.floor(sessionStorage.buyerRatings[num]);
			for (var j = 0; j < stars;j++){
				$('#page_confirm_true #star'+(j+1)).addClass("fa-star");
			}
			$('#match-contact').html("Contact: " + sessionStorage.buyerContacts[num]);

			$.post('/putdeal',{offerID:sessionStorage.offerId,orderID:sessionStorage.orderIds[num],price:sessionStorage.prices[num]})

		}


		$.mobile.changePage($("#page_confirm_true"));

		
	})




});


