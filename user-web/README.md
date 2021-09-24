## 项目说明
本项目为后端接口项目，采用spring搭建

## 环境准备
####1.安装jdk
####2.安装mvn

## 快速启动
####1. 下载user-web项目
####2. 在项目根目录下执行mvn install，生成可执行文件user-web-0.0.1-SNAPSHOT.jar
####3. 启动项目 java -jar user-web-0.0.1-SNAPSHOT.jar


## 测试方法
### 一、基本测试用例
#### 1. 注册用户成功（失败）
#### 2. 注册用户、登陆成功（失败）
#### 2. 注册用户、登陆成功、修改昵称成功(失败)



### 二、java单元测试
#### 1. file: user-web\src\test\java\com\example\userweb\UserControllerTest.java
#### 2. 执行:　项目目录下执行maven命令:mvn test

### 三、RAW http测试
####
(1)GET http://localhost:8080/hello

####
(2)POST http://localhost:8080/user/register
Content-Type: application/x-www-form-urlencoded

nickname=tom

####
(3)POST http://localhost:8080/user/register
Content-Type: application/x-www-form-urlencoded

nickName=lily

####
(4)POST http://localhost:8080/user/login
Content-Type: application/x-www-form-urlencoded

nickname=jim

####
(5)POST http://localhost:8080/user/login
Content-Type: application/x-www-form-urlencoded

nickname=tom

####
(6)GET http://localhost:8080/users


####
(7)POST http://localhost:8080/user/update
Content-Type: application/x-www-form-urlencoded
cookie: token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuaWNrbmFtZSI6Im5pY2tuYW1lPXRvbSIsImV4cCI6MTYzMjQzMTQ2OH0.zGYgBO-RcCT9Sqv5-3wIaFOrq1sq-_lMzf4GTN6qFSE

newnickname=tommy
