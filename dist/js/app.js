if( 'serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log('Service Worker Registrado', reg))
    .catch(err => console.warn('Error al registrar el Service Worker', err))
}

const appGym = new Vue({
    el: '#appGym',
    data:{
        tarea: {
            Nombre: '',
            Validacion: '',
            Estado: '',
            Msg: '',
            MsgValido: ''
        },
        tareas: []
    },
    created: function() {
        let datosDB = JSON.parse( localStorage.getItem('gym-app') );
        console.log(datosDB);
        if ( datosDB === null ){
            this.tareas = [];
        } else {
            this.tareas = datosDB;
        }
    },
    methods: {
        guardarTareas: function(){
            localStorage.setItem('gym-app', JSON.stringify(this.tareas));
        },
        tareaAgregar: function(){
            if ( this.tarea.Nombre.trim() == ''){
                this.tarea.Estado = 'has-danger';
                this.tarea.Validacion = 'is-invalid';
                this.tarea.Msg = 'Complete con un nombre valido';
                this.tarea.MsgValido = 'invalid-feedback';
                return;
            }
            this.tarea.Estado = 'has-success';
            this.tarea.Validacion = 'is-valid';
            this.tarea.Msg = 'Tarea Agregada';
            this.tarea.MsgValido = 'valid-feedback';

            this.tareas.push({
                Nombre: this.tarea.Nombre,
                Realizada: false
            })

            this.guardarTareas();
            
            this.tarea.Nombre = '';
            this.tarea.Estado = '';
            this.tarea.Validacion = '';
            this.tarea.Msg = '';
            this.tarea.MsgValido = ''; 
           
        },
        tareaCompletar: function(index){
            this.tareas[index].Realizada =  true;
            this.guardarTareas();
        },
        tareaEliminar: function(index){
            this.tareas.splice(index, 1);
            this.guardarTareas();
        }
    }
})