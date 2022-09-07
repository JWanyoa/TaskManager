<template>
    <div>
       <div>
          <div class="">
             <div class="container-fluid">
                <div class="col-md-12">
                  <section class="section mb-4">
                     <div class="container-fluid">
                        <div class="row md-m-25px-b m-45px-b justify-content-center text-center">
                              <div class="col-lg-8">
                                 <h3 class="h1 m-15px-b">Task Manager App</h3>
                              </div>
                        </div>
                        <AddToDo />
                        <div class="row">
                              <div class="col-sm-6 col-lg-3 m-15px-tb" v-for="todo in todos" :key="todo.id">
                                 <div class="media2 box-shadow-only-hover hover-top alert-danger border-all-2 p-15px row container-fluid" v-if="todo.completed != true">
                                    <a class="overlay-link" href="#"></a>
                                    <div class="icon-50 theme-bg white-color border-radius-50 d-inline-block col-md-2">
                                          <i class="number">{{todo.title.substring(0,1)}}</i>
                                    </div>
                                    <div class="p-20px-l col-9">
                                          <span class="theme-bg white-color p-0px-tb p-10px-lr font-small border-radius-15" v-if="todo.completed != true">Incomplete</span>
                                          <span class="theme2nd-bg white-color p-0px-tb p-10px-lr font-small border-radius-15" v-else>Complete</span>
                                          <h6 class="m-5px-tb">{{todo.title}}</h6>
                                          <p class="m-0px font-small">{{todo.description}}</p>
                                          <p class="m-0px font-small"><i class="fa fa-clock"></i> Deadline: {{todo.deadline}}</p>
                                          <p class="m-0px font-small"><i class="fa fa-calendar"></i> Date Added: {{todo.date_added}}</p>
                                    </div>
                                    <div class="col-1">
                                       <ul style="list-style:none;" class="d-lg-inline  d-flex flex-column float-right mt-0">
                                          <li><button type="button" class="btn btn-success btn-sm mb-1" @click="toggleTodo(todo.id, todo.completed)"><i class="fa fa-check"></i> <span class="d-none d-lg-inline">Mark</span></button></li>
                                          <li><button class="btn btn-info btn-sm mb-1" data-toggle="modal" :data-target="'#editModal'+todo.id"><i class="fa fa-pencil"></i> <span class="d-none d-lg-inline">Edit</span></button></li>
                                          <li><button class="btn btn-danger btn-sm mb-1"  v-on:click="deleteTodo(todo.id)"><i class="fa fa-trash"></i> <span class="d-none d-lg-inline">Delete</span></button></li>
                                       </ul>
                                    </div>
                                 </div>

                                 <div class="media1 box-shadow-only-hover alert-success hover-top border-all-1 p-15px row container-fluid"  v-else>
                                    <a class="overlay-link" href="#"></a>
                                    <div class="icon-50 theme2nd-bg white-color border-radius-50 d-inline-block col-md-2">
                                          <i class="number">{{todo.title.substring(0,1)}}</i>
                                    </div>
                                    <div class="p-20px-l col-9 float-right">
                                          <span class="theme-bg white-color p-0px-tb p-10px-lr font-small border-radius-15" v-if="todo.completed != true">Incomplete</span>
                                          <span class="theme2nd-bg white-color p-0px-tb p-10px-lr font-small border-radius-15" v-else>Complete</span>
                                          <h6 class="m-5px-tb">{{todo.title}}</h6>
                                          <p class="m-0px font-small">{{todo.description}}</p>
                                          <p class="m-0px font-small"><i class="fa fa-clock"></i> {{todo.deadline}}</p>
                                          <p class="m-0px font-small"><i class="fa fa-calendar"></i> {{todo.date_added}}</p>
                                    </div>
                                    <div class="col-1">
                                       <ul style="list-style:none;" class="d-lg-inline d-flex flex-column float-right mt-0">
                                          <li><button type="button" class="btn btn-warning btn-sm mb-1" @click="toggleTodo(todo.id, todo.completed)"><i class="fa fa-window-close"></i> <span class="d-none d-lg-inline">Unmark</span></button></li>
                                          <li><button class="btn btn-info btn-sm mb-1" data-toggle="modal" :data-target="'#editModal'+todo.id"><i class="fa fa-pencil"></i> <span class="d-none d-lg-inline">Edit</span></button></li>
                                          <li><button class="btn btn-danger btn-sm mb-1"  v-on:click="deleteTodo(todo.id)"><i class="fa fa-trash"></i> <span class="d-none d-lg-inline">Delete</span></button></li>
                                       </ul>
                                    </div>
                                 </div>

                                 <div class="modal fade" :id="'editModal'+todo.id" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                                     <div class="modal-dialog">
                                        <div class="modal-content">
                                           <div class="modal-header">
                                              <h3 class="modal-title float-right" id="lineModalLabel">Edit Task</h3>
                                              <button type="button" class="close float-left" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                                           </div>
                                           <div class="modal-body">
                                              <form @submit="onSubmit">
                                                 <div id='addr0'>
                                                    <div class="form-group">
                                                       <input class="form-control" type="text" name='title'  placeholder='Title' v-model="todo.title"/>
                                                    </div>
                                                    <div class="form-group">
                                                       <textarea class="form-control" name='description' v-model="todo.description"></textarea>
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
                                                       <button v-on:click="editTodo(todo.id)" class="btn btn-primary btn-sm"><i class="fa fa-pencil"></i> Edit Task</button>
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
                  </section>
                </div>
             </div>
          </div>
       </div>
    </div>
   
 </template>


 <script>
    import AddToDo from './AddToDo.vue'
    import { mapState, mapGetters } from 'vuex';
    
    export default{
        name: "ToDos",
        components: {
            AddToDo
        },
        computed: {
            ...mapState({
                todos: state =>state.todos
            }),
            ...mapGetters(["completeTodos", "incompleteTodos"]),
        },
      //   created()
      //   {
      //    this.loading=false
      //   },
        mounted()
        {
            this.$store.dispatch('fetchTodos');
        },
        data(){
            return{
               show:'show',
               noShow: '',
               todo:{
               id: this.id,
               title:this.title,
               description:this.description,
               date_added:this.date_added,
               deadline:this.deadline,
               date_completed:this.date_completed,
               completed:this.completed
               },
               // loading:true,
               // loadingImage: require('../assets/disk')
            }
        },
        methods:
        {
            toggleTodo(id, completed) {
               this.$store.dispatch("toggleTodo", {
               id,
               completed: completed == true ? false : true,
               });
            },
            deleteTodo(id)
            {
                this.$store.dispatch('deleteTodos', {id})
            },
            editTodo(id)
            {
                this.$store.dispatch('editTodos', {id})
            },
            onSubmit(todo)
            {
                this.form.fill(todo)
            }
        }
    };

