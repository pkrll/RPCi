<template>
	<div>
		<nav class="bottom-dialog">
			<div v-on:click="$emit('confirm', false)"><span>Cancel</span></div>
			<div v-on:click="$emit('confirm', true)"><span>Confirm</span></div>
		</nav>
	</div>
</template>

<script>
export default {
	name: 'ConfirmButton'
}
</script>

<style>

.bottom-dialog {
	background: rgb(82, 172, 120);
	bottom:     0;
	display: 		table;
	font-size:  5vw;
	padding:    10px 0;
	position:   fixed;
	width:      100%;
	z-index: 		99;
}

.bottom-dialog > div {
	border-left:  	1px solid #fff;
	cursor: 				pointer;
	display: 				table-cell;
	text-align:   	center;
	vertical-align: middle;
	width:        	49%;
}

.bottom-dialog > div:first-child {
	border-left: none;
}

</style>
