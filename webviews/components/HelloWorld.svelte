<script lang="ts">
    var count = 1;
    var testing: string[][] = [];
    testing[0] = ["a", "b", "c"];
    testing[1] = ["a1", "b1", "c1"];

    function addElement() {
        count++;
        testing = [...testing, ["a" + count, "b" + count, "c" + count]];
    }
</script>

<table>
    {#each testing as row}
        <tr>
            {#each row as element}
                <td>{element}</td>
            {/each}
        </tr>
    {/each}
</table>
<button on:click={addElement}>Add Element</button>
<!-- TODO: Da rifare -->

<style>
</style>