//toasty
$(document).ready(function() {
   //success toast
           var options = {
               autoClose: true,
               progressBar: true,
               enableSounds: true,
               sounds: {
          
           info: "https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233294/info.mp3",
           // path to sound for successfull message:
           success: "https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233524/success.mp3",
           // path to sound for warn message:
           warning: "https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233563/warning.mp3",
           // path to sound for error message:
           error: "https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233574/error.mp3",
       }, 
           };
           
           var toast = new Toasty(options);
           toast.configure(options);
      $('#completed').click(function() {
           toast.success("Task Marked as Complete");
       });
       
       $('#infotoast').click(function() {  
           toast.info("This toast notification with sound");
       });
      
       $('#warningtoast').click(function() {
           toast.warning("This toast notification with sound");
       });
       
       $('#errortoast').click(function() { 
           toast.error("This toast notification with sound");  
       });
       
     });
 </script>
 <style scoped>
/* body{background-color: #f9f9fa}.flex{-webkit-box-flex: 1;-ms-flex: 1 1 auto;flex: 1 1 auto}@media (max-width:991.98px){.padding{padding: 1.5rem}}@media (max-width:767.98px){.padding{padding: 1rem}}.padding{padding: 5rem}.card{box-shadow: none;-webkit-box-shadow: none;-moz-box-shadow: none;-ms-box-shadow: none}.pl-3, .px-3{padding-left: 1rem !important}.card{position: relative;display: flex;flex-direction: column;min-width: 0;word-wrap: break-word;background-color: #fff;background-clip: border-box;border: 1px solid #d2d2dc;border-radius: 0}.pr-3, .px-3{padding-right: 1rem !important}.card .card-body{padding: 1.25rem 1.75rem}.card-body{flex: 1 1 auto;padding: 1.25rem}.card .card-title{color: #000000;margin-bottom: 0.625rem;text-transform: capitalize;font-size: 0.875rem;font-weight: 500}.add-items{margin-bottom: 1.5rem;overflow: hidden}.d-flex{display: flex !important}.add-items input[type="text"]{border-top-right-radius: 0;border-bottom-right-radius: 0;width: 100%;background: transparent}.form-control{border: 1px solid #f3f3f3;font-weight: 400;font-size: 0.875rem}.form-control{display: block;width: 100%;padding: 0.875rem 1.375rem;font-size: 1rem;line-height: 1;color: #495057;background-color: #ffffff;background-clip: padding-box;border: 1px solid #ced4da;border-radius: 2px;transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out}.add-items .btn{margin-left: .5rem}.btn{font-size: 0.875rem;line-height: 1;font-weight: 400;padding: .7rem 1.5rem;border-radius: 0.1275rem}.list-wrapper{height: 100%;max-height: 100%}.add-items{margin-bottom: 1.5rem;overflow: hidden}.add-items input[type="text"]{border-top-right-radius: 0;border-bottom-right-radius: 0;width: 100%;background: transparent}.add-items .btn, .add-items .fc button, .fc .add-items button, .add-items .ajax-upload-dragdrop .ajax-file-upload, .ajax-upload-dragdrop .add-items .ajax-file-upload, .add-items .swal2-modal .swal2-buttonswrapper .swal2-styled, .swal2-modal .swal2-buttonswrapper .add-items .swal2-styled, .add-items .wizard>.actions a, .wizard>.actions .add-items a{margin-left: .5rem}.rtl .add-items .btn, .rtl .add-items .fc button, .fc .rtl .add-items button, .rtl .add-items .ajax-upload-dragdrop .ajax-file-upload, .ajax-upload-dragdrop .rtl .add-items .ajax-file-upload, .rtl .add-items .swal2-modal .swal2-buttonswrapper .swal2-styled, .swal2-modal .swal2-buttonswrapper .rtl .add-items .swal2-styled, .rtl .add-items .wizard>.actions a, .wizard>.actions .rtl .add-items a{margin-left: auto;margin-right: .5rem}.list-wrapper{height: 100%;max-height: 100%}.list-wrapper ul{padding: 0;text-align: left;list-style: none;margin-bottom: 0}.list-wrapper ul li{font-size: .9375rem;padding: .4rem 0;border-bottom: 1px solid #f3f3f3}.list-wrapper ul li:first-child{border-bottom: none}.list-wrapper ul li .form-check{max-width: 90%;margin-top: .25rem;margin-bottom: .25rem}.list-wrapper ul li .form-check label:hover{cursor: pointer}.list-wrapper input[type="checkbox"]{margin-right: 15px}.list-wrapper .remove{cursor: pointer;font-size: 1.438rem;font-weight: 600;width: 1.25rem;height: 1.25rem;line-height: 20px;text-align: center}.list-wrapper .completed{text-decoration: line-through;text-decoration-color: #3da5f4}.list-wrapper ul li .form-check{max-width: 90%;margin-top: .25rem;margin-bottom: .25rem}.list-wrapper ul li .form-check, .list-wrapper ul li .form-check .form-check-label, .email-wrapper .mail-sidebar .menu-bar .profile-list-item a .user .u-name, .email-wrapper .mail-sidebar .menu-bar .profile-list-item a .user .u-designation, .email-wrapper .mail-list-container .mail-list .content .sender-name, .email-wrapper .message-body .attachments-sections ul li .details p.file-name, .settings-panel .chat-list .list .info p{text-overflow: ellipsis;overflow: hidden;max-width: 100%;white-space: nowrap}.form-check{position: relative;display: block;margin-top: 10px;margin-bottom: 10px;padding-left: 0}.list-wrapper ul li .form-check, .list-wrapper ul li .form-check .form-check-label, .email-wrapper .mail-sidebar .menu-bar .profile-list-item a .user .u-name, .email-wrapper .mail-sidebar .menu-bar .profile-list-item a .user .u-designation, .email-wrapper .mail-list-container .mail-list .content .sender-name, .email-wrapper .message-body .attachments-sections ul li .details p.file-name, .settings-panel .chat-list .list .info p{text-overflow: ellipsis;overflow: hidden;max-width: 100%;white-space: nowrap}.form-check .form-check-label{min-height: 18px;display: block;margin-left: 1.75rem;font-size: 0.875rem;line-height: 1.5}.form-check-label{margin-bottom: 0}.list-wrapper input[type="checkbox"]{margin-right: 15px}.form-check .form-check-label input{position: absolute;top: 0;left: 0;margin-left: 0;margin-top: 0;z-index: 1;cursor: pointer;opacity: 0;filter: alpha(opacity=0)}input[type="radio"], input[type="checkbox"]{box-sizing: border-box;padding: 0}.list-wrapper ul li .form-check, .list-wrapper ul li .form-check .form-check-label, .email-wrapper .mail-sidebar .menu-bar .profile-list-item a .user .u-name, .email-wrapper .mail-sidebar .menu-bar .profile-list-item a .user .u-designation, .email-wrapper .mail-list-container .mail-list .content .sender-name, .email-wrapper .message-body .attachments-sections ul li .details p.file-name, .settings-panel .chat-list .list .info p{text-overflow: ellipsis;overflow: hidden;max-width: 100%;white-space: nowrap}.form-check .form-check-label input[type="checkbox"]+.input-helper:before{content: "";width: 18px;height: 18px;border-radius: 2px;border: solid #405189;border-width: 2px;-webkit-transition: all;-moz-transition: all;-ms-transition: all;-o-transition: all;transition: all;transition-duration: 0s;-webkit-transition-duration: 250ms;transition-duration: 250ms}.form-check .form-check-label input[type="checkbox"]+.input-helper:before, .form-check .form-check-label input[type="checkbox"]+.input-helper:after{position: absolute;top: 0;left: 0}.form-check .form-check-label input[type="checkbox"]+.input-helper:after{-webkit-transition: all;-moz-transition: all;-ms-transition: all;-o-transition: all;transition: all;transition-duration: 0s;-webkit-transition-duration: 250ms;transition-duration: 250ms;font-family: Material Design Icons;opacity: 0;filter: alpha(opacity=0);-webkit-transform: scale(0);-ms-transform: scale(0);-o-transform: scale(0);transform: scale(0);content: '\F12C';font-size: .9375rem;font-weight: bold;color: #ffffff}.form-check .form-check-label input[type="checkbox"]+.input-helper:before, .form-check .form-check-label input[type="checkbox"]+.input-helper:after{position: absolute;top: 0;left: 0}.form-check .form-check-label input[type="checkbox"]:checked+.input-helper:before{background: #405189;border-width: 0}.form-check .form-check-label input[type="checkbox"]+.input-helper:before{content: "";width: 18px;height: 18px;border-radius: 2px;border: solid #405189;border-width: 2px;-webkit-transition: all;-moz-transition: all;-ms-transition: all;-o-transition: all;transition: all;transition-duration: 0s;-webkit-transition-duration: 250ms;transition-duration: 250ms}.form-check .form-check-label input[type="checkbox"]+.input-helper:after{font-family: FontAwesome;content: "\f095";display: inline-block;padding-right: 3px;vertical-align: middle;color: #fff}.text-primary, .list-wrapper .completed .remove{color: #405189 !important}.list-wrapper .remove{cursor: pointer;font-size: 1.438rem;font-weight: 600;width: 1.25rem;height: 1.25rem;line-height: 20px;text-align: center}.ml-auto, .list-wrapper .remove, .mx-auto{margin-left: auto !important}.mdi-close-circle-outline:before{content: "\F15A"}.list-wrapper ul li{font-size: .9375rem;padding: .4rem 0;border-bottom: 1px solid #f3f3f3}.mdi:before{font-family: FontAwesome;content: "\f00d";display: inline-block;padding-right: 3px;vertical-align: middle;font-size: .756em;color: #405189}.list-wrapper ul{padding: 0;text-align: left;list-style: none;margin-bottom: 0}.flex-column-reverse{flex-direction: column-reverse !important}.d-flex, .loader-demo-box, .distribution-chart-legend .distribution-chart, .distribution-chart-legend .distribution-chart .item, .list-wrapper ul li, .email-wrapper .mail-sidebar .menu-bar .profile-list-item a, .email-wrapper .mail-sidebar .menu-bar .profile-list-item a .user, .email-wrapper .mail-list-container .mail-list .details, .email-wrapper .message-body .attachments-sections ul li .thumb, .email-wrapper .message-body .attachments-sections ul li .details .buttons, .lightGallery .image-tile .demo-gallery-poster, .swal2-modal, .navbar .navbar-menu-wrapper .navbar-nav, .navbar .navbar-menu-wrapper .navbar-nav .nav-item.nav-profile, .navbar .navbar-menu-wrapper .navbar-nav .nav-item.dropdown .navbar-dropdown .dropdown-item{display: flex !important} */


