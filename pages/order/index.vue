<template>

</template>

<script>

  import order from "@/api/order";

  export default {
    layout: 'sign',
    name: "index",
    data() {
      return {
        user: null,
        courseId: '',
        content: '',
        orderToken: ''
      }
    },
    created() {
      if (process.client) {
        this.user = JSON.parse(sessionStorage.getItem("user"));
        if (this.user === null)
          return this.$router.push("/login");
      }
      this.fetchData();
    },
    methods: {
      async fetchData() {
        this.courseId = this.$route.query.id;
        this.orderToken = this.$route.query.token;
        const result = await order.createOrder(this.courseId, this.user, this.orderToken).catch(err => err);
        if (result === 'unAuth') {
          await this.$router.push({
            path: '/login',
            query: {
              redirect_url: this.redirect_url
            }
          })
        }
        console.log(result)
        if (result.data.success) {
          // this.content = result.data.data.item;
          // console.log(this.content)
          if (process.client) {
            const div = document.createElement('div')
            /* 此处form就是后台返回接收到的数据 */
            div.innerHTML = result.data.data.item
            document.body.appendChild(div)
            document.forms[0].submit()
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
