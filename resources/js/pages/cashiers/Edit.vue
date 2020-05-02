<template>
    <div class="col-md-12">
        <div class="panel">
            <div class="panel-heading">
                <h3 class="panel-title">Edit Cashier</h3>
            </div>
            <div class="panel-body">
                <cashier-form ref="cashierForm"></cashier-form>
                <div class="form-group">
                    <button class="btn btn-primary btn-sm btn-flat" @click.prevent="submit">
                        <i class="fa fa-save"></i> Update
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex'
    import FormCashier from './Form.vue'
    export default {
        name: 'EditCashier',
        methods: {
            submit() {
                this.$refs.cashierForm.submit()
            }
        },
        components: {
            'cashier-form': FormCashier
        },
    }
</script>
