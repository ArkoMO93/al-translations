<script lang="ts">
    import { onMount } from "svelte";
    import InfoSideBar from "./InfoSideBar.svelte";
    import WelcomeSidebar from "./WelcomeSidebar.svelte";

    /* Variables */
    var showWelcome = true;
    var xliffNote = "";

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

    /* Events */
    onMount(() => {
        window.addEventListener("message", (event) => {
            const data = event.data;
            switch (data.type) {
                case "showInfos":
                    manageShowInfos(data.xliffNote);
                    break;
            }
        });
    });
</script>

{#if showWelcome}
    <WelcomeSidebar />
{:else}
    <InfoSideBar {xliffNote} />
{/if}

<button on:click={sendMessage}>Send Message</button>

<style>
</style>
