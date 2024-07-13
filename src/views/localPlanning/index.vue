<template>
   <div class="allAlgorithms">
      <div class="allAlgorithms-left">
         <div class="menu">
            <div class="menu-box">
               <div class="menuTitle">
                  <img src="../../assets/img/allAlgorithms/titleImg1.png" alt="" srcset="">
                  静态路径规划
               </div>
               <div class="menuCount">
                  <!-- <div class="menuGroup">
                     <div class="menuGroupTitle">静态障碍物数量</div>
                     <div class="menuItemBox">
                        <span v-for="item in data">
                           <span :class="[item.active ? 'active' : '']" @click="getnum(item, data)">{{ item.name
                              }}</span>
                        </span>
                     </div>
                  </div> -->
                  <div class="menuGroup">
                     <div class="menuGroupTitle">增加障碍物类型</div>
                     <div class="menuItemBox">
                        <span v-for="item in data1">
                           <span :class="[item.active ? 'active' : '']" @click="getnum(item, data1)">{{ item.name
                              }}</span>
                        </span>
                     </div>
                  </div>
                  <!-- <div class="menuGroup">
                     <div class="menuGroupTitle">算法类型</div>
                     <div class="menuItemBox">
                        <span v-for="item in data2">
                           <span :class="[item.active ? 'active' : '']" @click="getnum(item, data2)">{{ item.name
                              }}</span>
                        </span>
                     </div>
                  </div> -->
               </div>
            </div>
            <!-- <div class="menu-box" style="margin-top: 12px;">
               <div class="menuTitle">
                  <img src="../../assets/img/allAlgorithms/titleImg2.png" alt="" srcset="">
                  动态路径规划
               </div>
               <div class="menuCount">
                  <div class="menuGroup">
                     <div class="menuItemBox" style="height: 100px;">


                     </div>
                  </div>
               </div>

            </div> -->
            <el-button @click="showVideo" style="margin: 50px auto;" type="warning" round>确定</el-button>
         </div>
      </div>
      <div class="allAlgorithms-right">
         <div class="topbox">
            <div class="bgbox">
               <div class="videoBox">
                  <video ref="videoPlayer" controls :src="videoSource" autoplay></video>
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
import { allalgorithms, getComparisonVideo } from '../../api'
import { ElMessage, ElMessageBox } from 'element-plus'
const count = ref(0)
const videoPlayer = ref(null);
const videoSource = ref('')
const isPlaying = ref(false);

let list = ref([])
let data = ref([
   {
      name: 1,
      active: true
   },
   {
      name: 3,
      active: false
   },
   {
      name: 5,
      active: false
   },
   {
      name: 7,
      active: false
   },
])
const data1 = ref([
   {
      name: '石头',
      active: false
   },
   {
      name: '木头',
      active: false
   },
   {
      name: '锥桶',
      active: false
   },
   {
      name: '路障',
      active: false
   },
   {
      name: '事故车',
      active: false
   },
])
const data2 = ref([
   {
      name: '算法1',
      active: true
   },
   {
      name: '算法2',
      active: false
   },
   {
      name: '算法3',
      active: false
   },
])
const name1 = ref('');

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
const getnum = (item, value) => {
   value.forEach(element => {
      if (element.name === item.name) {
         element.active = true
      } else {
         element.active = false
      }
   });
}
const getAllalgorithms = () => {
   data1.value.forEach(ele => {
      if (ele.active == true) {
         console.log(ele);
         name1.value = ele.name
      }
   });
   allalgorithms(name1.value).then((res: any) => {
      if (res.code == 200) {
         getComparisonVideo(res.data.name).then((result) => {
            videoSource.value = `http://127.0.0.1:8080/upload/${result.data.name}`
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

                     span {
                        span {
                           margin-right: 12px;
                        }
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
