//Initialize function

function printf(str) {
	var debug = 1;
	if (debug == 1) {
		console.log(str);
	}
}

var init = function() {
	// TODO:: Do your initialization job
	console.log("init() called");

	$("div#keyPad button.keyPad_btnNormal").click(function() {
		var btn = $(this).html();
		$(inputArea).val($(inputArea).val() + btn);
		// $(inputArea).focus();
		printf(btn);
	});

	$("div#keyPad button.keyPad_Clear").click(function() {
		var btn = $(this).html();
		$(inputArea).val('');
		// $(inputArea).focus();
		printf(btn);
	});

	$("div#keyPad button.keyPad_Percent").click(function() {
		var inputBox = $(inputArea);
		var retVal = inputBox.val();

		if (retVal.toString().indexOf("%") == -1) {
			retVal = parseFloat(retVal) * 100;
			printf(retVal + "%");
			inputBox.val(retVal + "%");
		} else {
			printf("Can't do percent.");
		}
		// $(inputArea).focus();
	});

	$("div#keyPad button.keyPad_Reverse").click(function() {
		var inputBox = $(inputArea);
		var retVal = inputBox.val();

		retVal = -parseFloat(retVal);
		printf(retVal);
		inputBox.val(retVal);
		// $(inputArea).focus();
	});

	$("button#keyPad_Calc").click(function() {
		var inputBox = $(inputArea);
		var arrVal;
		var x1;
		var x2;
		var retVal = "ERROR! CHECK INPUT";

		// VALIDATE INPUT USING SPLIT FUNCTION AND REGULAR EXPRESSION
		arrVal = inputBox.val().split(/[+-\/*]+/);
		if (arrVal.length > 2) {
			inputBox.val(retVal);
			return;
		}

		// parse to get 2 operands
		x1 = parseFloat(arrVal[0]);
		x2 = parseFloat(arrVal[1]);

		// "+"
		if (inputBox.val().indexOf('+') >= 0) {
			retVal = x1 + x2;
		}
		// "-"
		else if (inputBox.val().indexOf('-') >= 0) {
			retVal = x1 - x2;
		}
		// "*"
		else if (inputBox.val().indexOf('*') >= 0) {
			retVal = x1 * x2;
		}
		// "/"
		else if (inputBox.val().indexOf('/') >= 0) {
			retVal = x1 / x2;
		} else {
		}

		inputBox.val(retVal);
		// inputBox.focus();
	});
};

$(document).ready(init);

function copyText() {
	var tmp = document.getElementById("btn1").value;
	console.log(tmp);
	document.getElementById("result").value = tmp;
}
