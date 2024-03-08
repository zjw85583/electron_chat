<!-- 上传文件组件 -->
<template>
  <div>
    <input type="file" @change="handleChange" v-show="false" ref="fileRef">
    <FolderOpenOutlined @click="$refs.fileRef.click()"></FolderOpenOutlined>
  </div>
</template>

<script>
import { FolderOpenOutlined } from '@ant-design/icons-vue'
import { fileUpload } from '@/api/chat'
export default {
  components: {
    FolderOpenOutlined,
  },
  methods: {
    async handleChange(e) {
      console.log('e', e.target.files[0])
      const formData = new FormData()
      formData.append("file", e.target.files[0])
      const res = await fileUpload(formData)
      console.log('res', res)
    }
  },
}
</script>

<style scoped></style>