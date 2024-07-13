<template>
   <div class="login">
      <img src="../../assets/img/car.png" alt="" srcset="">
      <div class="loginBox">
         <div class="formBox">
            <div class="formTitle">无人车路径规划仿真系统</div>
            <el-form label-position="top" class="login-form" ref="formRef" :model="form">
               <el-form-item class="form-item" label="登录名" prop="username">
                  <el-input v-model="form.username" placeholder="请输入你的登录名"></el-input>
               </el-form-item>
               <el-form-item class="form-item" label="密码" prop="password">
                  <el-input v-model="form.password" type="password" placeholder="请输入你的密码"></el-input>
               </el-form-item>
               <el-form-item>
                  <el-button class="login-btn" type="primary" size="large" @click="logins"
                     v-loading="loading">登录</el-button>
               </el-form-item>
            </el-form>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { login, allcategories } from "../../api";

import { setToken } from '../../utils/auth.ts'
import { ElMessage } from 'element-plus'

const router = useRouter()
const loading = ref(false)

const formRef = ref()

const list = ref([])
const form = reactive({
   username: '',
   password: '',
})

const logins = () => {
   loading.value = true
   if (form.username === '' || form.password === '') {
      ElMessage({
         message: '请输入正确登录名密码.',
         type: 'warning',
      })
   }
   router.push('/manage')
   loading.value = false
}


function keydown(e) {
   if (e.key === 'Enter') {
      document.querySelector('.login-btn').click()
   }
}

onMounted(() => {
   document.addEventListener('keydown', keydown)
})
onUnmounted(() => {
   document.removeEventListener('keydown', keydown)
})
const count = ref(0)
</script>


<style lang="scss" scoped>
.login {
   display: flex;

   img {
      width: 45%;
      height: 100%;
   }

   .loginBox {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;

      .formTitle {
         font-size: 16px;
         margin-bottom: 12px;
      }

      .formBox {
         border: 1px solid rgb(66, 84, 74);
         // width: 562px;
         // height: 707px;
         border-radius: 30px;
         padding: 24px;

         .login-form {
            width: 280px;
            margin: 0 auto;

            .form-item {
               :deep(input) {
                  padding-left: 20px;
                  height: 40px;
               }

            }

            .login-btn {
               width: 60%;
               background: green;
               color: #fff;
               border-radius: 20px;
               margin: 0 auto;
               margin-top: 10px;
               overflow: hidden;
            }
         }
      }
   }
}
</style>
