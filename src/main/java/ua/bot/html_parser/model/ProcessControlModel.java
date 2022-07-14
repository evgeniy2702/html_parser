package ua.bot.html_parser.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ProcessControlModel {
    @JsonProperty("process_id")
    private String processId;

    public String getProcessId() {
        return this.processId;
    }

}
