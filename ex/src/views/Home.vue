<template>
  <div class="home">
    <van-nav-bar
      title="游戏大厅"
      fixed
      placeholder
    />

    <div class="content">
      <van-swipe class="banner-swipe" :autoplay="3000">
        <van-swipe-item v-for="(image, index) in bannerImages" :key="index">
          <img :src="image" class="banner-image" />
        </van-swipe-item>
      </van-swipe>

      <van-grid :column-num="2" class="game-grid">
        <van-grid-item
          v-for="(game, key) in gameList"
          :key="key"
          :text="key"
          @click="goToGames(key)"
        >
          <template #icon>
            <div class="game-category">
              <img :src="getGameIcon(game[0])" class="category-icon" />
              <span class="game-count">{{ game.length }} 款游戏</span>
            </div>
          </template>
        </van-grid-item>
      </van-grid>

      <div class="user-section" v-if="userInfo">
        <van-cell-group>
          <van-cell title="用户信息" :value="userInfo.nickName" />
          <van-cell title="余额" :value="userInfo.coin + ' ' + userInfo.currency" />
        </van-cell-group>
      </div>
    </div>

    <van-tabbar v-model="active" fixed>
      <van-tabbar-item name="home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item name="games" icon="apps-o" @click="goToGames()">游戏</van-tabbar-item>
      <van-tabbar-item name="user" icon="user-o" @click="goToUser">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getGameList, getUserInfo } from '../api'
import { showToast } from 'vant'

const router = useRouter()
const active = ref('home')
const gameList = ref({})
const userInfo = ref(null)

const bannerImages = [
  'https://img.yzcdn.cn/vant/banner1.jpg',
  'https://img.yzcdn.cn/vant/banner2.jpg'
]

const getGameIcon = (filename) => {
  return `/icons/${Object.keys(gameList.value)[0]}/${filename}`
}

const goToGames = (category) => {
  router.push({ path: '/service', query: { category } })
}

const goToUser = () => {
  router.push('/user')
}

const loadData = async () => {
  try {
    const [gameRes, userRes] = await Promise.all([
      getGameList(),
      getUserInfo()
    ])

    if (gameRes.code === 0) {
      gameList.value = gameRes.data
    }

    if (userRes.code === 0) {
      userInfo.value = userRes.data
    }
  } catch (error) {
    showToast('数据加载失败')
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.home {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.banner-swipe {
  height: 120px;
  margin: 10px;
  border-radius: 8px;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.game-grid {
  margin: 10px;
}

.game-category {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.category-icon {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 5px;
}

.game-count {
  font-size: 12px;
  color: #666;
}

.user-section {
  margin: 10px;
  border-radius: 8px;
  overflow: hidden;
}
</style>