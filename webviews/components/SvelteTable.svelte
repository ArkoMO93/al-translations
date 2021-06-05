<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    
    /* Props */
    export let columns;
    export let rows;
    export let sortOrder = 1;
    
    /* Constants */
    const iconAsc = '▲';
    const iconDesc = '▼';
    const iconSearch = '🔍';

    /* Globals */

    let sortFunction = () => "";

    let filterSettings = {}; // obj to filter by search word

    let columnByKey = {};
    columns.forEach(col => {
      columnByKey[col.key] = col;
    });

    let sortBy = ""; // order by this column 
    
    /* Reactives */
    $: c_rows = rows.filter(r => {
        return Object.keys(filterSettings).every(f => {
            // check search (text input) matches
            let resSearch =
                filterSettings[f] === "" ||
                (columnByKey[f].searchValue &&
                    (columnByKey[f].searchValue(r) + "")
                    .toLocaleLowerCase()
                    .indexOf((filterSettings[f] + "").toLocaleLowerCase()) >= 0);
            // check filter (dropdown) matchas
            let resFilter =
                resSearch ||
                filterSettings[f] === undefined ||
                // default to value() if filterValue() not provided in col
                filterSettings[f] ===
                (typeof columnByKey[f].filterValue === "function"
                    ? columnByKey[f].filterValue(r)
                    : columnByKey[f].value(r));
            return resFilter;
        })
    })
    .map(r => (Object.assign({}, r, {$sortOn: sortFunction(r)} ) ) )
    .sort((a, b) => {
        if (a.$sortOn > b.$sortOn) return sortOrder;
        else if (a.$sortOn < b.$sortOn) return -sortOrder;
        return 0;
    });

    $: {
      let col = columnByKey[sortBy];
      if (col !== undefined && typeof col.value === "function") {
        sortFunction = r => col.value(r);
      }
    };

    
    /* Functions */

    function addSearchValues(col){
        filterSettings[col.key] = "";
    }

    function handleClickCell(event, row, key){
      dispatch('clickCell', {event, row, key} );
    };

    // called when clicking the header
    function handleClickCol(event, col){
      updateSortOrder(col.key)
      sortBy = col.key;
      dispatch('clickCol', {event, col, key:col.key} );
    };

    function handleClickRow(event, row){
      dispatch('clickRow', {event, row} );
    };

    function removeSearchValues(col){
        if (typeof filterSettings[col.key] != 'undefined'){
            delete filterSettings[col.key]
            filterSettings = filterSettings;
        }
    }

    function updateSortOrder(colKey){
        if (colKey === sortBy) {
            sortOrder = sortOrder === 1 ? -1 : 1
        } else {
            sortOrder = 1;
        }
    };

    function faicose(e){
        console.log(e.target);
        console.log(e.srcElement);
        console.log(e.srcElement.outerText);
        console.log(c_rows);
    }
</script>
  
<!-- Style -->
<style>
    * {
        padding: 0;
        margin: 0;
        box-sizing: content-box;
        font-size: medium;
    }
    table {
        border-collapse: collapse;
        position: relative;
        width: 100%;
    }
    th {
        color: whitesmoke;
        background-color: #212529;
        position: sticky;
        top: 0;
    }
    input {
        border: none;
    }
    .isSortable {
        cursor: pointer;
    }
    .row {
        border-bottom: 1px solid rgb(131, 131, 131);
    }
    .row:hover {
        background-color: rgb(211, 211, 211);
        color: #212529;
    }
    .search {
        border: 0;
        background: none;
        border-radius: 0;
        color: whitesmoke;
    }
    .search:focus{
        outline: none;
    }
    .small {
        font-size: small;
    }
    .unfocusFilter {
        color: rgb(88, 87, 87);
    }
</style>
  
<!-- HTLM -->
<table class="">
    <thead class="">
        <slot name="header" sortOrder={sortOrder} sortBy={sortBy}>
            <!-- Header -->
            <tr>
            {#each columns as col}
                <th class="isSortable">
                    {#if sortBy === col.key}
                        <span on:click={(e) => handleClickCol(e, col)}>{sortOrder === 1?iconAsc:iconDesc}</span>
                    {:else}
                        <span on:click={(e) => handleClickCol(e, col)} class="unfocusFilter">{iconAsc}</span>
                    {/if}
                    {#if col.searchValue != undefined}
                        {#if typeof filterSettings[col.key] != 'undefined'}
                            <input bind:value={filterSettings[col.key]} placeholder={col.title} class="search">
                            <span on:click={() => removeSearchValues(col)} class="small">x</span>
                        {:else}
                            <span on:click={(e) => handleClickCol(e, col)}>{col.title}</span>
                            <span on:click={() => addSearchValues(col)} class="small">{iconSearch}</span>
                        {/if}
                    {/if}
                    
                </th>
            {/each}
            </tr>
        </slot>
    </thead>
    <tbody class="">
        <!-- Rows  -->
        {#each c_rows as row, n}
        <slot name="row" row={row} n={n} >
          <tr on:click={(e)=>{handleClickRow(e, row)}} class="row">
            {#each columns as col}
                {#if col.editable}
                    <td
                        on:click={(e)=>{handleClickCell(e, row, col.key)}}
                        on:input={(e)=>{faicose(e)}}
                        class=""
                        contenteditable 
                        colVal={col.value(row)}
                        rowVal={n}>
                            {@html col.renderValue ? col.renderValue(row) : col.value(row)}
                    </td>
                {:else}
                    <td
                        on:click={(e)=>{handleClickCell(e, row, col.key)}}
                        class="">
                            {@html col.renderValue ? col.renderValue(row) : col.value(row)}
                    </td>
                {/if}
            {/each}
          </tr>
        </slot>
        {/each}
    </tbody>
</table>