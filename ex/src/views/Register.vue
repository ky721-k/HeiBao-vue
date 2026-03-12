<template>
  <div class="register">
    <van-nav-bar
      title="注册"
      left-arrow
      @click-left="goBack"
      fixed
      placeholder
    />

    <div class="content">
      <div class="register-form">
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
            <van-field
              v-model="confirmPassword"
              type="password"
              name="confirmPassword"
              label="确认密码"
              placeholder="请再次输入密码"
              :rules="[
                { required: true, message: '请确认密码' },
                { validator: validatePassword, message: '两次密码输入不一致' }
              ]"
            />
            <van-field
              v-model="nickName"
              name="nickName"
              label="昵称"
              placeholder="请输入昵称"
              :rules="[{ required: true, message: '请填写昵称' }]"
            />
          </van-cell-group>

          <div class="form-actions">
            <van-button round block type="primary" native-type="submit">
              注册
            </van-button>
            <van-button round block plain type="primary" @click="goToLogin">
              已有账号？去登录
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
import { register } from '../api'
import { showToast } from 'vant'

const router = useRouter()
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const nickName = ref('')

const goBack = () => {
  router.back()
}

const goToLogin = () => {
  router.push('/login')
}

const validatePassword = (val) => {
  return val === password.value
}

const onSubmit = async (values) => {
  try {
    const res = await register()
    if (res.code === 0) {
      showToast('注册成功')
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('userInfo', JSON.stringify(res.data.user))
      router.push('/')
    } else {
      showToast(res.msg || '注册失败')
    }
  } catch (error) {
    showToast('注册失败，请重试')
  }
}
</script>

<style scoped>
.register {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.content {
  padding: 20px 10px;
}

.register-form {
  margin-top: 20px;
}

.form-actions {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>