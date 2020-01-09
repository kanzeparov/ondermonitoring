'use strict'


const express = require('express')
const Router = require('./router')

let router = new Router()
let app = express()
let expressWs = require('express-ws')(app)
let mqtt_cl = require('./mqtt_client')
var config = require('./config.json');
let trunc = require('./trunc.js')
var cron = require('node-cron');

const sqlite3 = require('sqlite3');
let timeDelete = config.minutes;
var password_str = "123456789"
var date_hour_min = "";

const Sequelize = require('sequelize');
// your credentials
const DATABASE_URL = 'postgres://postgres:postgres@localhost:5432/monitoring';

const database = new Sequelize(DATABASE_URL);



app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
const functions = require('firebase-functions');

const msleep = time =>
  new Promise(
    resolve => setTimeout(_ => resolve(), time)
  );

var aWss = expressWs.getWss('/');

const User = database.define(
  'users',
  {
    nickname: {
      type: Sequelize.TEXT
    }
  },
  { timestamps: false }
);

const internetDB = database.define(
  'internetdbs',
  {
    time: {
      type: Sequelize.TEXT
    },
    value: {
      type: Sequelize.DOUBLE
    },
    timestamp: {
      type: Sequelize.BIGINT
    }
  },
  { timestamps: false }
);

const traditionalDB = database.define(
  'traditionaldbs',
  {
    time: {
      type: Sequelize.TEXT
    },
    value: {
      type: Sequelize.DOUBLE
    },
    timestamp: {
      type: Sequelize.BIGINT
    }
  },
  { timestamps: false }
);

const distributedDB = database.define(
  'distributeddbs',
  {
    time: {
      type: Sequelize.TEXT
    },
    value: {
      type: Sequelize.DOUBLE
    },
    timestamp: {
      type: Sequelize.BIGINT
    }
  },
  { timestamps: false }
);

User.readAll = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.send({ users });
  } catch (error) {
    return res.send(error);
  }
};

traditionalDB.readAll = async (req, res) => {
  try {
    const traditional = await traditionalDB.findAll();
    return res.send({ traditional });
  } catch (error) {
    return res.send(error);
  }
};

distributedDB.readAll = async (req, res) => {
  try {
    const distributed = await distributedDB.findAll();
    return res.send({ distributed });
  } catch (error) {
    return res.send(error);
  }
};

internetDB.readAll = async (req, res) => {
  try {
    const internet = await internetDB.findAll();
    return res.send({ internet });
  } catch (error) {
    return res.send(error);
  }
};



app.get('/users', User.readAll);
app.get('/internet', internetDB.readAll);
app.get('/distributed', distributedDB.readAll);
app.get('/traditional', traditionalDB.readAll);


const mqtt = new mqtt_cl.ClientMQTT()
mqtt.add_handler(handler)
mqtt.start()
var gen1 = {
  time: "0",
  value: 0,
  id: 1
}
var gen2 = {
  time: "0",
  value: 0,
  id: 2
}
var gen3 = {
  time: "0",
  value: 0,
  id: 3
}
var gen4 = {
  time: "0",
  value: 0,
  id: 4
}
var plot1 = {
  time: "0",
  value: 0,
  id: "traditional"
}
var plot2 = {
  time: "0",
  value: 0,
  id: "distributed"
}
var plot3 = {
  time: "0",
  value: 0,
  id: "internet"
}
var cell1 = {
  time: "0",
  value: 0,
  id: 1,
  status: false
}
var cell2 = {
  time: "0",
  value: 0,
  id: 2,
  status: false
}
var cell3 = {
  time: "0",
  value: 0,
  id: 3,
  status: false
}
var cell4 = {
  time: "0",
  value: 0,
  id: 4,
  status: false
}

var arrow1 = {
  time: "0",
  value: 0,
  id: 1,
  status: true
}

var arrow2 = {
  time: "0",
  value: 0,
  id: 2,
  status: true
}

var arrow3 = {
  time: "0",
  value: 0,
  id: 3,
  status: true
}

var arrow4 = {
  time: "0",
  value: 0,
  id: 4,
  status: true
}

var arrow5 = {
  time: "0",
  value: 0,
  id: 5,
  status: true
}

var arrow6 = {
  time: "0",
  value: 0,
  id: 9,
  status: true
}

var arrow7 = {
  time: "0",
  value: 0,
  id: 7,
  status: true
}

var arrow8 = {
  time: "0",
  value: 0,
  id: 11,
  status: true
}

var arrow9pre = {
  time: "0",
  value1: 0,
  value2: 0,
  value3: 0,
  id: 6,
  status1: true,
  status2: true,
  status3: true
}
var arrow10pre = {
  time: "0",
  value1: 0,
  value2: 0,
  value3: 0,
  id: 10,
  status1: true,
  status2: true,
  status3: true
}
var arrow11pre = {
  time: "0",
  value1: 0,
  value2: 0,
  value3: 0,
  id: 8,
  status1: true,
  status2: true,
  status3: true
}
var arrow12pre = {
  time: "0",
  value1: 0,
  value2: 0,
  value3: 0,
  id: 12,
  status1: true,
  status2: true,
  status3: true
}

var arrow9 = {
  time: "0",
  value: 0,
  id: 6,
  status: true
}
var arrow10 = {
  time: "0",
  value: 0,
  id: 10,
  status: true
}
var arrow11 = {
  time: "0",
  value: 0,
  id: 8,
  status: true
}
var arrow12 = {
  time: "0",
  value: 0,
  id: 12,
  status: true
}

var arrowDir1 = {
  time: "0",
  value: 0,
  id: 1,
  balance: 0,
  status: true,
  directionfrom: "Agent1",
  directionto: "Agent2"
}
var arrowDir2 = {
  time: "0",
  value: 0,
  id: 2,
  balance: 0,
  status: true,
  directionfrom: "Agent2",
  directionto: "Agent4"
}
var arrowDir3 = {
  time: "0",
  value: 0,
  id: 3,
  balance: 0,
  status: true,
  directionfrom: "Agent4",
  directionto: "Agent3"
}
var arrowDir4 = {
  time: "0",
  value: 0,
  id: 4,
  balance: 0,
  status: true,
  directionfrom: "Agent3",
  directionto: "Agent1"
}
var arrowDir5 = {
  time: "0",
  value: 0,
  id: 5,
  balance: 0,
  status: true,
  directionfrom: "Agent3",
  directionto: "Agent2"
}
var arrowDir6 = {
  time: "0",
  value: 0,
  id: 6,
  balance: 0,
  status: true,
  directionfrom: "Agent1",
  directionto: "Agent4"
}

var rout = {
  time: "0",
  balance: 0,
  power: 0,
  energy: 0
}

