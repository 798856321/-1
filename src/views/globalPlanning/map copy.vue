<template>
   <div class="home">
      <div id="map-box"></div>
   </div>
</template>

<script lang="ts" setup>
import { watch, ref, onBeforeUnmount, onMounted } from 'vue';
import AMapLoader from "@amap/amap-jsapi-loader";
const props = defineProps({
   params: {
      type: Object
   },
})
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
   AMapLoader.load({
      key: 'e3ca747107b08bad78c755f582d3b1f0',
      version: '2.0'
   }).then((AMap) => {
      // 初始化地图
      const map = new AMap.Map('map-box', {
         // 配置对象
         mapStyle: 'amap://styles/normal',
         zoom: 12
      })

      // 路线规划
      AMap.plugin('AMap.Driving', function () {
         const driving = new AMap.Driving({
            map: map,
            // 关闭途径点icon
            // hideMarkers: true,
         })

         const startLngLat = [108.8747505, 34.2493545]; //起始点坐标
         const endLngLat = [108.9275997, 34.2521243]; //终点坐标
         let list = [[108.8770944, 34.2503945], [108.8771137, 34.2495308], [108.8771999, 34.2495329], [108.8772049, 34.2518458], [108.8772332, 34.2538568], [108.879126, 34.2538619], [108.8833397, 34.2538372], [108.8834013, 34.2538375], [108.8848861, 34.2538455], [108.8852961, 34.2538478], [108.8854046, 34.2538468], [108.8858021, 34.2538431], [108.8900019, 34.2538025], [108.8964022, 34.2523453], [108.8964991, 34.2523432], [108.9003455, 34.2523583], [108.9026094, 34.2523501], [108.9053829, 34.2523487], [108.905475, 34.2523519], [108.9117346, 34.252343], [108.9156449, 34.2523508], [108.9157221, 34.2523525], [108.9218188, 34.2523956], [108.9220703, 34.2523985], [108.9241906, 34.2524005], [108.9272471, 34.2523528]]
         console.log('===>', props.params.longLat1);
         console.log('===>', props.params.longLat2);
         // let startLngLat = props.params.longLat1 ? props.params.longLat1 : []; //起始点坐标
         // let endLngLat = props.params.longLat2 ? props.params.longLat2 : []; //终点坐标
         // driving.search(startLngLat, endLngLat, function (status, result) {
         //    //status：complete 表示查询成功，no_data 为查询无结果，error 代表查询错误
         //    //查询成功时，result 即为对应的驾车导航信息
         //    console.log(status, result);

         // });
         driving.search(
            startLngLat,
            endLngLat,
            // waypoints：该属性的属性值为由经纬度数组组成的数组，也就是说该属性的属性值是个二维数组
            { waypoints: list.map((item) => [item[0], item[1]]) },
            () => {
               // 执行了这个函数，就表示路径已经规划完毕
               console.log('success');

            }
         )
      })
   })
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