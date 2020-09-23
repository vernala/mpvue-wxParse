<!--**
 * author: qizhenshuai <qizhenshuai@126.com>
 *
 * github地址: https://github.com/qizhenshuai/qs-mpvue-wxParse
 *
 * for: Mpvue框架下 微信小程序富文本解析,
 * 2020.09.22 增加支持 uni，code by veranal
 */-->

<template>
    <!--基础元素-->
    <view class="view wxParse" :class="className" v-if="!loading">
        <block v-for="(node,index) in nodes" :key="index">
            <WxParseTemplate :node="node" @preview="preview" @removeImage="removeImageUrl" @navigate="navigate"/>
        </block>
        <slot v-if="!nodes.length"/>
    </view>
</template>

<script>
import HtmlToJson from './libs/html2json';
import WxParseTemplate from './components/wxParseTemplate0';

export default {
    name: 'wxParse',
    components: {
        WxParseTemplate,
    },
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
        className: {
            type: String,
            default: '',
        },
        content: {
            type: String,
            default: '',
        },
        noData: {
            type: String,
            default: '<div style="color: red;">数据不能为空</div>',
        },
        startHandler: {
            type: Function,
            default() {
                return (node) => {
                    node.attr.class = null;
                    node.attr.style = null;
                };
            },
        },
        endHandler: {
            type: Function,
            default: null,
        },
        charsHandler: {
            type: Function,
            default: null,
        },
        imageProp: {
            type: Object,
            default() {
                return {
                    mode: 'widthFix',
                    padding: 0,
                    lazyLoad: false,
                    domain: '',
                };
            },
        },
    },

    data() {
        return {
            imageUrls: [],
        };
    },
    computed: {
        nodes() {
            const {
                content,
                noData,
                imageProp,
                startHandler,
                endHandler,
                charsHandler,
            } = this;
            const parseData = content || noData;
            const customHandler = {
                start: startHandler,
                end: endHandler,
                chars: charsHandler,
            };
            const results = HtmlToJson(parseData, customHandler, imageProp, this);
            this.imageUrls = results.imageUrls;
            console.log(results.nodes)
            return results.nodes;
        },
    },
    methods: {
        navigate(href, $event) {
            this.$emit('navigate', href, $event);
        },
        preview(src, $event) {
            if (!this.imageUrls.length) return;
            (uni || wx).previewImage({
                current: src,
                urls: this.imageUrls,
            });
            this.$emit('preview', src, $event);
        },
        removeImageUrl(src) {
            const {imageUrls} = this;
            imageUrls.splice(imageUrls.indexOf(src), 1);
        },
    },
};
</script>
<style>
.wxParse {
    width: 100%;
    font-family: Helvetica, sans-serif;
    font-size: 14px;
    color: #666;
    line-height: 1.8;
}
</style>
