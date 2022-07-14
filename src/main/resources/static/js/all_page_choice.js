// Функция по которой формируется json при выборе парсинга страницы всей подрят, при нажатии на соответствующий
// чекбокс блокируются все остальные возможные варинты и разблокируется кнопка парсинга с кнопкой остановки парсинга
$("#all_page").click(function(event){
    event.stopPropagation()
    let check = $("#all_page").prop('checked');
    if(check === true){
        // console.log(response_json.regex_parameters.length);
        $("#tag").prop('disabled', true);
        $("#class").prop('disabled', true);
        $("#id").prop('disabled', true);
        $("#regex").prop('disabled', true);
        $("#url > input:nth-child(3)").prop('disabled', false);
        $("#url > input:nth-child(4)").prop('disabled', false);
        response_json.parameters[0].elemets_to_get = [];
        response_json.parameters[0].elemets_to_get.push("*");
        response_json.parameters[0].regex = false;

        response_json.parameters[0].regex_parameters[0].search_by_elemets = false;
        response_json.parameters[0].regex_parameters[0].regex_elements = [];

        parserJsonRequest(response_json);
    }
    if(check === false){
        $("#tag").prop('disabled', false);
        $("#class").prop('disabled', false);
        $("#id").prop('disabled', false);
        $("#regex").prop('disabled', false);
        $("#url > input:nth-child(3)").prop('disabled', true);
        $("#url > input:nth-child(4)").prop('disabled', true);
        response_json.parameters[0].elemets_to_get = [];
        parserJsonRequest(response_json);
    }
});