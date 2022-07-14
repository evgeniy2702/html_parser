
// Функция , записывающая данные , внесенные в поле input с id="input-url", в соответствующую переменнную выходного json
// по нажатию клавиши
$("#input-url").keyup(function(){
    url = $("#input-url").val();
    response_json.url_to_parse = url;
    parserJsonRequest(response_json);
    console.log(response_json);
    if(url === "" || (url.length !== 0 && response_json.parameters[0].parse_type.length === 0)) {
        $("#url > input:nth-child(3)").prop('disabled', true);
        $("#url > input:nth-child(4)").prop('disabled', true);
    }else{
        $("#url > input:nth-child(3)").prop('disabled', false);
        $("#url > input:nth-child(4)").prop('disabled', false);
    }
});

// Функция , записывающая данные , внесенные в поле input с id="input-url", в соответствующую переменнную выходного json
// по нажатию клику
// $(document).click(function(){
//     url = $("#input-url").val();
//     response_json.url_to_parse = url;
//     parserJsonRequest(response_json);
//     console.log(response_json);
//     if(url === "") {
//         $("#url > input:nth-child(3)").prop('disabled', true);
//         $("#url > input:nth-child(4)").prop('disabled', true);
//     }else{
//         $("#url > input:nth-child(3)").prop('disabled', false);
//         $("#url > input:nth-child(4)").prop('disabled', false);
//     }
// });