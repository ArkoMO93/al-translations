<script>
    export let xliffNoteElements;
</script>

{#if xliffNoteElements.length > 0}
    <div>
        {xliffNoteElements[0].substring(0, xliffNoteElements[0].indexOf(" "))}

        <span>
            {xliffNoteElements[0].substring(xliffNoteElements[0].indexOf(" "))}
        </span>
    </div>
    <ul>
        <li>
            <svelte:self xliffNoteElements={xliffNoteElements.slice(1)} />
        </li>
    </ul>
{/if}

<style>
    span {
        padding: 0 0 0 0.5em;
        background-size: 1em 1em;
        font-weight: bolder;
    }
    ul {
        padding: 0 0 0 0.5em;
        margin: 0 0 0 0.5em;
        list-style: none;
        border-left: 1px solid rgb(117, 117, 117);
    }
    li {
        padding: 0 0;
    }
</style>
