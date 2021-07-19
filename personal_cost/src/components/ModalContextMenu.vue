<template>
<div class="content">
    <div>
        <button @click="onEdit" class="edit">Edit</button>
    </div>
    <div>
        <button @click="onDelete" class="delete">Delete</button>
    </div>
</div>
</template>

<script>
export default {
    methods: {
        onEdit(){
            console.log('edit')
        },
        onDelete(){
            console.log('delete')
        }
    },
}
</script>

<style scoped>
.content{
    position: absolute;
    padding: 5px;
    top: 48%;
    right: 25%;
    background: #cafdff;
}
</style>