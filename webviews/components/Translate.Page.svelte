<script lang="ts">
	import type { Data } from "../../src/types";
	import type { Translation } from "../../src/xliff-types";
	import { onMount } from "svelte";
	import SvelteTable from "./SvelteTable.svelte";

	/* Events */
    onMount(() => {
		window.addEventListener("message", (event) => {
			const data : Data = event.data;
            switch (data.type) {
				case "onSetup":
					// TODO : setup to readfile
					break;
			}
		});
	});
	
	const rows = [
	{ id: 1, first_name: "Marilyn", last_name: "Monroe", gender: "female" },
	{ id: 2, first_name: "Abraham", last_name: "Lincoln", gender: "male" },
	{ id: 3, first_name: "Mother", last_name: "Teresa", gender: "female" },
	{ id: 4, first_name: "John F.", last_name: "Kennedy", gender: "male" },
	{
		id: 5,
		first_name: "Martin Luther",
		last_name: "King",
		gender: "male",
	},
	{ id: 6, first_name: "Nelson", last_name: "Mandela", gender: "male" },
	{
		id: 7,
		first_name: "Winston",
		last_name: "Churchill",
		gender: "male",
	},
	{ id: 8, first_name: "George", last_name: "Soros", gender: "male" },
	{ id: 9, first_name: "Bill", last_name: "Gates", gender: "male" },
	{ id: 10, first_name: "Muhammad", last_name: "Ali", gender: "male" },
	{ id: 11, first_name: "Mahatma", last_name: "Gandhi", gender: "male" },
	{
		id: 12,
		first_name: "Margaret",
		last_name: "Thatcher",
		gender: "female",
	},
	{
		id: 13,
		first_name: "Christopher",
		last_name: "Columbus",
		gender: "male",
	},
	{ id: 14, first_name: "Charles", last_name: "Darwin", gender: "male" },
	{ id: 15, first_name: "Elvis", last_name: "Presley", gender: "male" },
	{ id: 16, first_name: "Albert", last_name: "Einstein", gender: "male" },
	{ id: 17, first_name: "Paul", last_name: "McCartney", gender: "male" },
	{
		id: 18,
		first_name: "Queen",
		last_name: "Victoria",
		gender: "female",
	},
	{ id: 19, first_name: "Pope", last_name: "Francis", gender: "male" },
	{ id: 20, first_name: "Mother", last_name: "Teresa", gender: "female" },
	{ id: 21, first_name: "John F.", last_name: "Kennedy", gender: "male" },
	{
		id: 22,
		first_name: "Martin Luther",
		last_name: "King",
		gender: "male",
	},
	{ id: 23, first_name: "Nelson", last_name: "Mandela", gender: "male" },
	{
		id: 24,
		first_name: "Winston",
		last_name: "Churchill",
		gender: "male",
	},
	{ id: 25, first_name: "George", last_name: "Soros", gender: "male" },
	{ id: 26, first_name: "Bill", last_name: "Gates", gender: "male" },
	{ id: 27, first_name: "Muhammad", last_name: "Ali", gender: "male" },
	{ id: 28, first_name: "Mahatma", last_name: "Gandhi", gender: "male" },
	{
		id: 29,
		first_name: "Margaret",
		last_name: "Thatcher",
		gender: "female",
	},
	{
		id: 30,
		first_name: "Christopher",
		last_name: "Columbus",
		gender: "male",
	},
	{ id: 31, first_name: "Charles", last_name: "Darwin", gender: "male" },
	{ id: 32, first_name: "Elvis", last_name: "Presley", gender: "male" },
	{ id: 33, first_name: "Albert", last_name: "Einstein", gender: "male" },
	{ id: 34, first_name: "Paul", last_name: "McCartney", gender: "male" },
	{
		id: 35,
		first_name: "Queen",
		last_name: "Victoria",
		gender: "female",
	},
	{ id: 36, first_name: "Pope", last_name: "Francis", gender: "male" },
	{ id: 37, first_name: "Paul", last_name: "McCartney", gender: "male" },
	{
		id: 38,
		first_name: "Queen",
		last_name: "Victoria",
		gender: "female",
	},
	{ id: 39, first_name: "Pope", last_name: "Francis", gender: "male" },
	{ id: 40, first_name: "Mother", last_name: "Teresa", gender: "female" },
	{ id: 41, first_name: "John F.", last_name: "Kennedy", gender: "male" },
	{
		id: 42,
		first_name: "Martin Luther",
		last_name: "King",
		gender: "male",
	},
	{ id: 43, first_name: "Nelson", last_name: "Mandela", gender: "male" },
	{
		id: 44,
		first_name: "Winston",
		last_name: "Churchill",
		gender: "male",
	},
	{ id: 45, first_name: "George", last_name: "Soros", gender: "male" },
	{ id: 46, first_name: "Bill", last_name: "Gates", gender: "male" },
	{ id: 47, first_name: "Muhammad", last_name: "Ali", gender: "male" },
	{ id: 48, first_name: "Mahatma", last_name: "Gandhi", gender: "male" },
	{
		id: 49,
		first_name: "Margaret",
		last_name: "Thatcher",
		gender: "female",
	},
	{
		id: 40,
		first_name: "Christopher",
		last_name: "Columbus",
		gender: "male",
	},
	{ id: 51, first_name: "Charles", last_name: "Darwin", gender: "male" },
	{ id: 52, first_name: "Elvis", last_name: "Presley", gender: "male" },
	{ id: 53, first_name: "Albert", last_name: "Einstein", gender: "male" },
	{ id: 54, first_name: "Paul", last_name: "McCartney", gender: "male" },
	{
		id: 55,
		first_name: "Queen",
		last_name: "Victoria",
		gender: "female",
	},
	{ id: 56, first_name: "Pope", last_name: "Francis", gender: "male" },
];
const columns = [
	{
		key: "id",
		title: "ID",
		value: (v: any) => v.id,
		sortable: true,
		searchValue: (v: any) => {
			return v.id;
		},
	},
	{
		key: "first_name",
		title: "FIRST_NAME",
		value: (v: any) => v.first_name,
		sortable: true,
		searchValue: (v: any) => {
			return v.first_name;
		},
		filterValue: (v: any) => v.first_name.charAt(0).toLowerCase(),
		editable: true,
	},
	{
		key: "last_name",
		title: "LAST_NAME",
		value: (v: any) => v.last_name,
		sortable: true,
		searchValue: (v: any) => v.last_name,
		filterValue: (v: any) => v.last_name.charAt(0).toLowerCase(),
		editable: true,
	},
	{
		key: "gender",
		title: "GENDER",
		value: (v: any) => v.gender,
		renderValue: (v: any) =>
			v.gender.charAt(0).toUpperCase() + v.gender.substring(1), // capitalize
		searchValue: (v: any) => v.gender,
		sortable: true,
	},
];
</script>

<SvelteTable {columns} {rows} />
