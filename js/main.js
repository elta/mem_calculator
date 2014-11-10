//Initialize function
var last_calculated = 0;

var INPUT_NONE = -1;
var INPUT_NUMBER = 0;
var INPUT_OPERATION = 1;
var last_input = INPUT_NONE;

var save_number = 0;
var save_operation = '';

function reset_values() {
	last_input = INPUT_NONE;

	save_number = 0;
	save_operation = '';
}

function printf(str) {
	var debug = 1;
	if (debug == 1) {
		console.log(str);
	}
	;
}

var init = function() {
	console.log("init() called");

	$("div#keyPad button.keyPad_btnNormal").click(function() {
		var btn = $(this).html();

		if (last_calculated == 1) {
			reset_values();

			last_calculated = 0;
			$(inputArea).val(btn);
		} else if (last_input == INPUT_OPERATION) {
			last_calculated = 0;
			$(inputArea).val(btn);
		} else {
			$(inputArea).val($(inputArea).val() + btn);
		}
		// $(inputArea).focus();
		printf(btn);

		last_input = INPUT_NUMBER;
	});

	$("div#keyPad button.keyPad_Operation").click(
			function() {
				var btn = $(this).html();

				if (last_calculated == 1) {
					last_calculated = 0;
					save_number = $(inputArea).val();
				}

				if (last_input == INPUT_OPERATION) {
					save_operation = btn;
					return;
				}

				if (last_input == INPUT_NUMBER) {
					if (save_operation != '') {
						var equation = '(' + save_number + ')' + save_operation
								+ '(' + $(inputArea).val() + ')';
						equation = equation.replace(/x/g, '*').replace(/¡Â/g,
								'/').replace(/%/g, '/100');
						save_number = eval(equation).toString();
						$(inputArea).val(save_number);
					} else {
						save_number = $(inputArea).val();
					}
				}

				save_operation = btn;
				// $(inputArea).val($(inputArea).val() + btn);
				// $(inputArea).focus();
				printf(btn);

				last_input = INPUT_OPERATION;
			});

	$("div#keyPad button.keyPad_Clear").click(function() {
		var btn = $(this).html();
		$(inputArea).val('');
		// $(inputArea).focus();
		reset_values();
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
				var equation;

				if (last_calculated == 1) {
					equation = '(' + $(inputArea).val() + ')' + save_operation
							+ '(' + save_number + ')';
				} else {
					equation = '(' + save_number + ')' + save_operation + '('
							+ $(inputArea).val() + ')';
					save_number = $(inputArea).val();
				}

				equation = equation.replace(/x/g, '*').replace(/¡Â/g, '/')
						.replace(/%/g, '/100');
				$(inputArea).val(eval(equation).toString());

				last_calculated = 1;
				last_input = INPUT_OPERATION;
			});
};

$(document).ready(init);

function copyText() {
	var tmp = document.getElementById("btn1").value;
	console.log(tmp);
	document.getElementById("result").value = tmp;
}
