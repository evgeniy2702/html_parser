package ua.bot.html_parser.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import ua.bot.html_parser.entity.ParseParameters;
import ua.bot.html_parser.entity.ParseType;
import ua.bot.html_parser.utils.DdosUtil;
import ua.bot.html_parser.utils.ProcessLogUtil;

@Service
public class PageDdosService {
    private static final Logger log = LoggerFactory.getLogger(PageDdosService.class);
    private final ProcessService processService;
    private final ProcessLogUtil processLogUtil;

    public boolean isRunning() {
        return this.processService.isProcessWork();
    }

    public boolean isRunning(long processId) {
        return this.processService.isProcessing(processId);
    }

    public boolean isRunningMultiple(long processId) {
        return this.processService.isProcessingMultiple(processId);
    }

    public boolean stopProcess() {
        log.info("Stopping process");
        processService.setProcessWork(false);
        return this.processService.isProcessWork();
    }

    public boolean stopProcess(long processId) {
        log.info("Stopping process");
        processService.stopProcess(processId);
        return processService.isProcessing(processId);
    }

    public boolean stopMultipleProcess(long processId) {
        log.info("Stopping process");
        processService.stopMultipleProcess(processId);
        return processService.isProcessingMultiple(processId);
    }

    @Async
    public void ddosPage(String url, ParseParameters params, long id) {
        if (url != null) {
            if (id >= 0L) {
                ParseType parseType = params.getParseType().get(0);
                if (parseType.getType().equals("by_time")) {
                    (new DdosUtil(processLogUtil, processService)).ddosByTime(url, params, id);
                }

                if (parseType.getType().equals("by_count")) {
                    (new DdosUtil(processLogUtil, processService)).ddosByCount(url, params, id);
                }

            }
        }
    }

    public PageDdosService(final ProcessService processService, final ProcessLogUtil processLogUtil) {
        this.processService = processService;
        this.processLogUtil = processLogUtil;
    }
}