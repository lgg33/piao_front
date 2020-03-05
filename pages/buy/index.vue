<!--<template>-->
<!--  <div>-->
<!--    <div class="ccInfo">-->
<!--      <img :src="course.cover">-->
<!--      <div class="main">-->
<!--        <h2>{{ course.title }}</h2>-->
<!--        <p class="gray"><span>共{{ course.lessonNum }}课时</span></p>-->
<!--        <p>课程讲师：{{ course.teacherName }}</p>-->
<!--        <h3 class="red">￥{{ course.price }}</h3>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div class="pay-button">-->
<!--      <el-button class="to-pay" :disabled="saveBtnDisabled" type="primary" @click="toPay">去付款</el-button>-->
<!--      <el-button  @click="cancel">取消</el-button>-->
<!--    </div>-->
<!--  </div>-->

<!--</template>-->

<!--<script>-->

<!--  import course from "@/api/course";-->

<!--  export default {-->
<!--    layout: 'sign',-->
<!--    name: "index",-->
<!--    data() {-->
<!--      return {-->
<!--        course: {},-->
<!--        dialogCourseFormVisible: false,-->
<!--        saveBtnDisabled: false-->
<!--      }-->
<!--    },-->
<!--    created() {-->
<!--      this.fetchData();-->
<!--    },-->
<!--    methods: {-->
<!--      async fetchData() {-->
<!--        const result = await course.getById(this.$route.query.id).catch(err => err);-->
<!--        this.course = result.data.data.course;-->
<!--      },-->
<!--      toPay() {-->
<!--        this.saveBtnDisabled = true;-->
<!--        this.$router.push({-->
<!--          path: '/order',-->
<!--          query: {-->
<!--            id: this.course.id-->
<!--          }-->
<!--        });-->
<!--        this.saveBtnDisabled = false;-->
<!--      },-->
<!--      cancel() {-->
<!--        this.dialogCourseFormVisible = false;-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--<style scoped>-->

<!--  .ccInfo {-->
<!--    background: #f5f5f5;-->
<!--    padding: 20px;-->
<!--    width: 630px;-->
<!--    overflow: hidden;-->
<!--    border: 1px dashed #DDD;-->
<!--    margin: 50px auto 40px;-->
<!--    position: relative;-->
<!--  }-->
<!--  .ccInfo img {-->
<!--    background: #d6d6d6;-->
<!--    width: 400px;-->
<!--    height: 250px;-->
<!--    display: block;-->
<!--    float: left;-->
<!--    border: none;-->
<!--  }-->
<!--  .ccInfo .main {-->
<!--    margin-left: 420px;-->
<!--  }-->

<!--  .ccInfo .main h2 {-->
<!--    font-size: 18px;-->
<!--    margin-bottom: 30px;-->
<!--    line-height: 1;-->
<!--    font-weight: normal;-->
<!--  }-->
<!--  .ccInfo .main p {-->
<!--    margin-bottom: 10px;-->
<!--    word-wrap: break-word;-->
<!--    line-height: 24px;-->
<!--    max-height: 48px;-->
<!--    overflow: hidden;-->
<!--    font-size: 13px;-->
<!--  }-->

<!--  .ccInfo .main h3 {-->
<!--    /*left: 540px;*/-->
<!--    bottom: 20px;-->
<!--    line-height: 1;-->
<!--    font-size: 28px;-->
<!--    color: #d32f24;-->
<!--    font-weight: normal;-->
<!--    position: absolute;-->
<!--  }-->

<!--  .pay-button {-->
<!--    margin-left: 940px;-->
<!--    margin-bottom: 50px;-->
<!--  }-->
<!--</style>-->
