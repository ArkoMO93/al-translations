<script lang="ts">
    import { onMount } from "svelte";
    import type { FileConfig } from "../globals";

    /* First Setup */
    tsvscode.postMessage({
        type: "getFilesList",
    });

    /* Variables */
    var fileList: FileConfig[];
    var selectedFile: FileConfig;

    /* Functions */
    function loadFile() {
        tsvscode.postMessage({
            type: "loadFile",
            fileChoosen: selectedFile,
        });
    }

    function manageShowFileList(_fileList: FileConfig[]) {
        fileList = _fileList;
    }

    /* Events */
    onMount(() => {
        window.addEventListener("message", (event) => {
            const data = event.data;
            switch (data.type) {
                case "showFileList":
                    manageShowFileList(data.fileList);
                    break;
            }
        });
    });
</script>

<h1>WELCOME TO AL TRANSLATOR</h1>
<hr />
<form action="">
    <label for="files">Choose a file to translate:</label>

    {#if fileList}
        <select bind:value={selectedFile} id="files">
            {#each fileList as singleFile}
                <option value={singleFile}>{singleFile.fileName}</option>
            {/each}
        </select>
    {/if}
</form>
<button on:click={loadFile}>Load File</button>

<style>
</style>
