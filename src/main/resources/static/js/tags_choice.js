let class_prop = "Укажіть CLASS";
let id_prop = "Укажіть ID";
let attr_prop = "Pобота з атрибутами";
let tagName = "";

let attr_text = "Записати аттрибути у форматі [attr]";
let attrPrefix_text = "Записати аттрибути у форматі [^attrPrefix]";
let attr_val_text = "Записати аттрибути у форматі [attr=val]";
let attr_str_val_text = "Записати аттрибути у форматі [attr='val']";
let attr_valPrefix_text = "Записати аттрибути у форматі [attr^=valPrefix]";
let attr_valSuffx_text = "Записати аттрибути у форматі [attr$=valSuffix]";
let attr_valContaining_text = "Записати аттрибути у форматі [attr*=valContaining]";
let attr_regex_text = "Записати аттрибути у форматі [attr~=regex]";

// Функция клика по полю input с aттрибутом name='tag', открывающий модальное окно с возможностью выбора соответсвующего тега,
// по которому можно наполнить информацию с укзанием имени id, class, attr , относящегося к этому тэгу и по набору внесенных данных
// парсить страницу и выбрать элементы
$("input[name='tag']").click(function(event){
    console.dir(event.target.checked);
    if(event.target.checked === true){
        $("#modal-tag").html("");
        let htmlTagDiv = " <!-- Модальном окно --><div id='tag_check' class='modal card-header text-center'></div>";
        let htmlTagDivDiv = "<!-- Модальное содержание --><div id='tag_check_span' class='modal-content' ></div>";
        $("#modal-tag").append(htmlTagDiv);
        $("#tag_check").append(htmlTagDivDiv);

        // let htmlTagDivDivSpan = "<span onclick='isCloseTag()' class='close operation-mode-span' >&times;</span>" +
        //     "<label for='tag-name' >Оберіть назву tag :  </label><" +
        //     "/br><select id='tag-select' class='my-1' name='tag' onchange='optionTagSelect()' >" +
        //     "<option selected value='empty' disabled >Зробіть вибір</option>" +
        //     "</select>";

        let htmlTagDivDivSpan = "<span onclick='isCloseTag()' class='close operation-mode-span' >&times;</span>" +
                "<label for='tag-name' >Почніть вводити назву tag :  </label>" +
                "</br><input id='tag-select' class='my-1' name='tag-id-expression' type='search' " +
                " onclick='cleanInput()' onkeyup='inputTag()'/>";
        $("#tag_check_span").append(htmlTagDivDivSpan);

        // for(let i=0; i<tags.length; i++){
        //     let htmlTagDivDivSpanSelectOption =  "<option  value='"  + tags[i] + "' onclick='optionTagSelect()' >" + tags[i] + "</option>";
        //     $("#tag-select").append(htmlTagDivDivSpanSelectOption);
        // }
        $("#modal-tag").css('display', 'block');
    }
});

// Фукция закрытия модального окна id='tag_check' при клике на поле span class='close operation-mode-span'
function isCloseTag(){
    $("#tag_check").remove("div");
    $("#modal-tag").hide();
    $("#tag").prop("checked", false);
}

// Функция в которой при нажатии на клавишу ищется совпадения введеного текста с имеющимися данными,
// по которой выводится модальное окно с выбором. Добавить к выбранному тэгу возможность
// заполнения имени id или class, или доболнить аттрибутом, который относится к данному тэгу
function inputTag() {
    keyupInput(event);
}

