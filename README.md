# vselect
Select component in Vue


## Install NPM

```bash
$ npm install vslct
```

Import the component

```html
<script>
import {vselect, voption} from '../dist/index'

export default {
  ...
  components: {vselect, voption},
  ...
}
</script>


```

In vselect slot you'll must instantiate only option components, this way

```html
    <div class="container">
      <vselect placeholder="SELECT ONE..">
        <voption value="volvo">Volvo</voption>
        <voption value="saab" :disabled="true">Saab</voption>
        <voption value="mercedes">Mercedes</voption>
        <voption value="audi">Audi</voption>
      </vselect>
    </div>
```
