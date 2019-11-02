<template>
  <div class="index">
    <div v-for="sensor in sensors" :key="sensor.sensorName">
      <h2>{{ sensor.sensorName }}</h2>
      <h1>{{ sensor.sensorValues[0].lastValue.toFixed(2) }}℃</h1>
      {{ new Date(sensor.sensorValues[0].createdAt).toLocaleTimeString() }}</div>
      <p>
        이 페이지는 5초마다 자동으로 갱신 됩니다.<br>
        <button @click="loadDatas()">수동으로 갱신</button>
      </p>
  </div>
</template>

<script>
let interval = null

export default {
  methods: {
    loadDatas () {
      this.$http.get('/api/sensors')
        .then((response) => {
          this.sensors = response.data.sensors
          console.log(response.data)
        })
    }
  },
  data () {
    return {
      sensors: null
    }
  },
  mounted () {
    this.loadDatas()
    interval = setInterval(() => {
      this.loadDatas()
    }, 5000)
  },
  beforeDestroy () {
    clearInterval(interval)
  }
}

</script>
