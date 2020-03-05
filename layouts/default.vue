<template>
  <div class="in-wrap">
    <!-- 公共头引入 -->
    <header id="header">
      <section class="container">
        <h1 id="logo">
          <a href="#" title="漂飘学院">
            <img src="~/assets/img/logo.jpg" style="width: 200px; height: 78px;" alt="漂飘学院">
          </a>
        </h1>
        <div class="h-r-nsl">
          <ul class="nav">
            <router-link to="/" tag="li" active-class="current" exact>
              <a>首页</a>
            </router-link>
            <router-link to="#" tag="li" active-class="current">
              <el-dropdown placement="bottom-start" @command="handleCommand">
                <a class="el-dropdown-link">
                  分类<i class="el-icon-notebook-2 el-icon--right"/>
                </a>
                <el-dropdown-menu slot="dropdown">
                  <div style="width: 600px; margin-left: 20px">
                    <div v-for="(item, index) in subjects" :key="index">
                      <p class="my-subject-first">
                        {{item.title}}
                      </p>
                      <el-dropdown-item class="my-subject-second"
                                          v-for="(subItem, index) in item.children" :key="index"
                                          :command="subItem.id">
                        {{subItem.title}}
                      </el-dropdown-item>
                    </div>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </router-link>
            <router-link to="/course" tag="li" active-class="current">
              <a>课程</a>
            </router-link>
            <router-link to="/teacher" tag="li" active-class="current">
              <a>名师</a>
            </router-link>
            <router-link to="/article" tag="li" active-class="current">
              <a>文章</a>
            </router-link>
          </ul>
          <!-- / nav -->
          <ul class="h-r-login">
            <el-menu v-if="user" class="el-menu-demo" style="margin-top: 15px">
              <el-dropdown placement="bottom-start" @command="handleCommandUser">
              <span class="el-dropdown-link">
                {{user.username}}<!--<i class="el-icon-arrow-down el-icon&#45;&#45;right"/>-->
              </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="order">订单</el-dropdown-item>
                  <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
                  <el-dropdown-item command="quit">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-menu>

            <li v-else id="no-login">
              <a href="/login">
                <em class="icon18 login-icon">&nbsp;</em>
                <span class="vam ml5">登录</span>
              </a>
              <span>|</span>
              <a href="/register">
                <span class="vam ml5">注册</span>
              </a>
            </li>

            <!--<li class="mr10 undis" id="is-login-one">
              <a href="#" title="消息" id="headerMsgCountId">
                <em class="icon18 news-icon">&nbsp;</em>
              </a>
              <q class="red-point" style="display: none">&nbsp;</q>
            </li>
            <li class="h-r-user undis" id="is-login-two">
              <a href="#" title>
                <img
                  src="~/assets/img/avatar-boy.gif"
                  width="30"
                  height="30"
                  class="vam picImg"
                  alt
                >
                <span class="vam disIb" id="userName"></span>
              </a>
              <a href="javascript:void(0)" title="退出" onclick="exit();" class="ml5">退出</a>
            </li>-->
            <!-- /未登录显示第1 li；登录后显示第2，3 li -->
          </ul>
          <aside class="h-r-search">
            <form action="#" method="post">
              <label class="h-r-s-box">
                <input type="text" placeholder="输入你想学的课程" name="queryCourse.courseName" v-model="title">
                <button type="submit" class="s-btn" @click="search(title)">
                  <em class="icon18">&nbsp;</em>
                </button>
              </label>
            </form>
          </aside>
        </div>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>
    </header>
    <!-- /公共头引入 -->

    <nuxt/>

    <!-- 公共底引入 -->
    <footer id="footer">
      <section class="container">
        <div class>
          <div class="clear"></div>
        </div>
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="#" title="关于我们" target="_blank">关于我们</a>|
                <a href="#" title="联系我们" target="_blank">联系我们</a>|
                <a href="#" title="帮助中心" target="_blank">帮助中心</a>|
                <a href="#" title="资源下载" target="_blank">资源下载</a>|
                <span>服务热线：010-3333333(北京) 0755-3333333(深圳)</span>
                <span>Email：1575543408@qq.com</span>
              </section>
              <section class="b-f-link mt10">
                <span>©2020课程版权均归漂飘学院所有 鄂ICP备19023154号</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wx-icon.png" alt>
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wb-icon.png" alt>
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /公共底引入 -->
  </div>
</template>
<script>
  import "~/assets/css/reset.css";
  import "~/assets/css/theme.css";
  import "~/assets/css/global.css";
  import "~/assets/css/web.css";

  import subject from "@/api/subject";''

  export default {
    data() {
      return {
        title: this.$route.query.title,
        subjects: {},
        user: process.client?JSON.parse(sessionStorage.getItem('user')):null,
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      search(value) {
        this.$router.push({
          path: '/course',
          query: {
            title: value
          }
        })
      },
      async fetchData() {
        const { data } = await subject.getSubject().catch(err => err);
        this.subjects = data.data.items;
      },
      handleCommand(id) {
        this.$router.push({
          path: '/course',
          query: {
            subjectId: id
          }
        })
      },
      handleCommandUser(value) {
        switch (value) {
          case "order":
            this.toOrder();
            break;
          case "userInfo":
            this.toUserInfo();
            break;
          case "quit":
            this.quit();
            break;
           default:
             break;
        }
      },
      toOrder() {

      },
      toUserInfo() {

      },
      quit() {

      }
    },
    watch: {
      $route( to , from ){
        this.title = to.query.title;
      }
    }
  };
</script>

<style scoped>
  .el-dropdown-link {
    cursor: pointer;
  }
  .my-subject-first {
    margin-top: 16px;
    font-size: 15px;
    font-weight: bold
  }
  .my-subject-second {
    margin-top: 15px;
    margin-left: 10px;
    color: #333333;
    background-color: #F5F5F5;
    border-radius: 25px;
    display: inline-block;
  }
</style>
