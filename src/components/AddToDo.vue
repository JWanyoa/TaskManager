<template>
    <div>
       <div>
          <a href="#" class="btn btn-primary btn-sm mb-4" data-toggle="modal" data-target="#squarespaceModal"><b><i class="fa fa-plus"></i></b> Add new task</a>
          <div class="add">
             <div class="modal fade" id="squarespaceModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                <div class="modal-dialog">
                   <div class="modal-content">
                      <div class="modal-header">
                         <h3 class="modal-title float-right" id="lineModalLabel">Add Task</h3>
                         <button type="button" class="close float-left" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                      </div>
                      <div class="modal-body">
                         <!-- content goes here -->
                         <form @submit="onSubmit">
                            <div id='addr0'>
                               <div class="form-group">
                                  <input class="form-control" type="text" name='title'  placeholder='Title' v-model="todo.title"/>
                               </div>
                               <div class="form-group">
                                  <input class="form-control" type="text" name='description' placeholder='Description' v-model="todo.description"/>
                               </div>
                               <div class="form-group">
                                  <input class="form-control" disabled type="date" name='date_added' placeholder='Date Added' v-model="todo.date_added"/>
                               </div>
                               <div class="form-group">
                                  <input class="form-control" type="date" name='deadline' placeholder='Deadline' v-model="todo.deadline"/>
                               </div>
                               <div class="form-group">
                                  <input class="form-control" type="date" name='date_completed' placeholder='Date Completed' v-model="todo.date_completed"/>
                               </div>
                               <div>
                                  <button  type="submit" class="btn btn-primary btn-sm" ><i class="fa fa-plus"></i> Add Task</button>
                               </div>
                            </div>
                         </form>
                      </div>
                      <div class="modal-footer">
                         <div class="btn-group btn-group-justified" role="group" aria-label="group button">
                            <div class="btn-group" role="group">
                               <button type="button" class="btn btn-default" data-dismiss="modal"  role="button">Close</button>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
 </template>
 <script>
    import { mapActions } from 'vuex';
     
    export default {
      setup()
      {
         return {}
      },
      name: "AddTodo",
      data()
      {
         return{
            todo:
               {
                  id:'',
                  title: '',
                  description : '',
                  date_added : new Date().toISOString().slice(0,10),
                  deadline : '',
                  date_completed :'',
                  completed:false
               }
         }
      },
      methods:
      {
         ...mapActions(["addTodo"]),
         onSubmit() {
         this.$store.dispatch('addTodo', this.todo);
        }
      }
      // data()
      // {
      //    return{
      //       myTodos:[
      //          'title' = title,
      //          'description' = description,
      //          'date_added' = date_added,
      //          'deadline' = deadline,
      //          'date_completed' = date_completed
      //       ]
      //    }
      // },
      // computed: mapState(["myTodos"]),
      // methods: {
      //   ...mapActions(["addTodo"]),
      //   onSubmit() {
      //    this.$store.dispatch('addTodo', this.myTodos);
      //   }
      // }
    }
 </script>
 <style scoped>
 </style>
