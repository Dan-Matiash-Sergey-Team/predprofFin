<template>
    <div v-if="loading">
        Загрузка
    </div>
    <div v-else>
        <div className="col-md-4" id="app">
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
            <multiselect :options="options" v-model="SelectedValue"></multiselect>
            <br>
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
        computed: {
            chartData: function () {
                let a = [['Date', 'Temperature']]
                this.allData.forEach((el) => {
                    a.push(parseInt(el.id), parseInt(el.temp))
                })
                return a
            },
            allData: function () {
                return this.datum
            },
            allPredData: function () {
                //let s = this.SelectedValue + "P"
                //return this.datum.[s]
                return this.datum
            }
        },
        async mounted() {
            const city_names = ["Алмазный", "Западный", "Курортный", "Лесной", "Научный", "Полярный", "Портовый", "Приморский", "Садовый", "Северный", "Степной", "Таежный", "Южный"]
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
