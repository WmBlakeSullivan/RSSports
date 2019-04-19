var MLBurl = "https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.espn.com%2Fespn%2Frss%2FMLB%2Fnews";
var NBAurl = "https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.espn.com%2Fespn%2Frss%2FNBA%2Fnews";
var NHLurl = "https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.espn.com%2Fespn%2Frss%2FNHL%2Fnews";
var user = null;


$( document).ready(function () {
	

	//initital loading of feed
	feedAJAX();

	//repeated loading of feed
	setInterval(function () {
		feedAJAX();
	}, 30000);
});

//load feeds
function feedAJAX() {
	var feed = [];
	$.getJSON(MLBurl).then(function(data) {
		if(document.getElementById('MLBCheckbox').checked) {
			data.items.forEach(function(item) {
				feed.push(item);
			});
		}
	}).then($.getJSON(NBAurl).then(function(data) {
		if(document.getElementById('NBACheckbox').checked) {
			data.items.forEach(function(item) {
				feed.push(item);
			});
		}
	})).then($.getJSON(NHLurl).then(function(data) {
		if(document.getElementById('NHLCheckbox').checked) {
			data.items.forEach(function(item) {
				feed.push(item);
			});
		}
	})).always(function(data) {
		feed.sort((a, b) => (a.pubDate < b.pubDate) ? 1 : -1);
		displayFeed(feed);
	});
}

function displayFeed(data) {
	var html = "";
	if (data.length == 0) {
		html = '<div class="card"><div class="card-body"><h5 class="card-title text-dark">Select at least one feed to view</h5></div></div>';
	} else {
		data.forEach(function(item) {
			var line = '<div class="card">';
			line += '<div class="card-body">';
			line += '<h5 class="card-title text-dark">'+item.title+'</h5>';
			line += '<h6 class="card-subtitle text-muted">'+item.pubDate+'</h6>';
			line += '<a href="'+item.link+'" target="_blank">';
			line += '<p class="card-text text-dark">'+item.description+'</p>';
			line += "</a>";
			line += "</div>";
			line += "</div>";

			html += line;
		});
	}

	document.getElementById('content').innerHTML = html;
}

function login() {
	var username = $('#username-input').val();
	var password = $('#password-input').val();
	if(username.length == 0 || password.length == 0) {
		alert('please enter a username and password');
	} else {
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            	console.log(this.responseText);
							$('#login-button-nav').css('display','none');
							$('#logout-button-nav').css('display','inline-block');
							lastVisit("dank");
							$('#last-visited').css('visibility', 'visible');
							$('#loginModal').modal('hide');
            }
        };
        xmlhttp.open("GET", "validate.php?username="+username+"&password="+password, true);
        xmlhttp.send();
        $('#login-button-nav').css('display','none');
				$('#logout-button-nav').css('display','inline-block');
				lastVisit("dank");
				$('#last-visited').css('visibility', 'visible');
				$('#loginModal').modal('hide');
	}
}

function lastVisit(username) {
	//check localStorage for time data
	if(!localStorage.getItem(username)) {
		//first visit
		document.getElementById("last-visited").innerHTML = "Welcome to Really Simple Sports!";
	} else {
		//load last visit
		var lv = localStorage.getItem(username);
		document.getElementById("last-visited").innerHTML = lastVisitString(lv);
	}
	//set lastVisited in localStorage
	var date = new Date();
	localStorage.setItem(username, date);
}


//create the string displayed in the navbar
function lastVisitString(obj) {
	obj = new Date(obj);
	var retval = "You last visited on ";
	if ((obj.getMonth()+1) <= 9) {
		retval += "0"+(obj.getMonth()+1)+"-";
	} else {
		retval += (obj.getMonth()+1)+"-";
	}
	if (obj.getDate() <= 9) {
		retval += "0"+(obj.getDate())+"-";
	} else {
		retval += (obj.getDate())+"-";
	}
	retval += (obj.getFullYear())+" ";
	if (obj.getHours() <= 9) {
		retval += "0"+(obj.getHours())+":";
	} else {
		retval += (obj.getHours())+":";
	}
	if (obj.getMinutes() <= 9) {
		retval += "0"+(obj.getMinutes())+":";
	} else {
		retval += (obj.getMinutes())+":";
	}
	if (obj.getSeconds() <= 9) {
		retval += "0"+(obj.getSeconds());
	} else {
		retval += (obj.getSeconds());
	}
	return retval;
}

function logout() {
	$('#login-button-nav').css('display','inline-block');
	$('#logout-button-nav').css('display','none');
	$('#last-visited').css('visibility', 'hidden');
}