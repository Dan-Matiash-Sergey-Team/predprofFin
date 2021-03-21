<template>
  <div id="app" className="col-md-4">
    <GChart
        :data="chartData"
        :options="options"
        :settings="{'packages':['corechart'],language: 'ru'}"
        ref="gChart"
        type="LineChart"
        />
    <br>
    <labelAplpha>
      <label>Enter some text here:</label>
    </labelAplpha>
    <br>
    <multiselect v-model="SelectedValue" :options="options"></multiselect>
    <br>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
//import BaseInput from "@/components/BaseInput.vue";
//import BaseButton from "@/components/BaseButton.vue";
//import BaseNumberInput from "@/components/BaseNumberInput";


export default {
  name: 'app',
  components: {Multiselect}, //BaseNumberInput, BaseButton, BaseInput
  data() {
    return {
      datum: [],
      SelectedValue: "Алмазный",
      options: ["Алмазный", "Западный", "Курортный", "Лесной", "Научный", "Полярный", "Портовый", "Приморский", "Садовый", "Северный", "Степной", "Таежный", "Южный"]
    }
  },
  methods: {
    sendInputString: async function () {
      console.log("alpha")
      const resp = await fetch('http://localhost:5050/gettingTags', {
        method: "POST",
        body: JSON.stringify({
          value: this.SelectedValue
        }),
        headers: {
          "Content-Type": 'application/json'
        }
      })
      const jsn = await resp.json()
      this.options = jsn.hashtags
    }
  },
  computed:{
    chartData: function () {
      let a = [['Date', 'Temperature']]
      this.allData.forEach((el)=>{
        a.push(parseInt(el.id), parseInt(el.temp))
      })
      return a
    },
    allData: function () {
      return this.datum
    },
    allPredData: function(){
      //let s = this.SelectedValue + "P"
      //return this.datum.[s]
      return this.datum
    }
  },
  async mounted() {
    const resp = await fetch('http://195.133.147.101:5000/get', {
      method: "GET",
      headers: {
        "Content-Type": 'application/json'
      }
    })
    this.datum = await resp.json()
    console.log(this.datum)
  }

}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>
