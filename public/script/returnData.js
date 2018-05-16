jQuery(document).ready(function () {
    returnCatalog(1)
})

function returnCatalog(page) {
    $.ajax({
        url: "/catalog?page=" + page,
        type: "get",
        dataType: "json",
        async: true
    }).done(function (callback) {
        $(".catalogos-recentes").html('')
        $(".pagination").html('')
        // Reset
        createCatalog(callback.message, callback.catalog)
        createPaginate(parseInt(callback.countPages), parseInt(callback.currentPage))
    }).fail(function (callback) {
        callbackMsg = JSON.parse(callback.responseText)
        showToastr("error", callbackMsg.message)
    })
}

function createCatalog(message, catalog) {
    if (catalog) {
        for (let i = 0; i < catalog.length; i++) {
            let catalogCategories = ""
            for (let j = 0; j < catalog[i].category.length; j++) {
                catalogCategories += catalog[i].category[j].name
                if (j < (catalog[i].category.length - 1)) catalogCategories += ", "
            }
            $(".catalogos-recentes").append(`
                <div class="col-lg-4 col-md-6">
                    <div class="card">
                        <img class="img-fluid card-img-top" src="img/${catalog[i].image}" alt="capa">
                        <div class="card-body">
                            <div class="alert alert-light text-center" role="alert">
                                <h2 class="card-title">${catalog[i].title}</h2>
                                <hr>
                                <h4>${catalog[i].year}</h4>
                                <hr>
                                <p class="font-weight-bold">${catalog[i].type.name}</p>
                                <p class="font-weight-light">${catalogCategories}</p>
                                <hr>
                            </div>
                            <button class="btn btn-secondary btn-block" type="button" data-toggle="collapse" data-target="#${i}" aria-expanded="false" aria-controls="${i}">SINOPSE</button>
                            <div class="collapse" id="${i}">
                                <div class="card card-body">
                                    <p>${catalog[i].sinopse}</p>
                                </div>
                            </div>
                            <p class="card-text text-center">
                                <small class="text-muted">Data de adição: ${moment(catalog[i].createdAt).format('DD/MM/YYYY HH:mm:ss')}</small>
                            </p>
                        </div>
                    </div>
                </div>
            `)
        }
    } else $(".catalogos-recentes").append(`<div class="col-md-12 text-center">${message}</div>`)
}

function createPaginate(countPages, currentPage) {
    let limit = 2
    if (countPages > 0) {
        // Primeiros links
        appendPagination(1, "Primeira")
        for (let i = (currentPage - limit); i <= (currentPage - 1); i++)
            if (i >= 1) appendPagination(i, i)

        for (let j = currentPage + 1; j <= currentPage + limit; j++)
            if (j <= countPages) appendPagination(j, j)
        // Últimos links
        appendPagination(countPages, "Última")
    }
}

function appendPagination(page, message) {
    $(".pagination").append(`
        <li class="page-item">
            <button type="button" class="page-link" onclick="returnCatalog(${page})">${message}</button>
        </li>
    `)
}