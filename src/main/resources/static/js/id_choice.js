let id_name_choice = "Оберіть назву ID :  ";
let idName = "";


// Функция клика по полю input с aттрибутом name='id', открывающий модальное окно с возможностью написать имя id, по которому
// необходимо парсить страницу и выбрать элементы с таким id
$("input[name='id']").click(function(event){
    event.stopPropagation();
    console.dir(event.target.checked);
    if(event.target.checked === true){
        $("#modal-id").html("");
        let htmlClassDiv = " <!-- Модальном окно --><div id='id_check' class='modal card-header text-center' ></div>";
        let htmlClassDivDiv = "<!-- Модальное содержание --><div id='id_check_span' class='modal-content' ></div>";
        let htmlClassDivDivSpan = "<span onclick='isCloseId()' class='close operation-mode-span' >&times;</span><label for='id-name' th:for='id-name'>" + id_name_choice + "</label></br><input id='id-input' th:id='id-input' class='my-1' th:class='my-1' name='id-check' th:name='id-check' type='text' th:type='text' />";
        let btnId = "<input id='btn-id-check' class='btn btn-info btn-sm mb-2' value='Записати' onclick='isChangeId()' />"
        $("#modal-id").append(htmlClassDiv);
        $("#id_check").append(htmlClassDivDiv);
        $("#id_check_span").append(htmlClassDivDivSpan);
        $("#id_check_span").append(btnId);
        $("#modal-id").css('display', 'block');
    }
});

// Фукция закрытия модального окна при клике на поле span class='close operation-mode-span'
function isCloseId(){
    $("#id_check").remove("div");
    $("#modal-id").hide();
    $("#id").prop("checked", false);
}

// Функция , работающая по изменениям , внесенным в поле input id='btn-id-check' и записывающая
// внесенные изменения в соответствующую переменнную выходного json
function isChangeId(){
    idName = $("#id-input").val();
    $("#modal-id").hide();
    $("#id").prop("checked", false);
    $("#url > input:nth-child(3)").prop('disabled', false);
    $("#url > input:nth-child(4)").prop('disabled', false);
    response_json.parameters[0].elemets_to_get.push("#" + idName);
    parserJsonRequest(response_json);
    console.dir(response_json);
}