<template>
    <div class="col-md-12">
        <div class="panel">
            <div class="panel-heading">
                <router-link :to="{ name: 'cashiers.add' }" class="btn btn-primary btn-sm btn-flat">Tambah</router-link>
                <div class="pull-right">
                    <input type="text" class="form-control" placeholder="Cari..." v-model="search">
                </div>
            </div>
            <div class="panel-body">
                <b-table striped hover bordered :items="cashiers.data" :fields="fields" show-empty>
                    <template slot="photo" slot-scope="row">
                        <img :src="'/storage/cashiers/' + row.item.photo" :width="80" :height="50" :alt="row.item.name">
                    </template>
                    <template slot="outlet_id" slot-scope="row">
                        {{ row.item.outlet.name }}
                    </template>
                    <template slot="actions" slot-scope="row">
                        <router-link :to="{ name: 'cashiers.edit', params: {id: row.item.id} }" class="btn btn-warning btn-sm"><i class="fa fa-pencil"></i></router-link>
                        <button class="btn btn-danger btn-sm" @click="deleteCashier(row.item.id)"><i class="fa fa-trash"></i></button>
                    </template>
                </b-table>

                <div class="row">
                    <div class="col-md-6">
                        <p v-if="cashiers.data"><i class="fa fa-bars"></i> {{ cashiers.data.length }} item dari {{ cashiers.meta.total }} total data</p>
                    </div>
                    <div class="col-md-6">
                        <div class="pull-right">
                            <b-pagination
                                v-model="page"
                                :total-rows="cashiers.meta.total"
                                :per-page="cashiers.meta.per_page"
                                aria-controls="cashiers"
                                v-if="cashiers.data && cashiers.data.length > 0"
                                ></b-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'DataCashier',
    created() {
        this.getCashiers()
    },
    data() {
        return {
            fields: [
                { key: 'photo', label: '#' },
                { key: 'name', label: 'Nama Lengkap' },
                { key: 'email', label: 'Email' },
                { key: 'outlet_id', label: 'Outlet' },
                { key: 'actions', label: 'Aksi' }
            ],
            search: ''
        }
    },
    computed: {
        ...mapState('cashier', {
            cashiers: state => state.cashiers
        }),
        page: {
            get() {
                return this.$store.state.cashier.page
            },
            set(val) {
                this.$store.commit('cashier/SET_PAGE', val)
            }
        }
    },
    watch: {
        page() {
            this.getCashiers()
        },
        search() {
            this.getCashiers(this.search)
        }
    },
    methods: {
        ...mapActions('cashier', ['getCashiers', 'removeCashier']),
        deleteCashier(id) {
            this.$swal({
                title: 'Kamu Yakin?',
                text: "Tindakan ini akan menghapus secara permanent!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then((result) => {
                if (result.value) {
                    this.removeCashier(id)
                }
            })
        }
    }
}
</script>