@import url("http://fonts.googleapis.com/css?family=Lato:100,300,400,700,900,400italic");
    @import url("//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.css");
    body {
		padding: 60px 0px;
		background-color: rgb(220, 220, 220);
	}
   a{
      text-decoration: none;
   }
    
    .event-list {
		list-style: none;
		font-family: 'Lato', sans-serif;
		margin: 0px;
		padding: 0px;
	}
	.event-list > li {
		background-color: rgb(255, 255, 255);
		box-shadow: 0px 0px 5px rgb(51, 51, 51);
		box-shadow: 0px 0px 5px rgba(51, 51, 51, 0.7);
		padding: 0px;
		margin: 0px 0px 20px;
	}
	.event-list > li > time {
		display: inline-block;
		width: 100%;
		color: rgb(255, 255, 255);
		background-color: rgb(197, 44, 102);
		padding: 5px;
		text-align: center;
		text-transform: uppercase;
	}
	.event-list > li:nth-child(even) > time {
		background-color: rgb(165, 82, 167);
	}
	.event-list > li > time > span {
		display: none;
	}
	.event-list > li > time > .day {
		display: block;
		font-size: 64pt;
		font-weight: 100;
		line-height: 1;
	}
	.event-list > li time > .month {
		display: block;
		font-size: 24pt;
		font-weight: 900;
		line-height: 1;
	}
	.event-list > li > img {
		width: 100%;
	}
	.event-list > li > .info {
		padding-top: 5px;
		text-align: center;
	}
	.event-list > li > .info > .title {
		font-size: 17pt;
		font-weight: 700;
		margin: 0px;
	}
	.event-list > li > .info > .desc {
		font-size: 13pt;
		font-weight: 300;
		margin: 0px;
	}
	.event-list > li > .info > ul,
	.event-list > li > .actionsList > ul {
		display: table;
		list-style: none;
		margin: 10px 0px 0px;
		padding: 0px;
		width: 100%;
		text-align: center;
	}
	.event-list > li > .actionsList > ul {
		margin: 0px;
	}
	.event-list > li > .info > ul > li,
	.event-list > li > .actionsList > ul > li {
		display: table-cell;
		cursor: pointer;
		color: rgb(30, 30, 30);
		font-size: 11pt;
		font-weight: 300;
        padding: 3px 0px;
	}
    .event-list > li > .info > ul > li > a {
		display: block;
		width: 100%;
		color: rgb(30, 30, 30);
		text-decoration: none;
	} 
    .event-list > li > .actionsList > ul > li {    
        padding: 0px;
    }
    .event-list > li > .actionsList > ul > li > a {
        padding: 3px 0px;
	} 
	.event-list > li > .info > ul > li:hover,
	.event-list > li > .actionsList > ul > li:hover {
		color: rgb(30, 30, 30);
		background-color: rgb(200, 200, 200);
	}
	.finished a,
	.editTask a,
	.deleteTask a {
		display: block;
		width: 100%;
		color: rgb(75, 110, 168) !important;
	}
	.editTask a {
		color: rgb(79, 213, 248) !important;
	}
	.deleteTask a {
		color: rgb(221, 75, 57) !important;
	}
	.finished:hover a {
		color: rgb(255, 255, 255) !important;
		background-color: rgb(75, 110, 168) !important;
	}
	.editTask:hover a {
		color: rgb(255, 255, 255) !important;
		background-color: rgb(79, 213, 248) !important;
	}
	.deleteTask:hover a {
		color: rgb(255, 255, 255) !important;
		background-color: rgb(221, 75, 57) !important;
	}

	@media (min-width: 768px) {
		.event-list > li {
			position: relative;
			display: block;
			width: 100%;
			height: 120px;
			padding: 0px;
		}
		.event-list > li > time,
		.event-list > li > img  {
			display: inline-block;
		}
		.event-list > li > time,
		.event-list > li > img {
			width: 120px;
			float: left;
		}
		.event-list > li > .info {
			background-color: rgb(245, 245, 245);
			overflow: hidden;
		}
		.event-list > li > time,
		.event-list > li > img {
			width: 120px;
			height: 120px;
			padding: 0px;
			margin: 0px;
		}
		.event-list > li > .info {
			position: relative;
			height: 120px;
			text-align: left;
			padding-right: 40px;
		}	
		.event-list > li > .info > .title, 
		.event-list > li > .info > .desc {
			padding: 0px 10px;
		}
		.event-list > li > .info > ul {
			position: absolute;
			left: 0px;
			bottom: 0px;
		}
		.event-list > li > .actionsList {
			position: absolute;
			top: 0px;
			right: 0px;
			display: block;
			width: 100px;
		}
        .event-list > li > .actionsList > ul {
            border-left: 1px solid rgb(230, 230, 230);
        }
		.event-list > li > .actionsList > ul > li {			
			display: block;
            padding: 0px;
		}
		.event-list > li > .actionsList > ul > li > a {
			display: block;
			width: 100px;
			padding: 10px 0px 9px;
		}
	}



   body{margin-top:20px;}
