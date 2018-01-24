function showToastr(type, message) {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "8000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    switch (type) {
        case "success":
            toastr.success(message)
            break
        case "info":
            toastr.info(message)
            break
        case "warning":
            toastr.warning(message)
            break
        case "error":
            toastr.error(message)
            break
        default:
            toastr.error("Errou o type do toastr !")
            break
    }
}
