<script lang="ts">
    export var fileList: { fileName: string; fileEnabled: boolean }[] = [];

    /* Functions */
    function sendMessage() {
        tsvscode.postMessage({
            type: "onInfo",
            value: "Test",
        });
    }
</script>

<h1>WELCOME TO AL TRANSLATOR</h1>
<hr />
<p>Choose the files that you want to translate:</p>
<form action="">
    {#each fileList as singleFile}
        <input
            type="checkbox"
            name={singleFile.fileName}
            checked={singleFile.fileEnabled}
        />
        <label for={singleFile.fileName}>{singleFile.fileName}</label><br />
    {/each}
</form>
<button on:click={sendMessage}>Send Message</button>

<style>
</style>
