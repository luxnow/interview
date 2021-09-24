package com.example.userweb;

import com.example.userweb.utils.JWTHelper;
import com.example.userweb.utils.RequestChecker;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

@RestController
public class UserController {
    private Set users = new HashSet<String>();

    @RequestMapping("/hello")
    public String hello() {
        return "Spring Boot!";
    }

    /**
     * New User Register
     * @param nickName
     * @return
     * HTTP EXAMPLE:
     * POST http://127.0.0.1:8080/user/add
     * Content-Type: application/x-www-form-urlencoded
     * nickname=tom
     */
    @RequestMapping(value = "/user/register", method = RequestMethod.POST)
    public String userRegister(@RequestParam String nickName) {
        Response res = new Response();
        String result = "";
        int code = 0;
        if(!RequestChecker.checkParameters(nickName)) {
            result = "Bad parameters.";
            code = 1;
        } else {
            if (users.contains(nickName)) {
                result = "Already Ex";
                code = 1;
            } else {
                users.add(nickName);
                result = "OK";
            }
        }
        res.setCode(code);
        res.setMsg(result);
        return res.toString();
    }

    @RequestMapping(value = "/user/login", method = RequestMethod.POST)
    public String userLogin(@RequestParam String nickName, HttpServletResponse response) {
        Response res = new Response();
        String result = "";
        int code = 0;
        if(!RequestChecker.checkParameters(nickName)) {
            result = "Bad parameters.";
            code = 1;
        } else {
            if (users.contains(nickName)) {
                result = "Login Success!";
                Map contents = new HashMap<String, String>();
                contents.put("nickname", nickName);
                String token = JWTHelper.getToken(contents);
                Cookie cookie = new Cookie("token", token);
                //add cookie to response
                response.addCookie(cookie);
            } else {
                result = "Wrong information, please try again.";
                code = 1;
            }
        }
        res.setCode(code);
        res.setMsg(result);
        return res.toString();
    }

    @RequestMapping(value = "/user/update", method = RequestMethod.POST)
    public String userUpdate(@RequestParam String newNickName, HttpServletRequest request) {
        Response res = new Response();
        String result = "ok";
        int code = 0;
        if(!RequestChecker.checkParameters(newNickName)) {
            result = "Bad parameters.";
            code = 1;
            res.setCode(code);
            res.setMsg(result);
            return res.toString();
        }
        Cookie[] cookies = request.getCookies();
        String token = null;
        if (cookies != null) {
            for(int i = 0; i < cookies.length; i++) {
                if("token".equals(cookies[i].getName())) {
                    token = cookies[i].getValue();
                }
            }
        }
        String operationUsername = JWTHelper.getUserName(token);
        if(StringUtils.hasLength(operationUsername) && users.contains(operationUsername)) {
            if(!users.contains(newNickName)) {
                users.remove(operationUsername);
                users.add(newNickName);
            } else {
                result = "new user already exist.";
                code = 1;
            }
        }
        res.setCode(code);
        res.setMsg(result);
        return res.toString();
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public String getAllUsers() {
        return users.toString();
    }
}
