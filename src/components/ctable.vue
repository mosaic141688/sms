<template>
    <div>
        <v-data-table
                v-bind:headers="headers"
                v-bind:items="items"
                v-bind:search="search"
                v-bind:pagination.sync="paginantion_sysnc"
                hide-actions
                class="elevation-1"
        >
            <template slot="headerCell" slot-scope="props">
                <v-tooltip bottom>
          <span slot="activator">
            {{ props.header.text }}
          </span>
                    <span>
            {{ props.header.text }}
          </span>
                </v-tooltip>
            </template>
            <template slot="items" slot-scope="props">
                <td v-for="h in headers"  class="text-xs-right">{{ props.item[h.text] }}</td>
            </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
            <v-pagination v-model="page" :length="pages"></v-pagination>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "ctable",
        data () {
            return {
                search: '',
                page:1,
                selected: [],

                items: [

                ]
            }
        },
        computed: {
            pages() {
                return Math.ceil(this.items.length / 5)
            },
            headers() {
                if (this.items.length === 0) return []
                return Object.keys(this.items[0]).map(i => {
                    return {
                        text: i,
                        value: i
                    }
                })
            },
            paginantion_sysnc: {
                get() {
                    return {
                        sortBy: this.headers[0] ? this.headers[0].text : 0,
                        page: this.page,
                        rowsPerPage: 5,
                        descending: false,
                        totalItems: this.items.length
                    }
                },
                set({page}){
                    console.log('page ',page)
                    this.page = page
                }
            }
        },
        created(){
            let self = this;
            axios.get('http://localhost:3000/customers')
                .then(function (response) {
                    console.log(response);
                    self.set_table_data(response.data)
                })
                .catch(function (error) {
                    console.log('Axios Error',error);
                });
        },
        methods:{
            set_table_data(_data){
                this.items = _data
            }
        }
    }
</script>

<style scoped>

</style>