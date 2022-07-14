

// Слушатель по клику на поле input по параметру "#url > input:nth-child(3)" и заполняющая и окрывающая информационные
// теги span -ы и обеспечивающая запуск запроса POST с результирующим json и исходя из типа парсинга запустить вывод
// логов на консоль
$("#url > input:nth-child(3)").on('click',function (e) {
    e.preventDefault();
    console.log(response_json);
    console.log(JSON.stringify(response_json));
    $("#txtid").text("");
    let li = $("nav > ul > li:nth-child(2)");
    let spanStatus = $("nav > ul > li:nth-child(2) > span:nth-child(1)");
    let spanTimeFirst = $("nav > ul > li:nth-child(2) > span:nth-child(2)");
    let spanTimeSecond = $("nav > ul > li:nth-child(2) > span:nth-child(3)");
    li.css('display','block');
    spanStatus.show();
    spanTimeFirst.show();
    spanTimeSecond.show();
    spanStatus.html("Start PARSER");
    spanTimeFirst.html("00");
    spanTimeSecond.html("00");
    callPostResultJson(response_json);

});


// Функция запускающая вывод логов на консоль при выбранном типе парсинга по времени и запускающая отсчет времени
// согласно сделанного выбора
function span_timer() {
    let spanTimeFirst = $("nav > ul > li:nth-child(2) > span:nth-child(2)");
    let spanTimeSecond = $("nav > ul > li:nth-child(2) > span:nth-child(3)");
    let minutes = 0;
    let seconds = 1;
    let count = 0;
    console.log(response_json.parameters[0].parse_type[0].time);
    let interval = setInterval(function () {
        if (seconds > 59) {
            minutes++;
            seconds = 0;
            spanTimeFirst.text((minutes < 10 ? "0" : "") + minutes);
        }
        spanTimeSecond.text((seconds < 10 ? "0" : "") + seconds);
        seconds++;
        count++;
        if (stop_parser) {
            stop_parser = false;
            response_json.parameters[0].parse_type[0].time = 0;
            console.log("stop_parser = " + stop_parser + ", set_timeout = " + response_json.parameters[0].parse_type[0].time);
            clearInterval(interval);
        } else {
            console.log("stop_parser = " + stop_parser + ", set_timeout = " + response_json.parameters[0].parse_type[0].time);
            callPostLog();
        }
    }, 1000);
    setTimeout(function () {
        console.log("clearInterval : " + response_json.parameters[0].parse_type[0].time);
        clearInterval(interval);
    }, response_json.parameters[0].parse_type[0].time*60*1000 + 1000);
}

// Функция запускающая вывод логов на консоль при выбранном типе парсинга по количеству проходов парсинга по странице
// и запускающая отсчет колличества этих проходов согласно сделанного выбора
function span_count(){
    let spanTimeFirst = $("nav > ul > li:nth-child(2) > span:nth-child(2)");
    let spanTimeSecond = $("nav > ul > li:nth-child(2) > span:nth-child(3)");
    spanTimeFirst.hide();
    let count = 1;
    console.log(response_json.parameters[0].parse_type[0].count);
    let interval = setInterval(function () {
        spanTimeSecond.text(count);
        if(stop_parser){
            stop_parser = false;
            response_json.parameters[0].parse_type[0].count = 0;
            console.log("stop_parser = " + stop_parser + ", set_count = " + response_json.parameters[0].parse_type[0].count);
            clearInterval(interval);
        }else{
            console.log("stop_parser = " + stop_parser + ", set_count = " + response_json.parameters[0].parse_type[0].count);
            callPostLog();
        }
        count++;
    }, 1000);
    setTimeout(function () {
        console.log("clearInterval : " + response_json.parameters[0].parse_type[0].count);
        clearInterval(interval)
    },response_json.parameters[0].parse_type[0].count*1000);
}


