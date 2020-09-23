export default {
    props: {
        node: {
            type: Object,
            default() {
                return {};
            },
        },
    },

    methods: {
        /*
        * @src string
        * @e target element
        * */
        onPreview(src, e) {
            console.log(src,e)
            this.$emit('preview', src, e)
        },
        /*
        * remove too small image
        * @src string
        * */
        onRemoveImage(src) {
            this.$emit('removeImage', src)
        },
        /*
        * @href string
        * @e target element
        * */
        onNavigate(href, e) {
            this.$emit('navigate', href, e);
        }
    }
}
