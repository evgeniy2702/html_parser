package ua.bot.html_parser.utils;

import org.jsoup.Connection;
import org.jsoup.Connection.Response;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class DocumentMemory {
    private Document data;
    private String lastPageLoaded = "";
    private String shortUrl = "";
    private List<Connection> connectionList;
    private List<Response> img;
    private Map<String, List<String>> mapOfElements;

    public DocumentMemory() {
        this.flush();
    }

    public String getShortUrl() {
        return this.shortUrl;
    }

    public void setDocumentInMemory(Document doc) {
        this.data = doc;
    }

    public void setFaultConnection(Connection data) {
        this.connectionList.add(data);
    }

    public void setLastPageLoaded(String url) {
        this.lastPageLoaded = url;
        String regex = "^(((http(s?))\\:\\/\\/)?+(www\\.)?+([\\w\\-\\.]+(\\.?))+(?!\\.\\w+\\/))";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(url);
        if (matcher.find()) {
            System.out.println("MATCHER FOUND - " + matcher.group(1));
            shortUrl = matcher.group(1);
        }

    }

    public String getLastPageLoaded() {
        return this.lastPageLoaded;
    }

    public Document getDocumentFromMemory() {
        return this.data;
    }

    public void setMapOfElements(Map<String, List<String>> data) {
        this.mapOfElements = data;
    }

    public Map<String, List<String>> getMapOfElements() {
        return this.mapOfElements;
    }

    public void addImgResponses(Response data) {
        this.img.add(data);
    }

    public List<Response> getListOfResponses() {
        return this.img;
    }

    public Response getResponseFromList(int index) {
        return (Response)this.img.get(index);
    }

    public void flush() {
        this.data = null;
        this.lastPageLoaded = "";
        this.img = new ArrayList();
        this.mapOfElements = new HashMap();
        this.connectionList = new ArrayList();
    }
}