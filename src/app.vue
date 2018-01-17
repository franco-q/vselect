<template>
  <div>
    <div class="container">
      <span>{{foo}}</span>
      <vselect placeholder="ORDENAR POR" v-model="foo">
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
  data(){
    return{
      foo: 'hello'
    }
  }
}
</script>

<style>
.container{
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}
</style>