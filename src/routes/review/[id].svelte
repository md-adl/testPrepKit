<script context="module">
	export const load = ({ params }) => {
		const id = params.id;
		return {
			props: {
				id: id
			}
		};
	};
</script>

<script>
	// @ts-nocheck

	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';
	import { onDestroy } from 'svelte';

	import { post, reviewFooter, user_cheked } from '../../store';
	export let id;
	let pageNo = Number(id); // change id(string) to id(number) page no. means storing
	let explanationAnswer; //
	// replacing the seq string to only one character(A or ,B or, C or, D )
	$: if (pageNo + 1) {
		explanationAnswer = JSON.parse($post[pageNo].content_text).explanation;
		let indexOfSeq = explanationAnswer.indexOf('<seq');
		while (indexOfSeq > -1) {
			let str1 = explanationAnswer.substr(indexOfSeq, 14);
			let currectAnswer = explanationAnswer.charAt(indexOfSeq + 9);
			currectAnswer = currectAnswer.toUpperCase();
			explanationAnswer = explanationAnswer.replace(str1, currectAnswer);
			indexOfSeq = explanationAnswer.indexOf('<seq');
		}
	}

	const updateQues = (event) => {
		pageNo = event.detail;
	};

	const nextPage = () => {
		pageNo = pageNo + 1;
	};
	const prevPage = () => {
		pageNo = pageNo - 1;
	};
	onDestroy(() => {
		reviewFooter.update((x) => {
			x = false;
		});
	});
</script>

<div>
	<Header />
	<div class="w-50  position-fixed max-vh-100 d-block" style="right:320px">
		{#each $post as data, i}
			{#if pageNo == i}
				<div class="question">
					<p>
						{i + 1} . {JSON.parse(data.content_text).question}
					</p>

					<div>
						<div class="d-flex flex-column  border-danger p-2">
							{#each JSON.parse(data.content_text).answers as answers, j}
								{#if answers.is_correct == 1}
									<label>
										<input
											type="radio"
											class="radio"
											value={j}
											name="radio"
											bind:group={answers}
											checked
										/>
										{@html answers.answer}
									</label>
								{:else}
									<label>
										<input type="radio" name="radio" disabled />
										{@html answers.answer}
									</label>
								{/if}
							{/each}
						</div>
					</div>
					{#each JSON.parse(data.content_text).answers as answersCorrect}
						{#if answersCorrect.is_correct == 1}
							<div class=" w-100    ">
								<p>{@html explanationAnswer}</p>
							</div>
						{/if}
					{/each}
					{#each $user_cheked as user}
						{#if i + 1 == user.question_nmbr}
							{#if user.userOption_ckt == '1'}
								<div class="d-flex justify-content-center mt-2">
									<h6 class="alert alert-success">Correct</h6>
								</div>
							{:else}
								<div class="d-flex justify-content-center mt-2">
									<h6 class="alert alert-danger">Incorrect</h6>
								</div>
							{/if}
						{/if}
					{/each}
				</div>
			{/if}
		{/each}
	</div>
	<div
		class=" position-fixed w-50 bg-dark bg-gradient
    text-white rounded"
		style="bottom:15px;right:15px"
	>
		<Footer
			qustionIdNo={pageNo}
			on:changeCurrent_ques={updateQues}
			on:update_current={nextPage}
			on:update_prev={prevPage}
		/>
	</div>
</div>

<style>
	.radio {
		border: 2px solid white;
		box-shadow: 0 0 0 1px #392;
		appearance: none;
		border-radius: 50%;
		width: 12px;
		height: 12px;
		background-color: green;
		transition: all ease-in 0.2s;
	}
</style>
