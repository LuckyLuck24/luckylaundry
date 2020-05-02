<template>
    <div class="col-md-12">
        <div class="panel">
            <div class="panel-heading">
                <h3 class="panel-title">Add New Cashier</h3>
            </div>
            <div class="panel-body">
                <cashier-form ref="formCashier"></cashier-form>
                <div class="form-group">
                    <button class="btn btn-primary btn-sm btn-flat" @click.prevent="submit">
                        <i class="fa fa-save"></i> Add New
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState, mapMutations } from 'vuex'
    import FormCashier from './Form.vue'
    export default {
        name: 'AddCashier',
        methods: {
            submit() {
                this.$refs.formCashier.submit()
            }
        },
        components: {
            'cashier-form': FormCashier
        }
    }
</script>
