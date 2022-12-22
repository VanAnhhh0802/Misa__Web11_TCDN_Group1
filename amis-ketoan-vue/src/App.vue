<template>
  <div>
    <TheHeader></TheHeader>
    <TheBody></TheBody>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheBody from './components/layout/TheBody.vue';
export default {
  name: 'App',
  components: {
    TheHeader,
    TheBody,
  }
}
</script>

<style>

</style>
