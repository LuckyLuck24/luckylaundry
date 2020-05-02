<template>
  <div>
    <div class="form-group" :class="{ 'has-error': errors.name }">
      <label for>Nama Lengkap</label>
      <input
        type="text"
        class="form-control"
        v-model="cashier.name"
        :readonly="$route.name == 'outlets.edit'"
      />
      <p class="text-danger" v-if="errors.name">{{ errors.name[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.email }">
      <label for>Email</label>
      <input type="text" class="form-control" v-model="cashier.email" />
      <p class="text-danger" v-if="errors.email">{{ errors.email[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.password }">
      <label for>Password</label>
      <input type="password" class="form-control" v-model="cashier.password" />
      <p class="text-warning">Leave blank if you don't want to change password</p>
      <p class="text-danger" v-if="errors.password">{{ errors.password[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.outlet_id }">
      <label for>Outlet</label>
      <select name="outlet_id" class="form-control" v-model="cashier.outlet_id">
        <option value>Pilih</option>
        <option v-for="(row, index) in outlets.data" :value="row.id" :key="index">{{ row.name }}</option>
      </select>
      <p class="text-danger" v-if="errors.outlet_id">{{ errors.outlet_id[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.photo }">
      <label for>Foto</label>
      <input
        type="file"
        class="form-control"
        accept="image/*"
        @change="uploadImage($event)"
        id="file-input"
      />
      <p class="text-warning">Leave blank if you don't want to change photo</p>
      <p class="text-danger" v-if="errors.photo">{{ errors.photo[0] }}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "FormCashier",
  created() {
    this.getOutlets();
    if (this.$route.name == "cashiers.edit") {
      this.editCashier(this.$route.params.id).then(res => {
        this.cashier = {
          name: res.data.name,
          email: res.data.email,
          password: "",
          photo: "",
          outlet_id: res.data.outlet_id
        };
      });
    }
  },
  data() {
    return {
      cashier: {
        name: "",
        email: "",
        password: "",
        photo: "",
        outlet_id: ""
      }
    };
  },
  computed: {
    ...mapState(["errors"]),
    ...mapState("outlet", {
      outlets: state => state.outlets
    })
  },
  methods: {
    ...mapActions("outlet", ["getOutlets"]),
    ...mapActions("cashier", ["submitCashier", "editCashier", "updateCashier"]),
    ...mapMutations("cashier", ["SET_ID_UPDATE"]),
    uploadImage(event) {
      this.cashier.photo = event.target.files[0];
    },
    submit() {
      let form = new FormData();
      form.append("name", this.cashier.name);
      form.append("email", this.cashier.email);
      form.append("password", this.cashier.password);
      form.append("outlet_id", this.cashier.outlet_id);
      form.append("photo", this.cashier.photo);

      if (this.$route.name == "cashiers.add") {
        this.submitCashier(form).then(() => {
          this.cashier = {
            name: "",
            email: "",
            password: "",
            photo: "",
            outlet_id: ""
          };
          this.$router.push({ name: "cashiers.data" });
        });
      } else if (this.$route.name == "cashiers.edit") {
        this.SET_ID_UPDATE(this.$route.params.id);
        this.updateCashier(form).then(() => {
          this.cashier = {
            name: "",
            email: "",
            password: "",
            photo: "",
            outlet_id: ""
          };
          this.$router.push({ name: "cashiers.data" });
        });
      }
    }
  }
};
</script>
