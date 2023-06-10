<script>
	/**
	 *	fileName  		:  footer.svelte
	 *	Description 	: showing Buuton Next and Prevoious you can go next question and previous question you can also end the test
	 *	Author   		: Mohammad Adil
	 *	version 		: 1.0
	 *	created 		: 7-april-2022;
	 *	updated by 		: Mohammad Adil   mohammad.adil@ucertify.com
	 */
	import Sidebar from '../components/Sidebar.svelte';
	import { reviewFooter } from '../store';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import Timer from '../components/Timer.svelte';
	let sidebar_show = false;
	let review;
	export let qustionIdNo;
	qustionIdNo = Number(qustionIdNo);
	onMount(() => {
		reviewFooter.subscribe((value) => {
			review = value;
		});
	});

	export let current_ques;
	const dispatch = createEventDispatcher();

	function nextQuest() {
		dispatch('update_current');
	}

	function prevQuest() {
		dispatch('update_prev');
	}
	const changeIndex = (event) => {
		console.log('events are', event.detail);
		dispatch('changeCurrent_ques', event.detail);
	};
	const confirmBox = () => {
		dispatch('model');
	};
</script>

<main>
	<footer>
		<div class="container-fluid">
			{#if !review}
				<!-- svelte-ignore a11y-accesskey -->
				<div class="d-flex flex-row-reverse bg-highlight justify-content-between p-0 container-fluid">
					<button class="btn btn-primary" on:click={confirmBox} accesskey="t">End Test</button>
					{#if current_ques == 10}
						<!-- svelte-ignore a11y-accesskey -->
						<button id="nxt" class="btn btn-primary" on:click={nextQuest} disabled>Next</button>
					{:else}
						<!-- svelte-ignore a11y-accesskey -->
						<button id="nxt" class="btn btn-primary" on:click={nextQuest} accesskey="n">Next</button
						>
					{/if}

					<span class="align-self-center">{current_ques + 1} of 11</span>

					{#if current_ques == 0}
						<!-- svelte-ignore a11y-accesskey -->
						<button id="prev" class="btn btn-primary" on:click={prevQuest} disabled>Previous</button
						>
					{:else}
						<!-- svelte-ignore a11y-accesskey -->
						<button id="prev" class="btn btn-primary" on:click={prevQuest} accesskey="p"
							>Previous</button
						>
					{/if}
					<!-- svelte-ignore a11y-accesskey -->
					<button
						class="btn btn-primary"
						on:click={() => (sidebar_show = !sidebar_show)}
						accesskey="l">List</button
					>

					<div class="d-flex align-items-center">
						<Timer />
					</div>
				</div>

				<Sidebar bind:show={sidebar_show} on:changeIndex={changeIndex} />
			{:else}
				<div class="d-flex  justify-content-between p-2 container-fluid">
					<!-- svelte-ignore a11y-accesskey -->
					<button
						class="btn btn-primary ms-1 "
						on:click={() => (sidebar_show = !sidebar_show)}
						accesskey="l">List</button
					>
					{#if qustionIdNo == 0}
						<button id="prev" class="btn btn-primary ms-1  " on:click={prevQuest} disabled>Previous</button
						>
					{:else}
						<!-- svelte-ignore a11y-accesskey -->
						<button id="prev" class="btn btn-primary ms-1" on:click={prevQuest} accesskey="p"
							>Previous</button
						>
					{/if}
					<div class="align-self-center ms-1">
						<h6>{qustionIdNo + 1}of 11</h6>
					</div>
					{#if qustionIdNo == 10}
						<button id="nxt" class="btn btn-primary ms-1" on:click={nextQuest} disabled>Next</button>
					{:else}
						<!-- svelte-ignore a11y-accesskey -->
						<button id="nxt" class="btn btn-primary ms-1" on:click={nextQuest} accesskey="n">Next</button
						>
					{/if}
					<!-- svelte-ignore a11y-accesskey -->
					<Sidebar bind:show={sidebar_show} on:changeIndex={changeIndex} />
					<a href="/">
						<button class="btn btn-primary ms-1">Restart</button>
					</a>
					<a href="/resultPage">
						<button class="btn btn-primary ms-1">Result</button>
					</a>
				</div>
			{/if}
		</div>
	</footer>
</main>
