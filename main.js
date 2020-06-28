function GetConfig(){
	
	var config = JSON.parse(loadFile("config.json"));
	
	var fontColour = config.fontColour;
	var widgetColour = config.widgetColour;
	var backgroundImage = config.backgroundImage;
	var backgroundTint = config.backgroundTint;
	
	
	var root = document.documentElement;
	root.style.setProperty("--font", fontColour);
	root.style.setProperty("--bg", widgetColour);
	root.style.setProperty("background-image", backgroundImage);
	root.style.setProperty("background-color", backgroundTint);
	
}
