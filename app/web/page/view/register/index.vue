<template>
  <div class="login">
    <div class="login-form">
      <div class="login-header">
        <p>register</p>
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
        @click="register()"
      >
        注册
      </button>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>