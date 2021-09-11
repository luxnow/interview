<template>
  <div class="login">
    <div class="login-form">
      <div class="login-header">
        <p>edit</p>
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
        @click="edit()"
      >
        修改
      </button>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>