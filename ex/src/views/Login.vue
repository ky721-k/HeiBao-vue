<template>
  <div class="login">
    <van-nav-bar
      title="登录"
      left-arrow
      @click-left="goBack"
      fixed
      placeholder
    />

    <div class="content">
      <div class="login-form">
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <van-field
              v-model="username"
              name="username"
              label="用户名"
              placeholder="请输入用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
              v-model="password"
              type="password"
              name="password"
              label="密码"
              placeholder="请输入密码"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
          </van-cell-group>

          <div class="form-actions">
            <van-button round block type="primary" native-type="submit">
              登录
            </van-button>
            <van-button round block plain type="primary" @click="goToRegister">
              注册账号
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../api'
import { showToast } from 'vant'

const router = useRouter()
const username = ref('')
const password = ref('')

const goBack = () => {
  router.back()
}

const goToRegister = () => {
  router.push('/register')
}

const onSubmit = async (values) => {
  try {
    const res = await login()
    if (res.code === 0) {
      showToast('登录成功')
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('userInfo', JSON.stringify(res.data.user))
      router.push('/')
    } else {
      showToast(res.msg || '登录失败')
    }
  } catch (error) {
    showToast('登录失败，请重试')
  }
}
</script>

<style scoped>
.login {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.content {
  padding: 20px 10px;
}

.login-form {
  margin-top: 20px;
}

.form-actions {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>