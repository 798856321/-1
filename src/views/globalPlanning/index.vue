<template>
   <div class="globalPlanning">
      <div class="globalPlanning-left">
         <div v-if="!isShowSelect" class="left">
            <div class="city">
               <div class="title">请选择</div>
               <div class="cityBox">
                  <div v-for="item in mapList">
                     <div :class="[item.active ? 'active' : '']" @click="getMap(item)">{{ item.name
                        }}</div>
                  </div>

               </div>
            </div>
            <el-button @click="showMoreMap" style="margin: 50px auto;" type="warning" round>确定</el-button>
         </div>
         <div class="left" v-if="isShowSelect">
            <div class="weizhi">
               <div class="start">{{ city1.name }}</div>
               <div class="end">{{ city2.name }}</div>
            </div>
            <div class="city">
               <div class="title">请输入起点信息</div>
               <div class="cityBox">
                  <div v-for="item in data1">
                     <div :class="[item.active ? 'active' : '']" @click="getnum(item, data1, '1')">{{ item.name
                        }}</div>
                  </div>
               </div>
            </div>
            <div class="city">
               <div class="title">请输入终点信息</div>
               <div class="cityBox">
                  <div v-for="item in data2">
                     <div :class="[item.active ? 'active' : '']" @click="getnum(item, data2, '2')">{{ item.name
                        }}</div>
                  </div>
               </div>
            </div>
            <el-button @click="getMapShow" style="margin: 50px auto;" type="warning" round>确定</el-button>
         </div>
      </div>
      <div class="globalPlanning-right">
         <div class="topbox">
            <div class="bgbox">
               <div class="videoBox">
                  <!-- v-if="isShowSelect"  -->
                  <!-- <video ref="videoPlayer" :src="videoSource" autoplay @play="onPlay" @pause="onPause"
                     @ended="onEnded"></video> -->
                  <mapBox ref="child" :params="params"></mapBox>
               </div>
            </div>
         </div>
         <!-- <div class="bottomMent">
            <img src="../../assets/img/allAlgorithms/bottomBg.png" alt="">
         </div> -->

      </div>
   </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllmap, getStarNode, getEndNode,getCoordinate } from '../../api'
import mapBox from './map.vue'
import log from 'video.js/dist/types/utils/log';
const isShowSelect = ref(false);
const isShowMap = ref(false);
const city1 = ref({})
const city2 = ref({})
let list = ref([])
const child = ref(null);
const allmap = ref('');
const params = ref({
   coordinate: [],
   starNode: [],
   list: []
})
let mapList = ref([
])
let data1 = ref([
   // {
   //    name: '地点1',
   //    active: false,
   // }
])
let data2 = ref([
   // {
   //    name: '地点2',
   //    active: false,
   // }
])



const getnum = (item: { name?: any; }, value: any[], ele: string) => {
   if (ele === '1') {
      city1.value = item
   } else {
      city2.value = item
   }
   value.forEach((element: { name: any; active: boolean; }) => {
      if (element.name === item.name) {
         element.active = true
      } else {
         element.active = false
      }
   });

}
const getMap = (item:any) => {
   console.log(mapList.value);
   mapList.value.forEach(element => {
      if (element.name === item.name) {
         element.active = true
         allmap.value = item.name
         params.value.coordinate = item.coordinate
      } else {
         element.active = false
      }
   });
}

const getAllmaps = () => {
   getAllmap().then((res: any) => {
      if (res.code == 200) {
         res.data.forEach((item:any) => {
            mapList.value.push({
               name: item.name,
               active: true,
               coordinate: JSON.parse(item.coordinate)
            })
         });
      }

   })
}

const getStarNodes = () => {
   getStarNode(allmap.value).then((res: any) => {
      if (res.code == 200) {
         res.data.forEach((item:any) => {
            data1.value.push({
               name: item.name,
               active: true,
            })
         });
      }

   })
}
const getEndNodes = () => {
   getEndNode(allmap.value).then((res: any) => {
      if (res.code == 200) {
         res.data.forEach((item:any) => {
            data2.value.push({
               name: item.name,
               active: true,
            })
         });
      }

   })
}

const getCoordinates = () => {
   let data = {
      cityName: allmap.value,
      starName:city1.value.name,
      endName:city2.value.name
   }
   getCoordinate(data).then((res: any) => {
      if (res.code == 200) {
         params.value.list =  JSON.parse(res.data)
         console.log('====>',params.value)
         child.value.initMap()
      }

   })
}
const getMapShow = () => {
   getCoordinates()
}
const showMoreMap = () => {
   if(allmap.value == '') return
   isShowSelect.value = true
   child.value.initMap()
   getStarNodes()
   getEndNodes()
}

onMounted(() => {
   getAllmaps()
})
</script>


<style lang="scss" scoped>
.globalPlanning {
   width: 100%;
   height: 100%;
   display: flex;

   .globalPlanning-left {
      width: 200px;
      height: 100%;
      padding: 30px 16px;
      background-color: rgb(45, 87, 61);
      ;

      .left {
         display: flex;
         flex-direction: column;
         justify-content: center;

         .weizhi {
            width: 90%;
            height: 100px;
            background-image: url('../../assets/img/WechatIMG3.jpg');
            background-position: top left;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            position: relative;

            .start {
               position: absolute;
               top: 23px;
               left: 52px;
            }

            .end {
               position: absolute;
               left: 52px;
               top: 58px;
            }
         }

         .city {
            margin-top: 30px;
            width: 90%;
            height: 200px;
            background-image: url('../../assets/img/WechatIMG2.jpg');
            background-position: top left;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            position: relative;

            .title {
               position: absolute;
               top: 17px;
               left: 52px;

            }

            .cityBox {
               position: absolute;
               top: 70px;
               left: 30px;
               color: #fff;

               .active {
                  background-color: goldenrod;
                  padding: 0 4px;
                  border-radius: 24px;
               }
            }
         }
      }
   }

   .globalPlanning-right {
      flex: 1;
      background-image: url('../../assets/img/globalPlanning/groupbg.png');
      background-position: top left;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      padding: 30px 12px 12px 12px;

      .topbox {
         width: 100%;
         height: 90%;
         border-radius: 60px;
         background-color: rgb(2, 28, 2);
         padding: 4px;
         overflow: hidden;

         .bgbox {
            width: 100%;
            height: 100%;
            background-image: url('../../assets/img/allAlgorithms/menuBg.png');
            background-position: top left;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            display: flex;
            justify-content: center;
            overflow: hidden;
            padding: 12px;

            .videoBox {
               width: 95%;
               height: 95%;
               overflow: hidden;

               video {
                  width: 100%;
                  height: 100%;
               }
            }
         }
      }

      .bottomMent {
         margin: 12px auto;
         width: 80%;

         img {
            width: 100%;
            height: 50px;
         }
      }
   }
}
</style>
