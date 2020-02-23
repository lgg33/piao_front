<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li :class="allSubject">
                  <a title="全部" style="cursor: pointer">全部</a>
                </li>
                <li :class="{current:subjectIndex===index}" v-for="(item, index) in subjects.items" :key="index">
                  <a :title="item.title" style="cursor: pointer" @click="getBySubject(index,item.id)">{{item.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="attention">
                <a title="关注度" @click="getByAttention" style="cursor: pointer">关注度</a>
              </li>
              <li :class="newest">
                <a title="最新" @click="getByNewest" style="cursor: pointer">最新</a>
              </li>
              <li :class="price">
                <a title="价格" @click="getByPrice" style="cursor: pointer">价格&nbsp;
                  <span>↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total===0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中.</span>
          </section>
          <!-- /无数据提示 结束-->
          <article v-if="data.total>0" class="comm-course-list">
            <ul id="bna" class="of">
              <li v-for="item in data.items" :key="item.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="item.cover" class="img-responsive" alt="听力口语" style="width: 300px;height: 200px">
                    <div class="cc-mask">
                      <a :href="'/course/'+item.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/'+item.id" :title="item.title" class="course-title fsize18 c-333">{{ item.title }}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span v-if="Number(item.price) === 0" class="fr jgTag bg-green">
                        <i class="c-fff fsize12 f-fA">免费</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">{{ item.viewCount }}人学习</i>
                        |
                        <i class="c-999 f-fA">9634评论</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"/>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="首页"
              @click.prevent="goToPage(1)">首</a>
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="前一页"
              @click.prevent="goToPage(data.current-1)">&lt;</a>
            <a
              :class="['paging-item', 'paging-item--more']"
              v-if="showPrevMore" style="pointer-events: none">...</a>
            <a
              v-for="page in pagers"
              :key="page"
              :class="{current: data.current === page, undisable: data.current === page}"
              :title="'第'+page+'页'"
              href="#"
              @click.prevent="goToPage(page)">{{ page }}</a>
            <a
              :class="['paging-item', 'paging-item--more']"
              v-if="showNextMore" style="pointer-events: none">...</a>
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="后一页"
              @click.prevent="goToPage(data.current+1)">&gt;</a>
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="末页"
              @click.prevent="goToPage(data.pages)">末</a>
            <div class="clear"/>
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>

<script>

  import course from "@/api/course";
  import subject from "@/api/subject";

  export default {
    name: "index",
    data() {
      return {
        size: 8,
        showNextMore: false,
        showPrevMore: false,
        allSubject: 'current',
        subjectIndex: -1,
        price: '',
        newest: '',
        attention: ''
      }
    },
    async asyncData({ params, error }) {
      const result = await course.getByPage(1, 8).catch(err => err);
      console.log(result.data);
      const subjectResult = await subject.getSubject().catch(err => err);
      console.log(subjectResult);
      return {
        data: result.data.data,
        subjects: subjectResult.data.data
      }
    },
    methods: {
      goToPage(page){
        course.getByPage(page, this.size).then(response => {
          this.data = response.data.data
        })
      },
      //根据分类查询
      getBySubject(index, id) {
        console.log(id);
        this.subjectIndex = index;
        this.allSubject = '';
      },
      getByPrice() {
        this.price = 'current bg-orange';
        this.newest = '';
        this.attention = '';
      },
      getByNewest() {
        this.newest = 'current bg-orange';
        this.price = '';
        this.attention = '';
      },
      getByAttention() {
        this.attention = 'current bg-orange';
        this.price = '';
        this.newest = '';
      }
    },
    computed: {
      //计算页码，当count等变化时自动计算
      pagers () {
        const array = [];
        const perPages = 5;
        const pageCount = this.data.pages;
        let current = this.data.current;
        const _offset = (perPages - 1) / 2;


        const offset = {
          start : current - _offset,
          end   : current + _offset
        };

        //-1, 3
        if (offset.start < 1) {
          offset.end = offset.end + (1 - offset.start);
          offset.start = 1
        }
        if (offset.end > pageCount) {
          offset.start = offset.start - (offset.end - pageCount);
          offset.end = pageCount
        }
        if (offset.start < 1) offset.start = 1;

        this.showPrevMore = (offset.start > 1);
        this.showNextMore = (offset.end < pageCount);

        for (let i = offset.start; i <= offset.end; i++) {
          array.push(i)
        }

        return array
      }
    }
  }
</script>

<style scoped>

</style>
