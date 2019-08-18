<template>
  <div>
    <NavBar/>
    <br/>
    <v-toolbar flat color="white">
      <v-toolbar-title class="bm-title-cont"><div class="bm-title headline">Balance Management</div></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">NEW  ENTRY</v-btn>
        </template>
        <v-card>
          <v-card-title class="headline primary" >
            <span style="color: #efefef">{{ formTitle }}</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-form ref="entryForm" @submit.prevent="save">
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field  v-model="editedItem.date" slot="activator" label="Date" :rules="dateRule" validate-on-blur></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.name" v-if="dialog" :autofocus="formTitle ==  'New Entry'"  label="Name" :rules="requiredRule" validate-on-blur></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.vehicle_no" label="Vehicle No" ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.reference" label="Reference" ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.amount" label="Amount" :rules="numberRule" validate-on-blur></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.amount_recieved" v-if="dialog" :autofocus="formTitle ==  'Edit Entry'" label="Amount recieved"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.amount_paid" label="Amount paid"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" flat type="submit">Save</v-btn>
            </v-card-actions>

          </v-form>
        </v-card>
      </v-dialog>
    </v-toolbar>
    
    <br/>
    <br/>

    <v-divider></v-divider>

    <v-data-table
      :headers="headers"
      :items="record"
      :rows-per-page-items="[5,50,40,30,20,10]"
      >
      <template v-slot:items="props">
        <td class="data-row-size">{{ props.item.date }}</td>
        <td class="text-xs-right data-row-size">{{ props.item.name }}</td>
        <td class="text-xs-right data-row-size">{{ props.item.vehicle_no }}</td>
        <td class="text-xs-right data-row-size">{{ props.item.reference }}</td>
        <td class="text-xs-right data-row-size">{{ props.item.amount }}</td>
        <td class="text-xs-right data-row-size">{{ props.item.amount_recieved }}</td>
        <td class="text-xs-right data-row-size">{{ props.item.amount_paid }}</td>
        <td class="text-xs-right data-row-size">{{ props.item.balance }}</td>
        <td class="text-xs-right data-row-size">{{ props.item.advance }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import format from 'date-fns/format'
  export default {
    data: () => ({
      dialog: false,
      requiredRule: [
        v => !!v || 'Field is required',
      ],
      numberRule: [
        v => !!v || 'Field is required',
        v => /^\d+$/.test(v) || 'Must be a number',
      ],
      dateRule: [
        v => !!v || 'Field is required',
        v => /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/.test(v) || 'Must be a valid date',
      ],
      headers: [
        { text: 'Date', value: 'date', align: 'left', class: ""},
        { text: 'Name', value: 'name', align: 'right', class: "" },
        { text: 'Vehicle No', value: 'vehicle_no', align: 'right', class: "" },
        { text: 'Reference', value: 'reference', align: 'right', class: "" },
        { text: 'Amount', value: 'amount', align: 'right', class: "" },
        { text: 'Amount recieved', value: 'amount_recieved', align: 'right', class: "" },
        { text: 'Amount paid', value: 'amount_paid', align: 'right', class: "" },
        { text: 'Balance', value: 'balance', align: 'right', class: "" },
        { text: 'Advance', value: 'advance', align: 'right', class: "" },
        { text: '', value: 'edit', sortable: false}
      ],
      record: [],
      editedIndex: -1,
      editedItem: {
        date: format(new Date(), 'DD/MM/YYYY'),
        name: '',
        vehicle_no: '',
        reference: '',
        amount: '',
        amount_recieved: '',
        amount_paid: '',
      },
      defaultItem: {
        date: format(new Date(), 'DD/MM/YYYY'),
        name: '',
        vehicle_no: '',
        reference: '',
        amount: '',
        amount_recieved: '',
        amount_paid: '',
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Entry' : 'Edit Entry'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
        this.$refs.entryForm.resetValidation()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.record = [
          {
            date: '01/14/2019',
            name: 'Vinieth',
            vehicle_no: 'TN35A2040',
            reference: 'Vinieth kpm',
            amount: 1000,
            amount_recieved: 10,
            amount_paid: 100,
            balance: 500,
            advance: 844
          }
        ]
      },

      editItem (item) { 
        this.editedIndex = this.record.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.editedItem.date = format(new Date(), 'DD/MM/YYYY')
        this.dialog = true
      },

      close () {
        this.dialog = false
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      },

      save () {
        if (this.$refs.entryForm.validate()){
          if(this.editedIndex > -1) {
            Object.assign(this.record[this.editedIndex], this.editedItem)
          } 
          else {
            this.record.push(this.editedItem)
          }
          this.close()
        } 
      }
    },
    components: {
        NavBar
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  nav.v-toolbar{
    background-color: #fafafa !important;
  }
  .data-row-size{
    font-size: 1.04em;
  }
</style>
