jQuery(document).ready(function () {
    $('#btnSend').click(function (event) {
        event.preventDefault()
        let lProgress = Ladda.create(this)
        validateDados(lProgress)
    })
})

function validateDados(lProgress) {
    $("#inpTitulo").val().length == 0 ?
        $("#inpTitulo").removeClass("is-valid").addClass("is-invalid") :
        $("#inpTitulo").removeClass("is-invalid").addClass("is-valid")

    $("#inpAno").val().length == 0 ?
        $("#inpAno").removeClass("is-valid").addClass("is-invalid") :
        $("#inpAno").removeClass("is-invalid").addClass("is-valid")

    $("#selTipo").val().length == 0 ?
        $("#selTipo").removeClass("is-valid").addClass("is-invalid") :
        $("#selTipo").removeClass("is-invalid").addClass("is-valid")

    $("input[name='inpCategoria']").is(":checked") == 0 ?
        $("input[name='inpCategoria']").removeClass("is-valid").addClass("is-invalid") :
        $("input[name='inpCategoria']").removeClass("is-invalid").addClass("is-valid")

    $("#textSinopse").val().length == 0 ?
        $("#textSinopse").removeClass("is-valid").addClass("is-invalid") :
        $("#textSinopse").removeClass("is-invalid").addClass("is-valid")

    if (!$("#inpTitulo").hasClass("is-invalid") &&
        !$("#inpAno").hasClass("is-invalid") &&
        !$("#selTipo").hasClass("is-invalid") &&
        !$("input[name='inpCategoria']").hasClass("is-invalid") &&
        !$("#textSinopse").hasClass("is-invalid")) {
        if ($("#inpOpcao").val() === "cadastrar")
            sendData(lProgress)
        else
            updateData(lProgress)
    }
}

function sendData(lProgress) {
    $.ajax({
        url: "/cadastrar-catalogo",
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

function updateData(lProgress) {
    $.ajax({
        url: "/editar-catalogo",
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
