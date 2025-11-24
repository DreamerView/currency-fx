<template>
    <div class="d-flex gap-3" style="height:36px" v-if="props.loading">
        <div 
            class="skeleton-item bg-body-secondary border rounded-3 py-1 px-3"
            v-for="(_, index) in loadingBlock" 
            :key="index"
        ></div>
    </div>
    <div class="marquee rounded-2" v-if="!props.loading">
        <div class="marquee-track d-flex gap-3">
            <div class="marquee-item d-flex gap-3" v-for="n in 2" :key="n">
                <div class="bg-body-secondary border rounded-3 py-1 px-3 d-flex align-items-center gap-2" v-for="(value, key) in props.list" :key="key">
                    <FlagRender :currency="key" />
                    <p class="m-0">{{ key }}: <b>{{ value }}</b></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import FlagRender from "./FlagRender.vue";
    const loadingBlock = Array(8).fill(0);
    const props = defineProps({
        list: {
            type: Object,
            required: true
        },
        loading: {
            type:Boolean,
            required:true
        }
    });
</script>

<style scoped>
.marquee {
    width: 100%;
    overflow: hidden;
    height:36px;
}

.marquee-track {
    width: max-content;
    animation: scroll 1000s linear infinite;
}

.marquee-item img:hover {
    opacity: 1;
}

@keyframes scroll {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-50%);
    }
}
.skeleton-item {
    width: 100px;
    height: 100%;
    position: relative;
    overflow: hidden; /* ВАЖНО! */
}

.skeleton-item::after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        rgba(255,255,255,0) 0%,
        rgba(255,255,255,0.6) 50%,
        rgba(255,255,255,0) 100%
    );
    animation: loading-shine 1.3s infinite;
}

@keyframes loading-shine {
    from {
        left: -100%;
    }
    to {
        left: 100%;
    }
}


</style>