function handler(type, value) {
  console.log("Receive new message %o ", value)
  var date = new Date();
  var timestamp = date.getTime();
  let json_msg = value;

  try {
    json_msg = JSON.parse(value)
    console.log("handler %o" + (json_msg.port == 'enode2' && json_msg.port2 == "contracts"), json_msg)

    if (json_msg.port2 == 'known_agents') {
      console.log("agent json %o " + (json_msg.count == 3), json_msg)

      if (json_msg.agent1 == 'Agent1') {
        cell1.status = true
      }
      if (json_msg.agent1 == 'Agent2') {
        cell2.status = true
      }
      if (json_msg.agent1 == 'Agent3') {
        cell3.status = true
      }
      if (json_msg.agent1 == 'Agent4') {
        cell4.status = true
      }

      console.log("cell1 %o ", cell1)
      console.log("cell2 %o ", cell2)
      console.log("cell3 %o ", cell3)
      console.log("cell4 %o ", cell4)
    }

    if (json_msg.port == 'enode1' && json_msg.port2 == "gen") {
      console.log("gen price json %o", value)
      gen1.value = json_msg.value;
      gen1.time = json_msg.time;
      console.log("gen %o", gen1)
    }
    if (json_msg.port == 'enode2' && json_msg.port2 == "gen") {
      console.log("gen price json %o", value)
      gen2.value = json_msg.value;
      gen2.time = json_msg.time;
      console.log("gen %o", gen2)
    }
    if (json_msg.port == 'enode3' && json_msg.port2 == "gen") {
      console.log("gen price json %o", value)
      gen3.value = json_msg.value;
      gen3.time = json_msg.time;
      console.log("gen %o", gen3)
    }
    if (json_msg.port == 'enode4' && json_msg.port2 == "gen") {
      console.log("gen price json %o", value)
      gen4.value = json_msg.value;
      gen4.time = json_msg.time;
      console.log("gen %o", gen4)
    }

    if (json_msg.port == 'enode1' && json_msg.port2 == "finance") {
      console.log("cell json %o", value)
      cell1.value = json_msg.value;
      cell1.time = json_msg.time;
      console.log("cell %o", cell1)
    }
    if (json_msg.port == 'enode2' && json_msg.port2 == "finance") {
      console.log("cell json %o", json_msg.value)
      cell2.value = json_msg.value;
      cell2.time = json_msg.time;
      console.log("cell %o", cell2)
    }
    if (json_msg.port == 'enode3' && json_msg.port2 == "finance") {
      console.log("cell json %o", value)
      cell3.value = json_msg.value;
      cell3.time = json_msg.time;
      console.log("cell %o", cell3)
    }
    if (json_msg.port == 'enode4' && json_msg.port2 == "finance") {
      console.log("cell json %o", value)
      cell4.value = json_msg.value;
      cell4.time = json_msg.time;
      console.log("cell %o", cell4)
    }

    if (json_msg.port == 'emeter1' && json_msg.port2 == "power") {
      console.log("arrow json %o", value)
      arrow1.value = json_msg.value;
      arrow1.time = json_msg.time;
      rout.power = arrow1.value + arrow2.value + arrow3.value + arrow4.value
      console.log("arrow %o", arrow1)
    }
    if (json_msg.port == 'emeter2' && json_msg.port2 == "power") {
      console.log("arrow json %o", value)
      arrow2.value = json_msg.value;
      arrow2.time = json_msg.time;
      rout.power = arrow1.value + arrow2.value + arrow3.value + arrow4.value
      console.log("arrow %o", arrow2)
    }
    if (json_msg.port == 'emeter3' && json_msg.port2 == "power") {
      console.log("arrow json %o", value)
      arrow3.value = json_msg.value;
      arrow3.time = json_msg.time;
      rout.power = arrow1.value + arrow2.value + arrow3.value + arrow4.value
      console.log("arrow %o", arrow3)
    }
    if (json_msg.port == 'emeter4' && json_msg.port2 == "power") {
      console.log("arrow json %o", value)
      arrow4.value = json_msg.value;
      arrow4.time = json_msg.time;
      rout.power = arrow1.value + arrow2.value + arrow3.value + arrow4.value
      console.log("arrow %o", arrow4)
    }

    if (json_msg.port == 'enode1' && json_msg.port3 == 'ac' && json_msg.port2 == "relay") {
      console.log("arrow status json %o", value)
      arrow1.status = json_msg.value;
      console.log("arrow status %o", arrow1)
    }
    if (json_msg.port == 'enode2' && json_msg.port3 == 'ac' && json_msg.port2 == "relay") {
      console.log("arrow status json %o", value)
      arrow2.status = json_msg.value;
      console.log("arrow status %o", arrow1)
    }
    if (json_msg.port == 'enode3' && json_msg.port3 == 'ac' && json_msg.port2 == "relay") {
      console.log("arrow status json %o", value)
      arrow3.status = json_msg.value;
      console.log("arrow status %o", arrow1)
    }
    if (json_msg.port == 'enode4' && json_msg.port3 == 'ac' && json_msg.port2 == "relay") {
      console.log("arrow status json %o", value)
      arrow4.status = json_msg.value;
      console.log("arrow status %o", arrow1)
    }

    if (json_msg.port == 'enode1' && json_msg.port2 == "ext_battery") {
      console.log("arrow58 json %o", value)
      arrow5.value = json_msg.value;
      arrow5.time = json_msg.time;
      console.log("arrow58 %o", arrow5)
    }
    if (json_msg.port == 'enode2' && json_msg.port2 == "ext_battery") {
      console.log("arrow58 json %o", json_msg.value)
      arrow6.value = json_msg.value;
      arrow6.time = json_msg.time;
      console.log("arrow58 %o", arrow6)
    }
    if (json_msg.port == 'enode3' && json_msg.port2 == "ext_battery") {
      console.log("arrow58 json %o", value)
      arrow7.value = json_msg.value;
      arrow7.time = json_msg.time;
      console.log("arrow58 %o", arrow7)
    }
    if (json_msg.port == 'enode4' && json_msg.port2 == "ext_battery") {
      console.log("arrow58 json %o", value)
      arrow8.value = json_msg.value;
      arrow8.time = json_msg.time;
      console.log("arrow58 %o", arrow8)
    }
    if (json_msg.port == 'enode1' && json_msg.port3 == 'der' && json_msg.port2 == "relay") {
      console.log("arrow status json %o", value)
      arrow5.status = json_msg.value;
      console.log("arrow status %o", arrow5)
    }
    if (json_msg.port == 'enode2' && json_msg.port3 == 'der' && json_msg.port2 == "relay") {
      console.log("arrow status json %o", value)
      arrow6.status = json_msg.value;
      console.log("arrow status %o", arrow6)
    }
    if (json_msg.port == 'enode3' && json_msg.port3 == 'der' && json_msg.port2 == "relay") {
      console.log("arrow status json %o", value)
      arrow7.status = json_msg.value;
      console.log("arrow status %o", arrow7)
    }
    if (json_msg.port == 'enode4' && json_msg.port3 == 'der' && json_msg.port2 == "relay") {
      console.log("arrow status json %o", value)
      arrow8.status = json_msg.value;
      console.log("arrow status %o", arrow8)
    }



    if (json_msg.port == 'enode1' && json_msg.port2 == "load1" && json_msg.port3 == "measure") {
      console.log("arrow912  json %o", value)
      arrow9pre.value1 = json_msg.value;
      console.log("arrow912 %o", arrow9pre)
    }
    if (json_msg.port == 'enode1' && json_msg.port2 == "load2" && json_msg.port3 == "measure") {
      console.log("arrow912  json %o", value)
      arrow9pre.value2 = json_msg.value;
      console.log("arrow912 %o", arrow9pre)
    }
    if (json_msg.port == 'enode1' && json_msg.port2 == "load3" && json_msg.port3 == "measure") {
      console.log("arrow912  json %o", value)
      arrow9pre.value3 = json_msg.value;
      console.log("arrow912 %o", arrow9pre)
    }

    if (json_msg.port == 'enode2' && json_msg.port2 == "load1" && json_msg.port3 == "measure") {
      console.log("arrow912  json %o", value)
      arrow10pre.value1 = json_msg.value;
      console.log("arrow912 %o", arrow10pre)
    }
    if (json_msg.port == 'enode2' && json_msg.port2 == "load2" && json_msg.port3 == "measure") {
      console.log("arrow912  json %o", value)
      arrow10pre.value2 = json_msg.value;
      console.log("arrow912 %o", arrow10pre)
    }
    if (json_msg.port == 'enode2' && json_msg.port2 == "load3" && json_msg.port3 == "measure") {
      console.log("arrow912  json %o", value)
      arrow10pre.value3 = json_msg.value;
      console.log("arrow812 %o", arrow10pre)
    }




    if (json_msg.port == 'enode3' && json_msg.port2 == "load1" && json_msg.port3 == "measure") {
      console.log("arrow912  json %o", value)
      arrow11pre.value1 = json_msg.value;
      console.log("arrow912 %o", arrow11pre)
    }
    if (json_msg.port == 'enode3' && json_msg.port2 == "load2" && json_msg.port3 == "measure") {
      console.log("arrow912  json %o", value)
      arrow11pre.value2 = json_msg.value;
      console.log("arrow912 %o", arrow11pre)
    }
    if (json_msg.port == 'enode3' && json_msg.port2 == "load3" && json_msg.port3 == "measure") {
      console.log("arrow912  json %o", value)
      arrow11pre.value3 = json_msg.value;
      console.log("arrow812 %o", arrow11pre)
    }



    if (json_msg.port == 'enode4' && json_msg.port2 == "load1" && json_msg.port3 == "measure") {
      console.log("arrow912  json %o", value)
      arrow12pre.value1 = json_msg.value;
      console.log("arrow912 %o", arrow12pre)
    }
    if (json_msg.port == 'enode4' && json_msg.port2 == "load2" && json_msg.port3 == "measure") {
      console.log("arrow912  json %o", value)
      arrow12pre.value2 = json_msg.value;
      console.log("arrow912 %o", arrow12pre)
    }
    if (json_msg.port == 'enode4' && json_msg.port2 == "load3" && json_msg.port3 == "measure") {
      console.log("arrow912  json %o", value)
      arrow12pre.value3 = json_msg.value;
      console.log("arrow912 %o", arrow12pre)
    }


    if (json_msg.port == 'enode1' && json_msg.port2 == "load" && json_msg.port3 == "relay1") {
      console.log("arrow912 status json %o", value)
      arrow9pre.status1 = json_msg.value;
      arrow9pre.time = json_msg.time;
      console.log("arrow912 %o", arrow9pre)
    }
    if (json_msg.port == 'enode1' && json_msg.port2 == "load" && json_msg.port3 == "relay2") {
      console.log("arrow912 status json %o", value)
      arrow9pre.status2 = json_msg.value;
      arrow9pre.time = json_msg.time;
      console.log("arrow912 %o", arrow9pre)
    }
    if (json_msg.port == 'enode1' && json_msg.port2 == "load" && json_msg.port3 == "relay3") {
      console.log("arrow912 status json %o", value)
      arrow9pre.status3 = json_msg.value;
      arrow9pre.time = json_msg.time;
      console.log("arrow912 %o", arrow9pre)
    }

    if (json_msg.port == 'enode2' && json_msg.port2 == "load" && json_msg.port3 == "relay1") {
      console.log("arrow912 status json %o", value)
      arrow10pre.status1 = json_msg.value;
      arrow10pre.time = json_msg.time;
      console.log("arrow912 %o", arrow10pre)
    }
    if (json_msg.port == 'enode2' && json_msg.port2 == "load" && json_msg.port3 == "relay2") {
      console.log("arrow912 status json %o", value)
      arrow10pre.status2 = json_msg.value;
      arrow10pre.time = json_msg.time;
      console.log("arrow912 %o", arrow10pre)
    }
    if (json_msg.port == 'enode2' && json_msg.port2 == "load" && json_msg.port3 == "relay3") {
      console.log("arrow912 status json %o", value)
      arrow10pre.status3 = json_msg.value;
      arrow10pre.time = json_msg.time;
      console.log("arrow812 %o", arrow10pre)
    }




    if (json_msg.port == 'enode3' && json_msg.port2 == "load" && json_msg.port3 == "relay1") {
      console.log("arrow912 status json %o", value)
      arrow11pre.status1 = json_msg.value;
      arrow11pre.time = json_msg.time;
      console.log("arrow912 %o", arrow11pre)
    }
    if (json_msg.port == 'enode3' && json_msg.port2 == "load" && json_msg.port3 == "relay2") {
      console.log("arrow912 status json %o", value)
      arrow11pre.status2 = json_msg.value;
      arrow11pre.time = json_msg.time;
      console.log("arrow912 %o", arrow11pre)
    }
    if (json_msg.port == 'enode3' && json_msg.port2 == "load" && json_msg.port3 == "relay3") {
      console.log("arrow912 status json %o", value)
      arrow11pre.status3 = json_msg.value;
      arrow11pre.time = json_msg.time;
      console.log("arrow812 %o", arrow11pre)
    }



    if (json_msg.port == 'enode4' && json_msg.port2 == "load" && json_msg.port3 == "relay1") {
      console.log("arrow912 status json %o", value)
      arrow12pre.status1 = json_msg.value;
      arrow12pre.time = json_msg.time;
      console.log("arrow912 %o", arrow12pre)
    }
    if (json_msg.port == 'enode4' && json_msg.port2 == "load" && json_msg.port3 == "relay2") {
      console.log("arrow912 status json %o", value)
      arrow12pre.status2 = json_msg.value;
      arrow12pre.time = json_msg.time;
      console.log("arrow912 %o", arrow12pre)
    }
    if (json_msg.port == 'enode4' && json_msg.port2 == "load" && json_msg.port3 == "relay3") {
      console.log("arrow912 status json %o", value)
      arrow12pre.status3 = json_msg.value;
      arrow12pre.time = json_msg.time;
      console.log("arrow912 %o", arrow12pre)
    }
    arrow9.status = arrow9pre.status1 || arrow9pre.status2 || arrow9pre.status3
    arrow10.status = arrow10pre.status1 || arrow10pre.status2 || arrow10pre.status3
    arrow11.status = arrow11pre.status1 || arrow11pre.status2 || arrow11pre.status3
    arrow12.status = arrow12pre.status1 || arrow12pre.status2 || arrow12pre.status3
    arrow9.value = arrow9pre.value1 * arrow9pre.status1 + arrow9pre.value2 * arrow9pre.status2 + arrow9pre.value3 * arrow9pre.status3
    arrow10.value = arrow10pre.value1 * arrow10pre.status1 + arrow10pre.value2 * arrow10pre.status2 + arrow10pre.value3 * arrow10pre.status3
    arrow11.value = arrow11pre.value1 * arrow11pre.status1 + arrow11pre.value2 * arrow11pre.status2 + arrow11pre.value3 * arrow11pre.status3
    arrow12.value = arrow12pre.value1 * arrow12pre.status1 + arrow12pre.value2 * arrow12pre.status2 + arrow12pre.value3 * arrow12pre.status3
    console.log("arrow9 %o", arrow9)
    console.log("arrow10 %o", arrow10)
    console.log("arrow11 %o", arrow11)
    console.log("arrow12 %o", arrow12)
    //  /testbed/enodeX/portX/power
    if (json_msg.port == 'enode1' && json_msg.port2 == "port1" && json_msg.port3 == "power") {
      console.log("allowDir json %o", value)
      arrowDir1.value = json_msg.value;
      arrowDir1.time = json_msg.time;
      console.log("allowDir %o", arrowDir1)
    }
    if (json_msg.port == 'enode1' && json_msg.port2 == "port2" && json_msg.port3 == "power") {
      console.log("allowDir json %o", value)
      arrowDir6.value = json_msg.value;
      arrowDir6.time = json_msg.time;
      console.log("allowDir %o", arrowDir6)
    }
    if (json_msg.port == 'enode1' && json_msg.port2 == "port3" && json_msg.port3 == "power") {
      console.log("allowDir json %o", value)
      arrowDir4.value = json_msg.value;
      arrowDir4.time = json_msg.time;
      console.log("allowDir %o", arrowDir4)
    }

    if (json_msg.port == 'enode2' && json_msg.port2 == "port1" && json_msg.port3 == "power") {
      console.log("allowDir json %o", value)
      arrowDir1.value = json_msg.value;
      arrowDir1.time = json_msg.time;
      console.log("allowDir %o", arrowDir1)
    }
    if (json_msg.port == 'enode2' && json_msg.port2 == "port2" && json_msg.port3 == "power") {
      console.log("allowDir json %o", value)
      arrowDir5.value = json_msg.value;
      arrowDir5.time = json_msg.time;
      console.log("allowDir %o", arrowDir5)
    }
    if (json_msg.port == 'enode2' && json_msg.port2 == "port3" && json_msg.port3 == "power") {
      console.log("allowDir json %o", value)
      arrowDir2.value = json_msg.value;
      arrowDir2.time = json_msg.time;
      console.log("allowDir %o", arrowDir2)
    }


    if (json_msg.port == 'enode3' && json_msg.port2 == "port1" && json_msg.port3 == "power") {
      console.log("allowDir json %o", value)
      arrowDir4.value = json_msg.value;
      arrowDir4.time = json_msg.time;
      console.log("allowDir %o", arrowDir4)
    }
    if (json_msg.port == 'enode3' && json_msg.port2 == "port2" && json_msg.port3 == "power") {
      console.log("allowDir json %o", value)
      arrowDir5.value = json_msg.value;
      arrowDir5.time = json_msg.time;
      console.log("allowDir %o", arrowDir5)
    }
    if (json_msg.port == 'enode3' && json_msg.port2 == "port3" && json_msg.port3 == "power") {
      console.log("allowDir json %o", value)
      arrowDir3.value = json_msg.value;
      arrowDir3.time = json_msg.time;
      console.log("allowDir %o", arrowDir3)
    }



    if (json_msg.port == 'enode4' && json_msg.port2 == "port1" && json_msg.port3 == "power") {
      console.log("allowDir json %o", value)
      arrowDir3.value = json_msg.value;
      arrowDir3.time = json_msg.time;
      console.log("allowDir %o", arrowDir3)
    }
    if (json_msg.port == 'enode4' && json_msg.port2 == "port2" && json_msg.port3 == "power") {
      console.log("allowDir json %o", value)
      arrowDir6.value = json_msg.value;
      arrowDir6.time = json_msg.time;
      console.log("allowDir %o", arrowDir6)
    }
    if (json_msg.port == 'enode4' && json_msg.port2 == "port3" && json_msg.port3 == "power") {
      console.log("allowDir json %o", value)
      arrowDir2.value = json_msg.value;
      arrowDir2.time = json_msg.time;
      console.log("allowDir %o", arrowDir2)
    }

    if (json_msg.port == 'relay' && json_msg.port2 == "dc1" && json_msg.port3 == "status") {
      console.log("allowDir status json %o", value)
      arrowDir1.status = json_msg.value;
      arrowDir1.time = json_msg.time;
      console.log("allowDir %o", arrowDir1)
    }
    if (json_msg.port == 'relay' && json_msg.port2 == "dc2" && json_msg.port3 == "status") {
      console.log("allowDir status json %o", value)
      arrowDir2.status = json_msg.value;
      arrowDir2.time = json_msg.time;
      console.log("allowDir %o", arrowDir2)
    }
    if (json_msg.port == 'relay' && json_msg.port2 == "dc3" && json_msg.port3 == "status") {
      console.log("allowDir status json %o", value)
      arrowDir3.status = json_msg.value;
      arrowDir3.time = json_msg.time;
      console.log("allowDir %o", arrowDir3)
    }
    if (json_msg.port == 'relay' && json_msg.port2 == "dc4" && json_msg.port3 == "status") {
      console.log("allowDir status json %o", value)
      arrowDir4.status = json_msg.value;
      arrowDir4.time = json_msg.time;
      console.log("allowDir %o", arrowDir4)
    }
    if (json_msg.port == 'relay' && json_msg.port2 == "dc5" && json_msg.port3 == "status") {
      console.log("allowDir status json %o", value)
      arrowDir5.status = json_msg.value;
      arrowDir5.time = json_msg.time;
      console.log("allowDir %o", arrowDir5)
    }
    if (json_msg.port == 'relay' && json_msg.port2 == "dc6" && json_msg.port3 == "status") {
      console.log("allowDir status json %o", value)
      arrowDir6.status = json_msg.value;
      arrowDir6.time = json_msg.time;
      console.log("allowDir %o", arrowDir6)
    }

    if (json_msg.port == 'enode1' && json_msg.port2 == "contracts") {
      console.log("ENODE1 arrow direction json %o", value)
      if (json_msg.seller == 'Agent2' || json_msg.contragent == 'Agent2') {
        arrowDir1.directionfrom = json_msg.seller;
        arrowDir1.directionto = json_msg.contragent;
        arrowDir1.balance = json_msg.cost;
      }
      if (json_msg.seller == 'Agent4' || json_msg.contragent == 'Agent4') {
        arrowDir6.directionfrom = json_msg.seller;
        arrowDir6.directionto = json_msg.contragent;
        arrowDir6.balance = json_msg.cost;
      }
      if (json_msg.seller == 'Agent3' || json_msg.contragent == 'Agent3') {
        arrowDir4.directionfrom = json_msg.seller;
        arrowDir4.directionto = json_msg.contragent;
        arrowDir4.balance = json_msg.cost;
      }
      console.log("arrow direction %o %o %o", arrowDir1, arrowDir6, arrowDir4)
    }
    if (json_msg.port == 'enode2' && json_msg.port2 == "contracts") {
      console.log("ENODE2 arrow direction json %o", value)
      if (json_msg.seller == 'Agent1' || json_msg.contragent == 'Agent1') {
        arrowDir1.directionfrom = json_msg.seller;
        arrowDir1.directionto = json_msg.contragent;
        arrowDir1.balance = json_msg.cost;
      }
      if (json_msg.seller == 'Agent3' || json_msg.contragent == 'Agent3') {
        arrowDir5.directionfrom = json_msg.seller;
        arrowDir5.directionto = json_msg.contragent;
        arrowDir5.balance = json_msg.cost;
      }
      if (json_msg.seller == 'Agent4' || json_msg.contragent == 'Agent4') {
        arrowDir2.directionfrom = json_msg.seller;
        arrowDir2.directionto = json_msg.contragent;
        arrowDir2.balance = json_msg.cost;
      }
      console.log("arrow direction %o %o %o", arrowDir1, arrowDir5, arrowDir2)
    }
    if (json_msg.port == 'enode3' && json_msg.port2 == "contracts") {
      console.log("ENODE3 arrow direction json %o", value)
console.log("json_msg.seller %o, json_msg.contragent %o", json_msg.seller,json_msg.contragent)
      if (json_msg.seller == 'Agent1' || json_msg.contragent == 'Agent1') {
        arrowDir4.directionfrom = json_msg.seller;
        arrowDir4.directionto = json_msg.contragent;
        arrowDir4.balance = json_msg.cost;
      }
      if (json_msg.seller == 'Agent2' || json_msg.contragent == 'Agent2') {
        arrowDir5.directionfrom = json_msg.seller;
        arrowDir5.directionto = json_msg.contragent;
        arrowDir5.balance = json_msg.cost;
      }
      if (json_msg.seller == 'Agent4' || json_msg.contragent == 'Agent4') {
console.log("arrowDir3.directionfrom %o", arrowDir3.directionfrom)
console.log("arrowDir3.directionfrom %o", arrowDir3.directionto)
        arrowDir3.directionfrom = json_msg.seller;
        arrowDir3.directionto = json_msg.contragent;
        arrowDir3.balance = json_msg.cost;
      }
      console.log("arrow direction %o %o %o", arrowDir4, arrowDir5, arrowDir3)
    }
    if (json_msg.port == 'enode4' && json_msg.port2 == "contracts") {
      console.log("ENODE4 arrow direction json %o", value)
      if (json_msg.seller == 'Agent3' || json_msg.contragent == 'Agent3') {
        arrowDir3.directionfrom = json_msg.seller;
        arrowDir3.directionto = json_msg.contragent;
        arrowDir3.balance = json_msg.cost;
      }
      if (json_msg.seller == 'Agent1' || json_msg.contragent == 'Agent1') {
        arrowDir6.directionfrom = json_msg.seller;
        arrowDir6.directionto = json_msg.contragent;
        arrowDir6.balance = json_msg.cost;
      }
      if (json_msg.seller == 'Agent2' || json_msg.contragent == 'Agent2') {
        arrowDir2.directionfrom = json_msg.seller;
        arrowDir2.directionto = json_msg.contragent;
        arrowDir2.balance = json_msg.cost;
      }
      console.log("arrow direction %o %o %o", arrowDir3, arrowDir6, arrowDir2)
    }

    if (json_msg.port == 'amigo' && json_msg.port2 == "set_price") {
      console.log("router balance %o", value)
      rout.balance = json_msg.value;
      rout.time = json_msg.time;
      console.log("router balance %o", rout)
    }
    if (json_msg.port == 'erouter' && json_msg.port2 == "setpower_out") {
      console.log("router energy %o", value)
      rout.energy = json_msg.value;
      rout.time = json_msg.time;
      console.log("router energy %o", rout)
    }
    var date = new Date()
    date_hour_min = date.getHours() + ":" + date.getMinutes()
    plot1.time = date_hour_min
    console.log("plot1 938- " + plot1.value)
    plot1.value = (arrow9.value + arrow10.value + arrow11.value + arrow12.value) * rout.balance
    console.log("plot1 938- " + plot1.value)

    plot2.time = date_hour_min
    if (arrow11.value > 0) {
      plot2.value = (arrow9.value - arrow5.value) * rout.balance + arrow5.value * gen1.value +
        (arrow10.value - arrow6.value) * rout.balance + arrow6.value * gen2.value +
        (arrow11.value - arrow7.value) * rout.balance + arrow7.value * gen3.value +
        (arrow12.value - arrow8.value) * rout.balance + arrow8.value * gen4.value
    } else if (arrow11.value <= 0) {
      plot2.value = (arrow9.value - arrow5.value) * rout.balance + arrow5.value * gen1.value +
        (arrow10.value - arrow6.value) * rout.balance + arrow6.value * gen2.value +
        (arrow11.value - arrow7.value) * rout.balance +
        (arrow12.value - arrow8.value) * rout.balance + arrow8.value * gen4.value
    }

    var powerBuyEnode1 = 0
    var pricePowerBuyEnode1 = 0
    var powerSellEnode1 = 0
    var pricePowerSellEnode1 = 0

    var powerBuyEnode2 = 0
    var pricePowerBuyEnode2 = 0
    var powerSellEnode2 = 0
    var pricePowerSellEnode2 = 0

    var powerBuyEnode3 = 0
    var pricePowerBuyEnode3 = 0
    var powerSellEnode3 = 0
    var pricePowerSellEnode3 = 0

    var powerBuyEnode4 = 0
    var pricePowerBuyEnode4 = 0
    var powerSellEnode4 = 0
    var pricePowerSellEnode4 = 0

    if (arrowDir1.directionto == 'Agent1') {
      powerBuyEnode1 = powerBuyEnode1 + arrowDir1.value
      pricePowerBuyEnode1 = pricePowerBuyEnode1 + arrowDir1.value * arrowDir1.balance
      powerSellEnode2 = powerSellEnode2 + arrowDir1.value
      pricePowerSellEnode2 = pricePowerSellEnode2 + arrowDir1.value * arrowDir1.balance
    }
    if (arrowDir6.directionto == 'Agent1') {
      powerBuyEnode1 = powerBuyEnode1 + arrowDir6.value
      pricePowerBuyEnode1 = pricePowerBuyEnode1 + arrowDir6.value * arrowDir6.balance
      powerSellEnode4 = powerSellEnode4 + arrowDir6.value
      pricePowerSellEnode4 = pricePowerSellEnode4 + arrowDir6.value * arrowDir6.balance
    }
    if (arrowDir4.directionto == 'Agent1') {
      powerBuyEnode1 = powerBuyEnode1 + arrowDir4.value
      pricePowerBuyEnode1 = pricePowerBuyEnode1 + arrowDir4.value * arrowDir4.balance
      powerSellEnode3 = powerSellEnode3 + arrowDir4.value
      pricePowerSellEnode3 = pricePowerSellEnode3 + arrowDir4.value * arrowDir4.balance
    }

    if (arrowDir1.directionto == 'Agent2') {
      powerBuyEnode2 = powerBuyEnode2 + arrowDir1.value
      pricePowerBuyEnode2 = pricePowerBuyEnode2 + arrowDir1.value * arrowDir1.balance
      powerSellEnode1 = powerSellEnode1 + arrowDir1.value
      pricePowerSellEnode1 = pricePowerSellEnode1 + arrowDir1.value * arrowDir1.balance
    }
    if (arrowDir2.directionto == 'Agent2') {
      powerBuyEnode2 = powerBuyEnode2 + arrowDir2.value
      pricePowerBuyEnode2 = pricePowerBuyEnode2 + arrowDir2.value * arrowDir2.balance
      powerSellEnode4 = powerSellEnode4 + arrowDir2.value
      pricePowerSellEnode4 = pricePowerSellEnode4 + arrowDir2.value * arrowDir2.balance
    }
    if (arrowDir5.directionto == 'Agent2') {
      powerBuyEnode2 = powerBuyEnode2 + arrowDir5.value
      pricePowerBuyEnode2 = pricePowerBuyEnode2 + arrowDir5.value * arrowDir5.balance
      powerSellEnode3 = powerSellEnode3 + arrowDir5.value
      pricePowerSellEnode3 = pricePowerSellEnode3 + arrowDir5.value * arrowDir5.balance
    }

    if (arrowDir4.directionto == 'Agent3') {
      powerBuyEnode3 = powerBuyEnode3 + arrowDir4.value
      pricePowerBuyEnode3 = pricePowerBuyEnode3 + arrowDir4.value * arrowDir4.balance
      powerSellEnode1 = powerSellEnode1 + arrowDir4.value
      pricePowerSellEnode1 = pricePowerSellEnode1 + arrowDir4.value * arrowDir4.balance
    }

    if (arrowDir5.directionto == 'Agent3') {
      powerBuyEnode3 = powerBuyEnode3 + arrowDir5.value
      pricePowerBuyEnode3 = pricePowerBuyEnode3 + arrowDir5.value * arrowDir5.balance
      powerSellEnode2 = powerSellEnode2 + arrowDir5.value
      pricePowerSellEnode2 = pricePowerSellEnode2 + arrowDir5.value * arrowDir5.balance
    }
    if (arrowDir3.directionto == 'Agent3') {
      powerBuyEnode3 = powerBuyEnode3 + arrowDir3.value
      pricePowerBuyEnode3 = pricePowerBuyEnode3 + arrowDir3.value * arrowDir3.balance
      powerSellEnode4 = powerSellEnode4 + arrowDir3.value
      pricePowerSellEnode4 = pricePowerSellEnode4 + arrowDir3.value * arrowDir3.balance
    }

    if (arrowDir2.directionto == 'Agent4') {
      powerBuyEnode4 = powerBuyEnode4 + arrowDir2.value
      pricePowerBuyEnode4 = pricePowerBuyEnode4 + arrowDir2.value * arrowDir2.balance
      powerSellEnode2 = powerSellEnode2 + arrowDir2.value
      pricePowerSellEnode2 = pricePowerSellEnode2 + arrowDir2.value * arrowDir2.balance
    }
    if (arrowDir6.directionto == 'Agent4') {
      powerBuyEnode4 = powerBuyEnode4 + arrowDir6.value
      pricePowerBuyEnode4 = pricePowerBuyEnode4 + arrowDir6.value * arrowDir6.balance
      powerSellEnode1 = powerSellEnode1 + arrowDir6.value
      pricePowerSellEnode1 = pricePowerSellEnode1 + arrowDir6.value * arrowDir6.balance
    }
    if (arrowDir3.directionto == 'Agent4') {
      powerBuyEnode4 = powerBuyEnode4 + arrowDir3.value
      pricePowerBuyEnode4 = pricePowerBuyEnode4 + arrowDir3.value * arrowDir3.balance
      powerSellEnode3 = powerSellEnode3 + arrowDir3.value
      pricePowerSellEnode3 = pricePowerSellEnode3 + arrowDir3.value * arrowDir3.balance
    }

    plot3.time = date_hour_min
    if (arrow7.value > 0) {
      plot3.value = (arrow9.value - arrow5.value - powerBuyEnode1) * rout.balance + arrow5.value * gen1.value + pricePowerBuyEnode1 - pricePowerSellEnode1 +
        (arrow10.value - arrow6.value - powerBuyEnode2) * rout.balance + arrow6.value * gen2.value + pricePowerBuyEnode2 - pricePowerSellEnode2 +
        (arrow11.value - arrow7.value - powerBuyEnode3) * rout.balance + arrow7.value * gen3.value + pricePowerBuyEnode3 - pricePowerSellEnode3 +
        (arrow12.value - arrow8.value - powerBuyEnode4) * rout.balance + arrow8.value * gen4.value + pricePowerBuyEnode4 - pricePowerSellEnode4
    } else if (arrow7.value <= 0) {
      plot3.value = (arrow9.value - arrow5.value - powerBuyEnode1) * rout.balance + arrow5.value * gen1.value + pricePowerBuyEnode1 - pricePowerSellEnode1 +
        (arrow10.value - arrow6.value - powerBuyEnode2) * rout.balance + arrow6.value * gen2.value + pricePowerBuyEnode2 - pricePowerSellEnode2 +
        (arrow11.value - arrow7.value - powerBuyEnode3) * rout.balance + pricePowerBuyEnode3 - pricePowerSellEnode3 +
        (arrow12.value - arrow8.value - powerBuyEnode4) * rout.balance + arrow8.value * gen4.value + pricePowerBuyEnode4 - pricePowerSellEnode4
    }
    console.log("powerBuyEnode1 %o", powerBuyEnode1)
    console.log("powerBuyEnode2 %o", powerBuyEnode2)
    console.log("powerBuyEnode3 %o", powerBuyEnode3)
    console.log("powerBuyEnode4 %o", powerBuyEnode4)
    console.log("pricePowerBuyEnode1 %o", pricePowerBuyEnode1)
    console.log("pricePowerBuyEnode2 %o", pricePowerBuyEnode2)
    console.log("pricePowerBuyEnode3 %o", pricePowerBuyEnode3)
    console.log("pricePowerBuyEnode4 %o", pricePowerBuyEnode4)
    console.log("pricePowerSellEnode1 %o", pricePowerSellEnode1)
    console.log("pricePowerSellEnode2 %o", pricePowerSellEnode2)
    console.log("pricePowerSellEnode3 %o", pricePowerSellEnode3)
    console.log("pricePowerSellEnode4 %o", pricePowerSellEnode4)
    console.log("arrowDir1 %o", arrowDir1)
    console.log("arrowDir2 %o", arrowDir2)
    console.log("arrowDir3 %o", arrowDir3)
    console.log("arrowDir4 %o", arrowDir4)
    console.log("arrowDir5 %o", arrowDir5)
    console.log("arrowDir6 %o", arrowDir6)
    console.log("plot1 %o", plot1)
    console.log("plot2 %o", plot2)
    console.log("plot3 %o", plot3)
    //TOPICS WHICH CONNECT WITH GRAPH
    if (true) {

      if ((json_msg.port.toString().includes('enode') && json_msg.port2.toString().includes('port') && json_msg.port3 == "power") ||
        (json_msg.port.toString().includes('enode') && json_msg.port2 == "contracts") ||
        (json_msg.port == 'amigo' && json_msg.port2 == "set_price") ||
        (json_msg.port.toString().includes('enode') && json_msg.port2.toString().includes('load') && json_msg.port3 == "measure") ||
        (json_msg.port.toString().includes('enode') && json_msg.port2 == "load" && json_msg.port3.toString().includes('relay')) ||
        (json_msg.port.toString().includes('enode') && json_msg.port2 == "ext_battery") || (json_msg.port.toString().includes('enode') && json_msg.port2 == "gen")
      ) {
        date_hour_min = date.getHours() + ":" + date.getMinutes()
        traditionalDB.create({
          time: date_hour_min,
          value: plot1.value,
          timestamp: timestamp
        })
      }

      if ((json_msg.port.toString().includes('enode') && json_msg.port2.toString().includes('port') && json_msg.port3 == "power") ||
        (json_msg.port.toString().includes('enode') && json_msg.port2 == "contracts") ||
        (json_msg.port == 'amigo' && json_msg.port2 == "set_price") ||
        (json_msg.port.toString().includes('enode') && json_msg.port2.toString().includes('load') && json_msg.port3 == "measure") ||
        (json_msg.port.toString().includes('enode') && json_msg.port2 == "load" && json_msg.port3.toString().includes('relay')) ||
        (json_msg.port.toString().includes('enode') && json_msg.port2 == "ext_battery") || (json_msg.port.toString().includes('enode') && json_msg.port2 == "gen")
      ) {
        date_hour_min = date.getHours() + ":" + date.getMinutes()

          distributedDB.create({
            time: date_hour_min,
            value: plot2.value,
            timestamp: timestamp
          })

      }
      //115,
      if ((json_msg.port.toString().includes('enode') && json_msg.port2.toString().includes('port') && json_msg.port3 == "power") ||
        (json_msg.port.toString().includes('enode') && json_msg.port2 == "contracts") ||
        (json_msg.port == 'amigo' && json_msg.port2 == "set_price") ||
        (json_msg.port.toString().includes('enode') && json_msg.port2.toString().includes('load') && json_msg.port3 == "measure") ||
        (json_msg.port.toString().includes('enode') && json_msg.port2 == "load" && json_msg.port3.toString().includes('relay')) ||
        (json_msg.port.toString().includes('enode') && json_msg.port2 == "ext_battery") || (json_msg.port.toString().includes('enode') && json_msg.port2 == "gen")
      ) {
        date_hour_min = date.getHours() + ":" + date.getMinutes()

        internetDB.create({
          time: date_hour_min,
          value: plot3.value,
          timestamp: timestamp
        })
      }


      const Op = Sequelize.Op;
      var date = new Date();
      var timestamp = date.getTime();
      var dif = timestamp - timeDelete * 1000 * 60;
      console.log('Deleted distributed');
      distributedDB.destroy({
      where: {
        timestamp: {
          [Op.lt]: dif
        }
      }
      }).then(function(timestamp){ // rowDeleted will return number of rows deleted
        if(timestamp === 1){
           console.log('Deleted successfully');
         }
      }, function(err){
          console.log(err);
      });

      var date = new Date();
      var timestamp = date.getTime();
      var dif = timestamp - timeDelete * 1000 * 60;
      console.log('Deleted internetDB');
      internetDB.destroy({
      where: {
        timestamp: {
          [Op.lt]: dif
        }
      }
      }).then(function(timestamp){ // rowDeleted will return number of rows deleted
        if(timestamp === 1){
           console.log('Deleted successfully');
         }
      }, function(err){
          console.log(err);
      });

      var date = new Date();
      var timestamp = date.getTime();
      var dif = timestamp - timeDelete * 1000 * 60;
      console.log('Deleted traditionalDB');
      traditionalDB.destroy({
      where: {
        timestamp: {
          [Op.lt]: dif
        }
      }
      }).then(function(timestamp){ // rowDeleted will return number of rows deleted
        if(timestamp === 1){
           console.log('Deleted successfully');
         }
      }, function(err){
          console.log(err);
      });
      }
  } catch (ex) {
    console.log(ex.toString())
  }
}

