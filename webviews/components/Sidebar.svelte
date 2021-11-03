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
    var sourceFileChoosen: FileConfig;
    var fileChoosen: FileConfig;
    var newFileLanguage: LanguageConfig;

    /* Functions */
    function loadFile() {
        const data: Data = {
            type : "onLoadFile",
            sourceFileChoosen: sourceFileChoosen,
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

<form action="">
    <hr />
    <label for="sourceFiles">Choose a source file for the translation:</label>
    <br>
    {#if fileList}
        <select bind:value={sourceFileChoosen} id="sourceFiles">
            {#each fileList as singleFile}
                <option value={singleFile}>{singleFile.fileName}</option>
            {/each}
        </select>
    {/if}

    <hr />
    <label for="files">Choose a file to translate:</label>
    <br>
    {#if fileList}
        <select bind:value={fileChoosen} id="files">
            {#each fileList as singleFile}
                <option value={singleFile}>{singleFile.fileName}</option>
            {/each}
        </select>
    {/if}

    {#if fileChoosen && fileChoosen.filePath == undefined}
        <select bind:value={newFileLanguage} id="files">
            {#each languagesList as singleLanguage}
                <option value={singleLanguage}>{singleLanguage.languageDescription}</option>
            {/each}
        </select>
    {/if}
    <hr />
</form>

<button on:click={loadFile}>
    {#if fileChoosen && fileChoosen.filePath == undefined}
        Create New File
    {:else}
        Load File
    {/if}
</button>

<div class="footer">
    made by Marco Olivieri
</div>

<style>
    .footer{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        color: rgb(100, 100, 100);
        text-align: right;
    }
</style>
