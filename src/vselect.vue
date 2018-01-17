<template>
	<div class="_select-wrap" :class="{'_select-active': active}">
		<div :for="id" class="_select" :class="{'_select-mobile': mobile}" @click="active = !active">
			<select ref="select" v-model="model" :id="id">
				<slot></slot>
			</select>
			<span class="_select-selected">{{text}}</span>
			<span class="_select-caret"></span>
			<transition name="_select">
				<ul class="_select-options" v-if="active">
					<template  v-for="(option,i) in options">
						<li class="_select-option" :class="{'_select-option-disabled': option.disabled}" :key="i" @click.stop="selected = option">{{option.$el.innerText}}</li>  
					</template>
				</ul>
			</transition>
		</div>
	</div>
</template>

<script>
import {addEvent, removeEvent, guid, triggerEvent} from './functions'

export default {
	name: 'vselect',
	props: {
		placeholder: null, 
		id: {type: String, default: '_' + guid()}
	},
	data() {
		return {
			options: null,
			model: null,
			text: this.placeholder,
			selected: null,
			active: false,
			mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
		}
	},
	watch:{
		selected(a,b){
			if (!a.disabled) {
				this.text = a.$el.innerText;
				this.model = a.value;
				this.$emit('change', a.vlue);
				this.active = false;
			}
			else{
				this.active = true;
			}
		}
	},
	updated(){
		var handler = a => {
			removeEvent(document, 'click', handler);
			!this.$el.contains(a.target) && (this.active = false);
		};

		this.active && addEvent(document, 'click', handler);
	},
	mounted(){
		this.options = this.$children.map(a => { 
			if (a.hasOwnProperty('$options') && a.$options.name == 'voption') {
				return a;
			}
		});
	},
}
</script>

<style lang="scss">
._select{
	&-wrap{
		z-index: 1;
		position: relative;
		background-color: #FFF;
		display: inline-block;
		cursor: default;
		border-top: 1px solid #F1F1F1;
		border-right: 1px solid #E7E6E6;
		border-left: 1px solid #E7E6E6;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
	}
	&-wrap:not(&-active){
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
		border-bottom: 1px solid #CFCFCF;
	}
	&-selected{
		position: relative;
		display: block;
		float: left;
		padding: 5px;
		font-size: 1.2rem;
		padding-right: 30px;
		user-select: none;
		-o-user-select: none;
		-moz-user-select: none;
		-khtml-user-select: none;
		-webkit-user-select: none;
	}
	&-caret{
		background-size: contain;
		background-image: url('data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDI4NC45MjkgMjg0LjkyOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjg0LjkyOSAyODQuOTI5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTI4Mi4wODIsNzYuNTExbC0xNC4yNzQtMTQuMjczYy0xLjkwMi0xLjkwNi00LjA5My0yLjg1Ni02LjU3LTIuODU2Yy0yLjQ3MSwwLTQuNjYxLDAuOTUtNi41NjMsMi44NTZMMTQyLjQ2NiwxNzQuNDQxICAgTDMwLjI2Miw2Mi4yNDFjLTEuOTAzLTEuOTA2LTQuMDkzLTIuODU2LTYuNTY3LTIuODU2Yy0yLjQ3NSwwLTQuNjY1LDAuOTUtNi41NjcsMi44NTZMMi44NTYsNzYuNTE1QzAuOTUsNzguNDE3LDAsODAuNjA3LDAsODMuMDgyICAgYzAsMi40NzMsMC45NTMsNC42NjMsMi44NTYsNi41NjVsMTMzLjA0MywxMzMuMDQ2YzEuOTAyLDEuOTAzLDQuMDkzLDIuODU0LDYuNTY3LDIuODU0czQuNjYxLTAuOTUxLDYuNTYyLTIuODU0TDI4Mi4wODIsODkuNjQ3ICAgYzEuOTAyLTEuOTAzLDIuODQ3LTQuMDkzLDIuODQ3LTYuNTY1QzI4NC45MjksODAuNjA3LDI4My45ODQsNzguNDE3LDI4Mi4wODIsNzYuNTExeiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=');
		display: block;
		position: absolute;
		width: 10px;
		height: 10px;
		right: 10px;
		top: calc(50% - 5px);
		transition: all .2s;
	}
	&-active &-caret{
		-ms-transform: rotate(180deg);
		-webkit-transform: rotate(180deg);
		transform: rotate(180deg);
	}
	&-mobile &-options{
		display: none;
	}
	&-mobile{
		select{
			z-index: 1;
		}
	}
	&-option{
		padding: 5px;
		font-size: 1.1rem;
		cursor: pointer;
		&-disabled{
			color: #9E9E9E;
			background-color: #E0E0E0;
			cursor: not-allowed;
		}
		&:hover{
			background-color: #e0e0e0;
		}
		&s{
			background-color: #FFF;
			border-bottom-left-radius: 5px;
			border-bottom-right-radius: 5px;
			border-bottom: 1px solid #CFCFCF;
			border-left: 1px solid #E7E6E6;
			border-right: 1px solid #E7E6E6;
			left: -1px;
			list-style: none;
			margin: 0;
			max-height: 100vh;
			padding: 0;
			position: absolute;
			right: -1px;
			top: 100%;
		}
	}
	select{
		-khtml-opacity: 0;
		-moz-box-sizing: border-box;
		-moz-opacity: 0;
		-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
		-webkit-box-sizing: border-box;
		border: none;
		box-sizing: border-box;
		filter: alpha(opacity=0);
		height: 100%;
		left: 0;
		opacity: 0;
		position: absolute;
		right: 0;
		top: 0;
		width: 100%;
	}
	&-enter-active, &-leave-active {
		transition: all .2s;
		overflow: hidden;
		max-height: 100vh;
	}
	&-enter, &-leave-to {
		max-height: 0;
	}
}
</style>