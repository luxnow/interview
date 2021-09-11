<template>
  <div class="login">
    <div class="login-form">
      <div class="login-header">
        <p>login</p>
      </div>
      <div class="login-info">
        <input
          placeholder="请输入用户名"
          suffix-icon="fa fa-user"
          v-model="username"
          style="margin-bottom: 18px"
        />
      </div>

      <button
        type="button"
        style="width: 100%; margin-bottom: 18px"
        @click="login()"
      >
        登录
      </button>
      <div>
        <input
          type="checkbox"
          class="login-remember"
          v-model="remenber"
        />记住密码
        <a
          href="/register"
          style="float: right; color: #3c8dbc; font-size: 14px"
          >注册</a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>