<script setup lang="ts">


</script>

<template>
	<div class="about">
        <h3>
            Made with ThreeJs
        </h3>
        <h2>
            by Daniel Bin Schmid
        </h2>
        <div class="contact">
            
            <a href="https://github.com/danielbinschmid" target="_blank" class="contactLink"> {{'Github' }} </a>
            <a href="https://www.linkedin.com/in/daniel-schmid-2a121222a/" target="_blank"> {{'LinkedIn' }} </a>
        </div>
	</div>
</template>

<style scoped>
h2 {
font-size:x-large;
margin-bottom: 1%;
}

h3 {
    font-size: large;
}

p {
    font-size: large;
    text-align: center;
}

a {
    color: black;
}

.contactLink {
    margin-right: 5%;
} 

.contact {
    width: 33%;
    display: flex;
    flex-flow: row;
    justify-content: center;
} 

.about {
    display: flex;
    align-items:center;
    justify-content: center;
    height: 100%;
    flex-flow: column;
}
</style>