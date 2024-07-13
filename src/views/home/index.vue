<template>
   <div class="homeBox">
      <div class="homeBg"></div>
      <div class="menu">
         <template v-for="item in list">
            <div class="menu-item item1" v-if="item.id === 3">
               <div @click="goAllAlgorithms(item)" class="itemButton"></div>
            </div>
            <div class="menu-item item2" v-if="item.id === 2">
               <div @click="goAllAlgorithms(item)" class=" itemButton"></div>
            </div>
            <div class="menu-item item3" v-if="item.id === 6">
               <div @click="goAllAlgorithms(item)" class="itemButton"></div>
            </div>
            <div class="menu-item item4" v-if="item.id === 5">
               <div @click="goAllAlgorithms(item)" class="itemButton"></div>
            </div>
            <div class="menu-item item5" v-if="item.id === 4">
               <div @click="goAllAlgorithms(item)" class=" itemButton"></div>
            </div>
         </template>
      </div>
   </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const list = ref([])
const goAllAlgorithms = (item) => {
   router.push(item.path)
}


onMounted(() => {
   list.value = JSON.parse(sessionStorage.getItem('list'))
})
</script>


<style lang="scss" scoped>
.homeBox {
   height: 100%;
   position: relative;

   .homeBg {
      height: 70%;
      background-image: url('../../assets/img/home/homeBg.png');
      background-position: top left;
      background-size: 100% 100%;
      background-repeat: no-repeat;
   }

   .menu {
      // border: 1px solid red;
      width: 100%;
      // padding: 0 20px;
      display: flex;
      justify-content: space-around;
      position: absolute;
      bottom: 0;

      .menu-item {
         width: 18%;
         height: 350px;
         // border: 1px solid red;
         background-position: top left;
         background-size: 100% 100%;
         background-repeat: no-repeat;
         position: relative;

         .itemButton {
            position: absolute;
            width: 110px;
            height: 24px;
            // border: 1px red solid;
            top: 110px;
            left: 20px;
            cursor: pointer;
         }
      }

      .item1 {
         background-image: url('../../assets/img/home/item1.png');
      }

      .item2 {
         background-image: url('../../assets/img/home/item2.png');
      }

      .item3 {
         background-image: url('../../assets/img/home/item3.png');
      }

      .item4 {
         background-image: url('../../assets/img/home/item4.png');
      }

      .item5 {
         background-image: url('../../assets/img/home/item5.png');
      }
   }
}
</style>
