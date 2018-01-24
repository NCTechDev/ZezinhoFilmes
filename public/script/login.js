jQuery(document).ready(function () {
    // Logged
    showNameLogged()
    $('#btnSend').click(function (event) {
        event.preventDefault()
        let lProgress = Ladda.create(this)
        validateDados(lProgress)
    })
})

function validateDados(lProgress) {
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
        url: "/login",
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
        let expiresDate = new Date()
        expiresDate.setTime(expiresDate.getTime() + 3600000)
        $.cookie('zezinho-username', callback.username, { expires: expiresDate })
        showToastr("success", callback.info)
        showNameLogged()
    }).fail(function (callback) {
        callbackMsg = JSON.parse(callback.responseText)
        showToastr("error", callbackMsg.info)
    })
}

function showNameLogged() {
    if ($.cookie('zezinho-username')) {
        $("#usernameLogged").html("Bem Vindo " + $.cookie('zezinho-username'))
        $("#yesLogged").show()
        $("#noLogged").hide()
    } else {
        $("#usernameLogged").html("Acesse sua conta")
        $("#yesLogged").hide()
    }
}
