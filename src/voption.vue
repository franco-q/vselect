<template>
	<option :value="value" :selected="selected" :disabled="disabled"><slot></slot></option>
</template>
<script>
export default{
	name: 'voption',
	props: {
		value: null,
		selected: false,
		disabled: false
	}
}
</script>