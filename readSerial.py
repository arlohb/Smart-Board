import serial

serialPort = serial.Serial("/dev/ttyACM0", 9600, timeout=1)

outFile = "/var/www/html/temperature.txt"

while True:
	dataread = serialPort.read(100)
	
	datadecoded = dataread.decode()
	datadecoded = datadecoded.split("\n")
	datadecoded = datadecoded[len(datadecoded)-2]
	datastripped = datadecoded.rstrip()
	
	if(len(datastripped.split(','))==2):
		
		output = datastripped
		
		outputFile = open(outFile, "w")
		outputFile.write(output+"\n")
		outputFile.close()
		print(output)