// Функция запуска запроса POST с результирующим json и обработка приходящего от сервера ответа
function callPostResultJson(response_json) {
    let spanStatus = $("nav > ul > li:nth-child(2) > span:nth-child(1)");
    let status = "";
    let error = "";
    console.log("ddos_ep : " + ddos_ep);
    $.ajax({
        url: ddos_ep,
        type: "POST",
        data: JSON.stringify(response_json),
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        async: false,

        success: function (data) {
            console.log("post : " + JSON.stringify(data));
            status = spanStatus.text();
            id_tread_parse = data.process_id;
            spanStatus.text(status + " : server - " + data.status + " | id thread - " + data.process_id);
        },
        statusCode: {
            200: function() {
                console.log("HttpStatus code = 200 ")
                if (response_json.parameters[0].parse_type[0].type === "by_time")
                    span_timer();
                if (response_json.parameters[0].parse_type[0].type === "by_count")
                    span_count();
            }
        },
        error: function (xhr, exception) {
            let msg = "";
            if (xhr.status === 0) {
                status = xhr.status;
                error = xhr.error;
                msg = "Not connect.\n Verify Network." + xhr.responseText;
            } else if (xhr.status === 404) {
                status = xhr.status;
                error = xhr.error;
                msg = "Requested page not found. [404]" + xhr.responseText;
            } else if (xhr.status === 500) {
                status = xhr.status;
                error = xhr.error;
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
            } else if(exception === "parse fail"){
                status = exception + " code:" + xhr.status_code;
                msg = xhr.info;
            } else {
                status = xhr.status;
                error = xhr.error;
                msg = "Error:" + xhr.status + " " + xhr.responseText;
            }
            spanStatus.text(error + ":" + status);
            $("#txtid").text(msg);
            let autoscroll = $("#txtid");
            autoscroll.scrollTop(
                autoscroll[0].scrollHeight - autoscroll.height()
            );
        }
    });
}

function callPostLog() {
    let log = "";
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let data =  { "process_id" : id_tread_parse };
    console.log("log_ep : " + log_ep);
    $.ajax({
        url: log_ep,
        type: "POST",
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        async: false,

        success: function (data) {
            log = data.log.toString();
            stop_parser = data.stop;
            console.log("get : log - " + log + "; stop - " + stop_parser);
            if(log !== "") {
                let text = $("#txtid").text();
                console.log("LOG : " + year + "-" + ((month < 10 ? "0" : "") + month) + "-" +
                    ((day < 10 ? "0" : "") + day) + "-" + ((hour < 10 ? "0" : "") + hour) + "-" +
                    ((minutes < 10 ? "0" : "") + minutes) + "-" + ((seconds < 10 ? "0" : "") + seconds));
                text += "\nLOG : " + year + "-" + ((month < 10 ? "0" : "") + month) + "-" +
                    ((day < 10 ? "0" : "") + day) + "-" + ((hour < 10 ? "0" : "") + hour) + "-" +
                    ((minutes < 10 ? "0" : "") + minutes) + "-" + ((seconds < 10 ? "0" : "") + seconds) + "---" + log;
                console.log("text : " + text);
                $("#txtid").text(text);
                let autoscroll = $("#txtid");
                autoscroll.scrollTop(
                    autoscroll[0].scrollHeight - autoscroll.height()
                );
            }
        },
        error: function (xhr, exception) {
            let status = "";
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
                status = xhr.status;
                msg = "Error:" + xhr.status + " " + xhr.responseText;
            }
            log = msg;
            console.log(log + "/" + xhr.data);
            let text = "\nERROR : " + year + "-" + ((month < 10 ? "0" : "") + month) + "-" +
                ((day < 10 ? "0" : "") + day) + "-" + ((hour < 10 ? "0" : "") + hour) + "-" +
                ((minutes < 10 ? "0" : "") + minutes) + "-" + ((seconds < 10 ? "0" : "") + seconds) + "---" + log;
            $("#txtid").text(text);
            let autoscroll = $("#txtid");
            autoscroll.scrollTop(
                autoscroll[0].scrollHeight - autoscroll.height()
            );
            $("nav > ul > li:nth-child(2) > span:nth-child(1)").text(status);
        }
    });
}