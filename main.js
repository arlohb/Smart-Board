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

function MakeGridItemCSS(minX, maxX, minY, maxY){
	return `grid-column-start: `+ (minY+1).toString() +`;
			grid-column-end: `+ (maxY+2).toString() +`;
			grid-row-start: `+ (minX+1).toString() +`;
			grid-row-end: `+ (maxX+2).toString() +`;
			background-color: var(--bg);`
}

function BuildUI(){
	
	var itemsContained = [];
	
	// get the layout
	var [layout] = GetConfigParameters(["modules"]);
	
	// in the format [minX, maxX, minY, maxY]
	var elements = [[10,0,10,0],[10,0,10,0],[10,0,10,0],[10,0,10,0],[10,0,10,0],[10,0,10,0],[10,0,10,0],[10,0,10,0],[10,0,10,0]];
	
	// for each item in the layout
	var i = 0;
	for (x=0; x<3; x++){
		for (y=0; y<3; y++){
			// the index of the module
			var item = layout[i];
			
			if(itemsContained.includes(item) != true){
				itemsContained.push(item);
			}
			
			// check for minX
			if (x < elements[item][0]){
				elements[item][0] = x;
			}
			// check for maxX
			if (x > elements[item][1]){
				elements[item][1] = x;
			}
			// check for minY
			if (y < elements[item][2]){
				elements[item][2] = y;
			}
			// check for maxY
			if (y > elements[item][3]){
				elements[item][3] = y;
			}
			
			i++;
		}
	}
	
	var modules = GetConfigParameters(["0","1","2","3","4","5","6","7","8","9"]);
	
	document.getElementById("Main").innerHTML = "";
	
	for (i=0; i<itemsContained.length; i++){
		var item = elements[i];
		var css = MakeGridItemCSS(item[0],item[1],item[2],item[3]);
		var html = "";
		
		switch(modules[i]){
			case "Clock":
				html = `<div style="`+css+`">
							<h1>Clock</h1>
							<p class="widget-text" id="ClockText"></p>
						</dev>`
				break;
			case "SerialTemperature":
				html = `<div style="`+css+`">
							<h1>Temperature</h1>
							<p class="widget-text" id="temperature"></p>
						</div>`;
				break;
			case "Calendar":
				html = `<div style="`+css+`overflow-x: hidden; overflow-y: scroll;" id="Calendar">
							<h1>Calendar</h1>
						</div>`;
				break;
			case "MinuteCast":
				html = `<div style="`+css+`" id="MinuteCast">
							
						</div>`;
				break;
			default:
				html = `<div style="`+css+`">
						`+modules[i]+`
					</div>`;
		}
		
		
		
		document.getElementById("Main").innerHTML += html;
	
	}
}