// Функция выводит в теги Р все совпадающие с введеным значением в поле input id='tag-select'
// варианты тегов из существующих в таблице
function keyupInput(event){
    if (!event.shiftKey && !event.altKey && !event.ctrlKey) {
        let tag = $(event.target).val();
        let createTagsList =[];
        let tag_check_span = $("#tag_check_span");

        for (let i = 0; i < tags.length; i++) {

            if (tags[i].substring(0,tag.length).toLowerCase() === tag.toLowerCase()) {
                createTagsList.push(tags[i]);
            }
        }

        tag_check_span.append("<div id='tag_check_span_div' style='font-weight:initial;'></div>");

        let stringHTML = "";
        for (let elem of createTagsList) {
            if(elem !== "body")
                stringHTML += "<p id='" + elem + "' style='border: 1px solid black; border-top-color: black; " +
                    "border-right-color: black; border-bottom-color: black; border-left-color: black; " +
                    "border-color: gainsboro; width: 95%; margin: 0 2.5%; background-color: white; ' " +
                    " onmouseover='boldWordInInput(" + elem + ")' onmouseleave='deleteBoldWordInInput(" + elem + ")' " +
                    " onclick='inputWordFromMenu(" + elem + ")'>" + elem + "</p>";
            else
                stringHTML += "<p id='" + elem + "_id" + "' style='border: 1px solid black; border-top-color: black; " +
                    "border-right-color: black; border-bottom-color: black; border-left-color: black; " +
                    "border-color: gainsboro; width: 95%; margin: 0 2.5%; background-color: white; ' " +
                    " onmouseover='boldWordInInput(" +  elem + "_id" + ")' onmouseleave='deleteBoldWordInInput(" +  elem + "_id" + ")' " +
                    " onclick='inputWordFromMenu(" +  elem + "_id" + ")'>" + elem + "</p>";
        }

        // reg_detachWhenLengthPNull();
        if (stringHTML !== "") {


            let div =  $("#tag_check_span_div");
            div.html(stringHTML);
            div.attr("display", "initial");
            div.attr("text-align", "center");
            stringHTML = "";
        }
        if (event.target.value.length === 0) {
            detachWhenLengthPNull();
        }
        if(event.target.value.length === 1 && event.key === 'Backspace'){
            detachWhenLengthPNull();
        }
    }

}

//Ф-ция удаления содержимого поля input при клике
function cleanInput() {
    let input = $("#tag-select");
    input.click(function () {
        input.val('');
        detachWhenLengthPNull();
    });
}

//Ф-ция выделения содержимого тега Р, на котором наведен курсор мышки
function boldWordInInput(id){
    console.log("#" + id.id);
    let style = {fontWeight : "bold", backgroundColor:"grey",borderRadius :"0.5em"};
    $("#" + id.id).css( style);

}

//Ф-ция снятия выделения содержимого тега Р, с которого ушел курсор мышки
function deleteBoldWordInInput(id) {
    console.log("#" + id.id);
    let style = {fontWeight : "", backgroundColor:"white",borderRadius :"0em"};
    $("#" + id.id).css(style);
}

//Ф-ция ввода в поле поиска имя тега из раскрываюещгося меню ниже этого поля
function inputWordFromMenu(id){
    let input = $("#tag-select");
    console.log("val " + $("#" + id.id).html());
    input.val($("#" + id.id).html());
    detachWhenLengthPNull();
    optionTagSelect();
}

//Ф-ция удаления тегов Р из под input
function detachWhenLengthPNull() {
    let p= $("#tag_check_span_div > p").get();
    if(p.length !== 0) {
        console.dir(p);
        console.dir($("#" + p[0].id));
        for(let i = 0; i <= p.length-1; i++){
            p[i].remove();
        }
    }
    $("#tag_check_span_div").remove();
}

