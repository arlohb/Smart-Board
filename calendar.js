//gets the property of an event from jcal
function GetProperty(object, name){
	for(x=0; x<object.jCal[1].length-1; x++){
		if(object.jCal[1][x][0]==name){
			return object.jCal[1][x][3];
		}
	}
}

//creates the calender event div element
function CreateCalendarDiv(e){
	return `
	<div class="calendar-event">
		<h2>`+e[0]+`</h2>
		<p>
			`+e[1]+`<br>
			
			<b>`+e[2].format("HH:mm")+`&nbsp-&nbsp`+e[3].format("HH:mm")+`</b></p>
	</div>`
}

//converts the ical time to a moment
function TimeToMoment(time){
	time = time.split('T')[0]+"-"+time.split('T')[1];
	m = moment(time, "YYYY-MM-DD-HH:mm:ss");
	return m;
}

//renders the calender
function RenderCalendar(data){
	//parses the date
	var calendar = ICAL.parse(data);
	
	//creates the component
	var comp = new ICAL.Component(calendar);
	
	//gets all the events
	var events = comp.getAllSubcomponents();
	
	//remove the timezone things at the start
	events.shift();
	events.shift();
	
	
	// ======================== GET THE LIST PROPERTIES ================
	
	//empty list of new events in the format:
	//	[title, desc, start, end]
	var Events = [];
	
	//for every event in the list
	for(i=0; i<events.length-1; i++){
		//get the event from the list
		var event = events[i];
		
		//get the title
		var title = GetProperty(event, "summary");
		//get the description, cutting out the join teams message
		var desc = GetProperty(event, "description").split("____")[0];
		
		//get the start and end, then convert both to moments
		var start = GetProperty(event, "dtstart");
		start = TimeToMoment(start);
		var end = GetProperty(event, "dtend");
		end = TimeToMoment(end);
		
		//add this to the list
		Events.push([title, desc, start, end]);
	}
	
	// =================== GROUP THE EVENTS INTO DAYS ==================
	
	//the index for the days, incremented every time
	var lastDateIndex = -1;
	//the last event date
	var lastDate = moment();
	//the final list for the grouped events
	var EventsGrouped = [];
	
	//for each event in the list
	for(i=0; i<Events.length-1; i++){
		
		//get the event
		var event = Events[i];
		//get the day without the time
		var day = moment(moment(event[2]).format("DDD"), "DDD");
		
		//if its the same as the last event
		if(day.isSame(lastDate)){
			//add this to the same day
			EventsGrouped[lastDateIndex].push(Events[i]);
		} else {
			//make this the last day
			lastDate = day;
			//add this to a new day in the list
			EventsGrouped.push([event[2], event]);
			//increment the day index
			lastDateIndex++;
		}
	}
	
	// ======================= DISPLAY THE EVENTS ======================
	
	//for each day in the grouped list
	for(day=0; day<EventsGrouped.length-1; day++){
				
		//get the events for that day
		var dayEvents = EventsGrouped[day];
		
		//check if its today or after
		if(dayEvents[0].isSameOrAfter(moment().startOf("day"))){
			//make div for the day
			var dayDiv = "<div id=CalenderDay"+day.toString()+" class='calendar-day-container'></div>"
			document.getElementById("Calendar").innerHTML += dayDiv + "<br>";
			
			//this will be all the events together
			var output = "";
			
			//add the title for the day
			output += "<h3>"+dayEvents[0].format("dddd Do MMMM")+"</h3>";
			
			//for each event of the day
			for(event=1; event<dayEvents.length; event++){
				
				//get the event
				var Event = dayEvents[event];
				
				//create the element and add it to the output
				var element = CreateCalendarDiv(Event);
				output += element;
				
				//if this is the last event of the day
				if(event==dayEvents.length-1){
					//add a new line
					output += "<br>";
				}
			}
			
			//apply the output to the day
			document.getElementById("CalenderDay"+day.toString()).innerHTML = output;
		}
		
		
	}
}


//downloads the calender
function GetCalendar(){
	fetch(loadFile("icsUrl.txt"))
		.then(response => {
			text=response.text();
			return text
			})
		.then(RenderCalendar);
}

