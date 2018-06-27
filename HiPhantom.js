var testindex = 0;
var loadInProgress = false;//This is set to true when a page is still loading
 
/*********SETTINGS*********************/
var webPage = require('webpage');
var page = webPage.create();
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36';
page.settings.javascriptEnabled = true;
page.settings.loadImages = false;//Script is much faster with this field set to false
phantom.cookiesEnabled = true;
phantom.javascriptEnabled = true;
/**********CLICK EVENT******************/
function mouseclick( e ) {
	console.log("click");
    // create a mouse click event
    var _event = document.createEvent( 'MouseEvents' );
    _event.initMouseEvent( 'click', true, true, window, 1, 0, 0 );
 
    // send click to element
    e.dispatchEvent( _event );
}
/*********SETTINGS END*****************/
 
console.log('All settings loaded, start with execution');
page.onConsoleMessage = function(msg) {
    console.log(msg);
};
/**********DEFINE STEPS THAT FANTOM SHOULD DO***********************/
steps = [
 
	//Step 1 - Open Amazon home page
    function(){
        console.log('Step 1 - Open Gmail home page');
        page.open("https://www.gmail.com", function(status){
			page.render('home.png');
		});
    },
	//Step 2 - Fill login field
	function(){
        console.log('Step 2 - Fill login field');
		page.evaluate(function(){
			
			document.getElementById("identifierId").value = "your e-mail address";
			console.log("click");
			var e = document.querySelector( 'content.CwaK9' );
			// create a mouse click event
			var _event = document.createEvent( 'MouseEvents' );
			_event.initMouseEvent( 'click', true, true, window, 1, 0, 0 );
 
			// send click to element
			e.dispatchEvent( _event );
		});
		page.render('login.png');
    },
	//Step 3 - Click next button
	function(){
		console.log("Step 3 - Skip back up address");
		document.getElementById("recoveryIdentifierId").value = "your phone number or another e-mail address";
		page.evaluate(function(){
			 console.log("Click button next and not fill back up field");
			 var e = document.querySelector( 'content.CwaK9' );
			// create a mouse click event
			var _event = document.createEvent( 'MouseEvents' );
			_event.initMouseEvent( 'click', true, true, window, 1, 0, 0 );
 
			// send click to element
			e.dispatchEvent( _event );
		
		});
		
		page.render('backupaddress.png');
	},	
	
];
/**********END STEPS THAT FANTOM SHOULD DO***********************/
 
//Execute steps one by one
interval = setInterval(executeRequestsStepByStep,5000);
 
function executeRequestsStepByStep(){
    if (loadInProgress == false && typeof steps[testindex] == "function") {
        //console.log("step " + (testindex + 1));
        steps[testindex]();
        testindex++;
    }
    if (typeof steps[testindex] != "function") {
        console.log("test complete!");
        phantom.exit();
    }
}
 
/**
 * These listeners are very important in order to phantom work properly. Using these listeners, we control loadInProgress marker which controls, weather a page is fully loaded.
 * Without this, we will get content of the page, even a page is not fully loaded.
 */
page.onLoadStarted = function() {
    loadInProgress = true;
    console.log('Loading started');
};
page.onLoadFinished = function() {
    loadInProgress = false;
    console.log('Loading finished');
};
page.onConsoleMessage = function(msg) {
    console.log(msg);
};