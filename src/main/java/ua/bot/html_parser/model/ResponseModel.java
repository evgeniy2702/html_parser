package ua.bot.html_parser.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import ua.bot.html_parser.entity.ParseParameters;

import java.util.Collections;
import java.util.Iterator;
import java.util.List;

@Data
public class ResponseModel {
    @JsonProperty("parse_conf")
    private String parseConf;
    @JsonProperty("multithread")
    private boolean multithreaded = false;
    @JsonProperty("threads_count")
    private int threadCount;
    @JsonProperty("url_to_parse")
    private String urlToParse;
    @JsonProperty("parameters")
    private List<ParseParameters> parameters;

    public ResponseModel() {
    }

    public void setThreadCount(int threads) {
        this.threadCount = threads;
    }

    public ResponseModel setDefault() {
        this.setParseConf("simple");
        this.setParameters(Collections.singletonList((new ParseParameters()).setDefault()));
        this.setThreadCount(1);
        return this;
    }

    public String toString() {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("{");
        stringBuilder.append("\"parse_conf\":").append("\"").append(getParseConf()).append("\",");
        stringBuilder.append("\"url_to_parse\":").append("\"").append(getUrlToParse()).append("\",");
        stringBuilder.append("\"parameters\":").append("[");
        if (parameters != null) {
            int counter = 0;

            for(Iterator var3 = parameters.iterator(); var3.hasNext(); ++counter) {
                ParseParameters params = (ParseParameters)var3.next();
                stringBuilder.append(params.toStringJson());
                if (counter + 1 != parameters.size()) {
                    stringBuilder.append(",");
                }
            }
        }

        stringBuilder.append("]");
        stringBuilder.append("}");
        return stringBuilder.toString();
    }

    public String getParseConf() {
        return this.parseConf;
    }

    public boolean isMultithreaded() {
        return this.multithreaded;
    }

    public int getThreadCount() {
        return this.threadCount;
    }

    public String getUrlToParse() {
        return this.urlToParse;
    }

    public List<ParseParameters> getParameters() {
        return this.parameters;
    }

    @JsonProperty("parse_conf")
    public void setParseConf(final String parseConf) {
        this.parseConf = parseConf;
    }

    @JsonProperty("multithread")
    public void setMultithreaded(final boolean multithreaded) {
        this.multithreaded = multithreaded;
    }

    @JsonProperty("url_to_parse")
    public void setUrlToParse(final String urlToParse) {
        this.urlToParse = urlToParse;
    }

    @JsonProperty("parameters")
    public void setParameters(final List<ParseParameters> parameters) {
        this.parameters = parameters;
    }
}