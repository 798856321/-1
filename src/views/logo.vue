<template>
   <div class="logoBox">
      <div class="menu">
         <div class="menuItem" @click="goLogin">
            <el-icon style="margin-right: 8px;">
               <Lock />
            </el-icon>
            登陆
         </div>
         <div class="menuItem" @click="goOtherLogin">
            <el-icon style="margin-right: 8px;">
               <Lock />
            </el-icon>
            管理员登陆
         </div>
         <div class="menuItem">
            常见问题
         </div>
         <div class="menuItem">
            关于我们
         </div>
      </div>
      <div class="msgBox">
         <div class="msgBox_top">
            <img src="../assets/img/zhMsg.png" alt="" srcset="">
         </div>
         <div class="msgBox_bottom">
            <img src="../assets/img/enMsg.png" alt="" srcset="">
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goLogin = () => {
   router.push('/login')
}
const goOtherLogin = () => {
   router.push('/otherLogin')
}
</script>
<style lang="scss" scoped>
.logoBox {
   height: 100vh;
   overflow: hidden;
   padding: 16px;
   background-image: url('../assets/img/logoBg.png');
   background-position: top left;
   background-size: 100% 100%;
   background-repeat: no-repeat;
   position: relative;

   .menu {
      display: flex;
      justify-content: end;
      height: 24px;
      color: #fff;

      .menuItem {
         display: flex;
         align-items: center;
         margin-right: 16px;
      }
   }

   .msgBox {
      position: absolute;
      bottom: 100px;
      left: 50px;

      .msgBox_top {
         img {
            width: 680px;
            height: 250px;
         }
      }

      .msgBox_bottom {
         border-top: 1px solid #fff;
         margin-top: -53px;
         padding-top: 8px;
         width: 680px;

         img {
            width: 350px;
         }
      }
   }
}
</style>