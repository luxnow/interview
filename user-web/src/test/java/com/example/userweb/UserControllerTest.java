package com.example.userweb;

import org.junit.FixMethodOrder;
import org.junit.internal.MethodSorter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.util.Assert;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.http.Cookie;


@FixMethodOrder(MethodSorters.JVM)
class UserControllerTest extends BaseTest {
    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;
    @Autowired
    private UserController userController;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();//建议使用这种
        System.out.println(userController);
    }

    @Test
    void userRegisterTest() throws Exception {
        MvcResult mvcResult = this.mockMvc.perform(MockMvcRequestBuilders
                .post("/user/register")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .content("nickName=tom"))
                //.param("nickName","tom"))
                .andReturn();
        String content = mvcResult.getResponse().getContentAsString();
        System.out.println(content);
        Assert.isTrue(content.contains("code:0"));
    }

    @Test
    void userRegisterBadParaTest() throws Exception {
        MvcResult mvcResult = this.mockMvc.perform(MockMvcRequestBuilders
                .post("/user/register")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .param("nickName",""))
                .andReturn();
        String content = mvcResult.getResponse().getContentAsString();
        System.out.println(content);
        Assert.isTrue(content.contains("code:1"));
    }

    @Test
    void userRLoginTest() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                .post("/user/register")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .param("nickName","lily"))
                .andReturn();
        MvcResult mvcResult = this.mockMvc.perform(MockMvcRequestBuilders
                .post("/user/login")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .param("nickName","lily"))
                .andReturn();
        String content = mvcResult.getResponse().getContentAsString();
        Cookie[] cookies = mvcResult.getResponse().getCookies();
        System.out.println(content);
        Assert.isTrue(content.contains("code:0"));
        Assert.isTrue(cookies != null && cookies.length > 0);
    }

    @Test
    void userLoginFailedTest() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                .post("/user/register")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .param("nickName","jim"))
                .andReturn();
        MvcResult mvcResult = this.mockMvc.perform(MockMvcRequestBuilders
                .post("/user/login")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .param("nickName","tom"))
                .andReturn();
        String content = mvcResult.getResponse().getContentAsString();
        System.out.println(content);
        Assert.isTrue(content.contains("code:1"));
    }

    @Test
    void userUpdateTest() throws Exception{
        this.mockMvc.perform(MockMvcRequestBuilders
                .post("/user/register")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .param("nickName","lucy"))
                .andReturn();
        MvcResult mvcLoginResult = this.mockMvc.perform(MockMvcRequestBuilders
                .post("/user/login")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .param("nickName","lucy"))
                .andReturn();
        Cookie[] cookies = mvcLoginResult.getResponse().getCookies();

        MvcResult mvcUpdateResult = this.mockMvc.perform(MockMvcRequestBuilders
                .post("/user/update")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .cookie(cookies)
                .param("newNickName","lucie"))
                .andReturn();
        String content = mvcUpdateResult.getResponse().getContentAsString();
        System.out.println(content);
        Assert.isTrue(content.contains("code:0"));
    }

    @Test
    void userUpdate() {
    }

    @Test
    void getAllUsers() {
    }
}