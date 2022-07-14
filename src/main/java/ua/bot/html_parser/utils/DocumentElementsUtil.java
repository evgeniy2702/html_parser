package ua.bot.html_parser.utils;

import org.json.JSONObject;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.Map.Entry;

@Component
public class DocumentElementsUtil {
    private final DocumentMemory documentMemory;

    @Autowired
    public DocumentElementsUtil(DocumentMemory documentMemory) {
        this.documentMemory = documentMemory;
    }

    public JSONObject getAllElementsCount() {
        return null;
    }

    public List<String> getAllImagesOnPage() {
        if (documentMemory == null) {
            return null;
        } else {
            List<String> imgUrlList = new ArrayList();
            Document doc = documentMemory.getDocumentFromMemory();
            String regexImg = "img[src~=(?i)\\.(png|jpe?g|gif|svg|ico|webp)]";
            Elements elementsImg = doc.select(regexImg);
            if (elementsImg == null) {
                return null;
            } else {
                if (elementsImg.size() != 0) {
                    elementsImg.forEach((element) -> {
                        if (element.attr("src").contains(documentMemory.getShortUrl())) {
                            imgUrlList.add(element.attr("src"));
                        }

                    });
                }

                return imgUrlList;
            }
        }
    }

    public int getElementsCount(String name) {
        Document data = documentMemory.getDocumentFromMemory();
        return data == null ? 0 : data.select(name).size();
    }

    public int getElementsByTagCount(String tag) {
        return documentMemory.getDocumentFromMemory() == null ? 0 : documentMemory.getDocumentFromMemory().getElementsByTag(tag).size();
    }

    public int getLinksCount() {
        return documentMemory.getDocumentFromMemory() == null ? 0 : documentMemory.getDocumentFromMemory().select("a[href]").size();
    }

    public Map<Integer, String> getLinksMap() {
        int counter = 0;
        Map<Integer, String> linksData = new HashMap();
        if (documentMemory.getDocumentFromMemory() == null) {
            return null;
        } else {
            Elements links = documentMemory.getDocumentFromMemory().select("a[href]");
            if (links == null) {
                return null;
            } else {
                for(Iterator var4 = links.iterator(); var4.hasNext(); ++counter) {
                    Element element = (Element)var4.next();
                    linksData.put(counter + 1, element.data());
                }

                return linksData;
            }
        }
    }

    public JSONObject getLinksJson() {
        JSONObject jsonData = new JSONObject();
        Map<Integer, String> linksData = getLinksMap();
        if (linksData == null) {
            return null;
        } else {
            Iterator var3 = linksData.entrySet().iterator();

            while(var3.hasNext()) {
                Entry<Integer, String> data = (Entry)var3.next();
                jsonData.append(((Integer)data.getKey()).toString(), data.getValue());
            }

            return jsonData;
        }
    }
}