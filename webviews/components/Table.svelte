<script lang="ts">
    import Icon from "./Icon.svelte";
    import type { SimpleTransUnit } from "../sveltetable-types";

    export let columns: string[] = [];
    export let data: SimpleTransUnit[] = [];
    export let editedData: SimpleTransUnit[] = [];

    let currentlySelectedSimpleTransUnitId: string = "";
    let currentlySelectedSimpleTransUnit: SimpleTransUnit|undefined;
    
    //#region reactive statements
    $: {
        currentlySelectedSimpleTransUnit = data.find((simpletransunit)=>{return simpletransunit.trans_id == currentlySelectedSimpleTransUnitId})
    }
    //#endregion

    //#region handlers
    function handleTableRowFocus(_simpletransunitid:string){
        currentlySelectedSimpleTransUnitId = _simpletransunitid;
    }

    function handleTableRowChange(_simpletransunit:SimpleTransUnit){
        const simpletransunit = editedData.find((simpletransunit) => {return simpletransunit.trans_id == _simpletransunit.trans_id});
        let index = -1;
        if(simpletransunit){
            index = editedData.indexOf(simpletransunit);
        }
        if(index >= 0) {
            editedData.splice(index,1);   
        }
        if((_simpletransunit.source !== _simpletransunit.original_source) ||
            (_simpletransunit.target !== _simpletransunit.original_target)){
            editedData.push(_simpletransunit);
        }
        editedData = editedData;
    }
    //#endregion

</script>

<div class="container height-maxed">
    <div class="row height-maxed">
        <div class="col-9 scrollable">
            <table class="table table-hover">
                <thead>
                    <a id="top"> </a>
                    <tr>
                        {#each columns as column}
                        <th class="col-header" scope="col">{column}</th>
                        {/each}
                    </tr>
                </thead>
                <tbody>
                    {#each data as row}
                    <tr 
                        class="table"
                        class:table-active="{currentlySelectedSimpleTransUnit?currentlySelectedSimpleTransUnit.trans_id == row.trans_id:false}"
                        class:table-edited="{editedData.find((simpletransunit) => {return simpletransunit.trans_id == row.trans_id})?true:false}">
                        <td>
                            <input 
                                bind:value={row.source}
                                on:focus={() => handleTableRowFocus(row.trans_id)}
                                on:change={() => handleTableRowChange(row)}>
                        </td>
                        <td>
                            <input
                                bind:value={row.target}
                                on:focus={() => handleTableRowFocus(row.trans_id)}
                                on:change={() => handleTableRowChange(row)}>
                        </td>
                    </tr>
                    {/each}
                </tbody>
            </table>
            <a href="#top" class="back-to-top-btn"><Icon iconName="Up"/></a>
        </div>
        <div class="col scrollable infobox">
            {#if currentlySelectedSimpleTransUnit}
                {#if currentlySelectedSimpleTransUnit.xliffNote}
                <ul class="list-group">
                    {#each currentlySelectedSimpleTransUnit.xliffNote.split(" - ") as element, index}
                    <li class="list-group-item">
                        {#if index == 0}
                            <Icon iconName="{element.split(" ").length>0?element.split(" ")[0]:""}"/>
                        {:else}
                            {#each Array(index) as _}
                                <Icon iconName="Right"/>   
                            {/each}
                        {/if}
                        <b>{element.split(" ").length>0?element.split(" ")[0]:""}</b>
                        {element.indexOf(" ")>0? element.slice(element.indexOf(" ")):element + "123"}
                    </li>
                    {/each}
                </ul>
                {/if}
                {#if currentlySelectedSimpleTransUnit.notes}
                <ul class="list-group">
                    {#each currentlySelectedSimpleTransUnit.notes as note}
                    <li class="list-group-item">{note.from} - {note.value}</li>
                    {/each}
                </ul>
                {/if}
            {:else}
                <div class="container height-maxed">
                    <div class="row align-items-center height-maxed">
                        <div class="col info">Select an item to show additional informations</div>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    div {
        margin: 0px;
        padding: 0px;
        scroll-behavior: smooth;
    }
    input {
        background-color: inherit;
        border: none;
        color: var(--vscode-foreground);
        height: 100%;
        outline: none;
        width: 100%;
    }
    .col-header {
        background: var(--vscode-button-background);
        color: var(--vscode-editor-background);;
        font-weight: bolder;
    }
    .table {
        background: var(--vscode-editor-background);
        border: none;
        border-left: solid 8px var(--vscode-editor-background);
    }
    .table-active {
        background: var(--vscode-button-background);
        box-shadow: none;
        --bs-table-accent-bg: none;
    }
    .table-active > td > input {
        color: var(--vscode-editor-background);
        font-weight: bolder;
    }
    .table-edited {
        border-left: solid 8px var(--vscode-button-background);
    }
    .infobox {
        background: var(--vscode-button-background);
    }
    .height-maxed {
        height: 100%;
    }
    .scrollable {
        height: 100%;
        overflow: overlay;
    }
    .info {
        font-style: italic;
        margin: 10%;
        text-align: justify;
        text-justify: inter-word; 
    }
    .list-group {
        margin: 5%;
    }
    .list-group-item {
        background: var(--vscode-editor-background);
        color: var(--vscode-foreground);
    }
    .back-to-top-btn {
        background: var(--vscode-button-background);
        border-radius: 50%;
        height: 3rem;
        left: 65%;
        line-height: 3rem;
        position: absolute;
        text-align: center;
        text-decoration: none;
        top: 90%;
        width: 3rem;
    }
</style>