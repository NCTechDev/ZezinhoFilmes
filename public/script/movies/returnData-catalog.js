jQuery(document).ready(function () {
    let url = window.location.href
    $.ajax({
        url: "/retornar-editar-catalogo?" + url.slice(url.indexOf('?') + 1),
        type: "get",
        dataType: "json",
        async: true
    }).done(function (callback) {
        populateCatalog(callback.message, callback.catalog)
    })
})

function populateCatalog(message, catalog) {
    if (catalog) {
        $("#inpId").val(catalog._id)
        $("#inpCreatedAt").val(moment(catalog.createdAt).format('DD/MM/YYYY HH:mm:ss'))
        $("#inpUpdatedAt").val(moment(catalog.updatedAt).format('DD/MM/YYYY HH:mm:ss'))
        $("#inpTitulo").val(catalog.title)
        $("#inpAno").val(catalog.year)
        $("#selTipo").val(catalog.type._id)
        $("#textSinopse").val(catalog.sinopse)
        for (let i = 0; i < catalog.category.length; i++)
            $("#" + catalog.category[i]._id).prop('checked', true)
    } else
        showToastr("error", message)
}
