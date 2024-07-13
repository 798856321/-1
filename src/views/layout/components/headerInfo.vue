<template>
   <div class="headerInfo">
      <div class="headerLeft">
         <img src="@/assets/img/logo.jpg" alt="" srcset="">
         <span>无人车路径规划仿真系统</span>
      </div>
      <div class="headerRight">
         <div class="menu">
            <template v-for="item in list">
               <div :class="[item.isActive ? 'active' : '']" @click="goFirst(item)">{{ item.name }}</div>
            </template>
         </div>
         <div class="user">
            <span>用户名称</span>
            <span>
               <el-icon>
                  <Avatar />
               </el-icon>
            </span>
         </div>
         <div style="margin-left: 15px;" @click="goBack">返回首页</div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const count = ref(1)
const list = ref([])
// 监听当前路由
watch(
   () => router.currentRoute.value,
   (newValue: any) => {
      list.value.forEach(ele => {
         if (ele.path === `/${newValue.name}`) {
            ele.isActive = true
         } else {
            ele.isActive = false
         }
      });
   },
   { immediate: true }
)
const goFirst = (item) => {
   router.push(item.path)
   list.value.forEach(ele => {
      if (ele.name === item.name) {
         ele.isActive = true
      } else {
         ele.isActive = false
      }
   });
}
const goBack = () => {
   router.push('/logo')
}
onMounted(() => {
   list.value = JSON.parse(sessionStorage.getItem('list'))
   if (list.value) {
      list.value.forEach(ele => {
         ele.isActive = false
      });
   }
   // console.log(list.value);

})
</script>


<style lang="scss" scoped>
.headerInfo {
   background-color: rgb(45, 87, 61);
   color: #fff;
   padding: 0 12px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   height: 54px;

   .headerLeft {
      display: flex;
      align-items: center;

      img {
         width: 40px;
         height: 40px;
         border-radius: 50%;
         margin-right: 5px;
      }
   }

   .headerRight {
      display: flex;

      .menu {
         display: flex;
         margin-right: 30px;

         div {
            margin-right: 12px;
            cursor: pointer;
            padding: 0 10px;
            border-radius: 15px;
         }
      }

      .user {
         display: flex;
      }
   }
}

.active {
   background-color: rgba(238, 208, 75, 0.5);
   font-size: 18px;
}
</style>
