<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { api, isLoading } from '~/logic/useApi'

const username = ref('')
const loginUserName = useStorage('loginUserName', '')
const err = ref('')
const isLogin = useStorage('isLogin', false)
const token = useStorage('token', '')
const showForm = ref(true)
const loadingType = ref('')

const getUserData = async () => {
  if (!token.value)
    return

  const { data } = await api.post('/api/user-info')
  if (data.err)
    doLogout()
}
getUserData()

const doSignup = async () => {
  loadingType.value = 'signup'
  const { data } = await api.post('/api/user-signup', { username: username.value })
  if (data.err)
    err.value = data.err

  if (data.token) {
    token.value = data.token
    isLogin.value = true
    showForm.value = false
  }
}

const doLogin = async () => {
  loadingType.value = 'login'

  const { data } = await api.post('/api/user-login', { username: username.value })
  if (data.err)
    err.value = data.err

  if (data.token) {
    err.value = ''
    token.value = data.token
    loginUserName.value = username.value
    isLogin.value = true
    showForm.value = false
  }
}

const doUpdate = async () => {
  loadingType.value = 'update'
  const { data } = await api.post('/api/user-update', { username: username.value })
  if (data.err)
    err.value = data.err

  if (data.token) {
    err.value = ''
    token.value = data.token
    loginUserName.value = username.value
    isLogin.value = true
    showForm.value = false
  }
}

const doLogout = () => {
  token.value = ''
  err.value = ''
  loginUserName.value = ''
  isLogin.value = false
  showForm.value = true
}

</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50 py-12 justify-center sm:px-6 lg:px-8">
    <div class="mt-8 sm:mx-auto sm:max-w-md sm:w-full">
      <div class="bg-white shadow py-8 px-4 sm:rounded-lg sm:px-10">
        <div v-if="isLogin" class="mb-10">
          <div class="text-center text-green-500 text-3xl">
            Hey
            <span class="text-purple-500">{{ loginUserName }}</span>, Welcome Back!
          </div>
          <btn @click="doLogout">Logout</btn>
          <button
            type="submit"
            class="border border-transparent rounded-md flex font-medium bg-indigo-600 shadow-sm mt-4 text-sm text-white w-full py-2 px-4 justify-center hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="doLogout"
          >Logout</button>
          <btn v-if="!showForm" class="bg-green-600" @click="showForm = true">Update Name</btn>
        </div>
        <div v-if="showForm">
          <div>
            <label for="username" class="font-medium text-sm text-gray-700 block">User Name</label>
            <div class="mt-1">
              <input
                id="username"
                v-model="username"
                name="username"
                autocomplete="username"
                required
                class="border rounded-md border-gray-300 shadow-sm w-full py-2 px-3 placeholder-gray-400 appearance-none block sm:text-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div v-if="err" class="text-center p-4 text-red-500">{{ err }}</div>
          <div v-if="!isLogin">
            <btn
              :disabled="!username || isLoading"
              :is-loading="isLoading && loadingType === 'signup'"
              class="bg-indigo-600"
              @click="doSignup"
            >Sign Up</btn>
            <btn
              :disabled="!username || isLoading"
              :is-loading="isLoading && loadingType === 'login'"
              class="bg-green-600"
              @click="doLogin"
            >Login</btn>
          </div>
          <div v-else>
            <btn
              :disabled="!username || isLoading"
              :is-loading="isLoading && loadingType === 'update'"
              class="bg-pink-600"
              @click="doUpdate"
            >Update Name</btn>
            <btn class="bg-gray-400" @click="showForm = false">Cancel</btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
