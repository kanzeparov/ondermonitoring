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

class ClientMQTT {
  constructor() {
    this.options = {
      port: 8883,
      host: "mqtt-stage.rnd.rtsoft.ru",
      clientId: makeid(20),
      username: "user1",
      password: "jejcoilld7493",
      keepalive: 60,
      reconnectPeriod: 1000,
      rejectUnauthorized: true,
      protocol: 'mqtts'
    }
    this.started = 0
  }

  topic_handler(topic, message) {
    console.log("Received a new message from %o - %o", topic.toString(), message.toString())
    let json_msg = JSON.parse(message)
    var topicMas = topic.split('/')
    var msg_type = topic.split('/')[3]

    //97,93
    if (topic.split('/')[5] == 'status' && (topic.split('/')[4] == 'ac' ||
        topic.split('/')[4] == 'der') &&
      topic.split('/')[2].toString().includes('enode')) {
      console.log("97,93 topic")
      var power_value = {

        // For example, enodeX
        node: topic.split('/')[1],
        // For ex, portX
        port: topic.split('/')[2],
        port2: topic.split('/')[3],
        port3: topic.split('/')[4],
        value: json_msg.value,
        // power
        timeStamp: json_msg.timeStamp
      }
      this.handler(msg_type, JSON.stringify(power_value))
    }


    //101 /testbed/enodeX/load/relayX/status

    if (topic.split('/')[5] == 'status' && topic.split('/')[4].toString().includes('relay') &&
      topic.split('/')[2].toString().includes('enode')) {
      console.log("101 topic")
      var power_value = {

        // For example, enodeX
        node: topic.split('/')[1],
        // For ex, portX
        port: topic.split('/')[2],
        port2: topic.split('/')[3],
        port3: topic.split('/')[4],
        value: json_msg.value,
        // power
        timeStamp: json_msg.timeStamp
      }
      this.handler(msg_type, JSON.stringify(power_value))
    }


    //18
    if (topic.split('/')[5] == 'init' && topic.split('/')[3] == 'contracts') {
      console.log("18 topic")
      var power_value = {

        // For example, enodeX
        node: topic.split('/')[1],
        // For ex, portX
        port: topic.split('/')[2],
        port2: topic.split('/')[3],
        port3: topic.split('/')[4],
        id: json_msg.id,
        portX: json_msg.port,
        mode: json_msg.mode,
        amount: json_msg.amount,
        seller: json_msg.seller,
        contragent: json_msg.contragent,
        cost: json_msg.cost,
        // power
        timeStamp: json_msg.timestamp
      }
      this.handler(msg_type, JSON.stringify(power_value))
    }

    //22
    if (topic.split('/')[3] == 'known_agents' && topic.split('/')[2].toString().includes('enode')) {
      console.log("22 topic")
      var i = 0
      for (i in json_msg.known_agents) {
        i++
      }
      var count = i
      var power_value = {
        // For example, enodeX
        node: topic.split('/')[1],
        // For ex, portX
        port: topic.split('/')[2],
        port2: topic.split('/')[3],
        time: json_msg.timeStamp,
        agent1: json_msg.agentId,
        count: count
      }
      if (i == 1) {
        var power_value = {
          // For example, enodeX
          node: topic.split('/')[1],
          // For ex, portX
          port: topic.split('/')[2],
          port2: topic.split('/')[3],
          time: json_msg.timeStamp,
          agent1: json_msg.agentId,
          count: count,
          agent2: json_msg.known_agents[0].agentId
        }
      } else if (i == 2) {
        var power_value = {
          // For example, enodeX
          node: topic.split('/')[1],
          // For ex, portX
          port: topic.split('/')[2],
          port2: topic.split('/')[3],
          time: json_msg.timeStamp,
          agent1: json_msg.agentId,
          count: count,
          agent2: json_msg.known_agents[0].agentId,
          agent3: json_msg.known_agents[1].agentId
        }
      } else if (i == 3) {
        var power_value = {
          // For example, enodeX
          node: topic.split('/')[1],
          // For ex, portX
          port: topic.split('/')[2],
          port2: topic.split('/')[3],
          time: json_msg.timeStamp,
          agent1: json_msg.agentId,
          count: count,
          agent2: json_msg.known_agents[0].agentId,
          agent3: json_msg.known_agents[1].agentId,
          agent4: json_msg.known_agents[2].agentId
        }
      }

      this.handler(msg_type, JSON.stringify(power_value))
    }

    //115
    if (topic.split('/')[4] == 'parameter0' && topic.split('/')[2].toString().includes('enode')) {
      console.log("115 topic")
      var power_value = {
        // For example, enodeX
        node: topic.split('/')[1],
        // For ex, portX
        port: topic.split('/')[2],
        port2: topic.split('/')[3],
        time: json_msg.timeStamp,
        // power
        value: json_msg.value
      }
      this.handler(msg_type, JSON.stringify(power_value))
    }

    //87
    if (topic.split('/')[4] == 'status' && topic.split('/')[3].toString().includes('dc')) {
      console.log("87 topic")
      var power_value = {
        // For example, enodeX
        node: topic.split('/')[1],
        // For ex, portX
        port: topic.split('/')[2],
        port2: topic.split('/')[3],
        port3: topic.split('/')[4],
        time: json_msg.timeStamp,
        // power
        value: json_msg.value
      }
      this.handler(msg_type, JSON.stringify(power_value))
    }

    //16, 6, 32,33,34,35
    if ((msg_type == 'ext_battery' && (topic.split('/')[4] == 'power')) ||
      (topic.split('/')[2].toString().includes('enode') &&
        topic.split('/')[3].toString().includes('port') && (topic.split('/')[4] == 'power')) ||
      (topic.split('/')[2].toString().includes('enode') &&
        topic.split('/')[3].toString().includes('load') &&
        topic.split('/')[4] == 'value')
    ) {

      console.log("16, 6, 32,33,34,35 topic")
      var power_value = {
        // For example, enodeX
        node: topic.split('/')[1],
        // For ex, portX
        port: topic.split('/')[2],
        port2: topic.split('/')[3],
        port3: topic.split('/')[4],
        time: json_msg.timeStamp,
        // power
        value: json_msg.value
      }
      this.handler(msg_type, JSON.stringify(power_value))

    }



    //113,107,57,23,40,random
    if (msg_type == 'voltage' || msg_type == 'current' || msg_type == 'finance' ||
      msg_type == 'power' && topic.split('/')[2].toString().includes('emeter') ||
      msg_type == 'set_price' && topic.split('/')[2] == 'amigo' ||
      msg_type == 'setpower_out' && topic.split('/')[2] == 'erouter' ||
      msg_type == 'freq' || msg_type == 'power') {
      console.log("113,107,57,40,23,random topic")
      var power_value = {
        // For example, enodeX
        node: topic.split('/')[1],
        // For ex, portX
        port: topic.split('/')[2],
        port2: topic.split('/')[3],
        time: json_msg.timeStamp,
        // power
        value: json_msg.value
      }
      this.handler(msg_type, JSON.stringify(power_value))
    }
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
    console.log("Connected to the broker!")
    //TODO change to topic, # for
    this.Client.subscribe("/testbed/+/finance")
    this.Client.subscribe("/testbed/emeter1/power")
    this.Client.subscribe("/testbed/emeter2/power")
    this.Client.subscribe("/testbed/emeter3/power")
    this.Client.subscribe("/testbed/emeter4/power")
    this.Client.subscribe("/testbed/+/relay/+/status")
    this.Client.subscribe("/testbed/+/ext_battery/power")
    this.Client.subscribe("/testbed/+/load/+/status")
    this.Client.subscribe("/testbed/+/+/value")
    this.Client.subscribe("/testbed/relay/+/mode")
    this.Client.subscribe("/testbed/relay/+/status")
    this.Client.subscribe("/testbed/+/+/power")
    this.Client.subscribe("/testbed/+/contracts/+/init")
    this.Client.subscribe("/testbed/amigo/set_price")
    this.Client.subscribe("/testbed/erouter/setpower_out")
    this.Client.subscribe("/testbed/+/gen/parameter0")
    this.Client.subscribe("/testbed/+/known_agents")

    this.Client.on('message', this.topic_handler.bind(this))
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
  ClientMQTT
}
