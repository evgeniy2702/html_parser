package ua.bot.html_parser.utils;

import org.json.JSONObject;
import org.springframework.stereotype.Component;

@Component
public class RespondMessageJsonBuilder {
    private final DocumentElementsUtil documentElementsUtil;

    public JSONObject buildRespondMessageFull() {
        JSONObject respondJson = new JSONObject();
        HtmlTags[] var2 = HtmlTags.values();
        int var3 = var2.length;

        for(int var4 = 0; var4 < var3; ++var4) {
            HtmlTags value = var2[var4];
            respondJson.append(value.label, documentElementsUtil.getElementsByTagCount(value.label));
        }

        return respondJson;
    }

    public JSONObject buildRespondMessageSelective(String... data) {
        JSONObject respondJson = new JSONObject();
        String[] var3 = data;
        int var4 = data.length;

        for(int var5 = 0; var5 < var4; ++var5) {
            String value = var3[var5];
            respondJson.append(value, documentElementsUtil.getElementsByTagCount(value));
        }

        return respondJson;
    }

    public RespondMessageJsonBuilder(final DocumentElementsUtil documentElementsUtil) {
        this.documentElementsUtil = documentElementsUtil;
    }
}
