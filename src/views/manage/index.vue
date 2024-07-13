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
   <div class="globalPlanning">
      <div class="globalPlanning-left">
         <div class="left">
            <div
               style="padding: 8px 12px;margin-bottom: 20px;
            height: 20px;border-radius: 20px;line-height: 20px;text-align: center;width: 90px;background-color: coral;">
               后台管理</div>
            <div :class="[item.isActive ? 'active' : '']" class="langbg" v-for="item in list">
               <div @click="goFirst(item)">{{ item.name }}</div>
            </div>

         </div>
      </div>
      <div class="globalPlanning-right">
         <div class="topbox">
            <div class="bgbox">
               <div v-if="list[0].isActive" class="videoBox">
                  <el-button style="float: right;margin-bottom: 5px;margin-right: 12px;">添加账号</el-button>
                  <el-table :data="tableData1" style="width: 100%;height: 95%;">
                     <el-table-column label="序号" type="index" width="90" />
                     <el-table-column label="用户名">
                        <template #default="scope">
                           <div style="display: flex; align-items: center">
                              <span style="margin-left: 10px">{{ scope.row.date }}</span>
                           </div>
                        </template>
                     </el-table-column>
                     <el-table-column label="密码">
                        <template #default="scope">
                           <span>{{ scope.row.name }}</span>
                        </template>
                     </el-table-column>
                     <el-table-column label="操作">
                        <template #default="scope">
                           <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                              取消
                           </el-button>
                           <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                              删除
                           </el-button>
                        </template>
                     </el-table-column>
                  </el-table>
               </div>
               <div v-if="list[1].isActive" class="videoBox">
                  <el-button style="float: right;margin-bottom: 5px;margin-right: 12px;">添加算法</el-button>
                  <el-table :data="tableData2" style="width: 100%;height: 95%;">
                     <el-table-column label="序号" type="index" width="90" />
                     <el-table-column label="算法类别名">
                        <template #default="scope">
                           <div style="display: flex; align-items: center">
                              <span style="margin-left: 10px">{{ scope.row.date }}</span>
                           </div>
                        </template>
                     </el-table-column>
                     <el-table-column label="算法名">
                        <template #default="scope">
                           <span>{{ scope.row.name }}</span>
                        </template>
                     </el-table-column>
                     <el-table-column label="视频">
                        <template #default="scope">
                           <span>{{ scope.row.address }}</span>
                        </template>
                     </el-table-column>
                     <el-table-column label="对照视频">
                        <template #default="scope">
                           <span>{{ scope.row.video }}</span>
                        </template>
                     </el-table-column>
                  </el-table>
               </div>
               <div v-if="list[2].isActive" class="videoBox">
                  <el-button style="float: right;margin-bottom: 5px;margin-right: 12px;">添加算法类别</el-button>
                  <el-table :data="tableData3" style="width: 100%;height: 95%;">
                     <el-table-column label="序号" type="index" width="90" />
                     <el-table-column label="列别名">
                        <template #default="scope">
                           <div style="display: flex; align-items: center">
                              <span style="margin-left: 10px">{{ scope.row.date }}</span>
                           </div>
                        </template>
                     </el-table-column>
                     <el-table-column label="操作">
                        <template #default="scope">
                           <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                              取消
                           </el-button>
                           <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                              删除
                           </el-button>
                        </template>
                     </el-table-column>
                  </el-table>
               </div>
               <div v-if="list[3].isActive" class="videoBox">
                  <el-button style="float: right;margin-bottom: 5px;margin-right: 12px;">添加视频</el-button>
                  <el-table :data="tableData4" style="width: 100%;height: 95%;">
                     <el-table-column label="序号" type="index" width="90" />
                     <el-table-column label="视频名称">
                        <template #default="scope">
                           <div style="display: flex; align-items: center">
                              <span style="margin-left: 10px">{{ scope.row.date }}</span>
                           </div>
                        </template>
                     </el-table-column>

                     <el-table-column label="操作">
                        <template #default="scope">
                           <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                              取消
                           </el-button>
                           <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                              删除
                           </el-button>
                        </template>
                     </el-table-column>
                  </el-table>
               </div>
            </div>
         </div>
         <div class="bottomMent">
            <img src="../../assets/img/allAlgorithms/bottomBg.png" alt="">
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const count = ref(1)
const list = ref([
   {
      name: '账号管理',
      isActive: true
   },
   {
      name: '算法管理',
      isActive: false
   },
   {
      name: '算法类别管理',
      isActive: false
   },
   {
      name: '视频管理',
      isActive: false
   },
])
const goFirst = (item) => {
   list.value.forEach(ele => {
      if (ele.name === item.name) {
         ele.isActive = true
      } else {
         ele.isActive = false
      }
   });
}
interface User {
   date: string
   name: string
   address: string
   video: string
}

