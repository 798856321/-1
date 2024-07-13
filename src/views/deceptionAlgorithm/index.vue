<template>
   <div class="allAlgorithms">
      <div class="allAlgorithms-left">
         <div class="menu">
            <div class="menu-box">
               <div class="menuTitle">
                  <img src="../../assets/img/allAlgorithms/titleImg1.png" alt="" srcset="">
                  模块
               </div>
               <div class="menuCount">
                  <div class="menuGroup">
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
            <div class="bgbox" v-if="isUpImg">
               <div class="imgBox">
                  <div style="display: flex;">
                     <div class="menuItemBox">
                        <span style="margin-right: 10px;" v-for="ele in data1">
                           <span @click="getItem(ele, data1)" :class="[ele.isActive ? 'active' : '']">{{ ele.name
                              }}</span>
                        </span>
                     </div>
                     <div class="title">

                        <el-upload :auto-upload="false" :file-list="fileList" :on-change="handleFileUpload">
                           <div>点击上传</div>
                        </el-upload>
                     </div>
                     <el-button round @click="getMsg"
                        style="float: right;background-color: goldenrod;border: 1px solid ;height: 50px;margin-left: 400px;">确认攻击</el-button>
                  </div>

                  <div class="box">
                     <el-image fit="contain" v-if="imageUrl" :src="imageUrl"
                        style="width: 100%; height: 100%;"></el-image>

                  </div>
                  <p
                     style="font-size: 16px;background-color: rgb(169, 228, 153); color: #000;text-align: center;margin: 5px auto;width: 200px;height: 30px;line-height: 30px;border-radius: 30px;">
                     {{ imgMsg }}
                  </p>
               </div>
            </div>
            <div class=" bgbox" v-if="!isUpImg">
               <div class="videoBox">
                  <video ref="videoPlayer1" controls :src="videoSource1"
                     autoplay></video>
                  <p v-if="videoSource1" style="font-size: 16px; color: goldenrod;text-align: center;">欺骗</p>
               </div>
               <div class="videoBox">
                  <video ref="videoPlayer2" controls :src="videoSource2"
                     autoplay></video>
                  <p v-if="videoSource2" style="font-size: 16px; color: goldenrod;text-align: center;">反欺骗</p>
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
import { ref, onMounted, nextTick } from 'vue'
import { allalgorithms, getComparisonVideo, upload } from '../../api'
import { ElMessage, ElMessageBox } from 'element-plus'
const count = ref(0)
const videoPlayer1 = ref(null);
const videoPlayer2 = ref(null);
const videoSource1 = ref(null)
const videoSource2 = ref(null)
const isPlaying = ref(false);
const isUpImg = ref(null);
const name = ref('');
const data2 = ref([
   {
      name: '图像分类',
      id: 1,
      isActive: false
   },
   {
      name: '目标检测',
      id: 2,
      isActive: false
   },
   {
      name: '物理世界',
      id: 3,
      isActive: false
   },
])
// FGSM,BIM,PGD,deepfool,cw
const data1 = ref([
   {
      name: 'FGSM',
      id: 1,
      isActive: true
   },
   {
      name: 'BIM',
      id: 2,
      isActive: false
   },
   {
      name: 'PGD',
      id: 3,
      isActive: false
   },
   {
      name: 'deepfool',
      id: 4,
      isActive: false
   },
   {
      name: 'cw',
      id: 5,
      isActive: false
   },
])
const fileList = ref([]);
const fileData = ref(null);
const imageUrl = ref('');
const imgMsg = ref('');

const handleFileUpload = (file, fileList) => {
   imageUrl.value = URL.createObjectURL(file.raw);
   console.log('=======>', file, fileList);
   fileData.value = file.raw
   console.log('-----', fileData.value);
};

const getMsg = () => {
   let name = ''
   data1.value.forEach(ele => {
      if (ele.isActive == true) {
         name = ele.name
      }
   });
   const formData = new FormData();
   console.log('-----', fileData.value);
   formData.append('file', fileData.value);
   formData.append('AttackMethods', name);
   // let param = {
   //    AttackMethods: name,
   //    file: file
   // }


   upload(formData).then((res) => {
      if (res.code == 200) {
         ElMessage({
            message: '上传成功.',
            type: 'success',
         })
         imgMsg.value = res.data
      }
   })

}
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
   allalgorithms(name.value).then((res: any) => {
      if (res.code == 200) {
         getComparisonVideo(res.data.name).then((result) => {
            videoSource1.value = `http://127.0.0.1:8080/upload/${result.data.name}`
            videoSource2.value = `http://127.0.0.1:8080/upload/${result.data.comparison}`
         })
      }

   })
}
const showVideo = () => {
   console.log('Video ended');
   let id = 0
   data2.value.forEach(ele => {
      if (ele.isActive == true) {
         id = ele.id
         name.value = ele.name
      }
   });
   if (id === 1) {
      isUpImg.value = true
   } else {
      isUpImg.value = false
      getAllalgorithms()
   }

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

            .imgBox {
               width: 80%;
               height: 93%;
               margin-right: 10px;

               .menuItemBox {
                  background-color: rgb(169, 228, 153);
                  display: flex;
                  justify-content: space-around;
                  padding: 12px;
                  border-radius: 25px;
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

               .title {
                  // padding: 5px 10px;
                  text-align: center;
                  margin-left: 10px;
                  border-radius: 25px;
                  background-color: rgb(169, 228, 153);
                  width: 100px;
                  height: 50px;
                  line-height: 50px;


               }

               .box {
                  background-color: rgb(169, 228, 153);
                  border-radius: 8px;
                  // width: 98%;
                  height: 80%;
                  margin-top: 5px;
                  padding: 10px;


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
