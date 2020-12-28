<template>
  <div>
    <p class="example"> hello world </p>
    <p>this is a simple demo</p>
  </div>
</template>

<script>
import './global.css';

export default {
  name: 'cusComponent',
  data(){
    return {}
  } 
}
</script>

<style scoped>
.example {
  color: yellow;
  font-weight: bold;
}
</style>