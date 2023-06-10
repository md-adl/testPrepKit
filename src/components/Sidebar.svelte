
<script>
	// @ts-nocheck
	/**
	 *	fileName  		: sidebar.svelte
	 *	Description 	: This component has if you click the list button you can see attempted and Unattempted question
	 *	Author   		: Mohammad Adil
	 *	version 		: 1.0
	 *	created 		: 7-april-2022;
	 *	updated by 		: Mohammad Adil   mohammad.adil@ucertify.com
	 */
	import { fly } from 'svelte/transition';
	import { post } from '../store';
	import { chooseAns } from '../store';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let show = true;
	let postData = [];
	import { onMount } from 'svelte';
	onMount(() => {
		post.subscribe((value) => {
			postData = value;
		});
	});
	//     import {content_text} from 'data/jsonFile.json'\
	const setCorrectValue = (i) => {
		dispatch('changeIndex', i);
	};
	$: data = $chooseAns.filter(Boolean);
</script>

{#if show}
	<nav transition:fly={{ x: -550, opacity: 1 }} class="">
		<div
			class="list position-fixed  start-0 mh-100 bg-white text-dark border border-primary  h-100 d-flex flex-column p-2 m"
			style="width:200px;top:58px"
		>
			<div class="mb-0">
				<p class="ps-2">
					attempted :{data.length}
				</p>
				<p class="ps-2">
					unattempted : {11 - data.length}
				</p>
			</div>
			{#each postData as dataItem, i (dataItem)}
				<span
					id="list{i}"
					class=" col-12 text-truncate p-2   "
					on:click={setCorrectValue(i)}
					style="cursor: pointer;"
				>
					Q{i + 1}
					{JSON.parse(dataItem.content_text).question}
				</span>
			{/each}
		</div>
	</nav>
{/if}