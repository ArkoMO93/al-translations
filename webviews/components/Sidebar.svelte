<script lang="ts">
    import { onMount } from "svelte";
    import type { FileConfig, LanguageConfig } from "../globals";

    /* First Setup */
    tsvscode.postMessage({
        type: "getFilesList",
    });
    tsvscode.postMessage({
        type: "getLanguageList"
    });
    // TODO : get list of languages

    /* Variables */
    var fileList: FileConfig[];
    var languagesList: LanguageConfig[];
    var selectedFile: FileConfig;
    var selectedLanguage: LanguageConfig;

    /* Functions */
    function loadFile() {
        tsvscode.postMessage({
            type: "loadFile",
            fileChoosen: selectedFile,
            newFileLanguage: selectedLanguage.languageCode
        });
    }

    /* Events */
    onMount(() => {
        window.addEventListener("message", (event) => {
            const data = event.data;
            switch (data.type) {
                case "showFileList":
                    fileList = data.fileList;
                    break;
                case "showLanguageList":
                    languagesList = data.languagesList;
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

    {#if selectedFile && selectedFile.fileUri == undefined}
        <select bind:value={selectedLanguage} id="files">
            {#each languagesList as singleLanguage}
                <option value={singleLanguage}>{singleLanguage.languageDescription}</option>
            {/each}
        </select>
    {/if}
</form>

<hr />

<button on:click={loadFile}>
    {#if selectedFile && selectedFile.fileUri == undefined}
        Create New File
    {:else}
        Load File
    {/if}
</button>

<style>
</style>
