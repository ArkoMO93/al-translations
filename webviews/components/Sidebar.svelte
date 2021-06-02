<script lang="ts">
    import { onMount } from "svelte";
    import InfoSideBar from "./InfoSideBar.svelte";
    import WelcomeSidebar from "./WelcomeSidebar.svelte";

    /* First Setup */
    tsvscode.postMessage({
        type: "getFilesList"
    });

    /* Variables */
    var showWelcome = true;
    var xliffNote = "";
    var fileList : {fileName: string, fileEnabled: boolean}[];

    /* Functions */
    function sendMessage() {
        tsvscode.postMessage({
            type: "onInfo",
            value: "Test",
        });
    }

    function manageShowInfos(_xliffNote: string) {
        showWelcome = false;
        xliffNote = _xliffNote;
    }

    function manageShowFileList(_fileList:{fileName: string, fileEnabled: boolean}[]) {
        fileList = _fileList;
    }

    /* Events */
    onMount(() => {
        window.addEventListener("message", (event) => {
            const data = event.data;
            switch (data.type) {
                case "showInfos":
                    manageShowInfos(data.xliffNote);
                    break;
                case "showFileList":
                    manageShowFileList(data.fileList);
                    break;
            }
        });
    });
</script>

{#if showWelcome}
    <WelcomeSidebar {fileList} />
{:else}
    <InfoSideBar {xliffNote} />
{/if}

<button on:click={sendMessage}>Send Message</button>

<style>
</style>
