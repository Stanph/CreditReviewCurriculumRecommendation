<template>
    <div class="drag-list-wrapper">
        <div class="drag-list-con con1">
            <slot name="left-title"></slot>
            <draggable class="drop-box1" :class="dropConClass.left" :options="options" :value="list1" @input="handleListChange($event, 'left')" @end="handleEnd($event, 'left')">
                <div class="drag-list-item" v-for="(itemLeft, index) in list1" :key="`drag_li1_${index}`">
                    <slot name="left" :itemLeft="itemLeft">{{ itemLeft }}</slot>
                </div>
            </draggable>
        </div>
        <div class="drag-list-con con2">
            <slot name="right-title"></slot>
            <draggable class="drop-box2" :class="dropConClass.right" :options="options" :value="list2" @input="handleListChange($event, 'right')" @end="handleEnd($event, 'right')">
                <div class="drag-list-item" v-for="(itemRight, index) in list2" :key="`drag_li2_${index}`">
                    <slot name="right" :itemRight="itemRight">{{ itemRight }}</slot>
                </div>
            </draggable>
        </div>
        <div class="drag-list-con con3">
            <slot name="left-title2"></slot>
            <draggable class="drop-box3" :class="dropConClass.left2" :options="options" :value="list3" @input="handleListChange($event, 'left2')" @end="handleEnd($event, 'left2')">
                <div class="drag-list-item" v-for="(itemLeft2, index) in list3" :key="`drag_li3_${index}`">
                    <slot name="left2" :itemLeft2="itemLeft2">{{ itemLeft2 }}</slot>
                </div>
            </draggable>
        </div>
        <div class="drag-list-con con4">
            <slot name="right-title2"></slot>
            <draggable class="drop-box4" :class="dropConClass.right2" :options="options" :value="list4" @input="handleListChange($event, 'right2')" @end="handleEnd($event, 'right2')">
                <div class="drag-list-item" v-for="(itemRight2, index) in list4" :key="`drag_li4_${index}`">
                    <slot name="right2" :itemRight2="itemRight2">{{ itemRight2 }}</slot>
                </div>
            </draggable>
        </div>
        <div class="drag-list-con con5">
            <slot name="left-title3"></slot>
            <draggable class="drop-box5" :class="dropConClass.left3" :options="options" :value="list5" @input="handleListChange($event, 'left3')" @end="handleEnd($event, 'left3')">
                <div class="drag-list-item" v-for="(itemLeft3, index) in list5" :key="`drag_li5_${index}`">
                    <slot name="left3" :itemLeft3="itemLeft3">{{ itemLeft3 }}</slot>
                </div>
            </draggable>
        </div>
        <div class="drag-list-con con6">
            <slot name="right-title3"></slot>
            <draggable class="drop-box6" :class="dropConClass.right3" :options="options" :value="list6" @input="handleListChange($event, 'right3')" @end="handleEnd($event, 'right3')">
                <div class="drag-list-item" v-for="(itemRight3, index) in list6" :key="`drag_li6_${index}`">
                    <slot name="right3" :itemRight3="itemRight3">{{ itemRight3 }}</slot>
                </div>
            </draggable>
        </div>
        <div class="drag-list-con con7">
            <slot name="left-title4"></slot>
            <draggable class="drop-box7" :class="dropConClass.left4" :options="options" :value="list7" @input="handleListChange($event, 'left4')" @end="handleEnd($event, 'left4')">
                <div class="drag-list-item" v-for="(itemLeft4, index) in list7" :key="`drag_li7_${index}`">
                    <slot name="left4" :itemLeft4="itemLeft4">{{ itemLeft4 }}</slot>
                </div>
            </draggable>
        </div>
        <div class="drag-list-con con8">
            <slot name="right-title4"></slot>
            <draggable class="drop-box8" :class="dropConClass.right4" :options="options" :value="list8" @input="handleListChange($event, 'right4')" @end="handleEnd($event, 'right4')">
                <div class="drag-list-item" v-for="(itemRight4, index) in list8" :key="`drag_li8_${index}`">
                    <slot name="right4" :itemRight4="itemRight4">{{ itemRight4 }}</slot>
                </div>
            </draggable>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
    name: 'DragList',
    components: {
        draggable
    },
    props: {
        list1: {
            type: Array,
            required: true
        },
        list2: {
            type: Array,
            default: () => []
        },
        list3: {
            type: Array,
            default: () => []
        },
        list4: {
            type: Array,
            default: () => []
        },
        list5: {
            type: Array,
            default: () => []
        },
        list6: {
            type: Array,
            default: () => []
        },
        list7: {
            type: Array,
            default: () => []
        },
        list8: {
            type: Array,
            default: () => []
        },
        dropConClass: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            options: { group: 'drag_list' }
        }
    },
    methods: {
        handleListChange(value, type) {
            if (type === 'left') {
                this.$emit('update:list1', value)
            } else if (type === 'right') {
                this.$emit('update:list2', value)
            } else if (type === 'left2') {
                this.$emit('update:list3', value)
            } else if (type === 'right2') {
                this.$emit('update:list4', value)
            }else if (type === 'left3') {
                this.$emit('update:list5', value)
            }else if (type === 'right3') {
                this.$emit('update:list6', value)
            }else if (type === 'left4') {
                this.$emit('update:list7', value)
            }else if (type === 'right4') {
                this.$emit('update:list8', value)
            }
        },
        handleEnd(event, type) {
            const srcClassName = (event.srcElement || event.target).classList[0]
            const targetClassName = event.to.classList[0]
            let src = ''
            let target = ''
            if (srcClassName === targetClassName) {
                if (type === 'left') {
                    src = 'left'
                    target = 'left'
                } else {
                    src = 'right'
                    target = 'right'
                }
            } else {
                if (type === 'left') {
                    src = 'left'
                    target = 'right'
                } else {
                    src = 'right'
                    target = 'left'
                }
            }
            this.$emit('on-change', {
                src: src,
                target: target,
                oldIndex: event.oldIndex,
                newIndex: event.newIndex
            })
        }
    }
}
</script>

<style lang="less">
.drag-list-wrapper {
    height: 100%;
    .drag-list-con {
        float: left;
    }
}
</style>
