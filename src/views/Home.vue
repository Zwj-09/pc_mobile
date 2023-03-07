<template>
  <!-- <MobileComp v-if="isMobile" /> -->
  <PcComp />
</template>

<script setup>
import PcComp from "../components/pc/index.vue";
import MobileComp from "../components/mobile/index.vue";
import { ref, onMounted } from "vue";

const isMobile = ref(false);
onMounted(() => {
  if (checkIsMobile()) {
    isMobile.value = true;
  } else {
    isMobile.value = false;
  }
});

const checkIsMobile = () => {
  return navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
};
</script>

<style lang="less" scoped></style>