app.ws('/', function(ws, req) {
  const mqttDATAMain = new mqtt_cl.ClientMQTT()
  mqttDATAMain.add_handler(handlerDATAMain)
  mqttDATAMain.start()
  console.log('/ ws')
  //const sumCell = {"1": cell1, "2": cell2, "3": cell3, "4": cell4}
  const sumCell = {cell1, cell2, cell3, cell4}
  const objCell ={data: sumCell, type:"cells"}
  ws.send(JSON.stringify({type:'cells', data:sumCell}));
  const objAgents ={data: sumCell, type:"agents"}
  ws.send(JSON.stringify({type:'agents', data:sumCell}));
  //ws.send(objAgents)
  //TODO optimize it cell
  // ws.send(JSON.stringify(cell1))
  // ws.send(JSON.stringify(cell2))
  // ws.send(JSON.stringify(cell3))
  // ws.send(JSON.stringify(cell4))
  //TODO optimize it agents
  // ws.send(JSON.stringify(cell1))
  // ws.send(JSON.stringify(cell2))
  // ws.send(JSON.stringify(cell3))
  // ws.send(JSON.stringify(cell4))
  //TODO optimize it arrows
  arrow9.value = arrow9pre.value1 * arrow9pre.status1 + arrow9pre.value2 * arrow9pre.status2 + arrow9pre.value3 * arrow9pre.status3
  arrow10.value = arrow10pre.value1 * arrow10pre.status1 + arrow10pre.value2 * arrow10pre.status2 + arrow10pre.value3 * arrow10pre.status3
  arrow11.value = arrow11pre.value1 * arrow11pre.status1 + arrow11pre.value2 * arrow11pre.status2 + arrow11pre.value3 * arrow11pre.status3
  arrow12.value = arrow12pre.value1 * arrow12pre.status1 + arrow12pre.value2 * arrow12pre.status2 + arrow12pre.value3 * arrow12pre.status3
  arrow9.status = arrow9pre.status1 || arrow9pre.status2 || arrow9pre.status3
  arrow10.status = arrow10pre.status1 || arrow10pre.status2 || arrow10pre.status3
  arrow11.status = arrow11pre.status1 || arrow11pre.status2 || arrow11pre.status3
  arrow12.status = arrow12pre.status1 || arrow12pre.status2 || arrow12pre.status3
  //const sumArrow = {"1": arrow1, "2": arrow2, "3": arrow3, "4": arrow4,"5": arrow5, "6": arrow6, "7": arrow7, "8": arrow8,"9": arrow9, "10": arrow10, "11": arrow11, "12": arrow12}
  const sumArrow = {arrow1, arrow2, arrow3,arrow4, arrow5, arrow6, arrow7, arrow8,arrow9, arrow10, arrow11, arrow12}
  const objArrow ={data: sumCell, type:"arrows"}
  ws.send(JSON.stringify({type:'arrows', data:sumCell}));
  //ws.send(objArrow)
  // ws.send(JSON.stringify(arrow1))
  // ws.send(JSON.stringify(arrow2))
  // ws.send(JSON.stringify(arrow3))
  // ws.send(JSON.stringify(arrow4))
  // ws.send(JSON.stringify(arrow5))
  // ws.send(JSON.stringify(arrow6))
  // ws.send(JSON.stringify(arrow7))
  // ws.send(JSON.stringify(arrow8))
  // ws.send(JSON.stringify(arrow9))
  // ws.send(JSON.stringify(arrow10))
  // ws.send(JSON.stringify(arrow11))
  // ws.send(JSON.stringify(arrow12))
//TODO optimize it arrowDIRECTIONS
  //const sumArrowDirection = {"1": arrowDir1, "2": arrowDir2, "3": arrowDir3, "4": arrowDir4,"5": arrowDir5, "6": arrowDir6}
    const sumArrowDirection = {arrowDir1, arrowDir2, arrowDir3, arrowDir4, arrowDir5, arrowDir6}
  const objArrowDirection ={data: sumCell, type:"arrowDirections"}
  ws.send(JSON.stringify({type:'arrowDirections', data:sumCell}));
  //ws.send(objArrowDirection)
  // ws.send(JSON.stringify(arrowDir1))
  // ws.send(JSON.stringify(arrowDir2))
  // ws.send(JSON.stringify(arrowDir3))
  // ws.send(JSON.stringify(arrowDir4))
  // ws.send(JSON.stringify(arrowDir5))
  // ws.send(JSON.stringify(arrowDir6))
  //
//  ws.send(JSON.stringify(plot1))
  //
  const objRouter ={data: rout, type:"router"}
  ws.send(JSON.stringify({type:'router', data:rout}));
  //ws.send(objRouter)
  // cron.schedule('/2 * * * * * *', () => {
  //   console.log('Sending plot 1 2 3')
  // })

  function handlerDATAMain(type, value) {
    //DESCRIPTION CELL
    console.log(" cells Receive new message %o", value)
    var json_msg = value;
    try {
      json_msg = JSON.parse(value)
      if (json_msg.port == 'enode1' && json_msg.port2 == 'finance') {
        console.log(" handlerDATACells cell json %o", value)
        cell1.value = json_msg.value;
        cell1.time = json_msg.time;
        console.log(" handlerDATACells cell %o", cell1)
      }
      if (json_msg.port == 'enode2' && json_msg.port2 == 'finance') {
        console.log(" handlerDATACells cell json %o", json_msg.value)
        cell2.value = json_msg.value;
        cell2.time = json_msg.time;
        console.log(" handlerDATACells cell %o", cell2)
      }
      if (json_msg.port == 'enode3' && json_msg.port2 == 'finance') {
        console.log(" handlerDATACells cell json %o", value)
        cell3.value = json_msg.value;
        cell3.time = json_msg.time;
        console.log(" handlerDATACells cell %o", cell3)
      }
      if (json_msg.port == 'enode4' && json_msg.port2 == 'finance') {
        console.log(" handlerDATACells cell json %o", value)
        cell4.value = json_msg.value;
        cell4.time = json_msg.time;
        console.log(" handlerDATACells cell %o", cell4)
      }

      if (value.port2 == 'known_agents') {
        console.log("agent json %o", value)

        if (json_msg.agent1 == 'Agent1') {
          cell1.status = true
        }
        if (json_msg.agent1 == 'Agent2') {
          cell2.status = true
        }
        if (json_msg.agent1 == 'Agent3') {
          cell3.status = true
        }
        if (json_msg.agent1 == 'Agent4') {
          cell4.status = true
        }
      }
      //TODO optimize it
      const sumCell = {"1": cell1, "2": cell2, "3": cell3, "4": cell4}
      //const sumCell = {cell1, cell2, cell3, cell4}
      const objCell ={type:"cells", data: sumCell}
      console.log(objCell);
      ws.send(JSON.stringify({type:'cells', data:sumCell}));
      //ws.send(objCell)

      //DESCRIPTION AGENTS
      if (json_msg.port2 == 'known_agents') {
        console.log("agent json %o", value)
        if (json_msg.agent1 == 'Agent1') {
          cell1.status = true
        }
        if (json_msg.agent1 == 'Agent2') {
          cell2.status = true
        }
        if (json_msg.agent1 == 'Agent3') {
          cell3.status = true
        }
        if (json_msg.agent1 == 'Agent4') {
          cell4.status = true
        }
        //const sumCell = {"1": cell1, "2": cell2, "3": cell3, "4": cell4}
        const sumCell = {cell1, cell2, cell3, cell4}
        const objAgents ={data: sumCell, type:"agents"}
        ws.send(JSON.stringify({type:'agents', data:sumCell}));
        //ws.send(objAgents)

        //DESCRIPTION ARROWS
        if (json_msg.port == 'emeter1' && json_msg.port2 == 'power') {
          console.log("arrow json %o", value)
          arrow1.value = json_msg.value;
          arrow1.time = json_msg.time;
          console.log("arrow %o", arrow1)
        }
        if (json_msg.port == 'emeter2' && json_msg.port2 == 'power') {
          console.log("arrow json %o", value)
          arrow2.value = json_msg.value;
          arrow2.time = json_msg.time;
          console.log("arrow %o", arrow2)
        }
        if (json_msg.port == 'emeter3' && json_msg.port2 == 'power') {
          console.log("arrow json %o", value)
          arrow3.value = json_msg.value;
          arrow3.time = json_msg.time;
          console.log("arrow %o", arrow3)
        }
        if (json_msg.port == 'emeter4' && json_msg.port2 == 'power') {
          console.log("arrow json %o", value)
          arrow4.value = json_msg.value;
          arrow4.time = json_msg.time;
          console.log("arrow %o", arrow4)
        }
        if (json_msg.port == 'enode1' && json_msg.port3 == 'ac' && json_msg.port2 == "relay") {
          console.log("arrow status json %o", value)
          arrow1.status = json_msg.value;
          console.log("arrow status %o", arrow1)
        }
        if (json_msg.port == 'enode2' && json_msg.port3 == 'ac' && json_msg.port2 == "relay") {
          console.log("arrow status json %o", value)
          arrow2.status = json_msg.value;
          console.log("arrow status %o", arrow1)
        }
        if (json_msg.port == 'enode3' && json_msg.port3 == 'ac' && json_msg.port2 == "relay") {
          console.log("arrow status json %o", value)
          arrow3.status = json_msg.value;
          console.log("arrow status %o", arrow1)
        }
        if (json_msg.port == 'enode4' && json_msg.port3 == 'ac' && json_msg.port2 == "relay") {
          console.log("arrow status json %o", value)
          arrow4.status = json_msg.value;
          console.log("arrow status %o", arrow1)
        }

        if (json_msg.port == 'enode1' && json_msg.port2 == "ext_battery") {
          console.log("arrow58 json %o", value)
          arrow5.value = json_msg.value;
          arrow5.time = json_msg.time;
          console.log("arrow58 %o", arrow5)
        }
        if (json_msg.port == 'enode2' && json_msg.port2 == "ext_battery") {
          console.log("arrow58 json %o", json_msg.value)
          arrow6.value = json_msg.value;
          arrow6.time = json_msg.time;
          console.log("arrow58 %o", arrow6)
        }
        if (json_msg.port == 'enode3' && json_msg.port2 == "ext_battery") {
          console.log("arrow58 json %o", value)
          arrow7.value = json_msg.value;
          arrow7.time = json_msg.time;
          console.log("arrow58 %o", arrow7)
        }
        if (json_msg.port == 'enode4' && json_msg.port2 == "ext_battery") {
          console.log("arrow58 json %o", value)
          arrow8.value = json_msg.value;
          arrow8.time = json_msg.time;
          console.log("arrow58 %o", arrow8)
        }
        if (json_msg.port == 'enode1' && json_msg.port3 == 'der' && json_msg.port2 == "relay") {
          console.log("arrow status json %o", value)
          arrow5.status = json_msg.value;
          console.log("arrow status %o", arrow5)
        }
        if (json_msg.port == 'enode2' && json_msg.port3 == 'der' && json_msg.port2 == "relay") {
          console.log("arrow status json %o", value)
          arrow6.status = json_msg.value;
          console.log("arrow status %o", arrow6)
        }
        if (json_msg.port == 'enode3' && json_msg.port3 == 'der' && json_msg.port2 == "relay") {
          console.log("arrow status json %o", value)
          arrow7.status = json_msg.value;
          console.log("arrow status %o", arrow7)
        }
        if (json_msg.port == 'enode4' && json_msg.port3 == 'der' && json_msg.port2 == "relay") {
          console.log("arrow status json %o", value)
          arrow8.status = json_msg.value;
          console.log("arrow status %o", arrow8)
        }

        if (json_msg.port == 'enode1' && json_msg.port2 == "load1" && json_msg.port3 == "measure") {
          console.log("arrow912  json %o", value)
          arrow9pre.value1 = json_msg.value;
          console.log("arrow912 %o", arrow9pre)
        }
        if (json_msg.port == 'enode1' && json_msg.port2 == "load2" && json_msg.port3 == "measure") {
          console.log("arrow912  json %o", value)
          arrow9pre.value2 = json_msg.value;
          console.log("arrow912 %o", arrow9pre)
        }
        if (json_msg.port == 'enode1' && json_msg.port2 == "load3" && json_msg.port3 == "measure") {
          console.log("arrow912  json %o", value)
          arrow9pre.value3 = json_msg.value;
          console.log("arrow912 %o", arrow9pre)
        }

        if (json_msg.port == 'enode2' && json_msg.port2 == "load1" && json_msg.port3 == "measure") {
          console.log("arrow912  json %o", value)
          arrow10pre.value1 = json_msg.value;
          console.log("arrow912 %o", arrow10pre)
        }
        if (json_msg.port == 'enode2' && json_msg.port2 == "load2" && json_msg.port3 == "measure") {
          console.log("arrow912  json %o", value)
          arrow10pre.value2 = json_msg.value;
          console.log("arrow912 %o", arrow10pre)
        }
        if (json_msg.port == 'enode2' && json_msg.port2 == "load3" && json_msg.port3 == "measure") {
          console.log("arrow912  json %o", value)
          arrow10pre.value3 = json_msg.value;
          console.log("arrow812 %o", arrow10pre)
        }


        if (json_msg.port == 'enode3' && json_msg.port2 == "load1" && json_msg.port3 == "measure") {
          console.log("arrow912  json %o", value)
          arrow11pre.value1 = json_msg.value;
          console.log("arrow912 %o", arrow11pre)
        }
        if (json_msg.port == 'enode3' && json_msg.port2 == "load2" && json_msg.port3 == "measure") {
          console.log("arrow912  json %o", value)
          arrow11pre.value2 = json_msg.value;
          console.log("arrow912 %o", arrow11pre)
        }
        if (json_msg.port == 'enode3' && json_msg.port2 == "load3" && json_msg.port3 == "measure") {
          console.log("arrow912  json %o", value)
          arrow11pre.value3 = json_msg.value;
          console.log("arrow812 %o", arrow11pre)
        }



        if (json_msg.port == 'enode4' && json_msg.port2 == "load1" && json_msg.port3 == "measure") {
          console.log("arrow912  json %o", value)
          arrow12pre.value1 = json_msg.value;
          console.log("arrow912 %o", arrow12pre)
        }
        if (json_msg.port == 'enode4' && json_msg.port2 == "load2" && json_msg.port3 == "measure") {
          console.log("arrow912  json %o", value)
          arrow12pre.value2 = json_msg.value;
          console.log("arrow912 %o", arrow12pre)
        }
        if (json_msg.port == 'enode4' && json_msg.port2 == "load3" && json_msg.port3 == "measure") {
          console.log("arrow912  json %o", value)
          arrow12pre.value3 = json_msg.value;
          console.log("arrow912 %o", arrow12pre)
        }


        if (json_msg.port == 'enode1' && json_msg.port2 == "load" && json_msg.port3 == "relay1") {
          console.log("arrow912 status json %o", value)
          arrow9pre.status1 = json_msg.value;
          arrow9pre.time = json_msg.time;
          console.log("arrow912 %o", arrow9pre)
        }
        if (json_msg.port == 'enode1' && json_msg.port2 == "load" && json_msg.port3 == "relay2") {
          console.log("arrow912 status json %o", value)
          arrow9pre.status2 = json_msg.value;
          arrow9pre.time = json_msg.time;
          console.log("arrow912 %o", arrow9pre)
        }
        if (json_msg.port == 'enode1' && json_msg.port2 == "load" && json_msg.port3 == "relay3") {
          console.log("arrow912 status json %o", value)
          arrow9pre.status3 = json_msg.value;
          arrow9pre.time = json_msg.time;
          console.log("arrow912 %o", arrow9pre)
        }

        if (json_msg.port == 'enode2' && json_msg.port2 == "load" && json_msg.port3 == "relay1") {
          console.log("arrow912 status json %o", value)
          arrow10pre.status1 = json_msg.value;
          arrow10pre.time = json_msg.time;
          console.log("arrow912 %o", arrow10pre)
        }
        if (json_msg.port == 'enode2' && json_msg.port2 == "load" && json_msg.port3 == "relay2") {
          console.log("arrow912 status json %o", value)
          arrow10pre.status2 = json_msg.value;
          arrow10pre.time = json_msg.time;
          console.log("arrow912 %o", arrow10pre)
        }
        if (json_msg.port == 'enode2' && json_msg.port2 == "load" && json_msg.port3 == "relay3") {
          console.log("arrow912 status json %o", value)
          arrow10pre.status3 = json_msg.value;
          arrow10pre.time = json_msg.time;
          console.log("arrow812 %o", arrow10pre)
        }




        if (json_msg.port == 'enode3' && json_msg.port2 == "load" && json_msg.port3 == "relay1") {
          console.log("arrow912 status json %o", value)
          arrow11pre.status1 = json_msg.value;
          arrow11pre.time = json_msg.time;
          console.log("arrow912 %o", arrow11pre)
        }
        if (json_msg.port == 'enode3' && json_msg.port2 == "load" && json_msg.port3 == "relay2") {
          console.log("arrow912 status json %o", value)
          arrow11pre.status2 = json_msg.value;
          arrow11pre.time = json_msg.time;
          console.log("arrow912 %o", arrow11pre)
        }
        if (json_msg.port == 'enode3' && json_msg.port2 == "load" && json_msg.port3 == "relay3") {
          console.log("arrow912 status json %o", value)
          arrow11pre.status3 = json_msg.value;
          arrow11pre.time = json_msg.time;
          console.log("arrow812 %o", arrow11pre)
        }



        if (json_msg.port == 'enode4' && json_msg.port2 == "load" && json_msg.port3 == "relay1") {
          console.log("arrow912 status json %o", value)
          arrow12pre.status1 = json_msg.value;
          arrow12pre.time = json_msg.time;
          console.log("arrow912 %o", arrow12pre)
        }
        if (json_msg.port == 'enode4' && json_msg.port2 == "load" && json_msg.port3 == "relay2") {
          console.log("arrow912 status json %o", value)
          arrow12pre.status2 = json_msg.value;
          arrow12pre.time = json_msg.time;
          console.log("arrow912 %o", arrow12pre)
        }
        if (json_msg.port == 'enode4' && json_msg.port2 == "load" && json_msg.port3 == "relay3") {
          console.log("arrow912 status json %o", value)
          arrow12pre.status3 = json_msg.value;
          arrow12pre.time = json_msg.time;
          console.log("arrow912 %o", arrow12pre)
        }

        arrow9.status = arrow9pre.status1 || arrow9pre.status2 || arrow9pre.status3
        arrow10.status = arrow10pre.status1 || arrow10pre.status2 || arrow10pre.status3
        arrow11.status = arrow11pre.status1 || arrow11pre.status2 || arrow11pre.status3
        arrow12.status = arrow12pre.status1 || arrow12pre.status2 || arrow12pre.status3
        arrow9.value = arrow9pre.value1 * arrow9pre.status1 + arrow9pre.value2 * arrow9pre.status2 + arrow9pre.value3 * arrow9pre.status3
        arrow10.value = arrow10pre.value1 * arrow10pre.status1 + arrow10pre.value2 * arrow10pre.status2 + arrow10pre.value3 * arrow10pre.status3
        arrow11.value = arrow11pre.value1 * arrow11pre.status1 + arrow11pre.value2 * arrow11pre.status2 + arrow11pre.value3 * arrow11pre.status3
        arrow12.value = arrow12pre.value1 * arrow12pre.status1 + arrow12pre.value2 * arrow12pre.status2 + arrow12pre.value3 * arrow12pre.status3
        var date = new Date()
        date_hour_min = date.getHours() + ":" + date.getMinutes()
        plot1.time = date_hour_min
        console.log("plot1 (1637_) - " + plot1.value)
        plot1.value = (arrow9.value + arrow10.value + arrow11.value + arrow12.value) * rout.balance
        console.log("plot1 (1637_) - " + plot1.value)
        plot2.time = date_hour_min
        if (arrow11.value > 0) {
          plot2.value = (arrow9.value - arrow5.value) * rout.balance + arrow5.value * gen1.value +
            (arrow10.value - arrow6.value) * rout.balance + arrow6.value * gen2.value +
            (arrow11.value - arrow7.value) * rout.balance + arrow7.value * gen3.value +
            (arrow12.value - arrow8.value) * rout.balance + arrow8.value * gen4.value
        } else if (arrow11.value <= 0) {
          plot2.value = (arrow9.value - arrow5.value) * rout.balance + arrow5.value * gen1.value +
            (arrow10.value - arrow6.value) * rout.balance + arrow6.value * gen2.value +
            (arrow11.value - arrow7.value) * rout.balance +
            (arrow12.value - arrow8.value) * rout.balance + arrow8.value * gen4.value
        }
        var powerBuyEnode1 = 0
        var pricePowerBuyEnode1 = 0
        var powerSellEnode1 = 0
        var pricePowerSellEnode1 = 0

        var powerBuyEnode2 = 0
        var pricePowerBuyEnode2 = 0
        var powerSellEnode2 = 0
        var pricePowerSellEnode2 = 0

        var powerBuyEnode3 = 0
        var pricePowerBuyEnode3 = 0
        var powerSellEnode3 = 0
        var pricePowerSellEnode3 = 0

        var powerBuyEnode4 = 0
        var pricePowerBuyEnode4 = 0
        var powerSellEnode4 = 0
        var pricePowerSellEnode4 = 0

        if (arrowDir1.directionto == 'enode1') {
          powerBuyEnode1 = powerBuyEnode1 + arrowDir1.value
          pricePowerBuyEnode1 = pricePowerBuyEnode1 + arrowDir1.value * arrowDir1.balance
          powerSellEnode2 = powerSellEnode2 + arrowDir1.value
          pricePowerSellEnode2 = pricePowerSellEnode2 + arrowDir1.value * arrowDir1.balance
        }
        if (arrowDir6.directionto == 'enode1') {
          powerBuyEnode1 = powerBuyEnode1 + arrowDir6.value
          pricePowerBuyEnode1 = pricePowerBuyEnode1 + arrowDir6.value * arrowDir6.balance
          powerSellEnode4 = powerSellEnode4 + arrowDir6.value
          pricePowerSellEnode4 = pricePowerSellEnode4 + arrowDir6.value * arrowDir6.balance
        }
        if (arrowDir4.directionto == 'enode1') {
          powerBuyEnode1 = powerBuyEnode1 + arrowDir4.value
          pricePowerBuyEnode1 = pricePowerBuyEnode1 + arrowDir4.value * arrowDir4.balance
          powerSellEnode3 = powerSellEnode3 + arrowDir4.value
          pricePowerSellEnode3 = pricePowerSellEnode3 + arrowDir4.value * arrowDir4.balance
        }

        if (arrowDir1.directionto == 'enode2') {
          powerBuyEnode2 = powerBuyEnode2 + arrowDir1.value
          pricePowerBuyEnode2 = pricePowerBuyEnode2 + arrowDir1.value * arrowDir1.balance
          powerSellEnode1 = powerSellEnode1 + arrowDir1.value
          pricePowerSellEnode1 = pricePowerSellEnode1 + arrowDir1.value * arrowDir1.balance
        }
        if (arrowDir2.directionto == 'enode2') {
          powerBuyEnode2 = powerBuyEnode2 + arrowDir2.value
          pricePowerBuyEnode2 = pricePowerBuyEnode2 + arrowDir2.value * arrowDir2.balance
          powerSellEnode4 = powerSellEnode4 + arrowDir2.value
          pricePowerSellEnode4 = pricePowerSellEnode4 + arrowDir2.value * arrowDir2.balance
        }
        if (arrowDir5.directionto == 'enode2') {
          powerBuyEnode2 = powerBuyEnode2 + arrowDir5.value
          pricePowerBuyEnode2 = pricePowerBuyEnode2 + arrowDir5.value * arrowDir5.balance
          powerSellEnode3 = powerSellEnode3 + arrowDir5.value
          pricePowerSellEnode3 = pricePowerSellEnode3 + arrowDir5.value * arrowDir5.balance
        }

        if (arrowDir4.directionto == 'enode3') {
          powerBuyEnode3 = powerBuyEnode3 + arrowDir4.value
          pricePowerBuyEnode3 = pricePowerBuyEnode3 + arrowDir4.value * arrowDir4.balance
          powerSellEnode1 = powerSellEnode1 + arrowDir4.value
          pricePowerSellEnode1 = pricePowerSellEnode1 + arrowDir4.value * arrowDir4.balance
        }

        if (arrowDir5.directionto == 'enode3') {
          powerBuyEnode3 = powerBuyEnode3 + arrowDir5.value
          pricePowerBuyEnode3 = pricePowerBuyEnode3 + arrowDir5.value * arrowDir5.balance
          powerSellEnode2 = powerSellEnode2 + arrowDir5.value
          pricePowerSellEnode2 = pricePowerSellEnode2 + arrowDir5.value * arrowDir5.balance
        }
        if (arrowDir3.directionto == 'enode3') {
          powerBuyEnode3 = powerBuyEnode3 + arrowDir3.value
          pricePowerBuyEnode3 = pricePowerBuyEnode3 + arrowDir3.value * arrowDir3.balance
          powerSellEnode4 = powerSellEnode4 + arrowDir3.value
          pricePowerSellEnode4 = pricePowerSellEnode4 + arrowDir3.value * arrowDir3.balance
        }

        if (arrowDir2.directionto == 'enode4') {
          powerBuyEnode4 = powerBuyEnode4 + arrowDir2.value
          pricePowerBuyEnode4 = pricePowerBuyEnode4 + arrowDir2.value * arrowDir2.balance
          powerSellEnode2 = powerSellEnode2 + arrowDir2.value
          pricePowerSellEnode2 = pricePowerSellEnode2 + arrowDir2.value * arrowDir2.balance
        }
        if (arrowDir6.directionto == 'enode4') {
          powerBuyEnode4 = powerBuyEnode4 + arrowDir6.value
          pricePowerBuyEnode4 = pricePowerBuyEnode4 + arrowDir6.value * arrowDir6.balance
          powerSellEnode1 = powerSellEnode1 + arrowDir6.value
          pricePowerSellEnode1 = pricePowerSellEnode1 + arrowDir6.value * arrowDir6.balance
        }
        if (arrowDir3.directionto == 'enode4') {
          powerBuyEnode4 = powerBuyEnode4 + arrowDir3.value
          pricePowerBuyEnode4 = pricePowerBuyEnode4 + arrowDir3.value * arrowDir3.balance
          powerSellEnode3 = powerSellEnode3 + arrowDir3.value
          pricePowerSellEnode3 = pricePowerSellEnode3 + arrowDir3.value * arrowDir3.balance
        }

        plot3.time = date_hour_min
        if (arrow7.value > 0) {
          plot3.value = (arrow9.value - arrow5.value - powerBuyEnode1) * rout.balance + arrow5.value * gen1.value + pricePowerBuyEnode1 - pricePowerSellEnode1 +
            (arrow10.value - arrow6.value - powerBuyEnode2) * rout.balance + arrow6.value * gen2.value + pricePowerBuyEnode2 - pricePowerSellEnode2 +
            (arrow11.value - arrow7.value - powerBuyEnode3) * rout.balance + arrow7.value * gen3.value + pricePowerBuyEnode3 - pricePowerSellEnode3 +
            (arrow12.value - arrow8.value - powerBuyEnode4) * rout.balance + arrow8.value * gen4.value + pricePowerBuyEnode4 - pricePowerSellEnode4
        } else if (arrow7.value <= 0) {
          plot3.value = (arrow9.value - arrow5.value - powerBuyEnode1) * rout.balance + arrow5.value * gen1.value + pricePowerBuyEnode1 - pricePowerSellEnode1 +
            (arrow10.value - arrow6.value - powerBuyEnode2) * rout.balance + arrow6.value * gen2.value + pricePowerBuyEnode2 - pricePowerSellEnode2 +
            (arrow11.value - arrow7.value - powerBuyEnode3) * rout.balance + pricePowerBuyEnode3 - pricePowerSellEnode3 +
            (arrow12.value - arrow8.value - powerBuyEnode4) * rout.balance + arrow8.value * gen4.value + pricePowerBuyEnode4 - pricePowerSellEnode4
        }
        console.log("powerBuyEnode1 %o", powerBuyEnode1)
        console.log("powerBuyEnode2 %o", powerBuyEnode2)
        console.log("powerBuyEnode3 %o", powerBuyEnode3)
        console.log("powerBuyEnode4 %o", powerBuyEnode4)
        console.log("pricePowerBuyEnode1 %o", pricePowerBuyEnode1)
        console.log("pricePowerBuyEnode2 %o", pricePowerBuyEnode2)
        console.log("pricePowerBuyEnode3 %o", pricePowerBuyEnode3)
        console.log("pricePowerBuyEnode4 %o", pricePowerBuyEnode4)
        console.log("pricePowerSellEnode1 %o", pricePowerSellEnode1)
        console.log("pricePowerSellEnode2 %o", pricePowerSellEnode2)
        console.log("pricePowerSellEnode3 %o", pricePowerSellEnode3)
        console.log("pricePowerSellEnode4 %o", pricePowerSellEnode4)
        console.log("arrowDir1 %o", arrowDir1)
        console.log("arrowDir2 %o", arrowDir2)
        console.log("arrowDir3 %o", arrowDir3)
        console.log("arrowDir4 %o", arrowDir4)
        console.log("arrowDir5 %o", arrowDir5)
        console.log("arrowDir6 %o", arrowDir6)
        //const sumArrow = {"1": arrow1, "2": arrow2, "3": arrow3, "4": arrow4,"5": arrow5, "6": arrow6, "7": arrow7, "8": arrow8,"9": arrow9, "10": arrow10, "11": arrow11, "12": arrow12}
        const sumArrow = {arrow1, arrow2,  arrow3,  arrow4, arrow5,  arrow6, arrow7, arrow8,arrow9,  arrow10,  arrow11, arrow12}
        const objArrow ={data: sumCell, type:"arrows"}
        ws.send(JSON.stringify({type:'arrows', data:sumCell}));
        //ws.send(objArrow)
        //DESCRIPTION arrowDIRECTIONS
        if (json_msg.port == 'enode1' && json_msg.portX == 1 && json_msg.port3 == "power") {
          console.log("allowDir json %o", value)
          arrowDir1.value = json_msg.value;
          arrowDir1.time = json_msg.time;
          console.log("allowDir %o", arrowDir1)
        }
        if (json_msg.port == 'enode1' && json_msg.portX == 2 && json_msg.port3 == "power") {
          console.log("allowDir json %o", value)
          arrowDir6.value = json_msg.value;
          arrowDir6.time = json_msg.time;
          console.log("allowDir %o", arrowDir6)
        }
        if (json_msg.port == 'enode1' && json_msg.portX == 3 && json_msg.port3 == "power") {
          console.log("allowDir json %o", value)
          arrowDir4.value = json_msg.value;
          arrowDir4.time = json_msg.time;
          console.log("allowDir %o", arrowDir4)
        }

        if (json_msg.port == 'enode2' && json_msg.portX == 1 && json_msg.port3 == "power") {
          console.log("allowDir json %o", value)
          arrowDir1.value = json_msg.value;
          arrowDir1.time = json_msg.time;
          console.log("allowDir %o", arrowDir1)
        }
        if (json_msg.port == 'enode2' && json_msg.port2 == "port2" && json_msg.port3 == "power") {
          console.log("allowDir json %o", value)
          arrowDir5.value = json_msg.value;
          arrowDir5.time = json_msg.time;
          console.log("allowDir %o", arrowDir5)
        }
        if (json_msg.port == 'enode2' && json_msg.port2 == "port3" && json_msg.port3 == "power") {
          console.log("allowDir json %o", value)
          arrowDir2.value = json_msg.value;
          arrowDir2.time = json_msg.time;
          console.log("allowDir %o", arrowDir2)
        }


        if (json_msg.port == 'enode3' && json_msg.port2 == "port1" && json_msg.port3 == "power") {
          console.log("allowDir json %o", value)
          arrowDir4.value = json_msg.value;
          arrowDir4.time = json_msg.time;
          console.log("allowDir %o", arrowDir4)
        }
        if (json_msg.port == 'enode3' && json_msg.port2 == "port2" && json_msg.port3 == "power") {
          console.log("allowDir json %o", value)
          arrowDir5.value = json_msg.value;
          arrowDir5.time = json_msg.time;
          console.log("allowDir %o", arrowDir5)
        }
        if (json_msg.port == 'enode3' && json_msg.port2 == "port3" && json_msg.port3 == "power") {
          console.log("allowDir json %o", value)
          arrowDir3.value = json_msg.value;
          arrowDir3.time = json_msg.time;
          console.log("allowDir %o", arrowDir3)
        }



        if (json_msg.port == 'enode4' && json_msg.port2 == "port1" && json_msg.port3 == "power") {
          console.log("allowDir json %o", value)
          arrowDir3.value = json_msg.value;
          arrowDir3.time = json_msg.time;
          console.log("allowDir %o", arrowDir3)
        }
        if (json_msg.port == 'enode4' && json_msg.port2 == "port2" && json_msg.port3 == "power") {
          console.log("allowDir json %o", value)
          arrowDir6.value = json_msg.value;
          arrowDir6.time = json_msg.time;
          console.log("allowDir %o", arrowDir6)
        }
        if (json_msg.port == 'enode4' && json_msg.port2 == "port3" && json_msg.port3 == "power") {
          console.log("allowDir json %o", value)
          arrowDir2.value = json_msg.value;
          arrowDir2.time = json_msg.time;
          console.log("allowDir %o", arrowDir2)
        }
        if (json_msg.port == 'relay' && json_msg.port2 == "dc1" && json_msg.port3 == "status") {
          console.log("allowDir status json %o", value)
          arrowDir1.status = json_msg.value;
          arrowDir1.time = json_msg.time;
          console.log("allowDir %o", arrowDir1)
        }
        if (json_msg.port == 'relay' && json_msg.port2 == "dc2" && json_msg.port3 == "status") {
          console.log("allowDir status json %o", value)
          arrowDir2.status = json_msg.value;
          arrowDir2.time = json_msg.time;
          console.log("allowDir %o", arrowDir2)
        }
        if (json_msg.port == 'relay' && json_msg.port2 == "dc3" && json_msg.port3 == "status") {
          console.log("allowDir status json %o", value)
          arrowDir3.status = json_msg.value;
          arrowDir3.time = json_msg.time;
          console.log("allowDir %o", arrowDir3)
        }
        if (json_msg.port == 'relay' && json_msg.port2 == "dc4" && json_msg.port3 == "status") {
          console.log("allowDir status json %o", value)
          arrowDir4.status = json_msg.value;
          arrowDir4.time = json_msg.time;
          console.log("allowDir %o", arrowDir4)
        }
        if (json_msg.port == 'relay' && json_msg.port2 == "dc5" && json_msg.port3 == "status") {
          console.log("allowDir status json %o", value)
          arrowDir5.status = json_msg.value;
          arrowDir5.time = json_msg.time;
          console.log("allowDir %o", arrowDir5)
        }
        if (json_msg.port == 'relay' && json_msg.port2 == "dc6" && json_msg.port3 == "status") {
          console.log("allowDir status json %o", value)
          arrowDir6.status = json_msg.value;
          arrowDir6.time = json_msg.time;
          console.log("allowDir %o", arrowDir6)
        }

        if (json_msg.port == 'enode1' && json_msg.port2 == "contracts") {
          console.log("ENODE1 arrow direction json %o", value)
          if (json_msg.seller == 'Agent2' || json_msg.contragent == 'Agent2') {
            arrowDir1.directionfrom = json_msg.seller;
            arrowDir1.directionto = json_msg.contragent;
            arrowDir1.balance = json_msg.cost;
          }
          if (json_msg.seller == 'Agent4' || json_msg.contragent == 'Agent4') {
            arrowDir6.directionfrom = json_msg.seller;
            arrowDir6.directionto = json_msg.contragent;
            arrowDir6.balance = json_msg.cost;
          }
          if (json_msg.seller == 'Agent3' || json_msg.contragent == 'Agent3') {
            arrowDir4.directionfrom = json_msg.seller;
            arrowDir4.directionto = json_msg.contragent;
            arrowDir4.balance = json_msg.cost;
          }
          console.log("arrow direction %o %o %o", arrowDir1, arrowDir6, arrowDir4)
        }
        if (json_msg.port == 'enode2' && json_msg.port2 == "contracts") {
          console.log("ENODE2 arrow direction json %o", value)
          if (json_msg.seller == 'Agent1' || json_msg.contragent == 'Agent1') {
            arrowDir1.directionfrom = json_msg.seller;
            arrowDir1.directionto = json_msg.contragent;
            arrowDir1.balance = json_msg.cost;
          }
          if (json_msg.seller == 'Agent3' || json_msg.contragent == 'Agent3') {
            arrowDir5.directionfrom = json_msg.seller;
            arrowDir5.directionto = json_msg.contragent;
            arrowDir5.balance = json_msg.cost;
          }
          if (json_msg.seller == 'Agent4' || json_msg.contragent == 'Agent4') {
            arrowDir2.directionfrom = json_msg.seller;
            arrowDir2.directionto = json_msg.contragent;
            arrowDir2.balance = json_msg.cost;
          }
          console.log("arrow direction %o %o %o", arrowDir1, arrowDir5, arrowDir2)
        }
        if (json_msg.port == 'enode3' && json_msg.port2 == "contracts") {
          console.log("ENODE3 arrow direction json %o", value)
  console.log("json_msg.seller %o, json_msg.contragent %o", json_msg.seller,json_msg.contragent)
          if (json_msg.seller == 'Agent1' || json_msg.contragent == 'Agent1') {
            arrowDir4.directionfrom = json_msg.seller;
            arrowDir4.directionto = json_msg.contragent;
            arrowDir4.balance = json_msg.cost;
          }
          if (json_msg.seller == 'Agent2' || json_msg.contragent == 'Agent2') {
            arrowDir5.directionfrom = json_msg.seller;
            arrowDir5.directionto = json_msg.contragent;
            arrowDir5.balance = json_msg.cost;
          }
          if (json_msg.seller == 'Agent4' || json_msg.contragent == 'Agent4') {
  console.log("arrowDir3.directionfrom %o", arrowDir3.directionfrom)
  console.log("arrowDir3.directionfrom %o", arrowDir3.directionto)
            arrowDir3.directionfrom = json_msg.seller;
            arrowDir3.directionto = json_msg.contragent;
            arrowDir3.balance = json_msg.cost;
          }
          console.log("arrow direction %o %o %o", arrowDir4, arrowDir5, arrowDir3)
        }
        if (json_msg.port == 'enode4' && json_msg.port2 == "contracts") {
          console.log("ENODE4 arrow direction json %o", json_msg)
          if (json_msg.seller == 'Agent3' || json_msg.contragent == 'Agent3') {
            arrowDir3.directionfrom = json_msg.seller;
            arrowDir3.directionto = json_msg.contragent;
            arrowDir3.balance = json_msg.cost;
          }
          if (json_msg.seller == 'Agent1' || json_msg.contragent == 'Agent1') {
            arrowDir6.directionfrom = json_msg.seller;
            arrowDir6.directionto = json_msg.contragent;
            arrowDir6.balance = json_msg.cost;
          }
          if (json_msg.seller == 'Agent2' || json_msg.contragent == 'Agent2') {
            arrowDir2.directionfrom = json_msg.seller;
            arrowDir2.directionto = json_msg.contragent;
            arrowDir2.balance = json_msg.cost;
          }
          console.log("arrow direction %o %o %o", arrowDir3, arrowDir6, arrowDir2)
        }
        var powerBuyEnode1 = 0
        var pricePowerBuyEnode1 = 0
        var powerSellEnode1 = 0
        var pricePowerSellEnode1 = 0

        var powerBuyEnode2 = 0
        var pricePowerBuyEnode2 = 0
        var powerSellEnode2 = 0
        var pricePowerSellEnode2 = 0

        var powerBuyEnode3 = 0
        var pricePowerBuyEnode3 = 0
        var powerSellEnode3 = 0
        var pricePowerSellEnode3 = 0

        var powerBuyEnode4 = 0
        var pricePowerBuyEnode4 = 0
        var powerSellEnode4 = 0
        var pricePowerSellEnode4 = 0

        if (arrowDir1.directionto == 'Agent1') {
          powerBuyEnode1 = powerBuyEnode1 + arrowDir1.value
          pricePowerBuyEnode1 = pricePowerBuyEnode1 + arrowDir1.value * arrowDir1.balance
          powerSellEnode2 = powerSellEnode2 + arrowDir1.value
          pricePowerSellEnode2 = pricePowerSellEnode2 + arrowDir1.value * arrowDir1.balance
        }
        if (arrowDir6.directionto == 'Agent1') {
          powerBuyEnode1 = powerBuyEnode1 + arrowDir6.value
          pricePowerBuyEnode1 = pricePowerBuyEnode1 + arrowDir6.value * arrowDir6.balance
          powerSellEnode4 = powerSellEnode4 + arrowDir6.value
          pricePowerSellEnode4 = pricePowerSellEnode4 + arrowDir6.value * arrowDir6.balance
        }
        if (arrowDir4.directionto == 'Agent1') {
          powerBuyEnode1 = powerBuyEnode1 + arrowDir4.value
          pricePowerBuyEnode1 = pricePowerBuyEnode1 + arrowDir4.value * arrowDir4.balance
          powerSellEnode3 = powerSellEnode3 + arrowDir4.value
          pricePowerSellEnode3 = pricePowerSellEnode3 + arrowDir4.value * arrowDir4.balance
        }

        if (arrowDir1.directionto == 'Agent2') {
          powerBuyEnode2 = powerBuyEnode2 + arrowDir1.value
          pricePowerBuyEnode2 = pricePowerBuyEnode2 + arrowDir1.value * arrowDir1.balance
          powerSellEnode1 = powerSellEnode1 + arrowDir1.value
          pricePowerSellEnode1 = pricePowerSellEnode1 + arrowDir1.value * arrowDir1.balance
        }
        if (arrowDir2.directionto == 'Agent2') {
          powerBuyEnode2 = powerBuyEnode2 + arrowDir2.value
          pricePowerBuyEnode2 = pricePowerBuyEnode2 + arrowDir2.value * arrowDir2.balance
          powerSellEnode4 = powerSellEnode4 + arrowDir2.value
          pricePowerSellEnode4 = pricePowerSellEnode4 + arrowDir2.value * arrowDir2.balance
        }
        if (arrowDir5.directionto == 'Agent2') {
          powerBuyEnode2 = powerBuyEnode2 + arrowDir5.value
          pricePowerBuyEnode2 = pricePowerBuyEnode2 + arrowDir5.value * arrowDir5.balance
          powerSellEnode3 = powerSellEnode3 + arrowDir5.value
          pricePowerSellEnode3 = pricePowerSellEnode3 + arrowDir5.value * arrowDir5.balance
        }

        if (arrowDir4.directionto == 'Agent3') {
          powerBuyEnode3 = powerBuyEnode3 + arrowDir4.value
          pricePowerBuyEnode3 = pricePowerBuyEnode3 + arrowDir4.value * arrowDir4.balance
          powerSellEnode1 = powerSellEnode1 + arrowDir4.value
          pricePowerSellEnode1 = pricePowerSellEnode1 + arrowDir4.value * arrowDir4.balance
        }

        if (arrowDir5.directionto == 'Agent3') {
          powerBuyEnode3 = powerBuyEnode3 + arrowDir5.value
          pricePowerBuyEnode3 = pricePowerBuyEnode3 + arrowDir5.value * arrowDir5.balance
          powerSellEnode2 = powerSellEnode2 + arrowDir5.value
          pricePowerSellEnode2 = pricePowerSellEnode2 + arrowDir5.value * arrowDir5.balance
        }
        if (arrowDir3.directionto == 'Agent3') {
          powerBuyEnode3 = powerBuyEnode3 + arrowDir3.value
          pricePowerBuyEnode3 = pricePowerBuyEnode3 + arrowDir3.value * arrowDir3.balance
          powerSellEnode4 = powerSellEnode4 + arrowDir3.value
          pricePowerSellEnode4 = pricePowerSellEnode4 + arrowDir3.value * arrowDir3.balance
        }

        if (arrowDir2.directionto == 'Agent4') {
          powerBuyEnode4 = powerBuyEnode4 + arrowDir2.value
          pricePowerBuyEnode4 = pricePowerBuyEnode4 + arrowDir2.value * arrowDir2.balance
          powerSellEnode2 = powerSellEnode2 + arrowDir2.value
          pricePowerSellEnode2 = pricePowerSellEnode2 + arrowDir2.value * arrowDir2.balance
        }
        if (arrowDir6.directionto == 'Agent4') {
          powerBuyEnode4 = powerBuyEnode4 + arrowDir6.value
          pricePowerBuyEnode4 = pricePowerBuyEnode4 + arrowDir6.value * arrowDir6.balance
          powerSellEnode1 = powerSellEnode1 + arrowDir6.value
          pricePowerSellEnode1 = pricePowerSellEnode1 + arrowDir6.value * arrowDir6.balance
        }
        if (arrowDir3.directionto == 'Agent4') {
          powerBuyEnode4 = powerBuyEnode4 + arrowDir3.value
          pricePowerBuyEnode4 = pricePowerBuyEnode4 + arrowDir3.value * arrowDir3.balance
          powerSellEnode3 = powerSellEnode3 + arrowDir3.value
          pricePowerSellEnode3 = pricePowerSellEnode3 + arrowDir3.value * arrowDir3.balance
        }
        var date = new Date()
        date_hour_min = date.getHours() + ":" + date.getMinutes()
        plot3.time = date_hour_min
        if (arrow7.value > 0) {
          plot3.value = (arrow9.value - arrow5.value - powerBuyEnode1) * rout.balance + arrow5.value * gen1.value + pricePowerBuyEnode1 - pricePowerSellEnode1 +
            (arrow10.value - arrow6.value - powerBuyEnode2) * rout.balance + arrow6.value * gen2.value + pricePowerBuyEnode2 - pricePowerSellEnode2 +
            (arrow11.value - arrow7.value - powerBuyEnode3) * rout.balance + arrow7.value * gen3.value + pricePowerBuyEnode3 - pricePowerSellEnode3 +
            (arrow12.value - arrow8.value - powerBuyEnode4) * rout.balance + arrow8.value * gen4.value + pricePowerBuyEnode4 - pricePowerSellEnode4
        } else if (arrow7.value <= 0) {
          plot3.value = (arrow9.value - arrow5.value - powerBuyEnode1) * rout.balance + arrow5.value * gen1.value + pricePowerBuyEnode1 - pricePowerSellEnode1 +
            (arrow10.value - arrow6.value - powerBuyEnode2) * rout.balance + arrow6.value * gen2.value + pricePowerBuyEnode2 - pricePowerSellEnode2 +
            (arrow11.value - arrow7.value - powerBuyEnode3) * rout.balance + pricePowerBuyEnode3 - pricePowerSellEnode3 +
            (arrow12.value - arrow8.value - powerBuyEnode4) * rout.balance + arrow8.value * gen4.value + pricePowerBuyEnode4 - pricePowerSellEnode4
        }
        console.log("powerBuyEnode1 %o", powerBuyEnode1)
        console.log("powerBuyEnode2 %o", powerBuyEnode2)
        console.log("powerBuyEnode3 %o", powerBuyEnode3)
        console.log("powerBuyEnode4 %o", powerBuyEnode4)
        console.log("pricePowerBuyEnode1 %o", pricePowerBuyEnode1)
        console.log("pricePowerBuyEnode2 %o", pricePowerBuyEnode2)
        console.log("pricePowerBuyEnode3 %o", pricePowerBuyEnode3)
        console.log("pricePowerBuyEnode4 %o", pricePowerBuyEnode4)
        console.log("pricePowerSellEnode1 %o", pricePowerSellEnode1)
        console.log("pricePowerSellEnode2 %o", pricePowerSellEnode2)
        console.log("pricePowerSellEnode3 %o", pricePowerSellEnode3)
        console.log("pricePowerSellEnode4 %o", pricePowerSellEnode4)
        console.log("arrowDir1 %o", arrowDir1)
        console.log("arrowDir2 %o", arrowDir2)
        console.log("arrowDir3 %o", arrowDir3)
        console.log("arrowDir4 %o", arrowDir4)
        console.log("arrowDir5 %o", arrowDir5)
        console.log("arrowDir6 %o", arrowDir6)
        //const sumArrowDirection = {"1": arrowDir1, "2": arrowDir2, "3": arrowDir3, "4": arrowDir4,"5": arrowDir5, "6": arrowDir6}
        const sumArrowDirection = {arrowDir1, arrowDir2, arrowDir3, arrowDir4, arrowDir5, arrowDir6}
        const objArrowDirection ={data: sumCell, type:"arrowDirections"}
        ws.send(JSON.stringify({type:'arrowDirections', data:sumCell}));
        //ws.send(objArrowDirection)
        //DESCRIPTION PLOT


        if (json_msg.port == 'enode1' && json_msg.port2 == "gen") {
          console.log("gen price json %o", value)
          gen1.value = json_msg.value;
          gen1.time = json_msg.time;
          console.log("gen %o", gen1)
        }
        if (json_msg.port == 'enode2' && json_msg.port2 == "gen") {
          console.log("gen price json %o", value)
          gen2.value = json_msg.value;
          gen2.time = json_msg.time;
          console.log("gen %o", gen2)
        }
        if (json_msg.port == 'enode3' && json_msg.port2 == "gen") {
          console.log("gen price json %o", value)
          gen3.value = json_msg.value;
          gen3.time = json_msg.time;
          console.log("gen %o", gen3)
        }
        if (json_msg.port == 'enode4' && json_msg.port2 == "gen") {
          console.log("gen price json %o", value)
          gen4.value = json_msg.value;
          gen4.time = json_msg.time;
          console.log("gen %o", gen4)
        }

        if ((json_msg.port.toString().includes('enode') && json_msg.port2.toString().includes('port') && json_msg.port3 == "power") ||
          (json_msg.port.toString().includes('enode') && json_msg.port2 == "contracts") ||
          (json_msg.port == 'amigo' && json_msg.port2 == "set_price") ||
          (json_msg.port.toString().includes('enode') && json_msg.port2.toString().includes('load') && json_msg.port3 == "measure") ||
          (json_msg.port.toString().includes('enode') && json_msg.port2 == "load" && json_msg.port3.toString().includes('relay')) ||
          (json_msg.port == 'enode1' && json_msg.port2 == "ext_battery") || (json_msg.port.toString().includes('enode') && json_msg.port2 == "gen")
        ) {
          console.log("plot1 %o", plot1)
          const objPlot1 ={data: plot1, type:"plot"}
          ws.send(JSON.stringify({type:'plot', data:plot1}));
          //ws.send(objPlot1)
        }

        if ((json_msg.port.toString().includes('enode') && json_msg.port2.toString().includes('port') && json_msg.port3 == "power") ||
          (json_msg.port.toString().includes('enode') && json_msg.port2 == "contracts") ||
          (json_msg.port == 'amigo' && json_msg.port2 == "set_price") ||
          (json_msg.port.toString().includes('enode') && json_msg.port2.toString().includes('load') && json_msg.port3 == "measure") ||
          (json_msg.port.toString().includes('enode') && json_msg.port2 == "load" && json_msg.port3.toString().includes('relay')) ||
          (json_msg.port == 'enode1' && json_msg.port2 == "ext_battery") || (json_msg.port.toString().includes('enode') && json_msg.port2 == "gen")
        ) {
          console.log("plot2 %o", plot2)
          const objPlot2 ={data: plot2, type:"plot"}
          ws.send(JSON.stringify({type:'plot', data:plot2}));
          //ws.send(objPlot2)
        }

        if ((json_msg.port.toString().includes('enode') && json_msg.port2.toString().includes('port') && json_msg.port3 == "power") ||
          (json_msg.port.toString().includes('enode') && json_msg.port2 == "contracts") ||
          (json_msg.port == 'amigo' && json_msg.port2 == "set_price") ||
          (json_msg.port.toString().includes('enode') && json_msg.port2.toString().includes('load') && json_msg.port3 == "measure") ||
          (json_msg.port.toString().includes('enode') && json_msg.port2 == "load" && json_msg.port3.toString().includes('relay')) ||
          (json_msg.port == 'enode1' && json_msg.port2 == "ext_battery") || (json_msg.port.toString().includes('enode') && json_msg.port2 == "gen")
        ) {
          console.log("plot3 %o", plot3)
          const objPlot3 ={data: plot3, type:"plot"}
          ws.send(JSON.stringify({type:'plot', data:plot3}));
          //ws.send(objPlot3)
        }

        //DESCRIPTION ROUTER
        if (json_msg.port == 'amigo' && json_msg.port2 == "set_price") {
          console.log("router balance %o", value)
          rout.balance = json_msg.value;
          rout.time = json_msg.time;
          console.log("router balance %o", rout)
        }
        if (json_msg.port == 'erouter' && json_msg.port2 == "setpower_out") {
          console.log("router energy %o", value)
          rout.energy = json_msg.value;
          rout.time = json_msg.time;
          console.log("router energy %o", rout)
        }
        if ((json_msg.port == 'emeter1' || json_msg.port == 'emeter2' ||
            json_msg.port == 'emeter3' || json_msg.port == 'emeter4') && json_msg.port2 == "power") {
          console.log("router json %o", value)
          rout.power = arrow1.value + arrow2.value + arrow3.value + arrow4.value
          rout.time = json_msg.time;
          console.log("router %o", rout)
        }
        const objRouter ={data: rout, type:"router"}
        ws.send(JSON.stringify({type:'router', data:rout}));
        //ws.send(objRouter)
      }
    } catch (ex) {
      console.log(ex)
    }


    ws.on('message', function incoming(data) {
      console.log(data);
      var json_msg = data;
      try {
        json_msg = JSON.parse(data)
        //DESCRIPTION PRESET
        if(json_msg.type === 'preset') {
        mqttDATAMain.publish113(json_msg.value)
      }
        //DESCRIPTION ARROWS
        if(json_msg.type === 'arrows') {
        if (json_msg.data.id >= 1 && json_msg.data.id <= 4) {
          mqttDATAMain.publish77(json_msg.data.id, json_msg.data.status)
        }

        if (json_msg.data.id == 5) {
          mqttDATAMain.publish73(1, json_msg.data.status)
        }
        if (json_msg.data.id == 7) {
          mqttDATAMain.publish73(3, json_msg.data.status)
        }
        if (json_msg.data.id == 9) {
          mqttDATAMain.publish73(2, json_msg.data.status)
        }
        if (json_msg.data.id == 11) {
          mqttDATAMain.publish73(4, json_msg.data.status)
        }
      }
      if(json_msg.type === 'arrowdirections') {
        //DESCRIPTION arrowDIRECTIONS
        if (json_msg.data.id >= 1 && json_msg.data.id <= 6) {
          mqttDATAMain.publish67(json_msg.data.id, json_msg.data.status)
        }
      }
      } catch (ex) {
        console.log(ex);
      }

    });


    ws.on('close', function() {
      mqttDATAMain.stop();
      console.log('The connection was closed!');
    });
  }
});






