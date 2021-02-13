<template>
    <button v-if="direction === 'previous'" id="previous" class="pagination" :class="page === 1 ? 'disabled' : ''" @click="changePage" ref="arrow" :disabled="page === 1">
        <div class="arrow">&#60;</div>
    </button>
    <button v-if="direction === 'next'" id="next" class="pagination" @click="changePage" ref="arrow">
        <div class="arrow">&#62;</div>
    </button>
</template>

<script>
export default {
    emits: ['change-page'],
    props: {
        direction: {
            type: String,
            required: true
        },
        page: {
            type: Number,
            required: true,
            default: 1
        }
    },
    methods: {
        changePage() {
            this.$emit('change-page', this.$refs.arrow.id)
        }
    }
}
</script>