// Функция клика по полю option , по которой выводится модальное окно с выбором добавить к выбранному тэгу возможность
// заполнения имени id или class, или доболнить аттрибутом, который относится к данному тэгу
function optionTagSelect(){
            $("#modal-tag-constructor").html("");
            let htmlDiv = "<!-- Модальном окно --><div id='tag_constructor' class='modal card-header text-center'></div>";
            let htmlDivDiv = "<!-- Модальное содержание --><div id='tag_constructor_span' class='modal-content w-50' ></div>";
            let htmlDivDivSpan = "<span onclick='isCloseConstructor()' class='close operation-mode-span' >&times;</span>" +
                "<label for='tag-attr-name' >Оберіть назву attr до " + tagName + "-tag :  </label>" +
                "</br><select id='tag-attr-select' class='my-1' name='tag-attr' onchange='selectAttrClassId()'>" +
                "<option selected value='empty' disabled >Зробіть вибір або натисніть 'Записати'</option>" +
                "<option value='tag_attr' onclick='selectAttrClassId()'>" + attr_prop + "</option>" +
                "<option value='tag_class' onclick='selectAttrClassId()' >" + class_prop + "</option>" +
                "<option value='tag_id' onclick='selectAttrClassId()' >" + id_prop + "</option></select>";
            let htmlDivDivBtn = "<input id='btn-tag_constructor_span-input' class='btn btn-info btn-sm mb-2' value='Записати' " +
                "onclick='isChangeInputTag()' />";
            $("#modal-tag-constructor").append(htmlDiv);
            $("#tag_constructor").append(htmlDivDiv);
            $("#tag_constructor_span").append(htmlDivDivSpan);
            $("#tag_constructor_span").append(htmlDivDivBtn);
            $("#modal-tag-constructor").css('display', 'block');
            tagName = $("#tag-select").val();
            console.log(tagName);
}


// Фукция закрытия модального окна '#modal-tag-constructor' при клике на поле span class='close operation-mode-span'
function isCloseConstructor(){
    $("#tag_constructor").remove("div");
    $("#modal-tag-constructor").hide();
}


// Функция записи выбранного названия тэга в результирующий json
function isChangeInputTag(){
    $("#tag_constructor_span > span").remove();
    $("#btn-tag_constructor_span-input").remove();
    $("#tag_constructor_span").removeClass("h-25");
    $("#tag_constructor_span").removeClass('h-80');
    $("#modal-tag-constructor").css("display", "none")
    $("#url > input:nth-child(3)").prop('disabled', false);
    $("#url > input:nth-child(4)").prop('disabled', false);
    console.log(tagName);
    response_json.parameters[0].elemets_to_get.push(tagName);
    parserJsonRequest(response_json);
    console.dir(elemets_to_get);
}


