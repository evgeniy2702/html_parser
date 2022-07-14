//Показати Console logs

// Функция, открывающая модальное окно при клике на тэг <a> c id='btnConsole'
$("#btnConsole").click(function(e) {
    e.stopPropagation();
    $("#modalConsole").show();
});

// Функция, закрывающая модальное окно c id='#modalConsole' при клике на соответствующий <span> (x)
$(".close").eq(0).click(function() {
    $("nav > ul > li:nth-child(2)").css('display','none');
    $("#modalConsole").hide();
});

//Параметри парсингу

// Функция, открывающая модальное окно при клике на тэг <a> c id='btnParser'
$("#btnParser").click(function(e) {
    e.stopPropagation();
    let htmlSelect = "<select id='operation-mode'  class='my-1' name='parse_type' onchange='operation_mode()'></select>";
    let optionFirst = "<option selected value='empty' disabled >Зробіть вибір</option>";
    let optionSecond = "<option value='by_time' onclick='operation_mode()' >за часом парсингу сторінки</option>";
    let optionThird = "<option value='by_count' onclick = 'operation_mode()' >за кількістю проходів по сторінці</option>";
    let span = "<span id='label-operation-mode-span' class='ml-2' ></span>";
    $("label[for='operation-mode']").append(htmlSelect);
    $("#operation-mode").append(optionFirst);
    $("#operation-mode").append(optionSecond);
    $("#operation-mode").append(optionThird);
    $("#operation-mode").append(span);
    $("#modalParser").show();
});

// Функция, закрывающая модальное окно c id='#modalParser' при клике на соответствующий <span> (x)
$(".close").eq(1).click(function() {
    $("#operation-mode").remove();
    $("#modalParser").hide();
});

// Функция, открывающая модальное окно при клике на тэг <a> c id='btnJson'
$("#btnJson").click(function(e) {
    e.stopPropagation();
    $("#modalJson").show();
    parserJsonRequest(response_json);
});

// Функция, закрывающая модальное окно c id='#modalJson' при клике на соответствующий <span> (x)
$(".close").eq(2).click(function() {
    $("#operation-mode").remove();
    $("#modalJson").hide();
});

// Функция очистки от содержимого модального окна c id='#modalJson' при клике на соответствующий <span> (Очистити)
$(".close").eq(3).click(function () {

    response_json.parse_type = "";
    response_json.url_to_parse = "";
    response_json.multithread = true;
    response_json.threads_count = 5;
    response_json.parameters[0].parse_type = [];
    response_json.parameters[0].parse_timeout = "";
    response_json.parameters[0].parse_delta = "";
    response_json.parameters[0].elemets_to_get = [];
    response_json.parameters[0].regex = false;
    response_json.parameters[0].regex_parameters[0].search_by_elemets = false;
    response_json.parameters[0].regex_parameters[0].regex_elements = [];
    console.dir(response_json);

    parserJsonRequest(response_json);

    $("#input-url").val("");
    $("nav > ul > li:nth-child(2)").css('display','none');
    $("#timeout").val("");
    $("#average_timeout").val("");
    $("#all_page").prop('checked', false);

    $("#tag").prop('checked', false);
    $("#tag").prop('disabled', true);

    $("#class").prop('checked', false);
    $("#class").prop('disabled', true);

    $("#id").prop('checked', false);
    $("#id").prop('disabled', true);

    $("#regex").prop('checked', false);
    $("#regex").prop('disabled', true);

    $("#url > input:nth-child(3)").prop('disabled', true);
    $("#url > input:nth-child(4)").prop('disabled', true);
    $("#txtid").text("");
});

// Функция, открывающая модальное окно при клике на тэг <a> c id='btnUrl'
$("#btnUrl").click(function(e) {
    e.stopPropagation();
    $("#modalUrl").show();
});

// Функция, закрывающая модальное окно c id='#modalUrl' при клике на соответствующий <span> (x)
$(".close").eq(4).click(function() {
    $("#operation-mode").remove();
    $("#modalUrl").hide();
});