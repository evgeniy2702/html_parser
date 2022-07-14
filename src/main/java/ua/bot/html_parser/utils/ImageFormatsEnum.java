package ua.bot.html_parser.utils;

public enum ImageFormatsEnum {
    JPEG("jpeg"),
    PNG("png"),
    BMP("bmp"),
    GIF("gif"),
    ICO("ico"),
    SVG("svg");

    public final String label;

    private ImageFormatsEnum(String label) {
        this.label = label;
    }
}