
// Функция , заканчивающая процесс парсинга страницы по указанному url - адресу по требованию пользователя
// после нажатия кнопки "#url > input:nth-child(4)"
$("#url > input:nth-child(4)").on('click',function (e) {
    e.preventDefault();
    $("#input-url").val("");
    response_json.url_to_parse = "";
    parserJsonRequest(response_json);
    $("#timeout").val("");
    $("#average_timeout").val("");
    $("#all_page").prop('checked', false);
    $("#tag").prop('checked', false);
    $("#tag").prop('disabled', false);

    $("#class").prop('checked', false);
    $("#class").prop('disabled', false);

    $("#id").prop('checked', false);
    $("#id").prop('disabled', false);

    $("#regex").prop('checked', false);
    $("#regex").prop('disabled', false);

    $("#url > input:nth-child(3)").prop('disabled', true);
    $("#url > input:nth-child(4)").prop('disabled', true);

    callPostStopParser();
});

// Функция , отправляющая json с данными id потока , в котором происходил парсинг страницы
function callPostStopParser() {
    let spanStatus = $("nav > ul > li:nth-child(2) > span:nth-child(1)");
    let status = "";
    let data =  { "process_id" : id_tread_parse };
    console.log("stop_parse_ep : " + stop_parse_ep);
    $.ajax({
        url: stop_parse_ep,
        type: "POST",
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        async: false,

        success: function (data) {
            console.log("stop: " + JSON.stringify(data));
            spanStatus.text(data.status);
            stop_parser = data.stop;
            console.log("status: " + data.status + " ////////// stop - " + data.stop)
        },
        error: function (xhr, exception) {
            let msg = "";
            if (xhr.status === 0) {
                status = xhr.status;
                msg = "Not connect.\n Verify Network." + xhr.responseText;
            } else if (xhr.status === 404) {
                status = xhr.status;
                msg = "Requested page not found. [404]" + xhr.responseText;
            } else if (xhr.status === 500) {
                status = xhr.status;
                msg = "Internal Server Error [500]." + xhr.responseText;
            } else if (exception === "parsererror") {
                status = exception;
                msg = "Requested JSON parse failed.";
            } else if (exception === "timeout") {
                status = exception;
                msg = "Time out error." + xhr.responseText;
            } else if (exception === "abort") {
                status = exception;
                msg = "Ajax request aborted.";
            } else {
                status = xhr.responseText.status;
                msg = "Error:" + xhr.status + " " + xhr.responseText;
            }
            spanStatus.text(status);
            stop_parser = xhr.responseText.stop;
            console.log(status + " ----- stop : " + stop_parser + "----- msg : " + msg);
            let text = $("#txtid").text();
            text += "\n" + msg;
            $("#txtid").text(text);
            let autoscroll = $("#txtid");
            autoscroll.scrollTop(
                autoscroll[0].scrollHeight - autoscroll.height()
            );
        }
    });
}