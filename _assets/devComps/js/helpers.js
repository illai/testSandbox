
/* ==================================== Contain General Helper Methodt ==================================== */

var helpers = {
	// A cross browser function for adding event listeners to elements
	addEventHandler: function (elem, evt, fnHandler, captures){
		if (typeof(elem.attachEvent) != "undefined"){ // For IE Cases
			elem.attachEvent("on"+evt, fnHandler);
		}else{ // For other browsers
			elem.addEventListener(evt, fnHandler, captures);
		}
	}, // End addEventHandler();

	removeEventHandler: function (elem, evt, fnHandler, captures){
		if (typeof(elem.attachEvent) != "undefined"){ // For IE Cases
			elem.detachEvent("on"+evt, fnHandler);
		}else{ // For other browsers
			elem.removeEventListener(evt, fnHandler, captures);
		}
	}, // End removeEventHandler();

	// Formating seconds to player format time
	timeFormat: function (secs) {
		var seconds = Math.floor(secs);
		var minuts = Math.floor(secs / 60);
		var hours = Math.floor(minuts / 60);

		seconds = Math.floor(seconds % 60);
		minuts = Math.floor(minuts % 60);

		hours = (hours >= 10) ? hours : '0'+hours;
		minuts = (minuts >= 10) ? minuts : '0'+minuts;
		seconds = (seconds >= 10) ? seconds : '0'+seconds;

		return hours + ':' + minuts + ':' + seconds;
	}, // End timeFormat();

	timeReversFormat: function (clockTime) {
		var timeUnits = clockTime.split(":");
		var parseHours = (timeUnits[0] * 1) * 3600;
		var parseMinuts = (timeUnits[1] * 1) * 60;
		var parseSeconds = timeUnits[2] * 1;
		
		return (parseHours + parseMinuts + parseSeconds);
	}, // End timeFormat();
	
	// Handels Ajax requests
	postAjax: function (service, params, callback) {
		var request;
		if(window.XMLHttpRequest){
			request = new XMLHttpRequest();
		}else{
			request = ActiveXObject('Microsoft,XMLHTTP');
		}

		request.open('POST', service, true);
		request.setRequestHeader('Content-Type', 'application/json');

		request.onreadystatechange = function(){
			if((request.readyState === 4) && (request.status === 200)){
				callback(JSON.parse(request.response));
			}
		} // onreadystatechange

		request.send(JSON.stringify(params));
	}, // End postAjax();

	// Returnig readble date from unix time stamp: dd/mm/YYYY
	unixToDate: function (unixTime) {
		var date = new Date(unixTime * 1000);
		var dayOfMonth = date.getDate();
		var month = date.getMonth();
		var year = date.getFullYear();

		var fullDate = dayOfMonth + '/' + month + '/' + year;

		return fullDate;
	}, // End unixToDate();

	setTodysDate: function (){
		var d = new Date();

		var day = d.getDate();
		day = (day >= 10) ? day : '0'+day;

		var monthArr = new Array();
		monthArr[0]="January";
		monthArr[1]="February";
		monthArr[2]="March";
		monthArr[3]="April";
		monthArr[4]="May";
		monthArr[5]="June";
		monthArr[6]="July";
		monthArr[7]="August";
		monthArr[8]="September";
		monthArr[9]="October";
		monthArr[10]="November";
		monthArr[11]="December";
		var month = monthArr[d.getMonth()]; 

		var hour = d.getHours();
		hour = (hour >= 10) ? hour : '0'+hour;

		var minuts = d.getMinutes()
		minuts = (minuts >= 10) ? hour : '0'+minuts;

		timeZone = d.getTimezoneOffset();
		timeZone = (timeZone > 0) ? ' GMT-'+(timeZone/60) : ' GMT+'+(timeZone/60) * -1;

		return day + ', ' + month + ', ' + hour + ':' + minuts + timeZone;
	}, // End setDate();

	// Showing screener layer
	openScreener: function () {
		document.getElementById('screenerWrapper').setAttribute('class','visible');
	},

	closeLayer: function (layerType) {
		var popupLayer = document.getElementsByClassName('')
		document.getElementById('screenerWrapper').removeAttribute('class','visible');
		document.getElementById('popupLayer').removeAttribute('class', layerType);
		document.getElementById('layerContent').innerHTML = '';
	}, // End closeLayer();

	addRootAndVersion: function () {
		var imgElements = document.getElementsByTagName('img');
		for (var i = imgElements.length - 1; i >= 0; i--) {
			var origSrc = imgElements[i].getAttribute('src');
			imgElements[i].setAttribute('src', settings.root + origSrc + '?ver=' +settings.file_ver);
		};
	}, // Add Root Path And version to <img> src Attribiute

	clearSlash: function (path) {
		if(path.charAt(0) === '/'){
			path.substr(1);
		}
		return path;
	}

}