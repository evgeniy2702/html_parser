let regex_name_choice = "Запишіть regex вираз :  ";
let regex_name_tag = "Оберіть назву tag :  ";
let regexTagName = "";
let regexTagValue = "";

// Функция клика по полю input с aттрибутом name='regex', открывающий модальное окно с возможностью написать regex выражение,
// по которому необходимо парсить страницу и выбрать элементы
$("input[name='regex']").click(function(event){
    event.stopPropagation();
    console.dir(event.target.checked);
    if(event.target.checked === true){
        $("#modal-regex").html("");
        let htmlClassDiv = " <!-- Модальном окно --><div id='regex_check' class='modal card-header text-center' ></div>";
        let htmlClassDivDiv = "<!-- Модальное содержание --><div id='regex_check_span' class='modal-content' ></div>";
        let htmlClassDivDivSpan = "<span onclick='isCloseRegex()' class='close operation-mode-span' >&times;</span>";
        $("#modal-regex").append(htmlClassDiv);
        $("#regex_check").append(htmlClassDivDiv);
        $("#regex_check_span").append(htmlClassDivDivSpan);

        // let htmlClassDivDivSelect = "<label for='regex-select-name' >" + regex_name_tag + "</label>" +
        //     "</br><select id='regex-select-name' class='my-1' name='regex-tag-name' >" +
        //     "<option selected value='empty' disabled >Зробіть вибір</option>" +
        //     "</select>";

        // for(let i=0; i< tags.length; i++){
        //     let htmlClassDivDivSelectOption = "<option value='div' >" + tags[i] + "</option>";
        //     $("#regex-select-name").append(htmlClassDivDivSelectOption);
        // }

        let htmlClassDivDivSelect = "<label for='regex-select-name' >" + regex_name_tag + "</label>" +
            "</br><input id='regex-input-name' class='my-1' name='tag-id-expression' type='search' " +
            " onclick='cleanInputRegex()' onkeyup='inputTagRegex()'/>";

        $("#regex_check_span").append(htmlClassDivDivSelect);

        let htmlClassDivDivText = "<label for='regex-input-value' >" + regex_name_choice + "</label></br><input id='regex-input-value' " +
            "class='my-1' name='regex-expression 'type='text' />";
        $("#regex_check_span").append(htmlClassDivDivText);

        let btnRegex = "<input id='btn-regex-check' class='btn btn-info btn-sm mb-2' value='Записати' onclick='isChangeRegex()' />";
        $("#regex_check_span").append(btnRegex);
        $("#modal-regex").css('display', 'block');
    }
});

// Фукция закрытия модального окна при клике на поле span class='close operation-mode-span'
function isCloseRegex(){
    $("#regex_check").remove("div");
    $("#modal-regex").hide();
    $("#regex").prop("checked", false);
}

// Функция в которой при нажатии на клавишу ищется совпадения введеного текста с имеющимися данными,
// по которой выводится модальное окно с выбором. Добавить к выбранному тэгу возможность
// заполнения имени id или class, или доболнить аттрибутом, который относится к данному тэгу
function inputTagRegex() {
    keyupInputRegex(event);
}

