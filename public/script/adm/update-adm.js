jQuery(document).ready(function () {
    $('#btnSend').click(function (event) {
        event.preventDefault()
        let lProgress = Ladda.create(this)
        validateDados(lProgress)
    })
})

function validateDados(lProgress) {
    $("#inpUsername").val().length < 10 ?
        $("#inpUsername").removeClass("is-valid").addClass("is-invalid") :
        $("#inpUsername").removeClass("is-invalid").addClass("is-valid")

    $("#inpUser").val().length < 8 ?
        $("#inpUser").removeClass("is-valid").addClass("is-invalid") :
        $("#inpUser").removeClass("is-invalid").addClass("is-valid")

    $("#inpPassword").val().length < 6 ?
        $("#inpPassword").removeClass("is-valid").addClass("is-invalid") :
        $("#inpPassword").removeClass("is-invalid").addClass("is-valid")

    if (!$("#inpUser").hasClass("is-invalid") &&
        !$("#inpPassword").hasClass("is-invalid")) {
        sendData(lProgress)
    }
}

function sendData(lProgress) {
    $.ajax({
        url: "/editar-administrador",
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
        let expiresDate = new Date($.cookie('zezinho-expires'))
        $.cookie('zezinho-username', callback.username, { expires: expiresDate, path: '/' })
        showToastr("success", callback.message)
        $('.form-update').trigger('reset')
    }).fail(function (callback) {
        callbackMsg = JSON.parse(callback.responseText)
        showToastr("error", callbackMsg.message)
    })
}

