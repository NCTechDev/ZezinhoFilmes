jQuery(document).ready(function () {
    returnData()
})

function returnData() {
    $.ajax({
        url: "/retornar-tipos",
        type: "get",
        dataType: "json",
        async: true
    }).done(function (callback) {
        createTable(callback.message, callback.type)
    }).fail(function (callback) {
        callbackMsg = JSON.parse(callback.responseText)
        showToastr("error", callbackMsg.message)
    })
}

function createTable(message, type) {
    $("#tbTypes tr").remove()
    if (type) {
        for (let i = 0; i < type.length; i++) {
            let idType = { id: type[i]._id }
            newTrItem = $("<tr>" +
                "<td>" + type[i].name + "</td>" +
                "<td>" + moment(type[i].createdAt).format('DD/MM/YYYY HH:mm:ss') + "</td>" +
                "<td>" + moment(type[i].updatedAt).format('DD/MM/YYYY HH:mm:ss') + "</td>" +
                "<td><button type='button' class='btn btn-primary btn-sm mr-1' onclick='updateType(" + JSON.stringify(idType) + ")'>Editar</button>" +
                "<button type='button' class='btn btn-danger btn-sm' onclick='deleteType(" + JSON.stringify(idType) + ")'>Excluir</button></td>" +
                "</tr>")
            $("#tbTypes").append(newTrItem)
        }
    } else {
        newTrItem = $("<tr><td colspan='4' class='text-center'>" + message + "</td></tr>")
        $("#tbTypes").append(newTrItem)
    }
}

function deleteType(idType) {
    bootbox.confirm({
        title: "Excluir",
        message: "Deseja realmente excluir o tipo?",
        buttons: {
            cancel: {
                label: 'Cancelar',
                className: 'btn-default'
            },
            confirm: {
                label: 'Excluir',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: "/excluir-tipos",
                    type: "post",
                    dataType: "json",
                    async: true,
                    data: idType
                }).done(function (callback) {
                    showToastr("success", callback.message)
                    returnData()
                }).fail(function (callback) {
                    callbackMsg = JSON.parse(callback.responseText)
                    showToastr("error", callbackMsg.message)
                })
            }
        }
    })
}

function updateType(idType) {
    bootbox.prompt({
        title: "Editar",
        buttons: {
            cancel: {
                label: 'Cancelar',
                className: 'btn-default'
            },
            confirm: {
                label: 'Atualizar',
                className: 'btn-success'
            }
        },
        callback: function (result) {
            let data = {
                id: idType.id,
                name: result
            }
            if (result) {
                $.ajax({
                    url: "/editar-tipos",
                    type: "post",
                    dataType: "json",
                    async: true,
                    data: data
                }).done(function (callback) {
                    showToastr("success", callback.message)
                    returnData()
                }).fail(function (callback) {
                    callbackMsg = JSON.parse(callback.responseText)
                    showToastr("error", callbackMsg.message)
                })
            }
        }
    })
}