function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}



app.get('/login', function(req, res) {
  res.set("Access-Control-Allow-Origin", "*")
  if (req.query.password == password_str) {
    res.send('true');
  } else {
    res.send('false');
  }
});


const int = internetDB.findAll();
const trad = traditionalDB.findAll();
const distrib = distributedDB.findAll();

// Promise
//     .all([int, trad, distrib])
//     .then(responses => {
//         console.log('**********COMPLETE RESULTS****************');
//         console.log(responses[0]); // user profile
//         console.log(responses[1]); // all reports
//         console.log(responses[2]); // report details
//
//     })
//     .catch(err => {
//         console.log('**********ERROR RESULT****************');
//         console.log(err);
//     });

app.get('/data',async function(req, res) {
  try {
    res.set("Access-Control-Allow-Origin", "*")
    try {
      const internet_old = await internetDB.findAll();
      const distributed_old = await distributedDB.findAll();
      const traditional_old = await traditionalDB.findAll();
      let internet = {};
      for (const value of internet_old) {
        Object.assign(internet, {
          [value.timestamp]: {
            value: value.value,
            time: value.time
          }
        })
      }
      let distributed = {};
      for (const value of distributed_old) {
        Object.assign(distributed, {
          [value.timestamp]: {
            value: value.value,
            time: value.time
          }
        })
      }
      let traditional = {};
      for (const value of traditional_old) {
        Object.assign(traditional, {
          [value.timestamp]: {
            value: value.value,
            time: value.time
          }
        })
      }

      return res.send({ internet, distributed, traditional });
    } catch (error) {
      return res.send(error);
    }

    // console.log("end %o",JSON.stringify(endJson))
    // res.send(JSON.parse(endJson))
  } catch(error) {
    console.log(error);
  }
 // TODO GIVE DOTS! traditional, internet, distributed (timestamp ( value ,time (hh:mm))
 //  ref.once("measure", function(snapshot) {
 //    console.log(snapshot.numChildren());
 //    res.send(snapshot.val())
 //  }, function(errorObject) {
 //    console.log("The read failed: " + errorObject.code);
 //  });
});

app.listen(process.env.PORT || config.port, function() {
  cell1.status = false;
  cell2.status = false;
  cell3.status = false;
  cell4.status = false;
  console.log("Server started on %o", process.env.PORT);
})
