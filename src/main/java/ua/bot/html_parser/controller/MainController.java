package ua.bot.html_parser.controller;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import ua.bot.html_parser.model.LogData;
import ua.bot.html_parser.model.ProcessControlModel;
import ua.bot.html_parser.model.ResponseModel;
import ua.bot.html_parser.service.ParseService;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping({"","html-parser/","html-parser"})
@PropertySource("classpath:properties/tags_set_up.properties")
public class MainController {

    @Value("${tags.path}")
    private String tags_path;
    @Value("${ddos_ep}")
    private String ddos_ep;
    @Value("${page_info_ep}")
    private String page_info_ep;
    @Value("${log_ep}")
    private String log_ep;
    @Value("${stop_parse_ep}")
    private String stop_parse_ep;

    private static final Logger log = LoggerFactory.getLogger(MainController.class);
    private final ParseService parseService;
    private static final HttpHeaders headers = new HttpHeaders();
    private static final JSONObject jsonObject = new JSONObject();
    private static final Map<String, String> response = new HashMap();

    @GetMapping(value = {"", "start-page"})
    public ModelAndView startPage(ModelAndView modelAndView) throws IOException{
        fillingModalAndView(modelAndView);
        return modelAndView;
    }

    @PostMapping({""})
    public ResponseEntity<?> parsePage(@RequestBody ResponseModel responseModel) {
        if (responseModel == null) {
            return ResponseEntity.ok().build();
        } else {
            JSONObject obj = jsonObject;
            CompletableFuture<JSONObject> responseObj = new CompletableFuture();
            String var4 = responseModel.getParseConf();
            byte var5 = -1;
            switch(var4.hashCode()) {
                case -1349088399:
                    if (var4.equals("custom")) {
                        var5 = 1;
                    }
                    break;
                case -902286926:
                    if (var4.equals("simple")) {
                        var5 = 0;
                    }
            }

            switch(var5) {
                case 0:
                    responseObj = parseService.parsePageSimple(responseModel);
                    break;
                case 1:
                    responseObj = parseService.parsePageCustom(responseModel);
            }

            try {
                if (responseObj.get() == null) {
                    return new ResponseEntity(jsonObject.toString(), headers, HttpStatus.BAD_REQUEST);
                }

                obj = responseObj.get();
            } catch (ExecutionException | InterruptedException var6) {
                log.error(var6.getMessage());
            }

            return new ResponseEntity(obj.toString(), headers, HttpStatus.OK);
        }
    }

    @PostMapping({"page-parse/get-page-info"})
    public ResponseEntity<?> getPageInfo(@RequestBody ResponseModel responseModel) {
        if (responseModel.getUrlToParse() == null || responseModel.getUrlToParse().equals("")) {
            return ResponseEntity.ok().build();
        } else {
            CompletableFuture<JSONObject> responseObj = parseService.getPageInfo(responseModel.getUrlToParse());
            return responseObj == null ? new ResponseEntity(jsonObject, headers, HttpStatus.BAD_REQUEST) : new ResponseEntity(responseObj, headers, HttpStatus.OK);
        }
    }

    @PostMapping({"page-parse/ddos-page"})
    public ResponseEntity<?> ddosPage(@RequestBody ResponseModel responseModel) {
        System.out.println("response_json : " + responseModel.toString());

        if (responseModel== null) {
            return ResponseEntity.ok().build();
        } else {
            Map<String, Object> obj = parseService.ddosPageSimple(responseModel);

            obj.forEach((i,j) -> System.out.println("ddos-page |  key : " + i + ", object : " + j.toString()));
            return new ResponseEntity(obj, headers, HttpStatus.OK);
        }
    }

    @GetMapping({"page-parse/stop-process"})
    public ResponseEntity<?> stopProcess() {
        boolean isRunning = parseService.stopProcess();
        return !isRunning ? new ResponseEntity("\"status\":\"process stopped\"", headers, HttpStatus.OK) : new ResponseEntity(jsonObject, headers, HttpStatus.OK);
    }

