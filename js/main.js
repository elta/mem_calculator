//Initialize function
var last_calculated = 0;

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
		if (last_calculated == 1) {
			last_calculated = 0;
			$(inputArea).val(btn);
		} else {
			$(inputArea).val($(inputArea).val() + btn);
		}
		// $(inputArea).focus();
		printf(btn);
	});

	$("div#keyPad button.keyPad_Operation").click(function() {
		var btn = $(this).html();
		last_calculated = 0;
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

		if (retVal == "") {
			return;
		}

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

		if (retVal == "") {
			return;
		}

		retVal = -parseFloat(retVal);
		printf(retVal);
		inputBox.val(retVal);
		// $(inputArea).focus();
	});

	$("button#keyPad_Calc").click(
			function() {
				var inputBox = $(inputArea);
				var retVal = "ERROR! CHECK INPUT";
				var operators = [ '+', '-', 'x', '¡Â' ];
				var equation = inputBox.val();
				var lastChar = equation[equation.length - 1];
				equation = equation.replace(/x/g, '*').replace(/¡Â/g, '/')
						.replace(/%/g, '/100');
				if (operators.indexOf(lastChar) > -1 || lastChar == '.')
					equation = equation.replace(/.$/, '');

				if (equation) {
					inputBox.val(eval(equation));
					last_calculated = 1;
					return;
				}

				inputBox.val(retValue);

				// inputBox.focus();
			});
};

$(document).ready(init);

function copyText() {
	var tmp = document.getElementById("btn1").value;
	console.log(tmp);
	document.getElementById("result").value = tmp;
}
