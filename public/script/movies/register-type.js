jQuery(document).ready(function () {
    $('#btnSend').click(function (event) {
        event.preventDefault()
        let lProgress = Ladda.create(this)
        validateDados(lProgress)
    })
})

function validateDados(lProgress) {
    $("#inpTipo").val().length == 0 ?
        $("#inpTipo").removeClass("is-valid").addClass("is-invalid") :
        $("#inpTipo").removeClass("is-invalid").addClass("is-valid")

    if (!$("#inpTipo").hasClass("is-invalid")) {
        sendData(lProgress)
    }
}

function sendData(lProgress) {
    $.ajax({
        url: "/cadastrar-tipos",
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
        $('.formSend').trigger('reset')
    }).fail(function (callback) {
        callbackMsg = JSON.parse(callback.responseText)
        showToastr("error", callbackMsg.message)
    })
}
