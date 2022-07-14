let class_name_choice = "Оберіть назву class :  ";
let className = "";
let modal_class = $("#modal-class");

// Функция клика по полю input с aттрибутом name='class', открывающий модальное окно с возможностью написать имя класса, по которому
// необходимо парсить страницу и выбрать элементы с таким классом
$("input[name='class']").click(function(event){
    console.dir(event.target.checked);
    event.stopPropagation();
    if(event.target.checked === true){
        modal_class.html("");
        let htmlClassDiv = " <!-- Модальном окно --><div id='class_check' class='modal card-header text-center'></div>";
        let htmlClassDivDiv = "<!-- Модальное содержание --><div id='class_check_span' class='modal-content' ></div>";
        let htmlClassDivDivSpan = "<span onclick='isCloseClass()' " +
                "class='close operation-mode-span' >&times;</span>" +
                "<label for='class-name' >" + class_name_choice + "</label>" +
                "</br><input id='class-input'  class='my-1' name='class-check'  type='text' >";
        let btnClass = "<input id='btn-class-check'  class='btn btn-info btn-sm mb-2' " +
                " value='Записати' onclick='isChangeClass()' />"
        modal_class.append(htmlClassDiv);
        $("#class_check").append(htmlClassDivDiv);
        let class_check_span = $("#class_check_span");
        class_check_span.append(htmlClassDivDivSpan);
        class_check_span.append(btnClass);
        modal_class.css('display', 'block');

    }
});

// Фукция закрытия модального окна при клике на поле span class='close operation-mode-span'
function isCloseClass(){
    $("#class_check").remove("div");
    $("#modal-class").hide();
    $("#class").prop("checked", false);
}

// Функция , работающая по изменениям , внесенным в поле input id='btn-class-check' и записывающая
// внесенные изменения в соответствующую переменнную выходного json
function isChangeClass(){
    className = $("#class-input").val();
    $("#modal-class").hide();
    $("#class").prop("checked", false);
    $("#url > input:nth-child(3)").prop('disabled', false);
    $("#url > input:nth-child(4)").prop('disabled', false);
    response_json.parameters[0].elemets_to_get.push("." + className);
    parserJsonRequest(response_json);
    console.dir(response_json);
}