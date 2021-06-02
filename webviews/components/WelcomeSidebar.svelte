<script lang="ts">
    export var fileList : {fileName: string, fileEnabled: boolean}[] = [];
</script>

<h1>WELCOME TO AL TRANSLATOR</h1>
<form action="">
    {#each fileList as singleFile}
    <input type="checkbox" name={singleFile.fileName} checked={singleFile.fileEnabled}>
    <label for={singleFile.fileName}>{singleFile.fileName}</label><br>
    {/each}
    <input type="submit" value="Submit">
</form>

<style>
</style>
