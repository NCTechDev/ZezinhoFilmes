jQuery(document).ready(function () {
    returnData()
})

function returnData() {
    $.ajax({
        url: "/retornar-catalogo",
        type: "get",
        dataType: "json",
        async: true
    }).done(function (callback) {
        createTable(callback.message, callback.catalog)
    }).fail(function (callback) {
        callbackMsg = JSON.parse(callback.responseText)
        showToastr("error", callbackMsg.message)
    })
}

function createTable(message, catalog) {
    $("#tbCatalogos tr").remove()
    if (catalog) {
        for (let i = 0; i < catalog.length; i++) {
            let idcatalog = { id: catalog[i]._id }, newTrItem = ""
            newTrItem += "<tr><td>" + catalog[i].title + "</td>"
            newTrItem += "<td>" + moment(catalog[i].createdAt).format('DD/MM/YYYY HH:mm:ss') + "</td>"
            newTrItem += "<td>" + moment(catalog[i].updatedAt).format('DD/MM/YYYY HH:mm:ss') + "</td>"
            newTrItem += "<td><a class='btn btn-primary btn-sm mr-1 mb-1' href='/editar-catalogo?id=" + catalog[i]._id + "' role='button'>Editar</a>" +
                "<button type='button' class='btn btn-danger btn-sm mb-1' onclick='deleteCatalog(" + JSON.stringify(idcatalog) + ")'>Excluir</button></td></tr>"
            $("#tbCatalogos").append(newTrItem)
        }
    } else {
        newTrItem = $("<tr><td colspan='4' class='text-center'>" + message + "</td></tr>")
        $("#tbCatalogos").append(newTrItem)
    }
}

function deleteCatalog(idcatalog) {
    bootbox.confirm({
        title: "Excluir",
        message: "Deseja realmente excluir o catálogo?",
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
                    url: "/excluir-catalogo",
                    type: "post",
                    dataType: "json",
                    async: true,
                    data: idcatalog
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