// Функция , выводящая дополнительные поля input, если выбор сделан в пользу заполнения attr к выбранному тэгу
function selectAttrClassId(){
        console.log($("#tag-attr-select").val());
        let property_name = $("#tag-attr-select").val();
        if(property_name === "tag_class"){
            $("#tag_constructor_span").find("br").remove();
            $("#tag_constructor_span").find("input").remove();
            $("#tag_constructor_span").find("div").remove();
            $("#tag_constructor_span").removeClass('h-80')
            let htmlInputTextClass = "</br><input id='tag-class-input-name' class='my-1' name='tag-class-expression' type='text' />";
            let btnInputTextClass = "<input id='btn-tag-class-input' class='btn btn-info btn-sm mb-2' value='Записати' onclick='isChangeInputClass()' />";
            $("#tag_constructor_span").append(htmlInputTextClass);
            $("#tag_constructor_span").append(btnInputTextClass);
            $("#tag_constructor_span").addClass('h-25')
        }
        if(property_name === "tag_id"){
            $("#tag_constructor_span").find("br").remove();
            $("#tag_constructor_span").find("input").remove();
            $("#tag_constructor_span").find("div").remove();
            $("#tag_constructor_span").removeClass('h-80');
            let htmlInputTextId = "</br><input id='tag-id-input-name' class='my-1' name='tag-id-expression' type='text' />";
            let btnInputTextId = "<input id='btn-tag-id-input' class='btn btn-info btn-sm mb-2' value='Записати' onclick='isChangeInputId()' />";
            $("#tag_constructor_span").append(htmlInputTextId);
            $("#tag_constructor_span").append(btnInputTextId);
            $("#tag_constructor_span").addClass('h-25')
        }
        if(property_name === "tag_attr"){
            $("#tag_constructor_span").find("br").remove();
            $("#tag_constructor_span").find("input").remove();
            $("#tag_constructor_span").find("div").remove();
            $("#tag_constructor_span").removeClass('h-25');
            let div = "<div id='tag-attr-div' ></div>";

            let div_attr_label = "<div id='tag-attr-div-label' class='selectors-attr mx-4'></div>";
            let attr_label = "<label for='tag-attr-input-name' " +
                " title='елементи з атрибутом attr з будь-яким значенням (приклад [href], [title])'" +
                " th:title='елементи з атрибутом attr з будь-яким значенням (приклад [href], [title])'" +
                ">" + attr_text + "</label>";
            let attr = "</br><input id='tag-attr-input-name' class='my-1' name='tag-attr-expression'" +
                "th:name='tag-attr-expression' type='checkbox' onclick = 'clickInputAttr(1)' />";

            let div_attrPrefix_label = "<div id='tag-attrPrefix-div-label' class='selectors-attr mx-4' ></div>";
            let attrPrefix_label = "<label for='tag-attrPrefix-input-name' " +
                "title='елементи з назвою атрибута, що починається з attrPrefix (приклад [^data-]). Використовуйте для пошуку елементів із наборами даних HTML5'" +
                " th:title='елементи з назвою атрибута, що починається з attrPrefix (приклад [^data-]). Використовуйте для пошуку елементів із наборами даних HTML5'" +
                ">" + attrPrefix_text + "</label>";
            let attrPrefix ="</br><input id='tag-attrPrefix-input-name' class='my-1' " +
                " name='tag-attrPrefix-expression' type='checkbox' " +
                " onclick = 'clickInputAttr(2)' />";

            let div_attr_val_label = "<div id='tag-attr_val-div-label' class='selectors-attr mx-4'></div>";
            let attr_val_label = "<label for='tag-attr_val-input-name' " +
                "title='елементи з атрибутом attr і значенням, рівним val (приклад [width=500], [rel=nofollow])'" +
                " th:title='елементи з атрибутом attr і значенням, рівним val (приклад [width=500], [rel=nofollow])'" +
                ">" + attr_val_text + "</label>";
            let attr_val = "</br><input id='tag-attr_val-input-name' class='my-1' " +
                " name='tag-attr_val-expression' type='checkbox' " +
                " onclick = 'clickInputAttr(3)' />";

            let div_attr_str_val_label = "<div id='tag-attr_str_val-div-label' class='selectors-attr mx-4'></div>";
            let attr_str_val_label = "<label for='tag-attr_str_val-input-name' " +
                "title='елементи з атрибутом attr і значенням, рівним val (приклад [hello='Cleveland'], [goodbye='Columbus'])'>" +
                attr_str_val_text + "</label>";
            let attr_str_val = "</br><input id='tag-attr_str_val-input-name' class='my-1'" +
                " th:class='my-1' name='tag-attr_str_val-expression' type='checkbox' " +
                " onclick = 'clickInputAttr(4)' />";

            let div_attr_valPrefix_label = "<div id='tag-attr_valPrefix-div-label' class='selectors-attr mx-4'></div>";
            let attr_valPrefix_label = "<label for='tag-attr_valPrefix-input-name' " +
                "title='елементи з атрибутом attr і значенням, що починається з valPrefix (приклад [href^=http:])'" +
                "th:title='елементи з атрибутом attr і значенням, що починається з valPrefix (приклад [href^=http:])'" +
                ">" + attr_valPrefix_text + "</label>";
            let attr_valPrefix = "</br><input id='tag-attr_valPrefix-input-name' class='my-1'" +
                " th:class='my-1' name='tag-attr_valPrefix-expression' type='checkbox' " +
                " onclick = 'clickInputAttr(5)' />";

            let div_attr_valSuffx_label = "<div id='tag-attr_valSuffx-div-label' class='selectors-attr mx-4'></div>";
            let attr_valSuffx_label = "<label for='tag-attr_valSuffx-input-name' " +
                "title='елементи з атрибутом attr і значенням, що починається з valSuffix (приклад [src$=.png])'" +
                "th:title='елементи з атрибутом attr і значенням, що починається з valSuffix (приклад [src$=.png])'" +
                ">" + attr_valSuffx_text + "</label>";
            let attr_valSuffx = "</br><input id='tag-attr_valSuffx-input-name' class='my-1'" +
                " th:class='my-1' name='tag-attr_valSuffx-expression' type='checkbox'" +
                " onclick = 'clickInputAttr(6)' />";

            let div_attr_valContaining_label = "<div id='tag-attr_valContaining-div-label' class='selectors-attr mx-4'></div>";
            let attr_valContaining_label = "<label for='tag-attr_valContaining-input-name' " +
                "title='елементи з атрибутом attr і значенням, що містить valContaining (приклад [href*=/search/])'" +
                "th:title='елементи з атрибутом attr і значенням, що містить valContaining (приклад [href*=/search/])'" +
                ">" + attr_valContaining_text + "</label>";
            let attr_valContaining = "</br><input id='tag-attr_valContaining-input-name' class='my-1'" +
                " th:class='my-1' name='tag-attr_valContaining-expression'  type='checkbox'" +
                " th:type='checkbox' onclick = 'clickInputAttr(7)'  />";

            let div_attr_regex_label = "<div id='tag-attr_regex-div-label'  " +
                "class='selectors-attr mx-4' ></div>";
            let attr_regex_label = "<label for='tag-attr_regex-input-name' " +
                "title='елементи з атрибутом attr і значенням, що відповідає регулярному виразу (приклад [src~=(?i)\\.(png|jpe?g)])'" +
                "th:title='елементи з атрибутом attr і значенням, що відповідає регулярному виразу (приклад [src~=(?i)\\.(png|jpe?g)])'" +
                ">" + attr_regex_text + "</label>";
            let attr_regex = "</br><input id='tag-attr_regex-input-name'  class='my-1'" +
                " th:class='my-1' name='tag-attr_regex-expression' type='checkbox' " +
                " onclick = 'clickInputAttr(8)' />";
            $("#tag_constructor_span").append(div);

            $("#tag-attr-div").append(div_attr_label);
            $("#tag-attr-div-label").append(attr_label);
            $("#tag-attr-div-label").append(attr);

            $("#tag-attr-div").append(div_attrPrefix_label);
            $("#tag-attrPrefix-div-label").append(attrPrefix_label);
            $("#tag-attrPrefix-div-label").append(attrPrefix);

            $("#tag-attr-div").append(div_attr_val_label);
            $("#tag-attr_val-div-label").append(attr_val_label);
            $("#tag-attr_val-div-label").append(attr_val);

            $("#tag-attr-div").append(div_attr_str_val_label);
            $("#tag-attr_str_val-div-label").append(attr_str_val_label);
            $("#tag-attr_str_val-div-label").append(attr_str_val);

            $("#tag-attr-div").append(div_attr_valPrefix_label);
            $("#tag-attr_valPrefix-div-label").append(attr_valPrefix_label);
            $("#tag-attr_valPrefix-div-label").append(attr_valPrefix);

            $("#tag-attr-div").append(div_attr_valSuffx_label);
            $("#tag-attr_valSuffx-div-label").append(attr_valSuffx_label);
            $("#tag-attr_valSuffx-div-label").append(attr_valSuffx);

            $("#tag-attr-div").append(div_attr_valContaining_label);
            $("#tag-attr_valContaining-div-label").append(attr_valContaining_label);
            $("#tag-attr_valContaining-div-label").append(attr_valContaining);

            $("#tag-attr-div").append(div_attr_regex_label);
            $("#tag-attr_regex-div-label").append(attr_regex_label);
            $("#tag-attr_regex-div-label").append(attr_regex);

            $("#tag_constructor_span").addClass('h-80');
        }
};


