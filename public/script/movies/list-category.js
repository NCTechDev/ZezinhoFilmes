jQuery(document).ready(function () {
    returnData()
})

function returnData() {
    $.ajax({
        url: "/retornar-categorias",
        type: "get",
        dataType: "json",
        async: true
    }).done(function (callback) {
        createTable(callback.message, callback.category)
    }).fail(function (callback) {
        callbackMsg = JSON.parse(callback.responseText)
        showToastr("error", callbackMsg.message)
    })
}

function createTable(message, category) {
    $("#tbCategories tr").remove()
    if (category) {
        for (let i = 0; i < category.length; i++) {
            let idCategory = { id: category[i]._id }
            newTrItem = $("<tr>" +
                "<td>" + category[i].name + "</td>" +
                "<td>" + moment(category[i].createdAt).format('DD/MM/YYYY HH:mm:ss') + "</td>" +
                "<td>" + moment(category[i].updatedAt).format('DD/MM/YYYY HH:mm:ss') + "</td>" +
                "<td><button type='button' class='btn btn-primary btn-sm mr-1' onclick='updateCategory(" + JSON.stringify(idCategory) + ")'>Editar</button>" +
                "<button type='button' class='btn btn-danger btn-sm' onclick='deleteCategory(" + JSON.stringify(idCategory) + ")'>Excluir</button></td>" +
                "</tr>")
            $("#tbCategories").append(newTrItem)
        }
    } else {
        newTrItem = $("<tr><td colspan='4' class='text-center'>" + message + "</td></tr>")
        $("#tbCategories").append(newTrItem)
    }
}

function deleteCategory(idCategory) {
    bootbox.confirm({
        title: "Excluir",
        message: "Deseja realmente excluir a categoria?",
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
                    url: "/excluir-categorias",
                    type: "post",
                    dataType: "json",
                    async: true,
                    data: idCategory
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

function updateCategory(idCategory) {
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
                id: idCategory.id,
                name: result
            }
            if (result) {
                $.ajax({
                    url: "/editar-categorias",
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
