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
                <label>Enter some text here:</label>
            </labelAplpha>
            <br>
            <multiselect :options="city_names" v-model="SelectedValue"></multiselect>
            <br>
          <el-date-picker
              :picker-options="pickerOptions"
              align="right"
              end-placeholder="End date"
              range-separator="To"
              start-placeholder="Start date"
              type="datetimerange"
              v-model="date">
          </el-date-picker>
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
            allPredData: function () {
                return this.datum[this.SelectedValue+"P"].slice(7301,7667)
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
