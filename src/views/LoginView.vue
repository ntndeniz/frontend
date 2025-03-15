<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
      <h2 class="text-2xl font-bold text-center mb-6">Admin Girişi</h2>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input 
            type="email" 
            v-model="email"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Şifre
          </label>
          <input 
            type="password" 
            v-model="password"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
        </div>

        <div v-if="error" class="text-red-600 text-sm">
          {{ error }}
        </div>

        <button 
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const error = ref('')

    const handleLogin = async () => {
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/auth/login`, {
          email: email.value,
          password: password.value
        })

        // Token'ı localStorage'a kaydet
        localStorage.setItem('token', response.data.token)
        
        // Admin paneline yönlendir
        router.push('/admin')
      } catch (err) {
        error.value = 'Email veya şifre hatalı'
      }
    }

    return {
      email,
      password,
      error,
      handleLogin
    }
  }
}
</script> 