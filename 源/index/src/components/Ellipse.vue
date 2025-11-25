<template>
  <div :class="['ellipse', className]" />
</template>

<script>
export default {
  name: "Ellipse",
  props: {
    className: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
.ellipse {
  aspect-ratio: 1;
  background-image: url(../../static/img/ellipse-78.png);
  background-position: 50% 50%;
  background-size: cover;
  height: 30px;
  width: 30px;
}
</style>