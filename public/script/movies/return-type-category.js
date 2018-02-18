jQuery(document).ready(function () {
    returnDataType()
    returnDataCategory()
})

function returnDataType() {
    $.ajax({
        url: "/retornar-tipos",
        type: "get",
        dataType: "json",
        async: true
    }).done(function (callback) {
        createSelectType(callback.message, callback.type)
    }).fail(function (callback) {
        callbackMsg = JSON.parse(callback.responseText)
        showToastr("error", callbackMsg.message)
    })
}

function returnDataCategory() {
    $.ajax({
        url: "/retornar-categorias",
        type: "get",
        dataType: "json",
        async: true
    }).done(function (callback) {
        createRadioCategory(callback.message, callback.category)
    }).fail(function (callback) {
        callbackMsg = JSON.parse(callback.responseText)
        showToastr("error", callbackMsg.message)
    })
}

function createSelectType(message, type) {
    if (type) {
        for (let i = 0; i < type.length; i++)
            $("#selTipo").append('<option value="' + type[i]._id + '">' + type[i].name + '</option>')
    } else
        $("#selTipo").append('<option value="">' + message + '</option>')
}

function createRadioCategory(message, category) {
    if (category) {
        for (let i = 0; i < category.length; i++) {
            $("#containerCategoria").append('<div class="custom-control custom-checkbox custom-control-inline">' +
                '<input type="checkbox" name="inpCategoria" value="' + category[i]._id + '" id="' + category[i]._id + '" class="custom-control-input">' +
                '<label class="custom-control-label" for="' + category[i]._id + '">' + category[i].name + '</label></div>')
        }
    } else {
        $("#containerCategoria").append(message)
    }
}