.p-15px {
    padding: 15px;
}
.border-color-gray {
    border-color: #f2f3fa;
}

.hover-top {
    position: relative;
    top: 0;
}
.m-15px-tb {
    margin-top: 15px;
    margin-bottom: 15px;
}
.overlay-link {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 0;
}
.border-radius-50 {
    border-radius: 50%;
}
.icon-50 {
    width: 50px;
    height: 50px;
    text-align: center;
    font-size: 21px;
}
.white-color {
    color: #ffffff;
}
.theme-bg {
    background-color: #CA0B00;
}
.icon-50 i.number {
    font-style: normal;
    top:50%;
}
.icon-50 i {
    line-height: 50px;
}
.p-20px-l {
    padding-left: 2px;
}
.p-10px-lr {
    padding-left: 10px;
    padding-right: 10px;
}
.p-0px-tb {
    padding-top: 0px;
    padding-bottom: 0px;
}
.border-radius-15 {
    border-radius: 15px;
}
.white-color {
    color: #ffffff;
}
.theme2nd-bg {
    background-color: #53d267;
}
.m-0px {
    margin: 0px;
}
.font-small {
    font-size: .8rem;
    line-height: 1.3rem;
}

.green-bg-alt {
  background-color: rgba(17, 226, 121, 0.1);
}

