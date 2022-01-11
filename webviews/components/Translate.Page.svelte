<script lang="ts">
    import Icon from "./Icon.svelte";
    import { onMount } from "svelte";
    import Table from "./Table.svelte";
    import type { SimpleTransUnit } from "../sveltetable-types";
    import type { Data } from "../../src/types";

    let data:SimpleTransUnit[] = generateData();
    let editedData: SimpleTransUnit[] = [];

    //#region events
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
    //#endregion


    //#region generators
    function generateData():SimpleTransUnit[]{
        let tempSimpleTransUnits: SimpleTransUnit[] = [];
        for (let index = 1; index-1 < 100; index++) {
            let currentTransUnit : SimpleTransUnit = {
                trans_id : "id_" + index,
                original_source: "source_" + index,
                source: "source_" + index,
                original_target: "target_" + index,
                target: "target_" + index,
                xliffNote: getRandomXliffNote(index),
                notes: []
            };
            for (let index = 1; index - 1 < Math.floor(Math.random() * 20); index++) {
                currentTransUnit.notes?.push({
                    from: "from_" + index,
                    value: "value_" + index
                });
            }
            tempSimpleTransUnits.push(currentTransUnit);
        }
        return tempSimpleTransUnits;
    }

    function getRandomXliffNote(_index:number):string {
        let xliffNote: string = "";
        switch (Math.floor(Math.random() * 5 + 1)) {
            case 1:
                xliffNote =  "Table Tab_" + _index;
                break;
            case 2:
                xliffNote =  "Page Pag_" + _index;
                break;
            case 3:
                xliffNote =  "Codeunit Codeunit_" + _index;
                break;
            case 4:
                xliffNote =  "XMLPort Xmlport_" + _index;
                break;
            case 5:
                xliffNote =  "Report Report_" + _index;
                break;
            default:
                break;
        }
        xliffNote += " - Field Field_" + _index + " - Property Prop_" + _index;
        return xliffNote;
    }
    //#endregion

    //#region handlers
    function handleCancelButton(){
        editedData = [];
        data.map(
            (value) => {
                value.source = value.original_source; value.target = value.original_target});
        data = data;
    }

    function handleSaveButton(){
        // TODO to handle in vscode
        alert("To handle")
    }
    //#endregion
</script>

<div class="container">
    <div class="row header">
        <div class="header-nav">
            <!-- TODO: add a link to the store -->
            <a class="link" href="TODO"><Icon iconName="extension" height={35} width={220}/></a>
            <div class="btn-group">
                <button type="button" class="btn btn-outline-secondary"
                    disabled={editedData.length==0}
                    on:click={() => handleSaveButton()}>Save</button>
                <button type="button" class="btn btn-outline-secondary"
                    disabled={editedData.length==0}
                    on:click={() => handleCancelButton()}>Clear</button>
            </div>
        </div>
    </div>
    <div class="row body">
        <Table columns={["Source", "Target"]}
            bind:editedData={editedData}
            bind:data={data}/>
    </div>
</div>

<style>
    .btn-outline-secondary:hover {
        color: var(--vscode-foreground);
        background-color: var(--vscode-button-background);
        border-color: var(--vscode-button-background);
    }
    .btn-outline-secondary {
        color: var(--vscode-foreground);
        border-color: var(--vscode-button-background);
    }
    .container {
        height: 835px;
    }
    .header {
        align-items: center;
        height: 7%;
    }
    .header-nav {
        display: flex;
        justify-content: space-between;
    }
    .link {
        align-items: center;
        display: flex;
        justify-content: center;
    }
    .body {
        height: 93%;
    }
</style>