<script>
    import XliffNoteElementSidebar from "./XliffNoteElementSidebar.svelte";

    export let xliffNote = "";
    let xliffNoteElements = xliffNote.split(" - ");
</script>

<h1>INFO</h1>
<hr />
<XliffNoteElementSidebar {xliffNoteElements} />
<hr />