.green-bg {
  background-color: #11e279;
}

.green-after:after {
  background-color: #11e279;
}

.green-before:before {
  background-color: #11e279;
}

.green-color-alt {
  color: rgba(17, 226, 121, 0.65);
}

.green-color {
  color: #11e279;
}

.blue-bg-alt {
  background-color: rgba(21, 178, 236, 0.1);
}

.blue-bg {
  background-color: #15b2ec;
}

.blue-after:after {
  background-color: #15b2ec;
}

.blue-before:before {
  background-color: #15b2ec;
}

.blue-color-alt {
  color: rgba(21, 178, 236, 0.65);
}

.blue-color {
  color: #15b2ec;
}

.pink-bg-alt {
  background-color: rgba(241, 38, 153, 0.1);
}

.pink-bg {
  background-color: #f12699;
}

.pink-after:after {
  background-color: #f12699;
}

.pink-before:before {
  background-color: #f12699;
}

.pink-color-alt {
  color: rgba(241, 38, 153, 0.65);
}

.pink-color {
  color: #f12699;
}

.body-bg-alt {
  background-color: rgba(113, 128, 150, 0.1);
}

.body-bg {
  background-color: #718096;
}

.body-after:after {
  background-color: #718096;
}

.body-before:before {
  background-color: #718096;
}

