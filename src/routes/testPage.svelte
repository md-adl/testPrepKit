<script>
	// @ts-nocheck
	/**
	 *	fileName  		:  test.svelte
	 *	Description 	:  this page have question ans answer you can give the test also showing the list of attemeted and Unattempted question
	 *	Author   		: Mohammad Adil
	 *	version 		: 1.0
	 *	created 		: 7-april-2022;
	 *	updated by 		: Mohammad Adil   mohammad.adil@ucertify.com
	 */

	import { post, user_cheked } from '../store';
	import Footer from '../components/Footer.svelte';
	import { chooseAns } from '../store';
	import Confirm from '../components/Confirm.svelte';
	import { onMount } from 'svelte';
	import Header from '../components/Header.svelte';
	let posts = [];
	let current_ques = 0;
	let value = false;

	let checked_ans = [];
	$: chooseAns.update((items) => {
		return [...checked_ans];
	});
	let user_cheked_data = [];

	onMount(async () => {
		const responce = await fetch(`data/jsonFile.json`);
		posts = await responce.json();
		post.set(posts);
	});

	const Incre = () => {
		current_ques = current_ques + 1;
	};

	const decre = () => {
		current_ques = current_ques - 1;
	};
	const question_attempt = (i, index) => {
		let id = JSON.parse(posts[i].content_text).answers[index].id;
		let userOption_ckt = JSON.parse(posts[i].content_text).answers[index].is_correct;
		let userOption_ckd = index;
		let userCheck_ques = JSON.parse(posts[i].content_text).question;
		let quetionId = JSON.parse(posts[i].content_id);
		let question_nmbr = i + 1;
		user_cheked_data.push({
			userOption_ckt: userOption_ckt,
			userOption_ckd: userOption_ckd,
			userCheck_ques: userCheck_ques,
			question_nmbr: question_nmbr,
			quetionId: quetionId
		});
		user_cheked.set(user_cheked_data);
		for (i = 0; i <= user_cheked_data.length; i++) {}
	};
	const changeCurrent_ques = (event) => {
		current_ques = event.detail;
	};
	const model = () => {
		value = true;
	};
	const offBox = () => {
		value = false;
	};
</script>

<main>
	<Header />
	<div class="w-50 margin-auto position-fixed container-fluid " style="right:320px">
		{#each posts as dataItem, i (dataItem)}
		
			{#if current_ques == i}
				<span class="show-ques">{i + 1}. {JSON.parse(dataItem.content_text).question}</span>

				{#each JSON.parse(dataItem.content_text).answers as ans, index (ans)}
					<div class="d-flex justify-content-center flex-column">
						<label>
							<input
								on:click={question_attempt(i, index)}
								type="radio"
								name="ans"
								id={ans.id}
								class="selectAns"
								value={ans.answer}
								bind:group={checked_ans[i]}
							/>
							{@html ans.answer}
						</label>
					</div>
				{/each}
			{/if}
		{/each}
	</div>
</main>
<div
	class=" position-fixed w-50 bg-dark bg-gradient
p-2 text-white rounded"
	style="bottom:15px;right:15px"
>
	<Footer
		on:update_current={Incre}
		on:update_prev={decre}
		{current_ques}
		on:changeCurrent_ques={changeCurrent_ques}
		on:model={model}
	/>
</div>
{#if value}
	<div class="position-relative top-50  translateX(-50%)  translateY(-50%)">
		<Confirm on:offBox={offBox} />
	</div>
{/if}
