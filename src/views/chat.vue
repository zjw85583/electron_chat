<!-- 聊天界面 -->
<template>
  <div>

    <!-- 头像昵称 -->
    <div class="header">
      <h2>朱俊-刘杰</h2>
    </div>

    <!-- 消息列表 -->
    <div class="chatList">
      <div v-for="(item, index) in list" :key="index">
        <!-- 左边消息 -->
        <div class="leftBox box" v-if="!item.type">
          <!-- 头像 -->
          <a-avatar class="avatar" shape="square" :size="35">
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>
          <!-- 消息内容 -->
          <div class="content" :style="{ maxWidth: contentWidth + 'px', marginLeft: '10px' }">
            <div>{{ item.content }}</div>
          </div>
        </div>
        <!-- 右侧消息 -->
        <div class="rightBox box" v-else>
          <!-- 消息内容 -->
          <div class="content" :style="{ maxWidth: contentWidth + 'px', marginRight: '10px' }">
            <div>{{ item.content }}</div>
          </div>
          <!-- 头像 -->
          <a-avatar class="avatar" shape="square" :size="35">
            <template #icon>
              <UserOutlined style="color: red;" />
            </template>
          </a-avatar>
        </div>
      </div>
    </div>
    <a-form class="form">
      <a-textarea class="textarea" ref="textarea" v-model:value.trim="chatValue" :auto-size="{ minRows: 4, maxRows: 4 }"
        @pressEnter="sendMessage" />
      <div class="send" @click="sendMessage">发送</div>
    </a-form>
  </div>
</template>

<script>
import { UserOutlined } from '@ant-design/icons-vue';
import io from 'socket.io-client';
export default {
  name: 'Chat',
  components: {
    UserOutlined,
  },
  data() {
    return {
      contentWidth: document.documentElement.clientWidth / 2 - 100,
      chatValue: "",
      socket: null,
      list: [
      ]
    }
  },
  methods: {
    socketHandle() {
      // 连接到socket.io服务器
      this.socket = io('http://127.0.0.1:8888');
      // 添加事件监听---自己
      this.socket.on('message', (data) => {
        // 处理收到的消息
        console.log('Received message:', data);
        this.list.push(data)
      });
      // 添加事件监听 --- 对方
      this.socket.on('dmessage', (data) => {
        // 处理收到的消息
        console.log('Received ·:', data);
        this.list.push(data)
      });

    },
    sendMessage(e) {
      e.preventDefault();
      if (!this.chatValue) return
      const params = {
        content: this.chatValue,
      }
      // 发送消息到socket.io服务器
      this.socket.emit('message', params);

      // 清空输入框
      this.chatValue = "";
    },
  },
  mounted() {
    this.$refs.textarea.focus()
    window.addEventListener('resize', () => {
      this.contentWidth = document.documentElement.clientWidth / 2 - 100
    })

    // 连接socket
    this.socketHandle()
  },
}
</script>

<style scoped>
.form {
  position: fixed;
  bottom: 0;
  width: 100%;
}

.textarea {
  border: 1px solid rgb(171, 171, 171, .5);
}

.send {
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #e9e9e9;
  color: #06ae56;
  cursor: pointer;
  border-radius: 10px;
  user-select: none;
}

.header {
  padding: 5px 25px;
  border-bottom: 1px solid #f5f5f5;
  position: sticky;
  top: 0;
  display: flex;
}
.chatList {
  padding: 10px 20px;
  overflow-y: auto;
  height: calc(100vh - 98px - 54.5px);
  background-color: #f5f5f5;
}

.box {
  margin-bottom: 10px;
}

.leftBox {
  display: flex;
  justify-content: flex-start;
}

.rightBox {
  display: flex;
  justify-content: flex-end;
}

.content {
  position: relative;
  min-height: 35px;
  border-radius: 5px;
  padding: 6px 10px;
  font-size: 14px;
}


.content::before {
  content: "";
  width: 10px;
  height: 10px;
  clip-path: polygon(0 100%, 100% 100%, 50% 50%);
  position: absolute;
  top: 12px;
}

/* 左侧消息 */
.leftBox>.content {
  background-color: #fff;
}

.leftBox>.content::before {
  left: -10px;
  transform: rotate(-0.25turn);
  background-color: #fff;
}

/* 右侧消息 */
.rightBox>.content {
  background-color: #95ec69;
}

.rightBox>.content::before {
  right: -10px;
  transform: rotate(0.25turn);
  background-color: #95ec69;
}
</style>