<template>
   <div class="home">
      <div style="position: relative;">
         <div style="position: absolute; right: 10px; top: 10px; z-index: 1;">
            <el-button @click="startMove">开始回放</el-button>
            <el-button @click="pauseAnimation">暂停回放</el-button>
            <el-button @click="resumeAnimation">继续回放</el-button>
            <el-select v-model="speed" style="width: 100px; margin-left: 10px;" placeholder="选择倍速"
               @change="handleSelect($event)">
               <el-option :value="'1倍速'">1倍速</el-option>
               <el-option :value="'2倍速'">2倍速</el-option>
               <el-option :value="'3倍速'">3倍速</el-option>
               <el-option :value="'4倍速'">4倍速</el-option>
            </el-select>
         </div>
         <!-- <div style="position:absolute; left: 50px; bottom: 30px; z-index: 1; width: 95%; height: 20px;">
            <el-progress :percentage="percentage"></el-progress>
        </div> -->
         <div id="amapcontainer" style="width: 100%; height: 880px"></div>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { watch, ref, onBeforeUnmount, onMounted } from 'vue';
import AMapLoader from "@amap/amap-jsapi-loader";
import { log } from 'console';
const props = defineProps({
   params: {
      type: Object
   },
})
const count = ref(0)
const map = ref(null)// 高德地图实例
// const lineArr = ref([[108.8770944, 34.2503945], [108.8771137, 34.2495308], [108.8771999, 34.2495329], [108.8772049, 34.2518458], [108.8772332, 34.2538568], [108.879126, 34.2538619], [108.8833397, 34.2538372], [108.8834013, 34.2538375], [108.8848861, 34.2538455], [108.8852961, 34.2538478], [108.8854046, 34.2538468], [108.8858021, 34.2538431], [108.8900019, 34.2538025], [108.8964022, 34.2523453], [108.8964991, 34.2523432], [108.9003455, 34.2523583], [108.9026094, 34.2523501], [108.9053829, 34.2523487], [108.905475, 34.2523519], [108.9117346, 34.252343], [108.9156449, 34.2523508], [108.9157221, 34.2523525], [108.9218188, 34.2523956], [108.9220703, 34.2523985], [108.9241906, 34.2524005], [108.9272471, 34.2523528]]) // 轨迹
const lineArr = ref(null)
const marker = ref(null)
const polyline = ref(null)
const speed = ref('1倍速')
const duration = ref(500)
const percentage = ref(50)

// onMounted(() => {
//    initMap()
// })
// watch(
//    () => props.params,
//    (v) => {
//       console.log('vvvv', v);

//       initMap()
//    }
// )
// 开发环境 配置JSCODE
window._AMapSecurityConfig = {
   securityJsCode: '8c1209dc36ef7924747aec4a7c5fb11a'
}

const initMap = () => {
   console.log('-----',props.params.coordinate)
   AMapLoader.load({
      key: "e3ca747107b08bad78c755f582d3b1f0", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ["AMap.Scale", "AMap.ToolBar", "AMap.ControlBar", 'AMap.Geocoder', 'AMap.Marker',
         'AMap.CitySearch', 'AMap.Geolocation', 'AMap.AutoComplete', 'AMap.InfoWindow'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
   }).then((AMap) => {
      // 获取到作为地图容器的DOM元素，创建地图实例
      const map = new AMap.Map("amapcontainer", { //设置地图容器id
         resizeEnable: true,
         // viewMode: "3D", // 使用3D视图
         zoomEnable: true, // 地图是否可缩放，默认值为true
         dragEnable: true, // 地图是否可通过鼠标拖拽平移，默认为true
         doubleClickZoom: true, // 地图是否可通过双击鼠标放大地图，默认为true
         zoom: 17, //初始化地图级别
         center: props.params.coordinate == []?null:props.params.coordinate, // 初始化中心点坐标 北京
         // mapStyle: "amap://styles/darkblue", // 设置颜色底层
      })

      marker.value = new AMap.Marker({
         position: props.params.coordinate == []?null:props.params.coordinate,
         icon: "https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png",
         offset: new AMap.Pixel(-13, -26),
      });
      map.add(marker.value)

      // 绘制轨迹
      polyline.value = new AMap.Polyline({
         path: props.params.list,
         showDir: true,
         strokeColor: "#28F",  //线颜色
         // strokeOpacity: 1,     //线透明度
         strokeWeight: 6,      //线宽
         // strokeStyle: "solid"  //线样式
      });
      map.add(polyline.value)

      // 走过的路径
      const passedPolyline = new AMap.Polyline({
         strokeColor: "#AF5",  //线颜色
         strokeWeight: 6,      //线宽
      });
      map.add(passedPolyline)

      // 监听marker移动
      marker.value.on('moving', (e) => {
         console.log('marker动了', e)
         passedPolyline.setPath(e.passedPath); // 设置路径样式
         map.setCenter(e.target.getPosition(), true) // 设置地图中心点
      });

      map.setFitView(); // 根据覆盖物自适应展示地图

   }).catch(e => {
      console.log(e)
   })

}
// 开始回放

const startMove = () => {
   AMap.plugin('AMap.MoveAnimation', () => {
      console.log('开始回放')
      marker.value.moveAlong(props.params.list, {
         // 每一段的时长
         duration: duration.value,//可根据实际采集时间间隔设置
         // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
         autoRotation: true,
      });
   })

}
// 暂停回放
const pauseAnimation = () => {
   marker.value.pauseMove();
}
// 继续回放
const resumeAnimation = () => {
   marker.value.resumeMove();
}
// 倍速控制
const handleSelect = (e:any) => {
   console.log('e', parseInt(e.charAt(0)))
   duration.value = 500 / parseInt(e.charAt(0))
}
defineExpose({ initMap })
</script>

<style lang="scss" scoped>
.home {
   height: 100%;
   width: 100%;
   padding: 0px;
   margin: 0px;
   position: relative;

   .info-box {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 300px;
      height: 100%;
      //background-color: #1f1f1f;
      display: flex;
      flex-direction: column;
   }
}

.ul {
   margin-top: 10px;
   height: 60%;
   overflow-y: scroll;

   .li {
      padding: 5px 10px;
      background: #FFFFFF;
      margin-bottom: 10px;
      min-height: 60px;

      .d-flex {
         background: #FFFFFF;
         color: #1f1f1f;
         display: flex;
         flex-direction: column;
      }
   }
}

#map-box {
   height: 100%;
   width: 100%;
   padding: 0px;
   margin: 0px;
}

.btn {
   padding: 10px;
   display: flex;
   align-items: center;
   justify-content: center;
}
</style>

<style scoped>
:deep() .amap-logo {
   display: none !important;
}

:deep() .amap-copyright {
   display: none !important;
}
</style>