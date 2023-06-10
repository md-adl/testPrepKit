<script>
	// @ts-nocheck
	/**
	 *	fileName  		: Result.svelte
	 *	Description 	: After the giving the test you can see the result percentage and attempted and attempted
	 *	Author   		: Mohammad Adil
	 *	version 		: 1.0
	 *	created 		: 7-april-2022;
	 *	updated by 		: Mohammad Adil   mohammad.adil@ucertify.com
	 */

	import Header from '../components/Header.svelte';
	import { chooseAns, user_cheked, post, reviewFooter } from '../store';
	import { onMount } from 'svelte';

	let incorrectAns = 0;
	let correctAns = 0;
	let score = 0;
	let optionArray = ['A', 'B', 'C', 'D'];
	let actualCorrectArr = [];

	let answerChoosebyUser = [];

	$: for (let i = 0; i < $post.length; i++) {
		let correctIndex = 0;
		if ($chooseAns[i]) {
			for (let j = 0; j < 4; j++) {
				if (JSON.parse($post[i].content_text).answers[j].answer == $chooseAns[i]) {
					correctIndex = j;
				}
			}
		} else {
			correctIndex = null;
		}
		answerChoosebyUser[i] = correctIndex;
	}

	$: for (let i = 0; i < $post.length; i++) {
		let actualCorrect = 0;
		for (let j = 0; j < 4; j++) {
			if (JSON.parse($post[i].content_text).answers[j].is_correct == '1') {
				actualCorrect = j;
			}
		}
		actualCorrectArr[i] = actualCorrect;
	}

	onMount(() => {
		$user_cheked.sort(function (a, b) {
			return a.question_nmbr - b.question_nmbr;
		});
		for (let i = 0; i < $user_cheked.length; i++) {
			if ($user_cheked[i].userOption_ckt == '1') {
				correctAns = correctAns + 1;
			} else {
				incorrectAns += 1;
			}
			score = ((correctAns / 11) * 100).toFixed(2);
		}
	});
	let j;
	let unselected = [];
	let matched = [];
	for (let i = 0; i < $post.length; i++) {
		for (j = 0; j < $user_cheked.length; j++) {
			if (i + 1 == $user_cheked[j].question_nmbr) {
				matched[i] = i + 1;
				break;
			} else {
				matched[i] = 0;
			}
		}
		if (j >= $user_cheked.length) {
			unselected[i] = i + 1;
		}
	}
	$: data = $chooseAns.filter(Boolean);
	const reviewPage = () => {
		reviewFooter.set(true);
	};
</script>

<Header />
<main>
	<div class="container-fluid">
		<div class="header border border-dark d-flex justify-content-between text-center container-fluid p-2">
			<div>
				<h6 class=" bg-success rounded text-white ">Correct</h6>
				<p>{correctAns}</p>
			</div>
			<div>
				<h6 class="bg-danger rounded text-white ">Incorrect</h6>
				<p>{incorrectAns}</p>
			</div>

			<div>
				<h6 class="bg-secondary rounded text-white ">attempted</h6>
				<p>{data.length}</p>
			</div>

			<div>
				<h6 class="bg-primary rounded text-white ">unattempted</h6>
				<p>{11 - data.length}</p>
			</div>

			<div>
				<h6 class="totalResult bg-info rounded">Total Result</h6>
				<p>{score}%</p>
			</div>
		</div>
		<table class="table table-bordered border-primary table-hover">
			<thead class="thead-dark">
				<tr>
					<th scope="col">Number</th>
					<th scope="col">Question</th>
					<th scope="col">Option</th>
					<th scope="col">Result</th>
				</tr>
			</thead>
			<tbody>
				{#each $post as dataItem, i}
					<tr>
						<th scope="row">{i + 1}</th>
						<td>
							<a
								on:click={reviewPage}
								href={`review/${i}`}
								class="w-100 text-decoration-none text-dark"
							>
								{dataItem.snippet}
							</a>
						</td>
						<td>
							<div class="d-flex justify-content-between text-center  ">
								{#each optionArray as optionData, j}
									<div
										class="{`${
											actualCorrectArr[i] == j ? 'bg-success' : ''
										}`}   border d-flex justify-conten-center text-center ms-2 ps-1  text-dark rounded"
										class:selected={actualCorrectArr[i] != answerChoosebyUser[i] &&
										answerChoosebyUser[i] == j
											? true
											: false}
										style="width: 24px; height:24px"
									>
										<p>{optionData}</p>
									</div>
								{/each}
							</div>
						</td>

						<td>
							{#each $user_cheked as selectQue}
								{#if i + 1 == selectQue.question_nmbr}
									{#if selectQue.userOption_ckt == 0}
										Incorrect
									{:else}
										Correct
									{/if}
								{/if}
							{/each}
							{#each unselected as un}
								{#if i + 1 == un}
									Unattempted
								{/if}
							{/each}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<div class="d-flex justify-content-center">
			<a href="/">
				<button class="btn btn-primary">Restart</button>
			</a>
		</div>
	</div>
</main>

<style>
	.selected {
		background-color: red;
	}
</style>
