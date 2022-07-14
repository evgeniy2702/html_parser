
// Функция записи в переменную результирующего json при внесении имзенений в соответствующем поле input c id="timeout"
$("#timeout").change(function(event){
    let value = event.target.value;
    if(value >= 0){
        response_json.parameters[0].parse_timeout = value;
        parserJsonRequest(response_json);
        console.log(response_json);
    }else{
        $("#timeout").val("");
    }
});

// Функция записи в переменную результирующего json при внесении имзенений в соответствующем поле input c id="average_timeout"
$("#average_timeout").change(function(event){
    let value = event.target.value;
    if(value >= 0){
        response_json.parameters[0].parse_delta = value;
        parserJsonRequest(response_json);
        console.log(response_json);
    }else{
        $("#average_timeout").val("");
    }
});

// Функция записи в переменную результирующего json при внесении имзенений в соответствующем поле input c id="threads_count"
$("#threads_count").change(function(event){
    let value = event.target.value;
    if(value >= 0 && value <= 2000){
        $("#label-threads_count-span").text("");
        response_json.threads_count = value;
        parserJsonRequest(response_json);
        console.log(response_json);
    }else if(value > 2000){
        $("#threads_count").val("");
        $("#label-threads_count-span").text("Кількість потоків не можу бути більше 2000");
        $("#label-threads_count-span").css("color", "red");
        response_json.threads_count = 1;
        parserJsonRequest(response_json);
        console.log(response_json);
    } else {
        $("#threads_count").val("");
    }
});

// Функция ERROR, при вводе  отрицательного числа в поле input c id = #timeout цифра подсвечивается красным цветом
function isChangeTimeoutError(){
    let regex = /^\d+/;
    let input_text = $("#timeout").val();
    console.log(regex.test(input_text));
    switch(false){
        case regex.test(input_text):
            $("#timeout").css("color", "red");
            $("#timeout").val("");
            break;
        default:
            $("#timeout").css("color", "black");
            break;
    }
}


// Функция ERROR, при вводе  отрицательного числа в поле input c id = #average_timeout цифра подсвечивается красным цветом
function isChangeAverageTimeoutError(){
    let regex = /^\d+/;
    let input_text = $("#average_timeout").val();
    console.log(regex.test(input_text));
    switch(false){
        case regex.test(input_text):
            $("#average_timeout").css("color", "red");
            $("#average_timeout").val("");
            break;
        default:
            $("#average_timeout").css("color", "black");
            break;
    }
}

// Функция ERROR, при вводе  отрицательного числа в поле input c id = #timeout цифра подсвечивается красным цветом
function isChangeThreads_countError(){
    let regex = /^\d+/;
    let input_text = $("#threads_count").val();
    console.log(regex.test(input_text));
    switch(false){
        case regex.test(input_text):
            $("#threads_count").css("color", "red");
            $("#threads_count").val("");
            break;
        default:
            $("#threads_count").css("color", "black");
            break;
    }
}