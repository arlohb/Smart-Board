function loadHTML(filePath) {
	var result = null;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", filePath, false);
	xmlhttp.send()
	if (xmlhttp.status==200){
		result = xmlhttp.response;
	}
	return result;
}

function loadCast(){
	//get the text
	var text = loadHTML("https://www.accuweather.com/en/gb/bredbury/sk6-2/minute-weather-forecast/324840");
	
	//get the images to load from the accuweather website not locally
	text = text.split('src="/images/').join('src="https://www.accuweather.com/images/');
	//remove the bst after the time
	text = text.split(" BST").join();
	//remove the updated at .. text
	text = text.split("Updated")[0];
	//remove the 30, 60, and 90 indicators
	text = text.split("30</p>").join("</p>");
	text = text.split("60</p>").join("</p>");
	text = text.split("90</p>").join("</p>");
	//remove the first message
	text = '<div class="minutecast-dial content-module non-ad"><div class="graphic-wrapper">' + text.split('<div class="graphic-wrapper">')[1];
	
	file = new DOMParser().parseFromString(text, "text/html");
	
	var cast = file.getElementsByClassName("minutecast-dial")[0];
	document.getElementById("MinuteCast").innerHTML = "<h1>Minute Cast</h1>" + cast.innerHTML;
	document.getElementById("MinuteCast").class = cast.class
	
	
	console.log("Updated");
	setTimeout(loadCast, 10000);
}
