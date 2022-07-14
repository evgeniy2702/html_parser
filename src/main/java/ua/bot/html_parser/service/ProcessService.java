package ua.bot.html_parser.service;

import org.springframework.stereotype.Component;

import java.util.*;
import java.util.Map.Entry;

@Component
public class ProcessService {
    private boolean processWork;
    private Map<Long, Boolean> isProcess = new HashMap();
    private Map<Long, List<Thread>> isProcessMultiple = Collections.synchronizedMap(new HashMap());


    public boolean addThreadById(long processId, Thread thread) {
        if (isProcessingMultiple(processId)) {
            if (thread == null) {
                return false;
            }

            (getIsProcessMultiple().get(processId)).add(thread);
        } else {
            List<Thread> threadsList = new ArrayList();
            threadsList.add(thread);
            startMultipleProcess(processId, threadsList);
        }

        return (getIsProcessMultiple().get(processId)).contains(thread);
    }

    public boolean startProcessState(long processId) {
        if (!getIsProcess().containsKey(processId)) {
            getIsProcess().put(processId, true);
        }

        return isProcessing(processId);
    }

    public boolean startMultipleProcess(long processId, List<Thread> processes) {
        if (!getIsProcessMultiple().containsKey(processId)) {
            if (processes.size() == 0) {
                return false;
            }

            getIsProcessMultiple().put(processId, processes);
        }

        return isProcessingMultiple(processId);
    }

    public boolean isProcessing(long processId) {
        return this.getIsProcessMultiple().containsKey(processId);
    }

    public boolean isProcessingMultiple(long processId) {
        return this.getIsProcessMultiple().containsKey(processId);
    }
    public boolean stopProcess(long processId) {
        if (!isProcessing(processId)) {

            return true;
        } else {
            Map<Thread, StackTraceElement[]> mapOfThread = Thread.getAllStackTraces();
            Iterator var4 = mapOfThread.entrySet().iterator();

            while(var4.hasNext()) {
                Entry<Thread, StackTraceElement[]> thread = (Entry)var4.next();
                if ((thread.getKey()).getId() == processId) {
                    (thread.getKey()).interrupt();
                    break;
                }
            }

            this.getIsProcess().remove(processId);
            return this.isProcessing(processId);
        }
    }

    public boolean stopMultipleProcess(long processId) {
        if (isProcessingMultiple(processId)) {
            List<Thread> threadList = getIsProcessMultiple().get(processId);
            isProcessMultiple.remove(processId);
            threadList.forEach(Thread::interrupt);
            return isProcessingMultiple(processId);
        } else {
            return isProcessingMultiple(processId);
        }
    }

    public boolean isProcessWork() {
        return this.processWork;
    }

    public Map<Long, Boolean> getIsProcess() {
        return this.isProcess;
    }

    public Map<Long, List<Thread>> getIsProcessMultiple() {
        return this.isProcessMultiple;
    }

    public void setProcessWork(final boolean processWork) {
        this.processWork = processWork;
    }

    public void setIsProcess(final Map<Long, Boolean> isProcess) {
        this.isProcess = isProcess;
    }

    public void setIsProcessMultiple(final Map<Long, List<Thread>> isProcessMultiple) {
        this.isProcessMultiple = isProcessMultiple;
    }
}