

<script>
	// @ts-nocheck
	/**
	 *	fileName  		: Timer.svelte
	 *	Description 	: This component shows the confirmation do you want to end the test
	 *	Author   		: Mohammad Adil
	 *	version 		: 1.0
	 *	created 		: 25-4-2022;
	 *	updated by 		: Mohammad Adil   mohammad.adil@ucertify.com
	 */

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	const offBox = () => {
		dispatch('offBox');
	};
</script>

<div class="position-fixed top-50 start-50 d-flex justify-content-center align-items-center w-100 h-100" style="transform: translate(-50%, -50%);background-color: rgba(0, 0, 0, 0.3)">
	<div class="p-5 rounded text-center bg-white" style="max-width: 400px; ">
		<h5>Are you sure want to confirm ?</h5>
	<div>
		<a href="/resultPage">
			<button class="btn btn-success">Yes</button>
		</a>
		<button class="btn btn-danger" on:click={offBox}>No</button>
	</div>
	</div>
	
</div>


