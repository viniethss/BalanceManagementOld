<template>
  <div>
    <NavBar/>
    <br/>
    <v-toolbar flat color="white">
      <v-toolbar-title class="bm-title-cont"><div class="bm-title headline">Balance Management</div></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">

        <template v-slot:activator="{ on }">
        
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            outlined
          ></v-text-field>

          <v-spacer></v-spacer>

          <v-btn color="primary" dark class="mb-2" v-on:click="refresh">HOME</v-btn>
          <v-btn color="primary" dark class="mb-2" v-on:click="balance">BALANCE</v-btn>
          <v-btn color="primary" dark class="mb-2" v-on:click="advance">ADVANCE</v-btn>
          <v-btn color="primary" dark class="mb-2" v-on:click="cleared">CLEARED</v-btn>
          <v-btn color="primary"  class="mb-2" v-on="on" ><v-icon >add</v-icon> &nbsp; NEW  ENTRY</v-btn>
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
                    <v-text-field v-model="editedItem.vehicle_no" label="Vehicle No"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.reference" label="Reference" ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.amount" type="number" label="Amount" prefix="₹" :rules="numberRule" validate-on-blur></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.amount_recieved" type="number" prefix="₹" v-if="dialog" :autofocus="formTitle ==  'Edit Entry'" label="Amount recieved"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.amount_paid" type="number" prefix="₹" label="Amount paid"></v-text-field>
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
      <v-dialog v-model="auditDialog" min-width="500px">
          <v-card>
            <v-card-title class="headline primary" >
              <span style="color: #efefef">History</span>
            </v-card-title>
            <v-divider></v-divider>
              <v-data-table
                :headers="historyHeaders"
                :items="auditRecord"
                :rows-per-page-items="[50,100]"
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
                  <td class="text-xs-right data-row-size" style="display:none" >{{ props.item.pk }}</td>
                  <td class="justify-center layout px-0">
                  </td>
                </template>
              </v-data-table>
          </v-card>
      </v-dialog>
    </v-toolbar>
    <br/>
    <v-chip class="ma-2" color="primary" text-color="white">
      <v-icon>label_important</v-icon>&nbsp;&nbsp;<strong>BALANCE &nbsp;- {{ ttBal}}</strong>
    </v-chip>
    <v-chip class="ma-2" color="primary"  text-color="white">
      <v-icon>label_important</v-icon>&nbsp;&nbsp;<strong>ADVANCE  &nbsp;- {{ ttAdv}}</strong>
    </v-chip>
    <v-divider></v-divider>

    <v-data-table
      :headers="headers"
      :items="record"
      :rows-per-page-items="[50,40,30,20,10]"
      :search="search"
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
        <td class="text-xs-right data-row-size" style="display:none" >{{ props.item.pk }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)" v-if="currentUser!='ks82628@gmail.com'">edit</v-icon>
          <v-icon small class="mr-2" @click="viewAudit(props.item)">visibility</v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import format from 'date-fns/format'
import { db } from '../main'
import uniqid from 'uniqid'
import { textCase } from '../vue-directives'
import firebase from 'firebase'

