<template>
   <div class="layout">
      <headerInfo></headerInfo>
      <div class="layoutBottom">
         <router-view v-slot="{ Component }">
            <component :is="Component" :key="route.fullPath"></component>
         </router-view>
      </div>
   </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import headerInfo from './components/headerInfo.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const count = ref(0)
</script>


<style lang="scss" scoped>
.layout {
   width: 100%;
   height: 100%;
   overflow: hidden;

   .layoutBottom {
      width: 100%;
      height: calc(100% - 44px);
   }
}
</style>
