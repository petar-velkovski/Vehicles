<template>
<div class="grey lighten-4 div">
  <v-container class="py-10">
    <v-text-field
      label="Search"
      v-model="search"
    ></v-text-field>

    <h3 class="text-center grey--text lighten-5 display-1 mb-10 font-weight-regular">Grid of vehicles</h3>
    <v-row>
      <v-col
      cols="12"
      sm="6"
      md="4"
      lg="3"
      v-for="car in filteredVehicles" :key="car.vehicleName">
        <v-card class="pa-2">
          <h1 class="text-center grey--text lighten-5 font-weight-regular">{{car.vehicleBrand}}</h1>
          <h3 class="text-center">{{car.vehicleType}}</h3>
          <h3 class="text-center">{{car.vehicleName}}</h3>
          <h3 class="text-center">{{car.plateNumber}}</h3>
      <v-container>
          <v-row>
            <v-col class="d-flex justify-center align-center">
              <v-card-actions>
                
              <v-btn
                rounded
                color="green darken-3 white--text"
                @click="editVehicle(car.id)"
              >
                edit
              </v-btn>
            
            </v-card-actions>
            </v-col>
            <v-col>
            <v-card-actions>
              <v-btn
                
                rounded
                color="red darken-4 white--text"
                @click="deleteVehicle(car.id)"
              >
                delete
              </v-btn>
            </v-card-actions>
            </v-col>
            
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<script>
export default {
  name: "Grid",
  data(){
    return {
      search: '',
      dialog: false,
    }
  },
  methods:{
    deleteVehicle(id) {
      this.$root.vehicles = this.$root.vehicles.filter(car => car.id !== id);
    },

    

    editVehicle(id) {
      this.$router.push('/form/' + id);
    }
  },

    computed:{
      filteredVehicles(){
       return this.$root.vehicles.filter(car => car.vehicleBrand.toLowerCase().includes(this.search.toLowerCase()))
      }
    }
}
</script>

<style scoped>
.edit{
  text-decoration: none !important;
}

</style>
