package ua.bot.html_parser.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ParseType {
    @JsonProperty("type")
    private String type;
    @JsonProperty("count")
    private long count;
    @JsonProperty("time")
    private long time;

    public ParseType() {
    }

    public ParseType setDefault() {
        this.type = "by_time";
        this.count = 0L;
        this.time = 1L;
        return this;
    }

    public String toStringJson() {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("{");
        if (type != null) {
            stringBuilder.append("\"type\":").append("\"").append(getType()).append("\"").append(",");
            String var2 = type;
            byte var3 = -1;
            switch(var2.hashCode()) {
                case 336469429:
                    if (var2.equals("by_time")) {
                        var3 = 0;
                    }
                    break;
                case 1825104679:
                    if (var2.equals("by_count")) {
                        var3 = 1;
                    }
            }

            switch(var3) {
                case 0:
                    stringBuilder.append("\"time\":").append(getTime());
                    break;
                case 1:
                    stringBuilder.append("\"count\":").append(getCount());
            }
        }

        stringBuilder.append("}");
        return stringBuilder.toString();
    }

    public String toString() {
        return "ParseType(type=" + getType() + ", count=" + getCount() + ", time=" + getTime() + ")";
    }

    public String getType() {
        return this.type;
    }

    public long getCount() {
        return this.count;
    }

    public long getTime() {
        return this.time;
    }

    @JsonProperty("type")
    public void setType(final String type) {
        this.type = type;
    }

    @JsonProperty("count")
    public void setCount(final long count) {
        this.count = count;
    }

    @JsonProperty("time")
    public void setTime(final long time) {
        this.time = time;
    }
}
