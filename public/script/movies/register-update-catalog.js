jQuery(document).ready(function () {
    // Preview
    $('#fileCapa').change(function () {
        resetFieldsPreview()
        // Reset
        const file = $("#fileCapa")[0].files[0],
            fileReader = new FileReader(),
            isSuccess = validateImage(file)
        if (isSuccess != null && isSuccess != -1) {
            fileReader.onprogress = function (progress) {
                let newProgresso = Math.round((progress.loaded * 100) / progress.total) + '%'
                $('.progress-bar').css('width', newProgresso).attr('aria-valuenow', newProgresso).text(newProgresso)
            }
            fileReader.onloadend = function () {
                $('#previewImg').attr('src', fileReader.result)
                $("#fileCapa").addClass("is-valid")
            }
            fileReader.readAsDataURL(file)
        } else {
            $("#fileCapa").addClass("is-invalid")
        }
    })
    $('#btnSend').click(function (event) {
        event.preventDefault()
        let formData = new FormData($('form')[0])
        let lProgress = Ladda.create(this)
        validateDados(lProgress, formData)
    })
})

function validateDados(lProgress, formData) {
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

    const isSuccess = validateImage($("#fileCapa")[0].files[0])
    if (isSuccess != null && isSuccess != -1)
        $("#fileCapa").removeClass("is-invalid").addClass("is-valid")
    else if ($("#previewImg").attr('src'))
        $("#fileCapa").removeClass("is-invalid").addClass("is-valid")
    else
        $("#fileCapa").removeClass("is-valid").addClass("is-invalid")

    $("#textSinopse").val().length == 0 ?
        $("#textSinopse").removeClass("is-valid").addClass("is-invalid") :
        $("#textSinopse").removeClass("is-invalid").addClass("is-valid")

    if (!$("#inpTitulo").hasClass("is-invalid") &&
        !$("#inpAno").hasClass("is-invalid") &&
        !$("#selTipo").hasClass("is-invalid") &&
        !$("input[name='inpCategoria']").hasClass("is-invalid") &&
        !$("#fileCapa").hasClass("is-invalid") &&
        !$("#textSinopse").hasClass("is-invalid")) {
        if ($("#inpOpcao").val() === "cadastrar")
            sendData(lProgress, formData)
        else
            updateData(lProgress, formData)
    }
}

function sendData(lProgress, formData) {
    $.ajax({
        url: "/cadastrar-catalogo",
        type: "post",
        dataType: "json",
        async: true,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function () {
            lProgress.start()
        },
        complete: function () {
            lProgress.stop()
        }
    }).done(function (callback) {
        showToastr("success", callback.message)
        $('.formSend').trigger('reset')
        resetFieldsPreview()
    }).fail(function (callback) {
        callbackMsg = JSON.parse(callback.responseText)
        showToastr("error", callbackMsg.message)
    })
}

function updateData(lProgress, formData) {
    $.ajax({
        url: "/editar-catalogo",
        type: "post",
        dataType: "json",
        async: true,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function () {
            lProgress.start()
        },
        complete: function () {
            lProgress.stop()
        }
    }).done(function (callback) {
        showToastr("success", callback.message)
        $('#inpLastImage').val(callback.lastBDImage)
        $('#fileCapa').val('')
    }).fail(function (callback) {
        callbackMsg = JSON.parse(callback.responseText)
        showToastr("error", callbackMsg.message)
    })
}

function resetFieldsPreview() {
    $('#previewImg').removeAttr('src')
    $('.progress-bar').css('width', '0%').attr('aria-valuenow', '0%').text('0%')
    $("#fileCapa").removeClass("is-valid").removeClass("is-invalid")
}

function validateImage(file) {
    if (file) {
        const fileTypes = ['png', 'jpg', 'jpeg'],
            extension = file.name.split('.').pop().toLowerCase()
        return fileTypes.indexOf(extension)
    } else return null
}
