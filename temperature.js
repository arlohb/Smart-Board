
function loadFile(filePath) {
	var result = null;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", filePath, false);
	xmlhttp.send()
	if (xmlhttp.status==200){
		result = xmlhttp.responseText;
	}
	return result;
}

function loadTemperature(){
	data = loadFile("temperature.txt").split(",");
	output = data[0]+"&deg;C <br>"+data[1]+"%";
	
	
	document.getElementById("temperature").innerHTML = output;
	
	setTimeout(loadTemperature, 1000);
}

