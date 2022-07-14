let input_time = "Введіть кількість хвилин : ";
let input_count = "Введіть кількість проходів : ";
let inputValue = "";
let input_text = "";
let by_time = "";
let by_count = "";

// Функция клика по соответствующему полю option и открывающая модальное окно с возможностью указать время либо колличества проходов
// парсинга страницы
function operation_mode(){
    console.log("inputValue : " + $("#operation-mode").val() + " -----  url : " + url);
    $("#select").remove();
    inputValue = $("#operation-mode").val();
    $("#modal-operation-work").show();
    if(inputValue === "by_time"){
        let htmlTimeDiv = " <!-- Модальном окно --><div id='select' class='modal card-header text-center' ></div>";
        let htmlTimeDivDiv = "<!-- Модальное содержание --><div id='select-div' class='modal-content' ></div>";
        let htmlTimeDivSpan = "<span id='select-div-span' onclick='isClose()' class='close operation-mode-span' >&times;</span>" +
            "<label for='name' >" + input_time + "</br><input id='select-modal-input' name='time' type='number' placeholder='20' onkeyup='isChangeError()' /> хв </label>";
        let btnTime = "<input id='btn-time' class='btn btn-info btn-sm mb-2' value='Записати' onclick='isChangeTimeCount()' />";
        $("#modal-operation-work").append(htmlTimeDiv);
        $("#select").append(htmlTimeDivDiv);
        $("#select-div").append(htmlTimeDivSpan);
        $("#select-div").append(btnTime);
        $("#modal-operation-work").css('display', 'block');
    }
    if(inputValue === "by_count"){
        let htmlCountDiv = "<!-- Модальном окно --><div id='select' class='modal card-header text-center' ></div>";
        let htmlCountDivDiv = "<!-- Модальное содержание --><div id='select-div' class='modal-content'></div>";
        let htmlCountDivSpan = "<span id='select-div-span' onclick='isClose()' class='close operation-mode-span' >&times;</span>" +
            "<label for='name' th:for='name'>" + input_count + "</br><input id='select-modal-input' type='number' placeholder='20' onkeyup='isChangeError()' /> </label>"
        let btnCount = "<input id='btn-count' class='btn btn-info btn-sm mb-2' value='Записати' onclick='isChangeTimeCount()' />";
        $("#modal-operation-work").append(htmlCountDiv);
        $("#select").append(htmlCountDivDiv);
        $("#select-div").append(htmlCountDivSpan);
        $("#select-div").append(btnCount);
        $("#modal-operation-work").css('display', 'block');
    }
    if(inputValue === "space"){
        $("#label-operation-mode-span").text("");
    }
}

// Функция закрытия модального окна при клике на поле span с id='select-div-span'
function isClose() {
    $("#select").remove();
    $("#modal-operation-work").hide();
}

// Фунцкция, записывающая в соответствующее поле выходного json данные согласно выбора пользователя и выводящаяя соответст-
// вующие этому выбору обозначения
function isChangeTimeCount(){
    $("#modal-operation-work").hide();
    input_text = $("#select-modal-input").val();
    let str = "";
    if(inputValue === "by_time" && input_text >= 0 ){
        by_time = input_text;
        parse_type.length = 0;
        response_json.parameters[0].parse_type.length = parse_type;
        let json_time = {
            "type": "by_time",
            "time" : by_time};
        parse_type.push(json_time);
        response_json.parameters[0].parse_type = parse_type;
        str = " хв";
        if(response_json.url_to_parse === "") {
            $("#url > input:nth-child(3)").prop('disabled', true);
            $("#url > input:nth-child(4)").prop('disabled', true);
        }else{
            $("#url > input:nth-child(3)").prop('disabled', false);
            $("#url > input:nth-child(4)").prop('disabled', false);
        }
        console.log(parse_type);
    }
    if(inputValue === "by_count" && input_text >= 0){
        by_count = input_text;
        parse_type.length = 0;
        response_json.parameters[0].parse_type.length = parse_type;
        let json_count = {
            "type": "by_count",
            "count" : by_count};
        parse_type.push(json_count);
        response_json.parameters[0].parse_type = parse_type;
        str = " разів";
        if(response_json.url_to_parse === "") {
            $("#url > input:nth-child(3)").prop('disabled', true);
            $("#url > input:nth-child(4)").prop('disabled', true);
        }else{
            $("#url > input:nth-child(3)").prop('disabled', false);
            $("#url > input:nth-child(4)").prop('disabled', false);
        }
        console.log(parse_type);
    }
    $("#label-operation-mode-span").text(input_text + str);
    $("#modal-operation-work").hide();
    parserJsonRequest(response_json);
    console.dir(response_json);
}

// Функция ERROR, при вводе  отрицательного числа блокируется кнопка "Запись" и цифра подсвечивается красным цветом
function isChangeError() {
        let regex = /^\d*\.?\d+|\d+$/;
        input_text = $("#select-modal-input").val();
        console.log(input_text);
        console.log("#select-modal-input isChangeError() " + regex.test(input_text));
        if(input_text.indexOf(".") !== -1 || input_text.length === 0){
            return;
        }
        if (inputValue === "by_time") {
            switch(false){
                case regex.test(input_text):
                    $("#select-modal-input").css("color", "red");
                    $("#btn-time").prop("disabled", true);
                    $("#select-modal-input").val("");
                    break;
                default:
                    $("#select-modal-input").css("color", "black");
                    $("#btn-time").prop("disabled", false);
                    break;
            }
        }
        if (inputValue === "by_count") {
            switch(false){
                case regex.test(input_text):
                    $("#select-modal-input").css("color", "red");
                    $("#btn-count").prop("disabled", true);
                    $("#select-modal-input").val("");
                    break;
                default:
                    $("#select-modal-input").css("color", "black");
                    $("#btn-count").prop("disabled", false);
                    break;
            }    
        }
    }

// Функция ,обеспечивающая присвоение свойства 'selected' соотвестсвующему полю option , находящегося по "#operation-mode option:eq(1)"
$(window).ready(function(){
    $("#operation-mode option:eq(1)").prop('selected', true);
});