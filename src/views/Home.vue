<template>
  <div>
    <div class="color-overlay">
      <h1 class="text-center display-3 pt-10 white--text">Welcome</h1>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>
div{
  background: url('../assets/car.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  
}

.color-overlay{
  z-index: 1000;
  height: 100%;
  width: 100%;
  background: rgba(0,0,0, 0.5);
}

</style>