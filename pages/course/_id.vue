<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程详情 开始 -->
    <section class="container">
      <section class="path-wrap txtOf hLh30">
        <a href="#" title class="c-999 fsize14">首页</a>
        \
        <a href="/course" title class="c-999 fsize14">课程列表</a>
        \
        <span class="c-333 fsize14">{{ course.subjectLevelOne }}</span>
        \
        <span class="c-333 fsize14">{{ course.subjectLevelTwo }}</span>
      </section>
      <div>
        <article class="c-v-pic-wrap" style="height: 357px;">
          <section id="videoPlay" class="p-h-video-box">
            <img :src="course.cover" :alt="course.title" class="dis c-v-pic" style="height: 357px; width: 640px">
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{ course.title }}</span>
            </h2>
            <section class="c-attr-jg">
              <span class="c-fff">价格：</span>
              <b class="c-yellow" style="font-size:24px;">￥{{ course.price }}</b>
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14">主讲： {{ course.teacherName }}&nbsp;&nbsp;&nbsp;</span>
            </section>
            <section class="c-attr-mt of">
                <span class="ml10 vam">
                    <em class="icon18 scIcon"/>
                    <a class="c-fff vam" title="收藏" href="#" >收藏</a>
                </span>
            </section>
            <section class="c-attr-mt">
              <a href="#play-video" title="立即观看" class="comm-btn c-btn-3">立即观看</a>
            </section>
          </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol clearfix">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">购买数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{ course.buyCount }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">课时数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{ course.lessonNum }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">浏览数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{ course.viewCount }}</h6>
              </aside>
            </li>
          </ol>
        </aside>
        <div class="clear"/>
      </div>
      <!-- /课程封面介绍 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="课程详情">课程详情</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>课程介绍</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <!-- 将内容中的html翻译过来 -->
                      <div v-html="course.description"/>
                    </section>
                  </div>
                </div>
                <!-- /课程介绍 -->
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <span>课程大纲</span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- 课程章节目录 -->
                          <li v-for="chapter in chapterList" :key="chapter.id" class="lh-menu-stair">
                            <a id="play-video" :title="chapter.title" href="javascript: void(0)" class="current-1">
                              <em class="lh-menu-i-1 icon18 mr10"/>{{ chapter.title }}
                            </a>
                            <ol class="lh-menu-ol" style="display: block;">
                              <li v-for="video in chapter.children" :key="video.id" class="lh-menu-second ml30">
                                <a style="cursor: pointer" @click="playVideo(video)"
                                   :title="video.title">
                                    <span v-if="video.isFree === false" class="fr">
                                        <i class="free-icon vam mr10">免费试听</i>
                                    </span>
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{ video.title }}
                                </a>
                              </li>
                            </ol>
                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                </div>
                <!-- /课程大纲 -->
              </article>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box">
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title href="javascript:void(0)">主讲讲师</a>
              </section>
              <section class="stud-act-list">
                <ul style="height: auto;">
                  <li>
                    <div class="u-face">
                      <a :href="'/teacher/'+course.teacherId" target="_blank">
                        <img :src="course.avatar" width="50" height="50" alt>
                      </a>
                    </div>
                    <section class="hLh30 txtOf">
                      <a :href="'/teacher/'+course.teacherId" class="c-333 fsize16 fl" target="_blank">{{ course.teacherName }}</a>
                    </section>
                    <section class="hLh20 txtOf">
                      <span class="c-999">{{ course.intro }}</span>
                    </section>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </aside>
        <div class="clear"></div>
      </div>
    </section>
    <!-- /课程详情 结束 -->
    <div>
      <el-dialog :visible.sync="dialogCourseFormVisible" title="购买课程">
        <div class="ccInfo">
          <img :src="course.cover">
          <div class="main">
            <h2>{{ course.title }}</h2>
            <p>{{ course.teacherName }}</p>
          </div>
          <div class="course-sp">
            <span class="course-price-prefix">课程价格: </span>
            <span class="course-price"> ￥{{ course.price }}</span>
          </div>

        </div>

        <div class="pay-button">
          <el-button class="to-pay" :disabled="saveBtnDisabled" type="primary" @click="toPay">去付款</el-button>
          <el-button  @click="cancel">取消</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>

  import course from "@/api/course";

  export default {

    data() {
      return {
        dialogCourseFormVisible: false,
        saveBtnDisabled: false
      }
    },

    async asyncData({ params, error}) {
      const result = await course.getById(params.id).catch(err => err);
      // console.log(result.data.data.chapterDtoList[0].children[0].isFree);
      console.log(result.data.data.token);
      return {
        course: result.data.data.course,
        chapterList: result.data.data.chapterDtoList,
        orderToken: result.data.data.token
      }
    },
    methods: {
      playVideo(video) {
        if (video.isFree) {
          return this.toCharge();
        }
        let routeUrl = this.$router.resolve("/player/" + video.videoSourceId);
        window.open(routeUrl.href, '_blank');
      },
      toCharge() {
        this.dialogCourseFormVisible = true;
      },
      toPay() {
        this.saveBtnDisabled = true;
        this.$router.push({
          path: '/order',
          query: {
            id: this.course.id,
            token: this.orderToken
          }
        });
        this.saveBtnDisabled = false;
      },
      cancel() {
        this.dialogCourseFormVisible = false;
      }
    }
  }
</script>

<style scoped>

  .ccInfo img {
    background: #d6d6d6;
    width: 100px;
    height: 56px;
    display: block;
    float: left;
    border: none;
  }
  .ccInfo .main {
    margin-left: 120px;
  }

  .ccInfo .main p {
    color: gray;
  }


  .ccInfo .main h2 {
    font-size: 18px;
  }

  .course-sp {
    margin-top: 50px;
  }

  .course-price {
    font-size: 25px;
    color: #d32f24;
    font-weight: normal;
  }

  .course-price-prefix {
    font-size: 15px;
  }

  .pay-button {
    margin-left: 520px;
    margin-top: 20px;
  }

  .to-pay {
    background-color: dodgerblue;
  }

</style>