.body-color-alt {
  color: rgba(113, 128, 150, 0.65);
}

.body-color {
  color: #718096;
}

.white-color-light {
  color: rgba(255, 255, 255, 0.65);
}

.bg-transparent {
  background-color: transparent;
}

.theme-g-bg {
  background: linear-gradient(to right, #0050d8, #002a72);
}

.dark-g-bg {
  background: linear-gradient(50deg, #273444 0, #272b44 100%);
}
.yellow-bg {
    background-color: #ffbe3d;
}
.border-radius-50 {
    border-radius: 50%;
}


.border-all-1
{
   border: 1px solid #11e279;
}
.border-all-2
{
   border: 1px solid #CA0B00;
}
.media1
{
   border-left: 5px solid #11e279;
   border-radius: 5px;
}
.media2
{
   border-left: 5px solid #CA0B00;
   border-radius: 5px;   
}

.box-shadow-only-hover:hover {
  box-shadow: 0 1.5rem 4rem rgba(22, 28, 45, 0.1);
}
.border-color-gray {
    border-color: #f2f3fa !important;
}

   /*toast*/
   /* body{background:#eee}.btn{margin-right: 0.5rem !important}.btn{font-size: 0.875rem;line-height: 1;font-weight: 400;padding: .7rem 1.5rem;border-radius: 0.1275rem}.container{margin-top: 100px}.toast{transition: 0.32s all ease-in-out}.toast-container--fade{right: 0;bottom: 0}.toast-container--fade .toast-wrapper{display: inline-block}.toast.fade-init{opacity: 0}.toast.fade-show{opacity: 1}.toast.fade-hide{opacity: 0} */

</style>
