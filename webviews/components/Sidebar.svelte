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
    var fileChoosen: FileConfig;
    var newFileLanguage: LanguageConfig;

    /* Functions */
    function loadFile() {
        const data: Data = {
            type : "onLoadFile",
            fileChoosen: fileChoosen,
            newFileLanguage: newFileLanguage
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
                case "onSetup":
                    console.log('##onsetup');
                    if(data.fileChoosen){
                        fileChoosen = data.fileChoosen;
                    console.log('##file');
                    }
                    if(data.newFileLanguage){
                        newFileLanguage = data.newFileLanguage;
                    console.log('##lang');
                    }
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
        <select bind:value={fileChoosen} id="files">
            {#each fileList as singleFile}
                <option value={singleFile}>{singleFile.fileName}</option>
            {/each}
        </select>
    {/if}

    {#if fileChoosen && fileChoosen.fileUri == undefined}
        <select bind:value={newFileLanguage} id="files">
            {#each languagesList as singleLanguage}
                <option value={singleLanguage}>{singleLanguage.languageDescription}</option>
            {/each}
        </select>
    {/if}
</form>

<hr />

<button on:click={loadFile}>
    {#if fileChoosen && fileChoosen.fileUri == undefined}
        Create New File
    {:else}
        Load File
    {/if}
</button>

<style>
</style>