    @PostMapping({"page-parse/stop-process"})
    public ResponseEntity<?> stopProcess(@RequestBody ProcessControlModel data) {
        boolean isRunning = parseService.stopProcess(Long.valueOf(data.getProcessId()));
        return !isRunning ? new ResponseEntity("\"status\":\"process with id " + data.getProcessId() + " stopped\",\"stop\":true", headers, HttpStatus.BAD_GATEWAY) : new ResponseEntity(jsonObject.toString(), headers, HttpStatus.OK);
    }

    @PostMapping({"page-parse/get-log"})
    public ResponseEntity<?> getThreadsInfo(@RequestBody LogData logData) {
        if (logData == null) {
            return new ResponseEntity("\"status\":\"no json log data provided\"", headers, HttpStatus.OK);
        } else {
            log.info(logData.getProcessId() + " PROCESS ID FROM WEB");

            try {
                long processId = Long.parseLong(logData.getProcessId());
                Map<String, Object> jsonObject = parseService.getProcessLog(processId);
                return new ResponseEntity(jsonObject, headers, HttpStatus.OK);
            } catch (NumberFormatException var5) {
                log.error(var5.getMessage());
                return new ResponseEntity("\"status\":\"" + var5.getMessage() + "\",\"stop\":true", headers, HttpStatus.OK);
            }
        }
    }

    public MainController(final ParseService parseService) {
        this.parseService = parseService;
    }

    static {
        headers.add("Content-Type", "application/json");
        jsonObject.append("status", "parse fail");
        response.put("\"status\":", "\"parse fail\"");
    }


//    @PostMapping(value = {"parse-page/ddos-page"}, produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<?> postRequest(@RequestBody String jsonString){
//        JSONObject jsonpObject = new JSONObject(jsonString);
//        System.out.println(jsonpObject);
//        stop = false;
//        return ResponseEntity.ok("{ \"status\" : \"" + HttpStatus.OK.name() + "\", \"process_id\" : " + 1000 + "}");
//    }

//    @PostMapping(value = {"parse-page/stop-process"}, produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<?> postStopRequest(@RequestBody String jsonStopString){
//        JSONObject jsonpObject = new JSONObject(jsonStopString);
//        System.out.println("Stop parser : " + jsonpObject);
//        stop = true;
//        return ResponseEntity.ok(HttpStatus.OK);
//    }


//    @GetMapping(value = {"parse-page/get-log"})
//    public ResponseEntity<?> getConsole(){
//        if(count%2 == 0) {
//            count++;
//            return ResponseEntity.ok("{ \"log\" : \"INFO to get console log\", \"stop\" : " + stop + "}");
//        }
//        else {
//            count++;
//            return ResponseEntity.ok("{ \"log\" : \"\", \"stop\" : " + stop + "}");
//        }
//    }

    @SuppressWarnings("unchecked")
    private void fillingModalAndView(ModelAndView modelAndView) throws IOException{
        modelAndView.addObject("date", LocalDateTime.now());
        modelAndView.addObject("status","Please set up parser");
        List<String> tags_list = new ArrayList<>();
        JSONParser parser = new JSONParser();
        File clsPath =  new ClassPathResource(tags_path).getFile();
        try{
            Object obj = parser.parse(new FileReader(clsPath));
            org.json.simple.JSONObject jsonObject = (org.json.simple.JSONObject)obj;
            JSONArray tagsList = (JSONArray)jsonObject.get("tags");
            tags_list.addAll(tagsList);
        }catch (ParseException | IOException e) {
            System.out.println("ERROR: " + e.getMessage());
            System.out.println("CAUSE: " + e.getCause());
        }

        modelAndView.addObject("tags_list", tags_list);
        modelAndView.addObject("ddos_ep", ddos_ep);
        modelAndView.addObject("info_ep", page_info_ep);
        modelAndView.addObject("log_ep", log_ep);
        modelAndView.addObject("stop_parse_ep", stop_parse_ep);
        modelAndView.setViewName("index");
    }
}
