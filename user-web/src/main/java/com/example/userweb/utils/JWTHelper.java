package com.example.userweb.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.util.StringUtils;

import java.util.Calendar;
import java.util.Map;

public class JWTHelper {
    public static final String SECRET = "kghddd2";

    public static String getToken(Map<String, String> contents) {
        JWTCreator.Builder builder = JWT.create();
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MINUTE, 30);

        contents.forEach((k, v) -> {
            builder.withClaim(k, v);
        });

        String token = builder.withExpiresAt(cal.getTime()).sign(Algorithm.HMAC256(SECRET));

        return token;
    }

    public static Map<String, Claim> parseAndVerifyToken(String token) throws Exception {
        DecodedJWT jwt = null;
        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256(SECRET)).build();
            jwt = verifier.verify(token);
        } catch (Exception e) {
           throw e;
        }
        return jwt.getClaims();
    }

    public static String getUserName(String token) {
        String userName = null;
        try {
            Map<String, Claim> claims = parseAndVerifyToken(token);
            Claim usernameClaim = claims.get("nickname");
            if (usernameClaim != null  || StringUtils.hasLength(usernameClaim.asString())) {
                userName = usernameClaim.asString();
            }
        } catch (Exception e) {
            //log e
        }
        return userName;
    }

}