export default {
  data: () => ({
    view: 'mainPage',
    pk: 'ddd',
    dialog: false,
    auditDialog: false,
    search: '',
    currentUser: '',
    ttBal: 0,
    ttAdv: 0,
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
      { text: 'Date', value: 'date', align: 'left', class: "", width: "1%"},
      { text: 'Name', value: 'name', align: 'right', class: "", width: "1%"},
      { text: 'Vh.No', value: 'vehicle_no', align: 'right', class: "", width: "1%" },
      { text: 'Ref', value: 'reference', align: 'right', class: "", width: "1%" },
      { text: 'Amnt', value: 'amount', align: 'right', class: "", width: "1%" },
      { text: 'Amnt rcv.d', value: 'amount_recieved', align: 'right', class: "", width: "1%" },
      { text: 'Amnt paid', value: 'amount_paid', align: 'right', class: "", width: "1%" },
      { text: 'Bal', value: 'balance', align: 'right', class: "", width: "1%" },
      { text: 'Adv', value: 'advance', align: 'right', class: "", width: "1%" },
      { text: '', value: 'edit', sortable: false, width: "1%"}
    ],
    historyHeaders: [
      { text: 'Date', value: 'date', align: 'left', class: "", sortable: false},
      { text: 'Name', value: 'name', align: 'right', class: "" , sortable: false},
      { text: 'Vh.No', value: 'vehicle_no', align: 'right', class: "" , sortable: false},
      { text: 'Ref', value: 'reference', align: 'right', class: "", sortable: false },
      { text: 'Amt', value: 'amount', align: 'right', class: "", sortable: false },
      { text: 'Amnt rcv.d', value: 'amount_recieved', align: 'right', class: "", sortable: false },
      { text: 'Amt paid', value: 'amount_paid', align: 'right', class: "", sortable: false },
      { text: 'Bal', value: 'balance', align: 'right', class: "", sortable: false },
      { text: 'Adv', value: 'advance', align: 'right', class: "", sortable: false },
    ],
    record: [],
    auditRecord: [],
    editedIndex: -1,
    editedItem: {
      date: format(new Date(), 'DD/MM/YYYY'),
      name: '',
      vehicle_no: '',
      reference: '',
      amount: '',
      amount_recieved: '',
      amount_paid: '',
      pk: '',
      created_time: '',
      modified_time: '',
      total_recieved: 0,
      total_paid: 0,
      balance: 0,
      advance: 0
    },
    defaultItem: {
      date: format(new Date(), 'DD/MM/YYYY'),
      name: '',
      vehicle_no: '',
      reference: '',
      amount: '',
      amount_recieved: '',
      amount_paid: '',
      pk: '',
      created_time: '',
      modified_time: '',
      total_recieved: 0,
      total_paid: 0,
      balance: 0,
      advance: 0
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
    },
    auditDialog (val){
      val || this.auditDialogClose()
    },
    'editedItem.vehicle_no' (val){
      this.editedItem.vehicle_no = val.toUpperCase()
    },
    'editedItem.reference' (val){
      this.editedItem.reference = this.camelize(val)
    },
    'editedItem.name' (val){
      this.editedItem.name = this.camelize(val)
    }
  },

  created () {
    this.fetchResults()
    this.currentUser = firebase.auth().currentUser.email;
  },

  methods: {
    camelize(str) {
      return str.replace(/\w\S*/g, function(txt){
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    },

    viewAudit(item){
      let auditPk = this.record[this.record.indexOf(item)].pk
      db.collection('auditData').where("pk","==",auditPk).orderBy('modified_time','desc').get().then(querySnapShot => {
          let results = [];
          querySnapShot.forEach(doc=>{
            results.push(doc.data())
          })
          this.auditRecord=results;
      })
      this.auditDialog = true
    },
    
    editItem (item) { 
      this.editedIndex = this.record.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedItem.date = format(new Date(), 'DD/MM/YYYY')
      this.editedItem.amount_paid = ''
      this.editedItem.amount_recieved = ''
      this.dialog = true
    },

    auditDialogClose(){
      this.auditDialog = false
    },

    close () {
      this.dialog = false
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    },

    save () {
      if (this.$refs.entryForm.validate()){

        let amount = this.editedItem.amount === '' ? 0 : parseInt(this.editedItem.amount)
        let amount_paid = this.editedItem.amount_paid === '' ? 0 : parseInt(this.editedItem.amount_paid)
        let amount_recieved = this.editedItem.amount_recieved === '' ? 0 : parseInt(this.editedItem.amount_recieved)

        if(this.editedIndex > -1) {

          let total_paid = this.record[this.editedIndex].total_paid === '' ? 0 : parseInt(this.record[this.editedIndex].total_paid)
          let total_recieved = this.record[this.editedIndex].total_recieved === '' ? 0 : parseInt(this.record[this.editedIndex].total_recieved)
          
          db.collection('auditData').add({
            pk: this.record[this.editedIndex].pk,
            created_time: this.record[this.editedIndex].created_time,
            modified_time: this.record[this.editedIndex].modified_time,
            amount: this.record[this.editedIndex].amount,
            amount_paid: this.record[this.editedIndex].amount_paid,
            amount_recieved: this.record[this.editedIndex].amount_recieved,
            date: this.record[this.editedIndex].date,
            name: this.record[this.editedIndex].name,
            reference: this.record[this.editedIndex].reference,
            vehicle_no: this.record[this.editedIndex].vehicle_no,
            total_recieved: this.record[this.editedIndex].total_recieved,
            total_paid: this.record[this.editedIndex].total_paid,
            balance: this.record[this.editedIndex].balance,
            advance: this.record[this.editedIndex].advance,
            user: this.currentUser
          })

          db.collection("data").doc(this.record[this.editedIndex].pk).delete().then(function() {
          });

          db.collection('data').doc(this.record[this.editedIndex].pk).set({
            pk: this.record[this.editedIndex].pk,
            created_time: this.record[this.editedIndex].created_time,
            modified_time: new Date().getTime(),
            amount: this.editedItem.amount,
            amount_paid: this.editedItem.amount_paid,
            amount_recieved: this.editedItem.amount_recieved,
            date: this.editedItem.date,
            name: this.editedItem.name,
            reference: this.editedItem.reference,
            vehicle_no: this.editedItem.vehicle_no,
            total_recieved: total_recieved + amount_recieved,
            total_paid: total_paid + amount_paid,
            balance: amount+total_paid+amount_paid-total_recieved-amount_recieved > 0 ? amount+total_paid+amount_paid-total_recieved-amount_recieved : 0,
            advance: amount+total_paid+amount_paid-total_recieved-amount_recieved > 0 ? 0 : Math.abs(amount+total_paid+amount_paid-total_recieved-amount_recieved),
            user: this.currentUser
          })
        }
        else {
          let time = new Date().getTime()
          let primaryKey = uniqid()

          db.collection('data').doc(primaryKey).set({
            pk: primaryKey,
            created_time: time,
            modified_time: time,
            amount: this.editedItem.amount,
            amount_paid: this.editedItem.amount_paid,
            amount_recieved: this.editedItem.amount_recieved,
            date: this.editedItem.date,
            name: this.editedItem.name,
            reference: this.editedItem.reference,
            vehicle_no: this.editedItem.vehicle_no,
            total_recieved: this.editedItem.amount_recieved,
            total_paid: this.editedItem.amount_paid,
            balance: amount+amount_paid-amount_recieved > 0 ? amount+amount_paid-amount_recieved : 0,
            advance: amount+amount_paid-amount_recieved > 0 ? 0 : Math.abs(amount+amount_paid-amount_recieved),
            user: this.currentUser
          })
        }
        this.fetchResults()
        this.close()
      } 
    },

    fetchResults(){
      if(this.view === 'mainPage'){
        db.collection('data').get().then(querySnapShot => {
          let results = [];
          querySnapShot.forEach(doc=>{
            results.push(doc.data())
          })
          this.record=results;
          var bal = 0, adv = 0;
          this.record.forEach(function(item){ 
            bal = bal + item.balance;
            adv = adv + item.advance;
          }); 
          this.ttBal = bal;
          this.ttAdv = adv;
        })
      }
      else if(this.view === 'balance'){
        db.collection('data').where("balance",">",0).get().then(querySnapShot => {
          let results = [];
          querySnapShot.forEach(doc=>{
            results.push(doc.data())
          })
          this.record=results;
        })
      }
      else if(this.view === 'advance'){
        db.collection('data').where("advance",">",0).get().then(querySnapShot => {
          let results = [];
          querySnapShot.forEach(doc=>{
            results.push(doc.data())
          })
          this.record=results;
        })
      }
      else if(this.view === 'cleared'){
        db.collection('data').where("balance","==",0).where("advance","==",0).get().then(querySnapShot => {
          let results = [];
          querySnapShot.forEach(doc=>{
            results.push(doc.data())
          })
          this.record=results;
        })
      }
    },

    balance(){
      this.view = 'balance'
      this.fetchResults()
    },

    advance(){
      this.view = 'advance'
      this.fetchResults()
    },

    cleared(){
      this.view = 'cleared'
      this.fetchResults()
    },

    refresh(){
      this.view = 'mainPage'
      this.fetchResults()
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
