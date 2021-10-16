<script lang="ts">
    import { onMount } from "svelte";
    import type { Data, FileConfig, LanguageConfig } from "../../src/types";

    /* First Setup */
    var data: Data = {type: "onFileList"};
    tsvscode.postMessage(data);
    data = { type: "onLanguageList"};
    tsvscode.postMessage(data);

    /* Variables */
    var fileList: FileConfig[];
    var languagesList: LanguageConfig[];
    var selectedFile: FileConfig;
    var selectedLanguage: LanguageConfig;

    /* Functions */
    function loadFile() {
        const data: Data = {
            type : "onLoadFile",
            fileChoosen: selectedFile,
            newFileLanguage: selectedLanguage? selectedLanguage.languageCode:''
        }
        tsvscode.postMessage(data);
    }

    /* Events */
    onMount(() => {
        window.addEventListener("message", (event) => {
            const data : Data = event.data;
            switch (data.type) {
                case "onFileList":
                    fileList = data.fileList?data.fileList:[];
                    break;
                case "onLanguageList":
                    languagesList = data.languagesList?data.languagesList:[];
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
