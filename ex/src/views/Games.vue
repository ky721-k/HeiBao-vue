<template>
  <div class="customer-service">
    <van-nav-bar
      title="客服中心"
      left-arrow
      @click-left="goBack"
      fixed
      placeholder
    />

    <div class="content">
      <!-- 客服联系方式 -->
      <div class="contact-section">
        <van-cell-group>
          <van-cell
            title="在线客服"
            value="24小时服务"
            is-link
            @click="openOnlineService"
          >
            <template #icon>
              <van-icon name="service-o" class="contact-icon" />
            </template>
          </van-cell>
          <van-cell
            title="客服热线"
            value="400-123-4567"
            is-link
            @click="callCustomerService"
          >
            <template #icon>
              <van-icon name="phone-o" class="contact-icon" />
            </template>
          </van-cell>
          <van-cell
            title="客服邮箱"
            value="service@games.com"
            is-link
            @click="sendEmail"
          >
            <template #icon>
              <van-icon name="envelop-o" class="contact-icon" />
            </template>
          </van-cell>
        </van-cell-group>
      </div>

      <!-- 常见问题 -->
      <div class="faq-section">
        <van-cell-group title="常见问题">
          <van-collapse v-model="activeNames">
            <van-collapse-item title="如何注册账号？" name="1">
              点击首页的注册按钮，填写用户名、密码和昵称即可完成注册。
            </van-collapse-item>
            <van-collapse-item title="忘记密码怎么办？" name="2">
              请联系客服重置密码，或提供注册邮箱进行密码找回。
            </van-collapse-item>
            <van-collapse-item title="如何充值？" name="3">
              登录后在个人中心选择充值选项，支持多种支付方式。
            </van-collapse-item>
            <van-collapse-item title="游戏无法登录怎么办？" name="4">
              请检查网络连接，确认账号密码正确，如仍有问题请联系客服。
            </van-collapse-item>
          </van-collapse>
        </van-cell-group>
      </div>

      <!-- 意见反馈 -->
      <div class="feedback-section">
        <van-cell-group title="意见反馈">
          <van-field
            v-model="feedback"
            rows="4"
            autosize
            type="textarea"
            maxlength="500"
            placeholder="请输入您的意见或建议..."
            show-word-limit
          />
          <div class="feedback-actions">
            <van-button round block type="primary" @click="submitFeedback">
              提交反馈
            </van-button>
          </div>
        </van-cell-group>
      </div>

      <!-- 服务时间 -->
      <div class="service-time">
        <van-notice-bar
          left-icon="info-o"
          text="客服服务时间：24小时在线，节假日不休"
        />
      </div>
    </div>

    <van-tabbar v-model="active" fixed>
      <van-tabbar-item name="home" icon="home-o" @click="goToHome">首页</van-tabbar-item>
      <van-tabbar-item name="service" icon="service-o">客服</van-tabbar-item>
      <van-tabbar-item name="user" icon="user-o" @click="goToUser">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showDialog, showLoadingToast, closeToast } from 'vant'

const router = useRouter()
const active = ref('service')
const activeNames = ref(['1'])
const feedback = ref('')

const goBack = () => {
  router.back()
}

const goToHome = () => {
  router.push('/')
}

const goToUser = () => {
  router.push('/user')
}

const openOnlineService = () => {
  showDialog({
    title: '在线客服',
    message: '正在为您连接在线客服，请稍候...',
    showCancelButton: true,
    confirmButtonText: '开始聊天'
  }).then(() => {
    showToast('正在打开聊天窗口...')
    // 这里可以集成实际的在线客服系统
  })
}

const callCustomerService = () => {
  showDialog({
    title: '拨打电话',
    message: '是否拨打客服热线 400-123-4567？',
    showCancelButton: true,
    confirmButtonText: '拨打'
  }).then(() => {
    window.location.href = 'tel:400-123-4567'
  })
}

const sendEmail = () => {
  showDialog({
    title: '发送邮件',
    message: '是否发送邮件至 service@games.com？',
    showCancelButton: true,
    confirmButtonText: '发送'
  }).then(() => {
    window.location.href = 'mailto:service@games.com'
  })
}

const submitFeedback = () => {
  if (!feedback.value.trim()) {
    showToast('请输入反馈内容')
    return
  }

  showLoadingToast({
    message: '提交中...',
    forbidClick: true,
    duration: 0
  })

  // 模拟提交反馈
  setTimeout(() => {
    closeToast()
    showToast('反馈提交成功，感谢您的建议！')
    feedback.value = ''
  }, 1500)
}
</script>

<style scoped>
.customer-service {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.content {
  padding-bottom: 50px;
}

.contact-section {
  margin: 10px;
  border-radius: 8px;
  overflow: hidden;
}

.contact-icon {
  font-size: 20px;
  color: #1989fa;
  margin-right: 8px;
}

.faq-section {
  margin: 10px;
  border-radius: 8px;
  overflow: hidden;
}

.feedback-section {
  margin: 10px;
  border-radius: 8px;
  overflow: hidden;
}

.feedback-actions {
  padding: 16px;
  border-top: 1px solid #f5f5f5;
}

.service-time {
  margin: 10px;
  border-radius: 8px;
  overflow: hidden;
}
</style>