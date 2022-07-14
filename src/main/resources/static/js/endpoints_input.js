// Функция , записывающая данные , внесенные в поле input с id="ddos_ep", в соответствующую переменнную ddos_ep и определяющая
// эндпоинт вызова в функции callPost в parse_post_method.js
$("#ddos_ep").keyup(function(){
    ddos_ep = $("#ddos_ep").val();
    if(url === "" || (url.length !== 0 && ddos_ep.length === 0)) {
        $("#url > input:nth-child(3)").prop('disabled', true);
        $("#url > input:nth-child(4)").prop('disabled', true);
    }else{
        $("#url > input:nth-child(3)").prop('disabled', false);
        $("#url > input:nth-child(4)").prop('disabled', false);
    }
});

// Функция , записывающая данные , внесенные в поле input с id="page_info_ep", в соответствующую переменнную page_info_ep
// и определяющая эндпоинт вызова , которій пока что нигде не задействован
$("#page_info_ep").keyup(function(){
    page_info_ep = $("#page_info_ep").val();
    if(url === "" || (url.length !== 0 && page_info_ep.length === 0)) {
        $("#url > input:nth-child(3)").prop('disabled', true);
        $("#url > input:nth-child(4)").prop('disabled', true);
    }else{
        $("#url > input:nth-child(3)").prop('disabled', false);
        $("#url > input:nth-child(4)").prop('disabled', false);
    }
});

// Функция , записывающая данные , внесенные в поле input с id="log_ep", в соответствующую переменнную log_ep
// и определяющая эндпоинт вызова в функции callGet в parse_post_method.js
$("#log_ep").keyup(function(){
    log_ep = $("#log_ep").val();
    if(url === "" || (url.length !== 0 && log_ep.length === 0)) {
        $("#url > input:nth-child(3)").prop('disabled', true);
        $("#url > input:nth-child(4)").prop('disabled', true);
    }else{
        $("#url > input:nth-child(3)").prop('disabled', false);
        $("#url > input:nth-child(4)").prop('disabled', false);
    }
});

// Функция , записывающая данные , внесенные в поле input с id="stop_parse_ep", в соответствующую переменнную stop_parse_ep
// и определяющая эндпоинт вызова в функции callPostStopParser в stop_parser.js
$("#stop_parse_ep").keyup(function(){
    stop_parse_ep = $("#stop_parse_ep").val();
    if(url === "" || (url.length !== 0 && stop_parse_ep.length === 0)) {
        $("#url > input:nth-child(3)").prop('disabled', true);
        $("#url > input:nth-child(4)").prop('disabled', true);
    }else{
        $("#url > input:nth-child(3)").prop('disabled', false);
        $("#url > input:nth-child(4)").prop('disabled', false);
    }
});