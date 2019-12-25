const mqtt = require('mqtt')

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

class ClientMQTTLocal {
  constructor() {
    this.options = {
      port: 1883,
      host: "192.168.0.10",
      clientId: makeid(20),
      //username: "user",
    // password: "ZW8W3dQa",
      keepalive: 60,
      reconnectPeriod: 1000,
      rejectUnauthorized: true,
      protocol: 'mqtt'
    }
    this.started = 0
  }

  publish113(value) {
    console.log("publish113 is hooked " + value)
    let topic = "/testbed/amigo/case_id"
    let payload = {
      value: value,
      timeStamp: new Date().toISOString()
    }
    this.Client.publish(topic, JSON.stringify(payload))
  }

  publish77(enode, value) {
    console.log("publish77 is hooked enode " + enode + " " + value)
    let topic = "/testbed/enode" + String(enode) + "/relay/ac/mode"
    let payload = {
      value: value,
      timeStamp: new Date().toISOString()
    }
    this.Client.publish(topic, JSON.stringify(payload))
  }

  publish73(enode, value) {
    console.log("publish73 is hooked  enode " + enode + " " + value)
    let topic = "testbed/enode" + String(enode) + "/relay/der/mode"
    let payload = {
      value: value,
      timeStamp: new Date().toISOString()
    }
    this.Client.publish(topic, JSON.stringify(payload))
  }

  publish67(dc_num, value) {
    console.log("publish67 is hooked dc_num " + dc_num + " " + value)
    let topic = "/testbed/relay/dc" + String(dc_num) + "/mode"
    let payload = {
      value: value,
      timeStamp: new Date().toISOString()
    }
    this.Client.publish(topic, JSON.stringify(payload))
  }

  connected() {
    this.started = 1
    console.log("Connected to the broker local!")
  }


  add_handler(handler) {
    this.handler = handler
  }

  start() {
    console.log("Starting MQTT client")
    this.Client = mqtt.connect(this.options)
    this.Client.on('connect', this.connected.bind(this))
  }

  stop() {
    this.Client.end()
  }
}


module.exports = {
  ClientMQTTLocal
}
