package com.example.userweb.vo;

public class UserVo {
    private String nickName;

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    @Override
    public String toString() {
        return "UserVo{" +
                "nickName='" + nickName + '\'' +
                '}';
    }
}
