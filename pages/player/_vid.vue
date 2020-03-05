<template>
  <div>

<!--    &lt;!&ndash; 阿里云视频播放器样式 &ndash;&gt;-->
<!--    <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer-min.css" >-->
<!--    &lt;!&ndash; 启用私有加密的防调式 &ndash;&gt;-->
<!--    <script src="https://g.alicdn.com/de/prismplayer/2.8.0/hls/aliplayer-vod-anti-min.js"/>-->
<!--    &lt;!&ndash; 阿里云视频播放器脚本 &ndash;&gt;-->
<!--    <script charset="utf-8" type="text/javascript" src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js"/>-->

<!--    &lt;!&ndash;组件&ndash;&gt;-->
<!--    <script type="text/javascript" charset="utf-8" src="https://player.alicdn.com/aliplayer/presentation/js/aliplayercomponents.min.js"/>-->

<!--    &lt;!&ndash; 定义播放器dom &ndash;&gt;-->
<!--    <div id="J_prismPlayer" class="prism-player"/>-->
  </div>
</template>

<script>
  import vod from '@/api/vod'
  export default {

    layout: 'video',
    data() {
      return {
        redirect_url: this.$route.path
      }
    },
    // asyncData({ params, error }) {
    //   return vod.getPlayAuth(params.vid).then(response => {
    //     return {
    //       vid: params.vid,
    //       playAuth: response.data.data.item
    //     }
    //   })
    // },
    created() {
      const vid = this.$route.params.vid;
      this.fetchData(vid);
    },
    methods: {
      async fetchData(vid) {
        const result = await vod.getPlayAuth(vid).catch(err => err);
        console.log(this.redirect_url);
        if (result === 'unAuth') {
          await this.$router.push({
            path: '/login',
            query: {
              redirect_url: this.redirect_url
            }
          })
        }
      }
    },

    // mounted() {
    //
    //   /* eslint-disable no-undef */
    //   /*const player = */
    //   new Aliplayer({
    //     id: 'J_prismPlayer',
    //     vid: this.vid, // 视频id
    //     playauth: this.playAuth, // 播放凭证
    //     encryptType: '1', // 如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项
    //     width: '100%',
    //     height: '500px',
    //
    //     cover: 'https://lg-study.oss-cn-hangzhou.aliyuncs.com/cover/default.jpg', // 封面
    //     qualitySort: 'asc', // 清晰度排序
    //
    //     // format: 'm3u8', // 播放格式
    //     mediaType: 'video', // 返回音频还是视频
    //     autoplay: false, // 自动播放
    //     isLive: false, // 直播
    //     rePlay: false, // 循环播放
    //     preload: true,
    //     controlBarVisibility: 'hover', // 控制条的显示方式：鼠标悬停
    //     useH5Prism: true, // 播放器类型：html5
    //   }, function(player) {
    //     console.log('播放器创建成功')
    //   })
    // }
  }
</script>