// Функция записи данных в результирующий json при нажатии на поле input c id='btn-tag-id-input', если перед этим была выбрана
// опция дополнения выбранного тэга именем его class
function isChangeInputClass(){
    let json = {
        "tag" : tagName,
        "class" : "",
    };
    json.class = $("#tag-class-input-name").val();
    $("#tag-class-input-name").css('display', 'none');
    $("#btn-tag-class-input").css('display', 'none');
    $("#tag_constructor_span").removeClass("h-25");
    $("#tag_constructor_span").removeClass('h-80');
    $("#modal-tag-constructor").css("display", "none")
    response_json.parameters[0].elemets_to_get.push(json);
    parserJsonRequest(response_json);
    console.dir(response_json);
}

// Функция записи данных в результирующий json при нажатии на поле input c id='btn-tag-id-input', если перед этим была выбрана
// опция дополнения выбранного тэга именем его id
function isChangeInputId(){
    let json = {
        "tag" : tagName,
        "id" : "",
    };
    json.id = $("#tag-id-input-name").val();
    $("#tag-id-input-name").css('display', 'none');
    $("#btn-tag-id-input").css('display', 'none');
    $("#tag_constructor_span").removeClass("h-25");
    $("#tag_constructor_span").removeClass('h-80');
    $("#modal-tag-constructor").css("display", "none")
    response_json.parameters[0].elemets_to_get.push(json);
    parserJsonRequest(response_json);
    console.dir(response_json);
}

