//updates the clock
function UpdateClock(){
	var today = moment();
	
	document.getElementById("ClockText").innerHTML = today.format("HH:mm:ss")+"<br>"+today.format("ddd Do MMM");
	setTimeout(UpdateClock, 1000);
}

