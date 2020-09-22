<template>
    <!--增加video标签支持，并循环添加-->
    <view class="view" :class="node.classStr" :style="node.styleStr">
        <video
            :class="node.classStr"
            class="video-video"
            :src="node.attr.src"
            :controls="node.attr.controls"
            :poster="node.attr.poster">
        </video>
    </view>
</template>

<script>
import mixin from "../libs/mixin";

export default {
    name: 'wxParseVideo',
    mixin: [mixin],
};
</script>
<style scoped src="../wxParse.css"/>
