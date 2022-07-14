package ua.bot.html_parser.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Component
@PropertySource({"classpath:threadconf.properties"})
public class AsyncProperties {
    @Value("${core-pool-size}")
    private int corePoolSize;
    @Value("${max-pool-size}")
    private int maxPoolSize;
    @Value("${queue-capacity}")
    private int queueCapacity;
    @Value("${thread-name-prefix}")
    private String threadNamePrefix;
    @Value("${await-termination-seconds}")
    private int awaitTerminationSeconds;
    @Value("${wait-for-task-complete-shutdown}")
    private boolean waitForTaskCompleteShutdown;

    public AsyncProperties() {
    }

    public int getCorePoolSize() {
        return this.corePoolSize;
    }

    public int getMaxPoolSize() {
        return this.maxPoolSize;
    }

    public int getQueueCapacity() {
        return this.queueCapacity;
    }

    public String getThreadNamePrefix() {
        return this.threadNamePrefix;
    }

    public int getAwaitTerminationSeconds() {
        return this.awaitTerminationSeconds;
    }

    public boolean isWaitForTaskCompleteShutdown() {
        return this.waitForTaskCompleteShutdown;
    }
}

