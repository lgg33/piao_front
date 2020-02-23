<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 讲师列表 开始 -->
    <section class="container">
      <header class="comm-title all-teacher-title">
        <h2 class="fl tac">
          <span class="c-333">全部讲师</span>
        </h2>
        <section class="c-tab-title">
          <a id="subjectAll" title="全部" href="#">全部</a>
          <!-- <c:forEach var="subject" items="${subjectList }">
                            <a id="${subject.subjectId}" title="${subject.subjectName }" href="javascript:void(0)" onclick="submitForm(${subject.subjectId})">${subject.subjectName }</a>
          </c:forEach>-->
        </section>
      </header>
      <section class="c-sort-box unBr">
        <div>
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total===0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="i-teacher-list">
            <ul class="of">
              <li v-for="item in data.items" :key="item.id">
                <section class="i-teach-wrap">
                  <div class="i-teach-pic">
                    <a :href="'/teacher/'+item.id" :title="item.name">
                      <img :src="item.avatar" :alt="item.name" height="142" hright="142">
                    </a>
                  </div>
                  <div class="mt10 hLh30 txtOf tac">
                    <a :href="'/teacher/'+item.id" :title="item.name" class="fsize18 c-666">{{ item.name }}</a>
                  </div>
                  <div class="hLh30 txtOf tac">
                    <span class="fsize14 c-999" >{{ item.career }}</span>
                  </div>
                  <div class="mt15 i-q-txt">
                    <p class="c-999 f-fA">{{ item.intro }}</p>
                  </div>
                </section>
              </li>
            </ul>
            <div class="clear"></div>
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
    <!-- /讲师列表 结束 -->
  </div>
</template>

<script>

  import teacher from '@/api/teacher'

  export default {
    name: "index",
    data() {
      return {
        size: 8,
        showNextMore: false,
        showPrevMore: false
      }
    },
    asyncData({ params, error}) {
      return teacher.getByPage(1, 8)
        .then(response => {
          console.log(response);
          return {data: response.data.data}
        }).catch(err => console.log(err))
    },
    methods: {
      goToPage(page){
        teacher.getByPage(page, this.size).then(response => {
          this.data = response.data.data
        })
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
