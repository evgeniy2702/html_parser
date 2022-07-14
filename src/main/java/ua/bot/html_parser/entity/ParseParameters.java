package ua.bot.html_parser.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Arrays;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

@Data
public class ParseParameters {
    @JsonProperty("parse_type")
    private List<ParseType> parseType;
    @JsonProperty("parse_timeout")
    private long parseTimeout;
    @JsonProperty("parse_delta")
    private int parseDelta;
    @JsonProperty("elements_to_get")
    private String[] elementsToGet;
    @JsonProperty("regex")
    private boolean regex;
    @JsonProperty("regex_parameters")
    private List<ParseRegexParameters> regexParameters;

    public ParseParameters() {
    }

    public ParseParameters setDefault() {
        this.setParseType(Collections.singletonList((new ParseType()).setDefault()));
        this.setRegexParameters(Collections.emptyList());
        this.setRegex(false);
        this.setParseTimeout(15L);
        this.setParseDelta((int)this.getParseTimeout() / 3);
        this.setElementsToGet((String[])null);
        return this;
    }

    public String toStringJson() {
        StringBuilder sb = new StringBuilder();
        sb.append("{");
        sb.append("\"parse_type\":").append("[");
        int counter;
        Iterator var3;
        if (parseType != null) {
            counter = 0;

            for(var3 = parseType.iterator(); var3.hasNext(); ++counter) {
                ParseType params = (ParseType)var3.next();
                sb.append(params.toStringJson());
                if (counter + 1 != parseType.size()) {
                    sb.append(",");
                }
            }
        }

        sb.append("]").append(",");
        sb.append("\"parse_timeout\":").append(getParseTimeout()).append(",");
        sb.append("\"parse_delta\":").append(getParseDelta()).append(",");
        sb.append("\"elements_to_get\":").append(Arrays.toString(getElementsToGet())).append(",");
        sb.append("\"regex\":").append(isRegex());
        if (isRegex()) {
            sb.append(",");
            sb.append("\"regex_parameters\":").append("[");
            if (regexParameters != null) {
                counter = 0;

                for(var3 = regexParameters.iterator(); var3.hasNext(); ++counter) {
                    ParseRegexParameters params = (ParseRegexParameters)var3.next();
                    sb.append(params.toStringJson());
                    if (counter + 1 != regexParameters.size()) {
                        sb.append(",");
                    }
                }
            }

            sb.append("]");
        }

        sb.append("}");
        return sb.toString();
    }

    public List<ParseType> getParseType() {
        return this.parseType;
    }

    public long getParseTimeout() {
        return this.parseTimeout;
    }

    public int getParseDelta() {
        return this.parseDelta;
    }

    public String[] getElementsToGet() {
        return this.elementsToGet;
    }

    public boolean isRegex() {
        return this.regex;
    }

    public List<ParseRegexParameters> getRegexParameters() {
        return this.regexParameters;
    }

    @JsonProperty("parse_type")
    public void setParseType(final List<ParseType> parseType) {
        this.parseType = parseType;
    }

    @JsonProperty("parse_timeout")
    public void setParseTimeout(final long parseTimeout) {
        this.parseTimeout = parseTimeout;
    }

    @JsonProperty("parse_delta")
    public void setParseDelta(final int parseDelta) {
        this.parseDelta = parseDelta;
    }

    @JsonProperty("elements_to_get")
    public void setElementsToGet(final String[] elementsToGet) {
        this.elementsToGet = elementsToGet;
    }

    @JsonProperty("regex")
    public void setRegex(final boolean regex) {
        this.regex = regex;
    }

    @JsonProperty("regex_parameters")
    public void setRegexParameters(final List<ParseRegexParameters> regexParameters) {
        this.regexParameters = regexParameters;
    }
}
