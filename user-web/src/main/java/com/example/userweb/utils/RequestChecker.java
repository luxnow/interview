package com.example.userweb.utils;

import org.springframework.util.StringUtils;

public class RequestChecker {
    public static boolean checkParameters(String para) {
        boolean isValid = true;
        if(!StringUtils.hasLength(para)) {
            isValid = false;
        }
        return  isValid;
    }
}
