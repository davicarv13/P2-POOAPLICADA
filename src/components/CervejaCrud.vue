<template>
    <v-data-table 
        :headers="headers"
        :items="cervejas"
        class="elevation-1">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>My CRUD</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{on, attrs}">
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                            New Item
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.id"
                                            label="Id">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.nome"
                                            label="Nome">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.teor_alcoolico"
                                            label="Teor Alcoólico">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.origem"
                                            label="Origem">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.ano"
                                            label="Ano">
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{item}">
            <v-icon small class="" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
    </v-data-table>
</template>

<script>
import axios from "axios";
export default{
    name: "CervejaCrud",
    data(){
        return {
            dialog:false,
            headers:[
                {text:"Id", value:"id"},
                {text:"Nome", value:"nome"},
                {text:"Teor Alcoolico", value:"teor_alcoolico"},
                {text:"Origem", value:"origem", sortable:false},
                {text:"ano", value:"ano", sortable:false},
                {text:"Actions", value:"actions", sortable:false},
            ],        
            cervejas:[
                {
                id:"1",
                nome:"Budweiser",
                teor_alcoolico:"5,0",
                origem:"Estados Unidos",
                ano:"1876"
                }
            ],
            editedIndex:-1,
            editedItem:{
                id:0,
                nome:"",
                teor_alcoolico:"",
                origem:"",
                ano:""

            },
            defaultItem:{
                id:0,
                nome:"",
                teor_alcoolico:"",
                origem:"",
                ano:""
            },
        }
    },
    methods:{
        inicializa(){
            axios("http://localhost:3000/cervejas")
            .then((response)=>{
                this.cervejas = response.data;
            })
            .catch((error) => console.log(error));
        },
        close(){
            this.dialog = false;
            setTimeout(()=>{
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            }, 300)
        },
        save(){
            if(this.editedIndex > -1){
                axios.put("http://localhost:3000/cervejas/" + this.editedItem.id, this.editedItem).then((response) => {
                    console.log(response);
                    Object.assign(this.cervejas[this.editedIndex], this.editedItem);
                    this.close;
                }).catch((error) => console.log(error));
            }  
            else{
                axios.post("http://localhost:3000/cervejas", this.editedItem).then((response) => {
                    console.log(response);
                    this.cervejas.push(this.editedItem);
                    this.close();
                }).catch((error) => console.log(error));
            }
        },
        editItem(item){
            this.editedIndex = this.cervejas.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;  
        },
        deleteItem(item){
            const index = this.cervejas.indexOf(item);
            confirm("Deseja apagar este item?") &&
                axios.delete("http://localhost:3000/cervejas/"+item.id)
                .then(response => {
                    console.log(response.data);
                    this.cervejas.splice(index, 1);

                })
                .catch(error => console.log(error));
        }
    }, 
    computed:{
        formTitle(){
            return this.editedIndex == -1 ? "Novo Item" : "Editar Item";
        },
    },
    watch:{
        dialog(val){
            val || this.close();
        },
        dialogDelete(val){
            val || this.closeDelete();
        },
    },
    created(){
        this.inicializa();
    }
}

</script>