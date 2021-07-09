<template>
<div class="grey lighten-4">
<v-container>
    <v-card class="col-md-4 offset-md-4 form">
        <v-container> 
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >

  <v-text-field
      v-model="edit.id"
      :rules="nameRules"
      label="Vehicle Id"
      required
    ></v-text-field>
    
    <v-text-field
      v-model="edit.model"
      :rules="nameRules"
      label="Vehicle Model"
      required
    ></v-text-field>

    <v-text-field
      v-model="edit.vehicleType"
      :rules="nameRules"
      label="Vehicle Type"
      required
    ></v-text-field>

    <v-text-field
      v-model="edit.plateNumber"
      :rules="nameRules"
      label="Vehicle Plate Number"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate()"
    >
      Edit
    </v-btn>
  </v-form>
  </v-container>
  </v-card>
  </v-container>
  </div>
</template>

<script>
  export default {
      name: "Edit",
    data: () => ({
    vehicles: Vehicles,
        id: '',
      valid: true,
      vehicleType: '',
      vehicleModel:'',
      vehiclePlateNumber: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 50 characters',
      ],
    }),
    methods: {
      validate () {
        this.$refs.form.validate()
        this.$router.push('/grid')
        
      },
    },
    computed: {
        edit(){
            return this.vehicles.find(v => v.id = this.$route.params.id)
        }
    }
  }
</script>

<style scoped>
div{
    height: 100%;
}
.form{
    max-height: 300px;
    margin-top: 100px;
}
</style>