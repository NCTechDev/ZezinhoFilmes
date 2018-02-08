jQuery(document).ready(function () {
    $('#btnSend').click(function (event) {
        event.preventDefault()
        let lProgress = Ladda.create(this)
        validateDados(lProgress)
    })
})

function validateDados(lProgress) {
    $("#inpCategoria").val().length == 0 ?
        $("#inpCategoria").removeClass("is-valid").addClass("is-invalid") :
        $("#inpCategoria").removeClass("is-invalid").addClass("is-valid")

    if (!$("#inpCategoria").hasClass("is-invalid")) {
        sendData(lProgress)
    }
}

function sendData(lProgress) {
    $.ajax({
        url: "/cadastrar-categorias",
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
