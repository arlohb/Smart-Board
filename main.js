function GetConfigParameters(parameters){
	var config = JSON.parse(loadFile("config.json"));
	var output = [];
	
	for (i=0; i<parameters.length; i++){
		output.push(config[parameters[i]]);
	}
	
	return output;
}

function GetConfig(){
	
	var [fontColour, widgetColour, backgroundImage, backgroundTint] = GetConfigParameters(["fontColour","widgetColour","backgroundImage","backgroundTint"]);
		
	
	var root = document.documentElement;
	root.style.setProperty("--font", fontColour);
	root.style.setProperty("--bg", widgetColour);
	root.style.setProperty("background-image", "url("+backgroundImage+")");
	root.style.setProperty("background-color", backgroundTint);
	
}
