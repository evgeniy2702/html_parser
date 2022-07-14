package ua.bot.html_parser.utils;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.Random;

@Component
public class RandomStringGenerator {
    private final int min = 20;
    private final int max = 55;

    public RandomStringGenerator() {
    }

    public String generateString() {
        StringBuilder sb = new StringBuilder();
        Random r = new SecureRandom();
        int result = r.nextInt(35) + 20;

        for(int i = 0; i < result; ++i) {
            SecureRandom random = new SecureRandom();
            char c = (char)(random.nextInt(26) + 97);
            sb.append(c);
        }

        return sb.toString();
    }
}