<template>
  <div class="user-menu">
    <button @click="toggleMenu" class="user-menu-button">
      <img :src="user.avatar" alt="User Avatar" class="user-avatar" />
      <span>{{ user.name }}</span>
      <i class="fas fa-chevron-down"></i>
    </button>
    <div v-if="menuOpen" class="user-menu-dropdown">
      <router-link to="/profile" class="user-menu-item">Profil</router-link>
      <router-link to="/orders" class="user-menu-item">Siparişlerim</router-link>
      <router-link to="/settings" class="user-menu-item">Ayarlar</router-link>
      <button @click="logout" class="user-menu-item">Çıkış Yap</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'UserMenu',
  setup() {
    const store = useStore()
    const router = useRouter()
    const user = store.state.user
    const menuOpen = ref(false)

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value
    }

    const logout = () => {
      store.dispatch('user/logout')
      router.push('/login')
    }

    return {
      user,
      menuOpen,
      toggleMenu,
      logout
    }
  }
}
</script>

<style scoped>
.user-menu {
  position: relative;
}

.user-menu-button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
}

.user-menu-dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.user-menu-item {
  display: block;
  padding: 8px 16px;
  text-decoration: none;
  color: #333;
  cursor: pointer;
}

.user-menu-item:hover {
  background: #f5f5f5;
}
</style>