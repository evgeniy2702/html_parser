package ua.bot.html_parser.utils;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class ProcessLogUtil {
    private Map<Long, ProcessLogUtil.StringLog> logMap = new HashMap<>();

    @SuppressWarnings(value = "unchecked")
    public void appendLog(long processId, String data) {
        if (logMap == null) {
            logMap = new HashMap();
        }

        if (!logMap.containsKey(processId)) {
            ProcessLogUtil.StringLog logBuffer = new ProcessLogUtil.StringLog();
            logBuffer.addLogData(data);
            logMap.put(processId, logBuffer);
        } else {
            logMap.get(processId).addLogData(data);
        }

    }

    @SuppressWarnings(value = "unchecked")
    public String getLogData(long processId) {
        return logMap.containsKey(processId) ? logMap.get(processId).getLog() : String.format("no log for process with id %s", processId);
    }

    private static class StringLog {
        private final long maxBufferSize;
        private String stringBuffer;

        private StringLog() {
            this.maxBufferSize = 3145728L;
            this.stringBuffer = "";
        }

        private String getStringBuffer() {
            return this.stringBuffer;
        }

        void addLogData(String data) {
            if (stringBuffer == null) {
                stringBuffer = "";
            }

            if (stringMemorySize(stringBuffer) > 3145728L) {
                this.flush();
            }

            stringBuffer = stringBuffer + data + "\n";
        }

        private void flush() {
            this.stringBuffer = "";
        }

        public String getLog() {
            String returnData = getStringBuffer();
            this.flush();
            return returnData;
        }

        public long stringMemorySize(String data) {
            String osArch = System.getProperty("os.arch");
            byte modifier64or32;
            if (osArch.equals("x86")) {
                modifier64or32 = 8;
            } else {
                modifier64or32 = 12;
            }

            return (long)(modifier64or32 + 8 + 8) + 12L + (long)data.getBytes().length * 2L + 8L + 8L;
        }
    }
}
