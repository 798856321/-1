<template>
   <div class="globalPlanning">
      <div class="globalPlanning-left">
         <!-- <div v-if="!isShowSelect" class="left">
            <div class="city">
               <div class="title">请选择要使用的地图</div>
               <div class="cityBox">
                  <div v-for="item in mapList">
                     <div :class="[item.active ? 'active' : '']" @click="getMap(item)">{{ item.name
                        }}</div>
                  </div>

               </div>
            </div>
            <el-button @click="isShowSelect = true" style="margin: 50px auto;" type="warning" round>确定</el-button>
         </div> v-if="isShowSelect" -->
         <div class="left">
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
import { allalgorithms } from '../../api'
import { ElMessage, ElMessageBox } from 'element-plus'
import mapBox from './map.vue'
const count = ref(0)
const videoPlayer = ref(null);
const videoSource = ref('')
const isPlaying = ref(false);
const isShowSelect = ref(false);
const isShowMap = ref(false);
const city1 = ref({})
const city2 = ref({})
let list = ref([])
const child = ref(null);
const params = ref({
   longLat1: [],
   longLat2: [],
})
let mapList = ref([
   {
      name: '高德地图',
      active: false,
   },
   {
      name: '百度地图',
      active: false,
   },

])
let data1 = ref([
   {
      name: '地点1',
      active: false,
      longLat: [108.94235, 34.260977]
   },
   // {
   //    name: '西安交通大学',
   //    active: false,
   //    longLat: [108.979049857, 34.2453779451]
   // },
   // {
   //    name: '西安',
   //    active: false
   // },
   // {
   //    name: '武汉',
   //    active: false
   // },
   // {
   //    name: '成都',
   //    active: false
   // },
])
let data2 = ref([
   {
      name: '地点2',
      active: false,
      longLat: [108.979049857, 34.2453779451]
   },
   // {
   //    name: '上海',
   //    active: false
   // },
   // {
   //    name: '西安',
   //    active: false
   // },
   // {
   //    name: '武汉',
   //    active: false
   // },
   // {
   //    name: '成都',
   //    active: false
   // },
])

const playOrPause = () => {
   if (videoPlayer.value.paused) {
      videoPlayer.value.play();
   } else {
      videoPlayer.value.pause();
   }
};

const onPlay = () => {
   isPlaying.value = true;
};

const onPause = () => {
   isPlaying.value = false;
};

const onEnded = () => {
   console.log('Video ended');
};
const getnum = (item, value, ele) => {
   if (ele === '1') {
      city1.value = item
   } else {
      city2.value = item
   }
   value.forEach(element => {
      if (element.name === item.name) {
         element.active = true
      } else {
         element.active = false
      }
   });
   // if (city1.value !== '' && city2.value !== '') {
   //    ElMessageBox.confirm(
   //       '是否生成视频?',
   //       'Warning',
   //       {
   //          confirmButtonText: '确认生成',
   //          cancelButtonText: '取消',
   //          type: 'success',
   //       }
   //    )
   //       .then(() => {
   //          videoSource.value = `http://127.0.0.1:8080/upload/${list.value[0].video}`
   //       })
   // }

}
const getMap = (item) => {
   mapList.value.forEach(element => {
      if (element.name === item.name) {
         element.active = true
      } else {
         element.active = false
      }
   });
}

const getAllalgorithms = () => {
   allalgorithms('全局路径规划').then((res: any) => {
      if (res.code == 200) {
         list.value = res.data
      }

   })
}
const getMapShow = () => {

   params.value.longLat1 = city1.value.longLat
   params.value.longLat2 = city2.value.longLat
   child.value.initMap()
}

onMounted(() => {
   getAllalgorithms()
})
</script>


<style lang="scss" scoped>
.globalPlanning {
   width: 100%;
   height: 100%;
   display: flex;

   .globalPlanning-left {
      width: 240px;
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
