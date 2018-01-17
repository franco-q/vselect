<template>
  <div>
    <div class="container">
      <vselect placeholder="ORDENAR POR">
        <voption value="volvo">Volvo</voption>
        <voption value="saab" :disabled="true">Saab</voption>
        <voption value="mercedes">Mercedes</voption>
        <voption value="audi">Audi</voption>
      </vselect>
    </div>
  </div>
</template>

<script>
import {vselect, voption} from './index'

export default {
  name: 'app',
  components: {vselect, voption},
}
</script>

<style>
.container{
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}
</style>