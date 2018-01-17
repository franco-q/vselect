# vselect
Select component in Vue


## Install NPM

```bash
$ npm install vue-select
```

Register the component

```html
<script>
import {vselect, voption} from '../dist/index'

export default {
  components: {vselect, voption},
}
</script>


```

You may now use the component in your markup

```html
    <div class="container">
      <vselect placeholder="ORDENAR POR">
        <voption value="volvo">Volvo</voption>
        <voption value="saab" :disabled="true">Saab</voption>
        <voption value="mercedes">Mercedes</voption>
        <voption value="audi">Audi</voption>
      </vselect>
    </div>
```
