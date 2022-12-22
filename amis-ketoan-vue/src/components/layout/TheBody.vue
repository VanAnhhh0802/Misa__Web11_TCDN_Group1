<template>
    <div class="body">
        <TheSidebar></TheSidebar>
        <ThePage></ThePage>
    </div>
</template>

<script>
import TheSidebar from './TheSidebar.vue';
import ThePage from './ThePage.vue';
export default {
    name: "TheBody",
    components: {
        TheSidebar,
        ThePage
    }
}
</script>
