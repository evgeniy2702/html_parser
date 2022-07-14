// id потока парсера
let id_tread_parse = "";

// при изменении значения на true останавливается процесс вызова функции callGet() в parse_post+method.js
let stop_parser = false;

// значения endpoints
// let ddos_ep = "";
// let page_info_ep = "";
// let log_ep = "";
// let stop_parse_ep = "";

// Описание резултирующего json , отправляемого на сервер
let parse_type_custom_simple = "simple";
let url = "";
let multithread = true;
let threads_count = 5;
let parse_type = [];
let parse_timeout = "";
let parse_delta = "";
let elemets_to_get = [];
let regex_elements = [];
let search_by_elemets = false;
let regex = false;

let response_json = {
    "parse_type":parse_type_custom_simple,
    "url_to_parse":url,
    "multithread":multithread,
    "threads_count": threads_count,
    "parameters":[{
        "parse_type": parse_type,
        "parse_timeout":parse_timeout,
        "parse_delta":parse_delta,
        "elemets_to_get": elemets_to_get,
        "regex":regex,
        "regex_parameters":[{
            "search_by_elemets":search_by_elemets,
            "regex_elements":regex_elements
        }]
    }]

};