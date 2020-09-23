<template lang="pug">
.container
  .raw(v-if="raw") {{article}}
  wxParse(v-else, :content="article", ref="wxParse")
  .turn-btn(@click="raw = !raw") 切换
</template>

<script>
import wxParse from 'mpvue-wxparse'

export default {
  components: {
    wxParse
  },
  data () {
    return {
      raw: false,
      article: ''
    }
  },
  mounted () {
    this.getData()
  },
  onPullDownRefresh () {
    this.getData()
  },
  methods: {
    async getData () {
      wx.showLoading({ title: '加载中' })
      const list = await this.$request.get('https://news-at.zhihu.com/api/4/news/latest')
      const article = list.data.stories[0] || {}
      const detail = await this.$request.get(`https://news-at.zhihu.com/api/4/news/${article.id}`)
      this.article = detail.data.body
      wx.stopPullDownRefresh()
      wx.hideLoading()
      setTimeout(() => console.log(this.$refs.wxParse.nodes), 1000)
    }
  }
}
</script>
