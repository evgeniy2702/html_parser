
// Функция, обспечивающая стартовые значения при открытии страницы или ее перезагрузке
$(window).ready(function(){
    $("#input-url").val("");
    $("nav > ul > li:nth-child(2)").css('display','none');
    $("#timeout").val("");
    $("#average_timeout").val("");
    // При раскомментировании необходимо изменить prop('disabled', true) на false и в файл ul_li_click.js  функция $(".close").eq(3).click(function ()
    // $("#all_page").prop('checked', false);
    // $("#tag").prop('checked', false);
    // $("#class").prop('checked', false);
    // $("#id").prop('checked', false);
    // $("#regex").prop('checked', false);
    $("#all_page").prop('disabled', true);
    $("#tag").prop('disabled', true);
    $("#class").prop('disabled', true);
    $("#id").prop('disabled', true);
    $("#regex").prop('disabled', true);
    $("#url > input:nth-child(3)").prop('disabled', true);
    $("#url > input:nth-child(4)").prop('disabled', true);
});

// Функция закрывающая модальные окна с id= "#modalConsole"; "#modalJson"; "#modalParser" клике мимо соответствующего окна
$(document).click(function(e){
    // console.log($(e.target));
    // console.log(!$(e.target).is('input'));
    if($("#modalConsole").css("display") == "block"){
        if(!$(e.target).is("span") && !$(e.target).is("#modalParser") && !$(e.target).is("#modalParser > div")
            && !$(e.target).is("select") && !$(e.target).is("option") && !$(e.target).is('input')
            && !$(e.target).is("label") && !$(e.target).is("p")){
            $("#modalConsole").hide();
        }
    }
    if($("#modalJson").css("display") == "block") {
        if(!$(e.target).is("span") && !$(e.target).is("#modalParser") && !$(e.target).is("#modalParser > div")
            && !$(e.target).is("select") && !$(e.target).is("option") && !$(e.target).is('input')
            && !$(e.target).is("label") && !$(e.target).is("textarea")
            && !$(e.target).is("p")){
            $("#modalJson").hide();
        }
    }
    if($("#modalParser").css("display") == "block") {
        if(!$(e.target).is("span") && !$(e.target).is("#modalParser") && !$(e.target).is("#modalParser > div")
            && !$(e.target).is("select") && !$(e.target).is("option") && !$(e.target).is('input')
            && !$(e.target).is("label") && !$(e.target).is("#id_check") && !$(e.target).is("#tag_constructor")
            && !$(e.target).is("#class_check") && !$(e.target).is("#regex_check") && !$(e.target).is("#tag_check")
            && !$(e.target).is("#modal-tag") && !$(e.target).is("p")){
        $("#modalParser").hide();
        $("#operation-mode").remove();
        }
    }
    if($("#modalUrl").css("display") == "block"){
        if(!$(e.target).is("span") && !$(e.target).is("#modalParser") && !$(e.target).is("#modalParser > div")
            && !$(e.target).is("select") && !$(e.target).is("option") && !$(e.target).is('input')
            && !$(e.target).is("label") && !$(e.target).is("p")){
            $("#modalUrl").hide();
        }
    }
});


// Функция, выводящая результирующий json в поле textarea модального окна с id = "#txtJson" по мере заполнения данных
function parserJsonRequest(response_json){
    $("#txtJson").text("{" +
        "\n\t\"parse_type\":\"simple\"," +
        "\n\t\"url_to_parse\" : \"" + response_json.url_to_parse + "\"," +
        "\n\t\"multithread\" : \"" + response_json.multithread + "\"," +
        "\n\t\"threads_count\" : \"" + response_json.threads_count + "\"," +
        "\n\t\"parameters\":[{" +
        "\n\t\t\"parse_type\" : [" + arrayWork(response_json.parameters[0].parse_type) + "]," +
        "\n\t\t\"parse_timeout\": " + response_json.parameters[0].parse_timeout + "," +
        "\n\t\t\"parse_delta\" : " + response_json.parameters[0].parse_delta + "," +
        "\n\t\t\"elemets_to_get\" : [" + arrayWork(response_json.parameters[0].elemets_to_get) + "]," +
        "\n\t\t\"regex\" : " + response_json.parameters[0].regex + "," +
        "\n\t\t\"regex_parameters\" : [{ " +
        "\n\t\t\t\"search_by_elemets\" : " + response_json.parameters[0].regex_parameters[0].search_by_elemets + "," +
        "\n\t\t\t\"regex_elements\" : [" + arrayWork(response_json.parameters[0].regex_parameters[0].regex_elements) + "]" +
        "\n\t\t\t}]" +
        "\n\t\t}]" +
        "\n}")

    console.log(response_json);
}

// Функция , записывающая массив данных, заполненного пользователем согласно его предпочтений, в результирующий  json
function arrayWork(arr){
    let str = "";
    for(let i = 0; i < arr.length; i++){
        if(isValidJSONString(arr[i])){
            let string = JSON.stringify(arr[i]);
            str += string + ", ";
        }
        else{
            str += arr[i] + ", ";
            if(str.length >= 17)
                str = str.substring(0, str.length - 17);
        }
    }
    return str;
}

function isValidJSONString(str) {
    try {
        let s = JSON.stringify(str)
        JSON.parse(s);
    } catch (e) {
        return false;
    }
    return true;
}