// Функция вывода модального окна для записи данных в результирующий json при нажатии на поле input c id='btn-tag-id-input', если перед этим была выбрана
// опция дополнения выбранного тэга именем его attr
function clickInputAttr(n){
    let str = $("#tag-attr-div > div:nth-child(" + n + ")").attr("id");
    if($("#tag-attr-div > div:nth-child(" + n + ") > input").prop("checked") === true){
        console.log(true);
        let div = $("#" + str);

        $("#tag-attr-div > div").remove();
        console.log(str);

        $("#tag-attr-div").append(div);
        let div_btn = "<div id='" + str + "-div' ></div>";
        let input_text = "<input id='" + str + "-text' class='my-1' name='"+ str + "-expression' type='text'/>";
        let btn = "<input id='" + str + "-btn' class='btn btn-info btn-sm mb-2'  value='Записати' onclick='isChangeInputAttr()' />";
        $("#tag-attr-div").append(div_btn);
        $("#" + str + "-div").addClass("selectors-attr mx-4");
        $("#" + str + "-div").append(input_text);
        $("#" + str + "-div").append(btn);
    }
}


// Функция записи данных в результирующий json при нажатии на поле input c id='btn-tag-id-input', если перед этим была выбрана
// опция дополнения выбранного тэга именем его attr
function isChangeInputAttr(){

    if($("#tag-attr-div > div > label").text() === attr_regex_text){
        let json = {
            "regex_tag" : tagName,
            "regex_value" : ""
        };
        json.regex_value = $("#tag-attr-div > div > input:nth-child(1)").val();
        search_by_elemets = true;
        regex = true;
        response_json.parameters[0].regex_parameters[0].regex_elements.push(json);
        parserJsonRequest(response_json);
        console.dir(regex_elements);
    } else {
        let json = {
            "tag" : tagName,
            "attr" : "",
        };
        json.attr = $("#tag-attr-div > div > input:nth-child(1)").val();
        response_json.parameters[0].elemets_to_get.push(json);
        parserJsonRequest(response_json);
        console.dir(elemets_to_get);
    }

    $("#tag-attr-div > div > input:nth-child(1)").remove();
    $("#tag-attr-div > div > input:nth-child(2)").remove();
    $("#tag_constructor_span").removeClass("h-25");
    $("#tag_constructor_span").removeClass('h-80');
    $("#modal-tag-constructor").css("display", "none")
    parserJsonRequest(response_json);
    console.dir(response_json);
}