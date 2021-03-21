<template>
    <div v-if="loading">
        Загрузка
    </div>
    <div v-else>
        <div className="col-md-4" id="app">
          <GChart
                    :data="chartData"
                    :options="{title: 'Температура в горде ' + SelectedValue+ ' за следующий год',
                    'explorer.maxZoomIn': 0.5}"
                    :settings="{'packages':['corechart'],language: 'ru'}"
                    ref="gChart"
                    type="LineChart"
            />
            <br>
            <labelAplpha>
                <label>Выберите город:</label>
            </labelAplpha>
            <br>
            <multiselect :options="city_names" v-model="SelectedValue"></multiselect>
          <br>
          <labelAplpha>
            <label>Выберите время:</label>
          </labelAplpha>
            <multiselect :options="datum_list" v-model="Selected"></multiselect>
            <br>
            <h2>График медиан города {{SelectedValue}} за 20 лет</h2>
            <GChart  type="LineChart"
                     :settings="{'packages':['corechart'],language: 'ru'}"
                     :data="medianData"/>




        </div>
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
                loading: true,
                datum: [],
                date:[],
                Selected: "All",
                datum_list: ["Day", "Week", "Month", "All"],
                SelectedValue: "Алмазный",
                city_names: ["Алмазный", "Западный", "Курортный", "Лесной", "Научный", "Полярный", "Портовый", "Приморский", "Садовый", "Северный", "Степной", "Таежный", "Южный"],
            }
        },
        methods: {
        },
        computed: {
            chartData: function () {
                let a = [['Date', 'Temperature']]
                this.allPredData.forEach((el) => {
                    a.push([parseInt(el.id), parseInt(el.temp)])
                })
                return a
            },
            medianData: function(){
                let a = [['Year', 'Median']]
                let oldData = this.datum[this.SelectedValue+"P"].slice(0,7301)
                function median(values) {

                    values.sort( function(a,b) {return a - b;} );

                    var half = Math.floor(values.length/2);

                    if(values.length % 2)
                        return values[half];
                    else
                        return (values[half-1] + values[half]) / 2.0;
                }
                for(let i=0;i<21;i++){
                    a.push([i, median(oldData.slice(i*365,(i+1)*365)).temp])
                }
                console.log(a)
                return a
            },
            allPredData: function () {
              if(this.Selected == "All") {
                return this.datum[this.SelectedValue + "P"].slice(7301, 7667)
              }
              else if (this.Selected == "Day"){
                return this.datum[this.SelectedValue + "P"].slice(7301, 7302)
              }
              else if (this.Selected == "Week"){
                return this.datum[this.SelectedValue + "P"].slice(7301, 7309)
              }
              else
              {
                return this.datum[this.SelectedValue + "P"].slice(7301, 7332)
              }
            }
        },
        async mounted() {
            const city_names = ["АлмазныйP", "ЗападныйP", "КурортныйP", "ЛеснойP", "НаучныйP", "ПолярныйP", "ПортовыйP", "ПриморскийP", "СадовыйP", "СеверныйP", "СтепнойP", "ТаежныйP", "ЮжныйP"]
            for (let city of city_names) {
                console.log(city)
                const resp = await fetch(`http://195.133.147.101:5000/getcity?city=${city}`, {
                    method: "GET",
                })
                this.datum[city] = await resp.json()
            }
            console.log(this.datum)
            this.loading = false
        }

    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>