// Функция выводит в теги Р все совпадающие с введеным значением в поле input id='tag-select'
// варианты тегов из существующих в таблице
function keyupInputRegex(event){
    if (!event.shiftKey && !event.altKey && !event.ctrlKey) {
        let tag = $(event.target).val();
        let createTagsList =[];
        let tag_check_span = $("#regex_check_span");

        for (let i = 0; i < tags.length; i++) {

            if (tags[i].substring(0,tag.length).toLowerCase() === tag.toLowerCase()) {
                createTagsList.push(tags[i]);
            }
        }

        tag_check_span.append("<div id='regex_check_span_div' style='font-weight:initial;'></div>");

        let stringHTML = "";
        for (let elem of createTagsList) {
            if(elem !== "body")
                stringHTML += "<p id='" + elem + "' style='border: 1px solid black; border-top-color: black; " +
                    "border-right-color: black; border-bottom-color: black; border-left-color: black; " +
                    "border-color: gainsboro; width: 95%; margin: 0 2.5%; background-color: white; ' " +
                    " onmouseover='boldWordInInputRegex(" + elem + ")' onmouseleave='deleteBoldWordInInputRegex(" + elem + ")' " +
                    " onclick='inputWordFromMenuRegex(" + elem + ")'>" + elem + "</p>";
            else
                stringHTML += "<p id='" + elem + "_id" + "' style='border: 1px solid black; border-top-color: black; " +
                    "border-right-color: black; border-bottom-color: black; border-left-color: black; " +
                    "border-color: gainsboro; width: 95%; margin: 0 2.5%; background-color: white; ' " +
                    " onmouseover='boldWordInInputRegex(" +  elem + "_id" + ")' onmouseleave='deleteBoldWordInInputRegex(" +  elem + "_id" + ")' " +
                    " onclick='inputWordFromMenuRegex(" +  elem + "_id" + ")'>" + elem + "</p>";
        }

        // reg_detachWhenLengthPNull();
        if (stringHTML !== "") {


            let div =  $("#regex_check_span_div");
            div.html(stringHTML);
            div.attr("display", "initial");
            div.attr("text-align", "center");
            stringHTML = "";
        }
        if (event.target.value.length === 0) {
            detachWhenLengthPRegexDivNull();
        }
        if(event.target.value.length === 1 && event.key === 'Backspace'){
            detachWhenLengthPRegexDivNull();
        }
    }

}
//Ф-ция удаления содержимого поля input при клике
function cleanInputRegex() {
    let input = $("#regex-input-name");
    input.click(function () {
        input.val('');
        detachWhenLengthPRegexDivNull();
    });
}

//Ф-ция выделения содержимого тега Р, на котором наведен курсор мышки
function boldWordInInputRegex(id){
    console.log("#" + id.id);
    let style = {fontWeight : "bold", backgroundColor:"grey",borderRadius :"0.5em"};
    $("#" + id.id).css( style);

}

//Ф-ция снятия выделения содержимого тега Р, с которого ушел курсор мышки
function deleteBoldWordInInputRegex(id) {
    console.log("#" + id.id);
    let style = {fontWeight : "", backgroundColor:"white",borderRadius :"0em"};
    $("#" + id.id).css(style);
}

//Ф-ция ввода в поле поиска имя тега из раскрываюещгося меню ниже этого поля
function inputWordFromMenuRegex(id){
    let input = $("#regex-input-name");
    console.log("val " + $("#" + id.id).html());
    input.val($("#" + id.id).html());
    detachWhenLengthPRegexDivNull();
}

//Ф-ция удаления тегов Р из под input
function detachWhenLengthPRegexDivNull() {
    let p= $("#regex_check_span_div > p").get();
    if(p.length !== 0) {
        console.dir(p);
        console.dir($("#" + p[0].id));
        for(let i = 0; i <= p.length-1; i++){
            p[i].remove();
        }
    }
    $("#regex_check_span_div").remove();
}

// Функция , работающая по изменениям , внесенным в поле input id='btn-regex-check' и записывающая
// внесенные изменения в соответствующую переменнную выходного json
function isChangeRegex(){
    regexTagName = $("#regex-input-name").val();
    regexTagValue = $("#regex-input-value").val();
    $("#modal-regex").hide();
    $("#regex").prop("checked", false);
    $("#url > input:nth-child(3)").prop('disabled', false);
    $("#url > input:nth-child(4)").prop('disabled', false);
    let json = {"regex_tag": regexTagName,"regex_value": regexTagValue
    };
    response_json.parameters[0].regex_parameters[0].regex_elements.push(json);
    response_json.parameters[0].regex = true;
    response_json.parameters[0].regex_parameters[0].search_by_elemets = true;
    parserJsonRequest(response_json);
    console.dir(response_json);
}