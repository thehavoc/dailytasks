<template>
    <div class="user-tasks">
        <ul class="list-group">
            <li class="list-group-item" v-for="task in tasks">
                {{ task.title }}
            </li>
        </ul>        
    </div>
</template>

<script>

    import ApiTasks from '../api/tasks.js';

    export default {
        mounted() {
            this.api = new ApiTasks();
            this.fetchTasks();
        },
        data() {
            return {
                tasks: Object
            }
        },
        methods: {
            fetchTasks: function() {
                this.api.getTasks(this.getTasksCallback);
            },
            getTasksCallback: function(response) {
                this.tasks = response;
            },            
        }
    }
</script>
