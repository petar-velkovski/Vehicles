<template>
<div class="grey lighten-4">
  <v-container>
    <v-row>
      <v-col class="col-sm-4 offset-sm-4">
        <h3 class="text-center my-7 display-1 grey--text font-weight-regular">Please fill out the form</h3>
        <v-card
        >
        <p v-if="error" class="red text-center white--text">Please enter all fields</p>
          <v-form
          ref="form"
          v-model="valid"
          lazy-validation>
          <v-container>
            <input type="hidden" name="customfield" class="form-control" :value="id">
            <v-text-field
              v-model="vehicleName"
              label="Vehicle Name"
              :rules="nameRules"></v-text-field>

            <v-select
              v-model="vehicleType"
              :items="types"
              label="Vehicle Type"
              data-vv-name="select"
              :rules="[v => !!v || 'Vehicle type is required']"
              required></v-select>

              <v-autocomplete
              v-model="vehicleBrand"
              :items="models"
              label="Model"
              :rules="[v => !!v || 'Vehicle Model is required']">
              </v-autocomplete>
            
              <v-text-field
                v-model="plateNumber"
                label=" License plate number - eg.'BT 2222 AA'"
                :rules="[v => !!v || 'Licence plate number is required']"
                required></v-text-field>
                <p v-if="errorPlate" class="red--text text-center">{{errorPlate}}</p>

                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Last registration date"
                      prepend-icon="mdi-calendar"
                      readonly
                      :rules="[v => !!v || 'Licence plate number is required',]"
                      v-bind="attrs"
                      v-on="on"></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    scrollable
                    :max="nowDate"
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="modal = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog.save(date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>

                <v-dialog
                  ref="dialog1"
                  v-model="modal1"
                  :return-value.sync="date1"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date1"
                      label="Date of registration submission"
                      prepend-icon="mdi-calendar"
                      :rules="[v => !!v || 'Licence plate number is required']"
                      readonly
                      v-bind="attrs"
                      v-on="on"></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date1"
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="modal1 = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog1.save(date1)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
      
                <v-btn
                  rounded
                  color="blue darken-3 white--text"
                  type="submit"
                  @click.prevent="validate"
                  :disabled="!valid"
                  @click="saveVehicle"
                >
                  submit
                </v-btn>
              </v-container>
            </v-form>
          </v-card>
        </v-col>
    </v-row>
    <v-row v-if="showModal">
      <v-col>
        <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
          <h2 class="text-center display-2 grey--text lighten-4 py-5">Vehicle info</h2>
          <h3 class="text-center display-1 grey--text lighten-4 py-2">{{vehicleName}}</h3>
          <h3 class="text-center display-1 grey--text lighten-4 py-2">{{vehicleType}}</h3>
          <h3 class="text-center display-1 grey--text lighten-4 py-2">{{vehicleBrand}}</h3>
          <p class="text-center  grey--text lighten-4 py-2">{{plateNumber}}</p>
          <p class="text-center  grey--text lighten-4 py-2">{{date}}</p>
          <p class="text-center  grey--text lighten-4 py-2">{{date1}}</p>
        
        <router-link to="/grid" class="btn">
        <div class="text-center py-5">
          <v-btn
            rounded
            color="primary"
            dark
            small
          >
            Grid
          </v-btn>
      </div>
        </router-link>
      </v-card>
    </v-dialog>
  </v-col>
  </v-row>
  </v-container>
  </div>
</template>

<script>
  export default {
    name:"Form",
    data: () => ({
      error: false,
      errorPlate: "",
      valid: true,
      showModal: false,
       dialog: false,
      vehicleName: '',
      plateNumber: '',
      vehicleType: null,
      types: [
        'Car',
        'Truck',
        'Van',
        'Container',
        'Trailer',
        'Dupmer',
      ],
      models: ['Audi', 'BMW', 'Citroen', 'Honda', 'Hyundai', 'Mercedes', 'Nissan',
              'Opel', 'Suzuki', 'Toyota', 'Volkswagen'],
      
      vehicleBrand: "",
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      modal: false,
      modal1: false,
      nowDate: new Date().toISOString(),
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 50 characters',
        
      ],
    }),

    methods:{
      validate () {
        let myRe = new RegExp('[A-Z]{2}-[0-9]{4}-[A-Z]{2}');

        if(this.vehicleName == "" ||
            this.plateNumber == "" ||
            this.vehicleBrand == "" ||
            this.vehicleType == "" ||
            !myRe.test(this.plateNumber)){
          this.dialog = false
          this.valid = false
          this.error = true
          this.errorPlate = this.plateNumber !== '' && !myRe.test(this.plateNumber) ? 'Please enter valid plate number' : ''
        } else {
          this.$refs.form.validate()
          this.showModal= true
          this.dialog = true
          this.valid = true
          this.error = false
          this.errorPlate = ''
        }
      },
      saveVehicle() {
        let vehicleData = this;

        let existVehicle = this.$root.vehicles.find(v => v.id === this.id);
        if(typeof existVehicle === 'undefined') {
          let maxID = this.$root.vehicles.reduce((a, b) => (a.id > b.id ? a : b));
          let newVehicle = {
            "id": maxID + 1,
            "vehicleName": vehicleData.vehicleName,
            "vehicleType": vehicleData.vehicleType,
            "plateNumber": vehicleData.plateNumber,
            "vehicleBrand": vehicleData.vehicleBrand,
            "date": vehicleData.date,
            "date1": vehicleData.date1
          };
          this.$root.vehicles.push(newVehicle);      
        } else {
          existVehicle.plateNumber = vehicleData.plateNumber;
          existVehicle.vehicleName = vehicleData.vehicleName;
          existVehicle.vehicleType = vehicleData.vehicleType;
          existVehicle.vehicleBrand = vehicleData.vehicleBrand;
          existVehicle.date = vehicleData.date;
          existVehicle.date1 = vehicleData.date1;
        }
        }
    },
    created() {
      this.vehicle.plateNumber;
    },
    computed: {
        vehicle() {
          let id = this.$route.params.id;
          if(typeof id !== 'undefined'){
            let veh = this.$root.vehicles.find(v => { 
              return v.id == id
            });

            if(typeof veh !== 'undefined'){
              this.id = veh.id;
              this.vehicleName = veh.vehicleName;
              this.vehicleType = veh.vehicleType;
              this.vehicleBrand = veh.vehicleBrand;
              this.plateNumber = veh.plateNumber;

              if(typeof veh.date !== 'undefined') {
                this.date = veh.date;
              }

              if(typeof veh.date1 !== 'undefined') {
                this.date1 = veh.date1;
              }

              return veh;
            }
          }

          return {
            "vehicleName":"",
            "vehicleType":"",
            "plateNumber":"",
            "model":"",
            "date": "",
            "date1": ""
          };          
        }
      }
  }
  
</script>
<style scoped>
.btn{
  text-decoration: none !important;
}
</style>