const handleEdit = (index: number, row: User) => {
   console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
   console.log(index, row)
}

const tableData1: User[] = [
   {
      date: 'admin1',
      name: '123456',
      address: 'No. 189, Grove St, Los Angeles',
   },
   {
      date: 'admin2',
      name: '1231233',
      address: 'No. 189, Grove St, Los Angeles',
   },
   {
      date: 'admin3',
      name: '3456322',
      address: 'No. 189, Grove St, Los Angeles',
   },

]
const tableData2: User[] = [
   {
      date: '伪装算法',
      name: '伪装算法1',
      address: '测试1伪装.mp4',
      video: 'h/qww/ewe.mp4'
   },
   {
      date: '伪装算法',
      name: '伪装算法2',
      address: '测试2伪装前.mp4',
      video: 'h/qww/ewe.mp4'
   },
   {
      date: '局部路径',
      name: '静态避障',
      address: '测试2伪装前.mp4',
      video: 'h/qww/ewe.mp4'
   },
   {
      date: '全局路径规划',
      name: '静态避障',
      address: '测试2伪装前.mp4',
      video: 'h/qww/ewe.mp4'
   },
   {
      date: '去雾算法',
      name: '去雾目标检测',
      address: '测试2伪装前.mp4',
      video: 'h/qww/ewe.mp4'
   },
]
const tableData3: User[] = [
   {
      date: '去雾算法',
      name: '算法1',
      address: 'No. 189, Grove St, Los Angeles',
   },
   {
      date: '欺骗研发',
      name: '算法2',
      address: 'No. 189, Grove St, Los Angeles',
   },
   {
      date: '伪装算法',
      name: '算法3',
      address: 'No. 189, Grove St, Los Angeles',
   },
   {
      date: '局部路径规划',
      name: '算法3',
      address: 'No. 189, Grove St, Los Angeles',
   },
   {
      date: '全局路径规划',
      name: '算法3',
      address: 'No. 189, Grove St, Los Angeles',
   },

]
const tableData4: User[] = [
   {
      date: '去雾目标检测.mp4',
      name: '算法1',
      address: 'No. 189, Grove St, Los Angeles',
   },
   {
      date: '去雾视频.mp4',
      name: '算法2',
      address: 'No. 189, Grove St, Los Angeles',
   },
   {
      date: '有雾目标检测.mp4',
      name: '算法3',
      address: 'No. 189, Grove St, Los Angeles',
   },
   {
      date: '有雾视频.mp4',
      name: '算法3',
      address: 'No. 189, Grove St, Los Angeles',
   },
   {
      date: '测试1检测前.mp4',
      name: '算法3',
      address: 'No. 189, Grove St, Los Angeles',
   },
   {
      date: '测试1伪装检测后.mp4',
      name: '算法3',
      address: 'No. 189, Grove St, Los Angeles',
   },
   {
      date: '测试2检测前.mp4',
      name: '算法3',
      address: 'No. 189, Grove St, Los Angeles',
   },
   {
      date: '测试2伪装检测后.mp4',
      name: '算法3',
      address: 'No. 189, Grove St, Los Angeles',
   },
   {
      date: '.全局路径演示规划视频.mp4',
      name: '算法3',
      address: 'No. 189, Grove St, Los Angeles',
   },
   {
      date: '静态避障.mp4',
      name: '算法3',
      address: 'No. 189, Grove St, Los Angeles',
   },

]
const goBack = () => {
   router.push('/logo')
}
onMounted(() => {


})
</script>


<style lang="scss" scoped>
.headerInfo {
   background-color: rgb(45, 87, 61);
   ;
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

.globalPlanning {
   width: 100%;
   height: 100%;
   display: flex;

   .globalPlanning-left {
      width: 240px;
      height: 100%;
      padding: 30px 16px;
      background-color: rgb(45, 87, 61);

      .left {
         .langbg {
            width: 80%;
            height: 40px;
            line-height: 40px;
            padding: 0 12px;
            border-radius: 40px;
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

.active {
   background-color: rgba(238, 208, 75, 0.5);
   font-size: 18px;
}
</style>
