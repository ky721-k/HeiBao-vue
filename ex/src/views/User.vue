<template>
  <div class="user">
    <van-nav-bar
      title="个人中心"
      fixed
      placeholder
    />

    <div class="content">
      <div class="user-info" v-if="userInfo">
        <div class="avatar-section">
          <van-image
            round
            width="60px"
            height="60px"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <div class="user-details">
            <div class="nickname">{{ userInfo.nickName }}</div>
            <div class="user-id">ID: {{ userInfo.ID }}</div>
          </div>
        </div>

        <van-cell-group>
          <van-cell title="余额" :value="userInfo.coin + ' ' + userInfo.currency" />
          <van-cell title="地区" :value="getRegionName(userInfo.region)" />
          <van-cell title="游戏场地" :value="userInfo.gameField" />
        </van-cell-group>
      </div>

      <div class="actions" v-if="userInfo">
        <van-button round block type="primary" @click="goToGames">
          进入游戏
        </van-button>
        <van-button round block plain type="danger" @click="logout">
          退出登录
        </van-button>
      </div>

      <div class="login-prompt" v-else>
        <van-empty description="请先登录">
          <van-button round type="primary" @click="goToLogin">
            立即登录
          </van-button>
        </van-empty>
      </div>
    </div>

    <van-tabbar v-model="active" fixed>
      <van-tabbar-item name="home" icon="home-o" @click="goToHome">首页</van-tabbar-item>
      <van-tabbar-item name="games" icon="apps-o" @click="goToGames">游戏</van-tabbar-item>
      <van-tabbar-item name="user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()
const active = ref('user')
const userInfo = ref(null)

const getRegionName = (region) => {
  const regions = {
    '0': '默认地区',
    '1': '亚洲区',
    '2': '欧美区',
    '3': '其他区域'
  }
  return regions[region] || region
}

const loadUserInfo = () => {
  const saved = localStorage.getItem('userInfo')
  if (saved) {
    userInfo.value = JSON.parse(saved)
  }
}

const goToHome = () => {
  router.push('/')
}

const goToGames = () => {
  router.push('/service')
}

const goToLogin = () => {
  router.push('/login')
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userInfo')
  userInfo.value = null
  showToast('已退出登录')
  router.push('/')
}

onMounted(() => {
  loadUserInfo()
})
</script>

<style scoped>
.user {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.content {
  padding: 10px;
}

.user-info {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.avatar-section {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.user-details {
  margin-left: 15px;
}

.nickname {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.user-id {
  font-size: 14px;
  color: #666;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.login-prompt {
  margin-top: 50px;
}
</style>