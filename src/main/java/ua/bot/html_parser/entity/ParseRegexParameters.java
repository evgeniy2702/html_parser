package ua.bot.html_parser.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Arrays;

@Data
public class ParseRegexParameters {
    @JsonProperty("search_by_elements")
    private boolean searchByElements;
    @JsonProperty("regex_elements")
    private String[] regexElements;
    @JsonProperty("regex_line")
    private String regexLine;

    public ParseRegexParameters() {
    }

    public String toStringJson() {
        StringBuilder sb = new StringBuilder();
        sb.append("{");
        sb.append("\"search_by_elements\":").append(isSearchByElements());
        if (searchByElements) {
            sb.append(",");
            sb.append("\"regex_elements\":").append(Arrays.toString(getRegexElements())).append(",");
            sb.append("\"regex_line\":").append("\"").append(getRegexLine()).append("\"");
        }

        sb.append("}");
        return sb.toString();
    }

    public boolean isSearchByElements() {
        return this.searchByElements;
    }

    public String[] getRegexElements() {
        return this.regexElements;
    }

    public String getRegexLine() {
        return this.regexLine;
    }
}
