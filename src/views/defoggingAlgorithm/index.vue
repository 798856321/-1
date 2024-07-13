<template>
   <div class="allAlgorithms">
      <div class="allAlgorithms-left">
         <div class="menu">
            <div class="menu-box">
               <div class="menuTitle">
                  <img src="../../assets/img/allAlgorithms/titleImg1.png" alt="" srcset="">
                  算法选择
               </div>
               <div class="menuCount">
                  <div class="menuGroup">
                     <div class="menuGroupTitle">烟雾浓度选择</div>
                     <div class="menuItemBox">
                        <div v-for="ele in data1">
                           <span @click="getItem(ele, data1)" :class="[ele.isActive ? 'active' : '']">{{ ele.name
                              }}</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="menu-box" style="margin-top: 50px;">
               <div class="menuTitle">
                  <img src="../../assets/img/allAlgorithms/titleImg1.png" alt="" srcset="">
                  是否开启目标检测
               </div>
               <div class="menuCount">
                  <div class="menuGroup">
                     <!-- <div class="menuGroupTitle">去雾算法</div> -->
                     <div class="menuItemBox">
                        <div v-for="ele in data2">
                           <span @click="getItem(ele, data2)" :class="[ele.isActive ? 'active' : '']">{{ ele.name
                              }}</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <el-button @click="showVideo" style="margin: 50px auto;" type="warning" round>确定</el-button>
         </div>
      </div>
      <div class="allAlgorithms-right">
         <div class="topbox">
            <div class="bgbox">
               <div class="videoBox">
                  <video ref="videoPlayer1" controls :src="videoSource1" autoplay></video>
                  <p v-if="videoSource1" style="font-size: 16px; color: goldenrod;text-align: center;">有雾</p>
               </div>
               <div class="videoBox">
                  <video ref="videoPlayer2" controls :src="videoSource2" autoplay></video>
                  <p v-if="videoSource2" style="font-size: 16px; color: goldenrod;text-align: center;">去雾</p>
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
import { getVideoByConditions, getComparisonVideo } from '../../api'
import { ElMessage, ElMessageBox } from 'element-plus'
const count = ref(0)
const videoPlayer1 = ref(null);
const videoPlayer2 = ref(null);
const videoSource1 = ref(null)
const videoSource2 = ref(null)
const isPlaying = ref(false);
const name1 = ref('');
const name2 = ref('');

let list = ref([])
const data1 = ref([
   {
      name: '低浓度',
      id: 1,
      isActive: false
   },
   {
      name: '中浓度',
      id: 2,
      isActive: false
   },
   {
      name: '高浓度',
      id: 3,
      isActive: false
   },
])
const data2 = ref([
   {
      name: '是',
      id: 1,
      isActive: false
   },
   {
      name: '否',
      id: 2,
      isActive: false
   },
])

const getItem = (item, data) => {
   data.forEach(ele => {
      if (ele.id === item.id) {
         ele.isActive = true
      } else {
         ele.isActive = false
      }
   });

}

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
const getAllalgorithms = () => {
   data1.value.forEach(ele => {
      if (ele.isActive == true) {
         name1.value = ele.name
      }
   });
   data2.value.forEach(ele => {
      if (ele.isActive == true) {
         name2.value = ele.name
      }
   });
   console.log(name1.value, name2.value);

   getVideoByConditions(name1.value, name2.value).then((res: any) => {
      if (res.code == 200) {
         getComparisonVideo(res.data.name).then((result) => {
            videoSource1.value = `http://127.0.0.1:8080/upload/${result.data.name}`
            videoSource2.value = `http://127.0.0.1:8080/upload/${result.data.comparison}`
         })

      }

   })
}
const showVideo = () => {
   getAllalgorithms()
};
onMounted(() => {
   // getAllalgorithms()
})
</script>


<style lang="scss" scoped>
.allAlgorithms {
   width: 100%;
   height: 100%;
   display: flex;

   .allAlgorithms-left {
      width: 200px;
      height: 100%;
      padding: 30px 16px;
      background-color: rgb(45, 87, 61);
      ;

      .menu {
         display: flex;
         flex-direction: column;
         justify-content: center;

         .menu-box {
            border-radius: 20px;
            background-color: rgb(2, 28, 2);
            padding: 4px;

            .menuTitle {
               height: 40px;
               display: flex;
               align-items: center;
               background-color: rgb(95, 199, 95);
               border-radius: 20px;
               padding: 0 5px;
               margin-bottom: 4px;

               img {
                  height: 25px;
                  width: 25px;
               }
            }

            .menuCount {
               background-image: url('../../assets/img/allAlgorithms/menuBg.png');
               background-position: top left;
               background-size: 100% 100%;
               background-repeat: no-repeat;
               padding: 12px;

               .menuGroup {
                  .menuGroupTitle {
                     color: #fff;
                     margin: 5px 0;
                  }

                  .menuItemBox {
                     padding: 12px;
                     border-radius: 12px;
                     background-color: rgb(237, 227, 214);
                     color: rgb(2, 28, 2);

                     div {
                        margin: 5px 0;
                     }

                     .active {
                        background-color: goldenrod;
                        padding: 0 4px;
                        border-radius: 24px;
                     }
                  }
               }
            }
         }
      }
   }

   .allAlgorithms-right {
      flex: 1;
      background-image: url('../../assets/img/allAlgorithms/groupbg.png');
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
               width: 47%;
               height: 93%;

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
