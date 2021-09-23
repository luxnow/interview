package com.example.userweb;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.util.Assert;
import org.springframework.web.context.WebApplicationContext;

import static org.junit.jupiter.api.Assertions.*;

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
    void userRegister() throws Exception {
        MvcResult mvcResult = this.mockMvc.perform(MockMvcRequestBuilders
                .post("/user/register")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .param("nickName","tom"))
                .andReturn();
        String content = mvcResult.getResponse().getContentAsString();
        System.out.println(content);
        Assert.isTrue(content.contains("code:0"));
    }

    @Test
    void userRegisterBadPara() throws Exception {
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
    void userLogin() {
    }

    @Test
    void userUpdate() {
    }

    @Test
    void getAllUsers() {
    }
}