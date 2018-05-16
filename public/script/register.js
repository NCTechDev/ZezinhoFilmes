jQuery(document).ready(function () {
	$('#btnRegister').click(function (event) {
		event.preventDefault()
		let lProgress = Ladda.create(this)
		validateDadosRegister(lProgress)
	})
})

function validateDadosRegister(lProgress) {
	$("#inpRegUsername").val().length < 10 ?
		$("#inpRegUsername").removeClass("is-valid").addClass("is-invalid") :
		$("#inpRegUsername").removeClass("is-invalid").addClass("is-valid")

	$("#inpRegUser").val().length < 8 ?
		$("#inpRegUser").removeClass("is-valid").addClass("is-invalid") :
		$("#inpRegUser").removeClass("is-invalid").addClass("is-valid")

	$("#inpRegPassword").val().length < 6 ?
		$("#inpRegPassword").removeClass("is-valid").addClass("is-invalid") :
		$("#inpRegPassword").removeClass("is-invalid").addClass("is-valid")

	if (!$("#inpRegUsername").hasClass("is-invalid") &&
		!$("#inpRegUser").hasClass("is-invalid") &&
		!$("#inpRegPassword").hasClass("is-invalid")) {
		sendDataRegister(lProgress)
	}
}

function sendDataRegister(lProgress) {
	$.ajax({
		url: "/register",
		type: "post",
		dataType: "json",
		async: true,
		data: $("form").serialize(),
		beforeSend: function () {
			lProgress.start()
		},
		complete: function () {
			lProgress.stop()
		}
	}).done(function (callback) {
		showToastr("success", callback.message)
	}).fail(function (callback) {
		callbackMsg = JSON.parse(callback.responseText)
		showToastr("error", callbackMsg.message)
	})
}
