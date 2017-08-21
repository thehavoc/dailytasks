<template>
    <div class="user-tasks">
        <ul class="list-group">
            <li class="list-group-item">
                Cras justo odio
            </li>
        </ul>        
    </div>
</template>

<script>

    import ApiTasks from '../api/tasks.js';

    export default {
        mounted() {
            this.api = new ApiTasks();
            this.addTasks();
            console.log(this.tasks);
        },
        data() {
            return {
                tasks: Object
            }
        },
        methods: {
            addTasks: function() {
                this.tasks = this.api.getTasks('11');
            }  
        }
    }
</script>
