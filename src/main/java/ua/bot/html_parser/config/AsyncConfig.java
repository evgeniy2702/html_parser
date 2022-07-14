package ua.bot.html_parser.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import ua.bot.html_parser.utils.AsyncProperties;

import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.concurrent.Executor;

@Configuration
@EnableAsync
public class AsyncConfig implements AsyncConfigurer, AsyncUncaughtExceptionHandler {
    private static final Logger log = LoggerFactory.getLogger(AsyncConfig.class);
    private final AsyncProperties asyncProperties;

    @Bean
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(this.asyncProperties.getCorePoolSize());
        executor.setMaxPoolSize(this.asyncProperties.getMaxPoolSize());
        executor.setQueueCapacity(this.asyncProperties.getQueueCapacity());
        executor.setThreadNamePrefix(this.asyncProperties.getThreadNamePrefix());
        executor.setAwaitTerminationSeconds(this.asyncProperties.getAwaitTerminationSeconds());
        executor.setWaitForTasksToCompleteOnShutdown(this.asyncProperties.isWaitForTaskCompleteShutdown());
        executor.initialize();
        log.info("Thread executor started\n - Core pool size - {}\n - Max pool size - {}\n - Queue capacity - {}\n - Await Termination Seconds -{}", new Object[]{this.asyncProperties.getCorePoolSize(), this.asyncProperties.getMaxPoolSize(), this.asyncProperties.getQueueCapacity(), this.asyncProperties.getAwaitTerminationSeconds()});
        return executor;
    }

    public Executor getAsyncExecutor() {
        return this.taskExecutor();
    }

    public AsyncConfig(final AsyncProperties asyncProperties) {
        this.asyncProperties = asyncProperties;
    }


    public void handleUncaughtException(Throwable ex, Method method, Object... params) {
        log.error("Exception {} occurred while executing async method {} with args {}", new Object[]{ex, method, Arrays.toString(params)});
    }
}
