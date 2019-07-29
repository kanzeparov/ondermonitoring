'use strict'

const express = require('express')
const Router = require('./router')

let router = new Router()
let app = express()
let expressWs = require('express-ws')(app)
let mqtt_cl = require('./mqtt_client')
let trunc = require('./trunc.js')
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('plot.db');
var firebase = require('firebase');
let timeDelete = 30;
//var admin = require("firebase-admin");

var firebaseConfig = {
  apiKey: "AIzaSyCalxvSjI6Op_WLR4PNOb02zVvXyCpg_wE",
  authDomain: "onder2.firebaseapp.com",
  databaseURL: "https://onder2.firebaseio.com",
  projectId: "onder2",
  storageBucket: "",
  messagingSenderId: "1017048097094",
  appId: "1:1017048097094:web:39cd1d4029ffe5f3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//  admin.initializeApp();
const database = firebase.database();
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
const functions = require('firebase-functions');

var aWss = expressWs.getWss('/');
var ref = database.ref("plot/");

const mqtt = new mqtt_cl.ClientMQTT()
mqtt.add_handler(handler)
mqtt.start()
mqtt.publish77(1, true);

var cell1 = {
  time: "0",
  value: 0,
  id: 1
}
var cell2 = {
  time: "0",
  value: 0,
  id: 2
}
var cell3 = {
  time: "0",
  value: 0,
  id: 3
}
var cell4 = {
  time: "0",
  value: 0,
  id: 4
}
///testbed/emeterX/power
///testbed/enodeX/relay/ac/status
var arrow1 = {
  time: "0",
  value: 0,
  id: 1,
  status: true
}
///testbed/emeterX/power
///testbed/enodeX/relay/ac/status
var arrow2 = {
  time: "0",
  value: 0,
  id: 2,
  status: true
}
///testbed/emeterX/power
///testbed/enodeX/relay/ac/status
var arrow3 = {
  time: "0",
  value: 0,
  id: 3,
  status: true
}
///testbed/emeterX/power
///testbed/enodeX/relay/ac/status
var arrow4 = {
  time: "0",
  value: 0,
  id: 4,
  status: true
}
///testbed/enodeX/ext_battery/power
var arrow5 = {
  time: "0",
  value: 0,
  id: 5,
  status: true
}
///testbed/enodeX/ext_battery/power
var arrow6 = {
  time: "0",
  value: 0,
  id: 6,
  status: true
}
///testbed/enodeX/ext_battery/power
var arrow7 = {
  time: "0",
  value: 0,
  id: 7,
  status: true
}

var arrow8 = {
  time: "0",
  value: 0,
  id: 8,
  status: true
}

var arrow9pre = {
  time: "0",
  value1: 0,
  value2: 0,
  value3: 0,
  id: 9,
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
  id: 11,
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
///testbed/enodeX/ext_battery/power
var arrow9 = {
  time: "0",
  value: 0,
  id: 9,
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
  id: 11,
  status: true
}
var arrow12 = {
  time: "0",
  value: 0,
  id: 12,
  status: true
}

var allowDir1 = {
  time: "0",
  value: 0,
  id: 1,
  status: true,
  directionfrom: "enode1",
  directionto: "enode2"
}
var allowDir2 = {
  time: "0",
  value: 0,
  id: 2,
  status: true,
  directionfrom: "enode2",
  directionto: "enode4"
}
var allowDir3 = {
  time: "0",
  value: 0,
  id: 3,
  status: true,
  directionfrom: "enode3",
  directionto: "enode4"
}
var allowDir4 = {
  time: "0",
  value: 0,
  id: 4,
  status: true,
  directionfrom: "enode3",
  directionto: "enode1"
}
var allowDir5 = {
  time: "0",
  value: 0,
  id: 5,
  status: true,
  directionfrom: "enode3",
  directionto: "enode2"
}
var allowDir6 = {
  time: "0",
  value: 0,
  id: 6,
  status: true,
  directionfrom: "enode1",
  directionto: "enode4"
}

var rout = {
  time: "0",
  balance: 0,
  power: 0,
  energy: 0
}

function handler(type, value) {
  //console.log("Receive new message %o", value)
  var date = new Date();
  var timestamp = date.getTime();
  let json_msg = value;
  try {
    json_msg = JSON.parse(value)
    console.log("handler %o", json_msg)

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



    if (json_msg.port == 'enode1' && json_msg.port2 == "load1" && json_msg.port3 == "value") {
      console.log("arrow912 status json %o", value)
      arrow9pre.status1 = json_msg.value;
      console.log("arrow912 %o", arrow9pre)
    }
    if (json_msg.port == 'enode1' && json_msg.port2 == "load2" && json_msg.port3 == "value") {
      console.log("arrow912 status json %o", value)
      arrow9pre.status2 = json_msg.value;
      console.log("arrow912 %o", arrow9pre)
    }
    if (json_msg.port == 'enode1' && json_msg.port2 == "load3" && json_msg.port3 == "value") {
      console.log("arrow912 status json %o", value)
      arrow9pre.status3 = json_msg.value;
      console.log("arrow912 %o", arrow9pre)
    }

    if (json_msg.port == 'enode2' && json_msg.port2 == "load1" && json_msg.port3 == "value") {
      console.log("arrow912 status json %o", value)
      arrow10pre.status1 = json_msg.value;
      console.log("arrow912 %o", arrow10pre)
    }
    if (json_msg.port == 'enode2' && json_msg.port2 == "load2" && json_msg.port3 == "value") {
      console.log("arrow912 status json %o", value)
      arrow10pre.status2 = json_msg.value;
      console.log("arrow912 %o", arrow10pre)
    }
    if (json_msg.port == 'enode2' && json_msg.port2 == "load3" && json_msg.port3 == "value") {
      console.log("arrow912 status json %o", value)
      arrow10pre.status3 = json_msg.value;
      console.log("arrow812 %o", arrow10pre)
    }




    if (json_msg.port == 'enode3' && json_msg.port2 == "load1" && json_msg.port3 == "value") {
      console.log("arrow912 status json %o", value)
      arrow11pre.status1 = json_msg.value;
      console.log("arrow912 %o", arrow11pre)
    }
    if (json_msg.port == 'enode3' && json_msg.port2 == "load2" && json_msg.port3 == "value") {
      console.log("arrow912 status json %o", value)
      arrow11pre.status2 = json_msg.value;
      console.log("arrow912 %o", arrow11pre)
    }
    if (json_msg.port == 'enode3' && json_msg.port2 == "load3" && json_msg.port3 == "value") {
      console.log("arrow912 status json %o", value)
      arrow11pre.status3 = json_msg.value;
      console.log("arrow812 %o", arrow11pre)
    }



    if (json_msg.port == 'enode4' && json_msg.port2 == "load1" && json_msg.port3 == "value") {
      console.log("arrow912 status json %o", value)
      arrow12pre.status1 = json_msg.value;
      console.log("arrow912 %o", arrow12pre)
    }
    if (json_msg.port == 'enode4' && json_msg.port2 == "load2" && json_msg.port3 == "value") {
      console.log("arrow912 status json %o", value)
      arrow12pre.status2 = json_msg.value;
      console.log("arrow912 %o", arrow12pre)
    }
    if (json_msg.port == 'enode4' && json_msg.port2 == "load3" && json_msg.port3 == "value") {
      console.log("arrow912 status json %o", value)
      arrow12pre.status3 = json_msg.value;
      console.log("arrow912 %o", arrow12pre)
    }


    if (json_msg.port == 'enode1' && json_msg.port2 == "load" && json_msg.port3 == "relay1") {
      console.log("arrow912 json %o", value)
      arrow9pre.value1 = json_msg.value;
      arrow9pre.time = json_msg.time;
      console.log("arrow912 %o", arrow9pre)
    }
    if (json_msg.port == 'enode1' && json_msg.port2 == "load" && json_msg.port3 == "relay2") {
      console.log("arrow912 json %o", value)
      arrow9pre.value2 = json_msg.value;
      arrow9pre.time = json_msg.time;
      console.log("arrow912 %o", arrow9pre)
    }
    if (json_msg.port == 'enode1' && json_msg.port2 == "load" && json_msg.port3 == "relay3") {
      console.log("arrow912 json %o", value)
      arrow9pre.value3 = json_msg.value;
      arrow9pre.time = json_msg.time;
      console.log("arrow912 %o", arrow9pre)
    }

    if (json_msg.port == 'enode2' && json_msg.port2 == "load" && json_msg.port3 == "relay1") {
      console.log("arrow912 json %o", value)
      arrow10pre.value1 = json_msg.value;
      arrow10pre.time = json_msg.time;
      console.log("arrow912 %o", arrow10pre)
    }
    if (json_msg.port == 'enode2' && json_msg.port2 == "load" && json_msg.port3 == "relay2") {
      console.log("arrow912 json %o", value)
      arrow10pre.value2 = json_msg.value;
      arrow10pre.time = json_msg.time;
      console.log("arrow912 %o", arrow10pre)
    }
    if (json_msg.port == 'enode2' && json_msg.port2 == "load" && json_msg.port3 == "relay3") {
      console.log("arrow912 json %o", value)
      arrow10pre.value3 = json_msg.value;
      arrow10pre.time = json_msg.time;
      console.log("arrow812 %o", arrow10pre)
    }




    if (json_msg.port == 'enode3' && json_msg.port2 == "load" && json_msg.port3 == "relay1") {
      console.log("arrow912 json %o", value)
      arrow11pre.value1 = json_msg.value;
      arrow11pre.time = json_msg.time;
      console.log("arrow912 %o", arrow11pre)
    }
    if (json_msg.port == 'enode3' && json_msg.port2 == "load" && json_msg.port3 == "relay2") {
      console.log("arrow912 json %o", value)
      arrow11pre.value2 = json_msg.value;
      arrow11pre.time = json_msg.time;
      console.log("arrow912 %o", arrow11pre)
    }
    if (json_msg.port == 'enode3' && json_msg.port2 == "load" && json_msg.port3 == "relay3") {
      console.log("arrow912 json %o", value)
      arrow11pre.value3 = json_msg.value;
      arrow11pre.time = json_msg.time;
      console.log("arrow812 %o", arrow11pre)
    }



    if (json_msg.port == 'enode4' && json_msg.port2 == "load" && json_msg.port3 == "relay1") {
      console.log("arrow912 json %o", value)
      arrow12pre.value1 = json_msg.value;
      arrow12pre.time = json_msg.time;
      console.log("arrow912 %o", arrow12pre)
    }
    if (json_msg.port == 'enode4' && json_msg.port2 == "load" && json_msg.port3 == "relay2") {
      console.log("arrow912 json %o", value)
      arrow12pre.value2 = json_msg.value;
      arrow12pre.time = json_msg.time;
      console.log("arrow912 %o", arrow12pre)
    }
    if (json_msg.port == 'enode4' && json_msg.port2 == "load" && json_msg.port3 == "relay3") {
      console.log("arrow912 json %o", value)
      arrow12pre.value3 = json_msg.value;
      arrow12pre.time = json_msg.time;
      console.log("arrow912 %o", arrow12pre)
    }
    //  /testbed/enodeX/portX/power
    if (json_msg.port == 'enode1' && json_msg.port2 == "port1" && json_msg.port3 == "power") {
      console.log("allowDir json %o", value)
      allowDir1.value = json_msg.value;
      allowDir1.time = json_msg.time;
      console.log("allowDir %o", allowDir1)
    }
    if (json_msg.port == 'enode1' && json_msg.port2 == "port2" && json_msg.port3 == "power") {
      console.log("allowDir json %o", value)
      allowDir6.value = json_msg.value;
      allowDir6.time = json_msg.time;
      console.log("allowDir %o", allowDir6)
    }
    if (json_msg.port == 'enode1' && json_msg.port2 == "port3" && json_msg.port3 == "power") {
      console.log("allowDir json %o", value)
      allowDir4.value = json_msg.value;
      allowDir4.time = json_msg.time;
      console.log("allowDir %o", allowDir4)
    }

    if (json_msg.port == 'enode2' && json_msg.port2 == "port1" && json_msg.port3 == "power") {
      console.log("allowDir json %o", value)
      allowDir1.value = json_msg.value;
      allowDir1.time = json_msg.time;
      console.log("allowDir %o", allowDir1)
    }
    if (json_msg.port == 'enode2' && json_msg.port2 == "port2" && json_msg.port3 == "power") {
      console.log("allowDir json %o", value)
      allowDir5.value = json_msg.value;
      allowDir5.time = json_msg.time;
      console.log("allowDir %o", allowDir5)
    }
    if (json_msg.port == 'enode2' && json_msg.port2 == "port3" && json_msg.port3 == "power") {
      console.log("allowDir json %o", value)
      allowDir2.value = json_msg.value;
      allowDir2.time = json_msg.time;
      console.log("allowDir %o", allowDir2)
    }


    if (json_msg.port == 'enode3' && json_msg.port2 == "port1" && json_msg.port3 == "power") {
      console.log("allowDir json %o", value)
      allowDir4.value = json_msg.value;
      allowDir4.time = json_msg.time;
      console.log("allowDir %o", allowDir4)
    }
    if (json_msg.port == 'enode3' && json_msg.port2 == "port2" && json_msg.port3 == "power") {
      console.log("allowDir json %o", value)
      allowDir5.value = json_msg.value;
      allowDir5.time = json_msg.time;
      console.log("allowDir %o", allowDir5)
    }
    if (json_msg.port == 'enode3' && json_msg.port2 == "port3" && json_msg.port3 == "power") {
      console.log("allowDir json %o", value)
      allowDir3.value = json_msg.value;
      allowDir3.time = json_msg.time;
      console.log("allowDir %o", allowDir3)
    }



    if (json_msg.port == 'enode4' && json_msg.port2 == "port1" && json_msg.port3 == "power") {
      console.log("allowDir json %o", value)
      allowDir3.value = json_msg.value;
      allowDir3.time = json_msg.time;
      console.log("allowDir %o", allowDir3)
    }
    if (json_msg.port == 'enode4' && json_msg.port2 == "port2" && json_msg.port3 == "power") {
      console.log("allowDir json %o", value)
      allowDir6.value = json_msg.value;
      allowDir6.time = json_msg.time;
      console.log("allowDir %o", allowDir6)
    }
    if (json_msg.port == 'enode4' && json_msg.port2 == "port3" && json_msg.port3 == "power") {
      console.log("allowDir json %o", value)
      allowDir2.value = json_msg.value;
      allowDir2.time = json_msg.time;
      console.log("allowDir %o", allowDir2)
    }

    if (json_msg.port == 'relay' && json_msg.port2 == "dc1" && json_msg.port3 == "status") {
      console.log("allowDir status json %o", value)
      allowDir1.status = json_msg.value;
      allowDir1.time = json_msg.time;
      console.log("allowDir %o", allowDir1)
    }
    if (json_msg.port == 'relay' && json_msg.port2 == "dc2" && json_msg.port3 == "status") {
      console.log("allowDir status json %o", value)
      allowDir2.status = json_msg.value;
      allowDir2.time = json_msg.time;
      console.log("allowDir %o", allowDir2)
    }
    if (json_msg.port == 'relay' && json_msg.port2 == "dc3" && json_msg.port3 == "status") {
      console.log("allowDir status json %o", value)
      allowDir3.status = json_msg.value;
      allowDir3.time = json_msg.time;
      console.log("allowDir %o", allowDir3)
    }
    if (json_msg.port == 'relay' && json_msg.port2 == "dc4" && json_msg.port3 == "status") {
      console.log("allowDir status json %o", value)
      allowDir4.status = json_msg.value;
      allowDir4.time = json_msg.time;
      console.log("allowDir %o", allowDir4)
    }
    if (json_msg.port == 'relay' && json_msg.port2 == "dc5" && json_msg.port3 == "status") {
      console.log("allowDir status json %o", value)
      allowDir5.status = json_msg.value;
      allowDir5.time = json_msg.time;
      console.log("allowDir %o", allowDir5)
    }
    if (json_msg.port == 'relay' && json_msg.port2 == "dc6" && json_msg.port3 == "status") {
      console.log("allowDir status json %o", value)
      allowDir6.status = json_msg.value;
      allowDir6.time = json_msg.time;
      console.log("allowDir %o", allowDir6)
    }

    if (json_msg.port == 'enode1' && json_msg.port2 == "contracts") {
      console.log("arrow direction json %o", value)
      if (json_msg.portX == 1) {
        allowDir1.directionfrom = json_msg.seller;
        allowDir1.directionto = json_msg.contragent;
      }
      if (json_msg.portX == 2) {
        allowDir6.directionfrom = json_msg.seller;
        allowDir6.directionto = json_msg.contragent;
      }
      if (json_msg.portX == 3) {
        allowDir4.directionfrom = json_msg.seller;
        allowDir4.directionto = json_msg.contragent;
      }
      console.log("arrow direction %o %o %o", allowDir1, allowDir6, allowDir4)
    }
    if (json_msg.port == 'enode2' && json_msg.port2 == "contracts") {
      console.log("arrow direction json %o", value)
      if (json_msg.portX == 1) {
        allowDir1.directionfrom = json_msg.seller;
        allowDir1.directionto = json_msg.contragent;
      }
      if (json_msg.portX == 2) {
        allowDir5.directionfrom = json_msg.seller;
        allowDir5.directionto = json_msg.contragent;
      }
      if (json_msg.portX == 3) {
        allowDir2.directionfrom = json_msg.seller;
        allowDir2.directionto = json_msg.contragent;
      }
      console.log("arrow direction %o %o %o", allowDir1, allowDir5, allowDir2)
    }
    if (json_msg.port == 'enode3' && json_msg.port2 == "contracts") {
      console.log("arrow direction json %o", value)
      if (json_msg.portX == 1) {
        allowDir4.directionfrom = json_msg.seller;
        allowDir4.directionto = json_msg.contragent;
      }
      if (json_msg.portX == 2) {
        allowDir5.directionfrom = json_msg.seller;
        allowDir5.directionto = json_msg.contragent;
      }
      if (json_msg.portX == 3) {
        allowDir3.directionfrom = json_msg.seller;
        allowDir3.directionto = json_msg.contragent;
      }
      console.log("arrow direction %o %o %o", allowDir4, allowDir5, allowDir3)
    }
    if (json_msg.port == 'enode4' && json_msg.port2 == "contracts") {
      console.log("arrow direction json %o", value)
      if (json_msg.portX == 1) {
        allowDir3.directionfrom = json_msg.seller;
        allowDir3.directionto = json_msg.contragent;
      }
      if (json_msg.portX == 2) {
        allowDir6.directionfrom = json_msg.seller;
        allowDir6.directionto = json_msg.contragent;
      }
      if (json_msg.portX == 3) {
        allowDir2.directionfrom = json_msg.seller;
        allowDir2.directionto = json_msg.contragent;
      }
      console.log("arrow direction %o %o %o", allowDir3, allowDir6, allowDir2)
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
    //TOPICS WHICH CONNECT WITH GRAPH
    if (true) {
      let date_hour_min = date.getHours() + ":" + date.getMinutes()

      database.ref('plot/' + timestamp).set({
        id: 1,
        time: date_hour_min,
        value: json_msg.value
      });

      ref.once("value", function(snapshot) {
          //console.log(snapshot.numChildren());
          snapshot.forEach((child) => {
            var date = new Date();
            var timestamp = date.getTime();
            // console.log(child.key);
            if (timestamp - child.key > timeDelete * 1000 * 60) {
              // console.log("delete " + "");
              let userRef = database.ref('plot/' + child.key);
              userRef.remove()
            }
          });
        },
        function(errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
    }
  } catch (ex) {
    console.log(ex.toString())
  }
}


app.ws('/cells', function(ws, req) {
  const mqttDATACells = new mqtt_cl.ClientMQTT()
  mqttDATACells.add_handler(handlerDATACells)
  mqttDATACells.start()
  ws.send(JSON.stringify(cell1))
  ws.send(JSON.stringify(cell2))
  ws.send(JSON.stringify(cell3))
  ws.send(JSON.stringify(cell4))

  function handlerDATACells(type, value) {
    console.log(" cells Receive new message %o", value)
    var json_msg = value;
    try {
      json_msg = JSON.parse(value)
      if (json_msg.port == 'enode1') {
        console.log(" handlerDATACells cell json %o", value)
        cell1.value = json_msg.value;
        cell1.time = json_msg.time;
        console.log(" handlerDATACells cell %o", cell1)
      }
      if (json_msg.port == 'enode2') {
        console.log(" handlerDATACells cell json %o", json_msg.value)
        cell2.value = json_msg.value;
        cell2.time = json_msg.time;
        console.log(" handlerDATACells cell %o", cell2)
      }
      if (json_msg.port == 'enode3') {
        console.log(" handlerDATACells cell json %o", value)
        cell3.value = json_msg.value;
        cell3.time = json_msg.time;
        console.log(" handlerDATACells cell %o", cell3)
      }
      if (json_msg.port == 'enode4') {
        console.log(" handlerDATACells cell json %o", value)
        cell4.value = json_msg.value;
        cell4.time = json_msg.time;
        console.log(" handlerDATACells cell %o", cell4)
      }
      ws.send(JSON.stringify(cell1))
      ws.send(JSON.stringify(cell2))
      ws.send(JSON.stringify(cell3))
      ws.send(JSON.stringify(cell4))
    } catch (ex) {
      console.log(ex)
    }
  }



  ws.on('close', function() {
    mqttDATACells.stop();
    console.log('The connection was closed!');
  });
});

app.ws('/preset', function(ws, req) {

  const mqttDATA = new mqtt_cl.ClientMQTT()
  mqttDATA.add_handler(handlerDATA)
  mqttDATA.start()

  function handlerDATA(type, value) {
    console.log("Receive new message %o", value)
    ws.send(JSON.stringify(value))
  }

  ws.on('message', function incoming(data) {
  console.log(data);
});

  ws.on('close', function() {
    mqttDATA.stop();
    console.log('The connection was closed!');
  });
});

app.ws('/arrows', function(ws, req) {

  const mqttDATA = new mqtt_cl.ClientMQTT()
  mqttDATA.add_handler(handlerDATA)
  mqttDATA.start()
  arrow9.value = arrow9pre.value1 * arrow9pre.status1 + arrow9pre.value2 * arrow9pre.status2 + arrow9pre.value3 * arrow9pre.status3
  arrow10.value = arrow10pre.value1 * arrow10pre.status1 + arrow10pre.value2 * arrow10pre.status2 + arrow10pre.value3 * arrow10pre.status3
  arrow11.value = arrow11pre.value1 * arrow11pre.status1 + arrow11pre.value2 * arrow11pre.status2 + arrow11pre.value3 * arrow11pre.status3
  arrow12.value = arrow12pre.value1 * arrow12pre.status1 + arrow12pre.value2 * arrow12pre.status2 + arrow12pre.value3 * arrow12pre.status3
  arrow9.status = arrow9pre.status1 || arrow9pre.status2 || arrow9pre.status3
  arrow10.status = arrow10pre.status1 || arrow10pre.status2 || arrow10pre.status3
  arrow11.status = arrow11pre.status1 || arrow11pre.status2 || arrow11pre.status3
  arrow12.status = arrow12pre.status1 || arrow12pre.status2 || arrow12pre.status3
  ws.send(JSON.stringify(arrow1))
  ws.send(JSON.stringify(arrow2))
  ws.send(JSON.stringify(arrow3))
  ws.send(JSON.stringify(arrow4))
  ws.send(JSON.stringify(arrow5))
  ws.send(JSON.stringify(arrow6))
  ws.send(JSON.stringify(arrow7))
  ws.send(JSON.stringify(arrow8))
  ws.send(JSON.stringify(arrow9))
  ws.send(JSON.stringify(arrow10))
  ws.send(JSON.stringify(arrow11))
  ws.send(JSON.stringify(arrow12))

  function handlerDATA(type, value) {
    console.log(" arrows Receive new message %o", value)
    var json_msg = value;
    try {
      json_msg = JSON.parse(value)
      if (json_msg.port == 'emeter1') {
        console.log("arrow json %o", value)
        arrow1.value = json_msg.value;
        arrow1.time = json_msg.time;
        console.log("arrow %o", arrow1)
      }
      if (json_msg.port == 'emeter2') {
        console.log("arrow json %o", value)
        arrow2.value = json_msg.value;
        arrow2.time = json_msg.time;
        console.log("arrow %o", arrow2)
      }
      if (json_msg.port == 'emeter3') {
        console.log("arrow json %o", value)
        arrow3.value = json_msg.value;
        arrow3.time = json_msg.time;
        console.log("arrow %o", arrow3)
      }
      if (json_msg.port == 'emeter4') {
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
      if (json_msg.port == 'enode1' && json_msg.port2 == "load" && json_msg.port3 == "relay1") {
        console.log("arrow912 json %o", value)
        arrow9pre.value1 = json_msg.value;
        arrow9pre.time = json_msg.time;
        console.log("arrow912 %o", arrow9pre)
      }
      if (json_msg.port == 'enode1' && json_msg.port2 == "load" && json_msg.port3 == "relay2") {
        console.log("arrow912 json %o", value)
        arrow9pre.value2 = json_msg.value;
        arrow9pre.time = json_msg.time;
        console.log("arrow912 %o", arrow9pre)
      }
      if (json_msg.port == 'enode1' && json_msg.port2 == "load" && json_msg.port3 == "relay3") {
        console.log("arrow912 json %o", value)
        arrow9pre.value3 = json_msg.value;
        arrow9pre.time = json_msg.time;
        console.log("arrow912 %o", arrow9pre)
      }

      if (json_msg.port == 'enode2' && json_msg.port2 == "load" && json_msg.port3 == "relay1") {
        console.log("arrow912 json %o", value)
        arrow10pre.value1 = json_msg.value;
        arrow10pre.time = json_msg.time;
        console.log("arrow912 %o", arrow10pre)
      }
      if (json_msg.port == 'enode2' && json_msg.port2 == "load" && json_msg.port3 == "relay2") {
        console.log("arrow912 json %o", value)
        arrow10pre.value2 = json_msg.value;
        arrow10pre.time = json_msg.time;
        console.log("arrow912 %o", arrow10pre)
      }
      if (json_msg.port == 'enode2' && json_msg.port2 == "load" && json_msg.port3 == "relay3") {
        console.log("arrow912 json %o", value)
        arrow10pre.value3 = json_msg.value;
        arrow10pre.time = json_msg.time;
        console.log("arrow812 %o", arrow10pre)
      }




      if (json_msg.port == 'enode3' && json_msg.port2 == "load" && json_msg.port3 == "relay1") {
        console.log("arrow912 json %o", value)
        arrow11pre.value1 = json_msg.value;
        arrow11pre.time = json_msg.time;
        console.log("arrow912 %o", arrow11pre)
      }
      if (json_msg.port == 'enode3' && json_msg.port2 == "load" && json_msg.port3 == "relay2") {
        console.log("arrow912 json %o", value)
        arrow11pre.value2 = json_msg.value;
        arrow11pre.time = json_msg.time;
        console.log("arrow912 %o", arrow11pre)
      }
      if (json_msg.port == 'enode3' && json_msg.port2 == "load" && json_msg.port3 == "relay3") {
        console.log("arrow912 json %o", value)
        arrow11pre.value3 = json_msg.value;
        arrow11pre.time = json_msg.time;
        console.log("arrow812 %o", arrow11pre)
      }



      if (json_msg.port == 'enode4' && json_msg.port2 == "load" && json_msg.port3 == "relay1") {
        console.log("arrow912 json %o", value)
        arrow12pre.value1 = json_msg.value;
        arrow12pre.time = json_msg.time;
        console.log("arrow912 %o", arrow12pre)
      }
      if (json_msg.port == 'enode4' && json_msg.port2 == "load" && json_msg.port3 == "relay2") {
        console.log("arrow912 json %o", value)
        arrow12pre.value2 = json_msg.value;
        arrow12pre.time = json_msg.time;
        console.log("arrow912 %o", arrow12pre)
      }
      if (json_msg.port == 'enode4' && json_msg.port2 == "load" && json_msg.port3 == "relay3") {
        console.log("arrow912 json %o", value)
        arrow12pre.value3 = json_msg.value;
        arrow12pre.time = json_msg.time;
        console.log("arrow912 %o", arrow12pre)
      }

      if (json_msg.port == 'enode1' && json_msg.port2 == "load1" && json_msg.port3 == "value") {
        console.log("arrow912 status json %o", value)
        arrow9pre.status1 = json_msg.value;
        console.log("arrow912 %o", arrow9pre)
      }
      if (json_msg.port == 'enode1' && json_msg.port2 == "load2" && json_msg.port3 == "value") {
        console.log("arrow912 status json %o", value)
        arrow9pre.status2 = json_msg.value;
        console.log("arrow912 %o", arrow9pre)
      }
      if (json_msg.port == 'enode1' && json_msg.port2 == "load3" && json_msg.port3 == "value") {
        console.log("arrow912 status json %o", value)
        arrow9pre.status3 = json_msg.value;
        console.log("arrow912 %o", arrow9pre)
      }

      if (json_msg.port == 'enode2' && json_msg.port2 == "load1" && json_msg.port3 == "value") {
        console.log("arrow912 status json %o", value)
        arrow10pre.status1 = json_msg.value;
        console.log("arrow912 %o", arrow10pre)
      }
      if (json_msg.port == 'enode2' && json_msg.port2 == "load2" && json_msg.port3 == "value") {
        console.log("arrow912 status json %o", value)
        arrow10pre.status2 = json_msg.value;
        console.log("arrow912 %o", arrow10pre)
      }
      if (json_msg.port == 'enode2' && json_msg.port2 == "load3" && json_msg.port3 == "value") {
        console.log("arrow912 status json %o", value)
        arrow10pre.status3 = json_msg.value;
        console.log("arrow812 %o", arrow10pre)
      }




      if (json_msg.port == 'enode3' && json_msg.port2 == "load1" && json_msg.port3 == "value") {
        console.log("arrow912 status json %o", value)
        arrow11pre.status1 = json_msg.value;
        console.log("arrow912 %o", arrow11pre)
      }
      if (json_msg.port == 'enode3' && json_msg.port2 == "load2" && json_msg.port3 == "value") {
        console.log("arrow912 status json %o", value)
        arrow11pre.status2 = json_msg.value;
        console.log("arrow912 %o", arrow11pre)
      }
      if (json_msg.port == 'enode3' && json_msg.port2 == "load3" && json_msg.port3 == "value") {
        console.log("arrow912 status json %o", value)
        arrow11pre.status3 = json_msg.value;
        console.log("arrow812 %o", arrow11pre)
      }



      if (json_msg.port == 'enode4' && json_msg.port2 == "load1" && json_msg.port3 == "value") {
        console.log("arrow912 status json %o", value)
        arrow12pre.status1 = json_msg.value;
        console.log("arrow912 %o", arrow12pre)
      }
      if (json_msg.port == 'enode4' && json_msg.port2 == "load2" && json_msg.port3 == "value") {
        console.log("arrow912 status json %o", value)
        arrow12pre.status2 = json_msg.value;
        console.log("arrow912 %o", arrow12pre)
      }
      if (json_msg.port == 'enode4' && json_msg.port2 == "load3" && json_msg.port3 == "value") {
        console.log("arrow912 status json %o", value)
        arrow12pre.status3 = json_msg.value;
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
      ws.send(JSON.stringify(arrow1))
      ws.send(JSON.stringify(arrow2))
      ws.send(JSON.stringify(arrow3))
      ws.send(JSON.stringify(arrow4))
      ws.send(JSON.stringify(arrow5))
      ws.send(JSON.stringify(arrow6))
      ws.send(JSON.stringify(arrow7))
      ws.send(JSON.stringify(arrow8))
      ws.send(JSON.stringify(arrow9))
      ws.send(JSON.stringify(arrow10))
      ws.send(JSON.stringify(arrow11))
      ws.send(JSON.stringify(arrow12))
    } catch (ex) {
      console.log(ex)
    }
  }
  ws.on('message', function incoming(data) {
  console.log(data);
});
  ws.on('close', function() {
    mqttDATA.stop();
    console.log('The connection was closed!');
  });
});

app.ws('/arrowdirections', function(ws, req) {


  const mqttDATA = new mqtt_cl.ClientMQTT()
  mqttDATA.add_handler(handlerDATA)
  mqttDATA.start()
  ws.send(JSON.stringify(arrowDir1))
  ws.send(JSON.stringify(arrowDir2))
  ws.send(JSON.stringify(arrowDir3))
  ws.send(JSON.stringify(arrowDir4))
  ws.send(JSON.stringify(arrowDir5))
  ws.send(JSON.stringify(arrowDir6))

  function handlerDATA(type, value) {
    console.log(" arrows Receive new message %o", value)
    var json_msg = value;
    try {
      json_msg = JSON.parse(value)
      if (json_msg.port == 'enode1' && json_msg.port2 == "port1" && json_msg.port3 == "power") {
        console.log("allowDir json %o", value)
        allowDir1.value = json_msg.value;
        allowDir1.time = json_msg.time;
        console.log("allowDir %o", allowDir1)
      }
      if (json_msg.port == 'enode1' && json_msg.port2 == "port2" && json_msg.port3 == "power") {
        console.log("allowDir json %o", value)
        allowDir6.value = json_msg.value;
        allowDir6.time = json_msg.time;
        console.log("allowDir %o", allowDir6)
      }
      if (json_msg.port == 'enode1' && json_msg.port2 == "port3" && json_msg.port3 == "power") {
        console.log("allowDir json %o", value)
        allowDir4.value = json_msg.value;
        allowDir4.time = json_msg.time;
        console.log("allowDir %o", allowDir4)
      }

      if (json_msg.port == 'enode2' && json_msg.port2 == "port1" && json_msg.port3 == "power") {
        console.log("allowDir json %o", value)
        allowDir1.value = json_msg.value;
        allowDir1.time = json_msg.time;
        console.log("allowDir %o", allowDir1)
      }
      if (json_msg.port == 'enode2' && json_msg.port2 == "port2" && json_msg.port3 == "power") {
        console.log("allowDir json %o", value)
        allowDir5.value = json_msg.value;
        allowDir5.time = json_msg.time;
        console.log("allowDir %o", allowDir5)
      }
      if (json_msg.port == 'enode2' && json_msg.port2 == "port3" && json_msg.port3 == "power") {
        console.log("allowDir json %o", value)
        allowDir2.value = json_msg.value;
        allowDir2.time = json_msg.time;
        console.log("allowDir %o", allowDir2)
      }


      if (json_msg.port == 'enode3' && json_msg.port2 == "port1" && json_msg.port3 == "power") {
        console.log("allowDir json %o", value)
        allowDir4.value = json_msg.value;
        allowDir4.time = json_msg.time;
        console.log("allowDir %o", allowDir4)
      }
      if (json_msg.port == 'enode3' && json_msg.port2 == "port2" && json_msg.port3 == "power") {
        console.log("allowDir json %o", value)
        allowDir5.value = json_msg.value;
        allowDir5.time = json_msg.time;
        console.log("allowDir %o", allowDir5)
      }
      if (json_msg.port == 'enode3' && json_msg.port2 == "port3" && json_msg.port3 == "power") {
        console.log("allowDir json %o", value)
        allowDir3.value = json_msg.value;
        allowDir3.time = json_msg.time;
        console.log("allowDir %o", allowDir3)
      }



      if (json_msg.port == 'enode4' && json_msg.port2 == "port1" && json_msg.port3 == "power") {
        console.log("allowDir json %o", value)
        allowDir3.value = json_msg.value;
        allowDir3.time = json_msg.time;
        console.log("allowDir %o", allowDir3)
      }
      if (json_msg.port == 'enode4' && json_msg.port2 == "port2" && json_msg.port3 == "power") {
        console.log("allowDir json %o", value)
        allowDir6.value = json_msg.value;
        allowDir6.time = json_msg.time;
        console.log("allowDir %o", allowDir6)
      }
      if (json_msg.port == 'enode4' && json_msg.port2 == "port3" && json_msg.port3 == "power") {
        console.log("allowDir json %o", value)
        allowDir2.value = json_msg.value;
        allowDir2.time = json_msg.time;
        console.log("allowDir %o", allowDir2)
      }
      if (json_msg.port == 'relay' && json_msg.port2 == "dc1" && json_msg.port3 == "status") {
        console.log("allowDir status json %o", value)
        allowDir1.status = json_msg.value;
        allowDir1.time = json_msg.time;
        console.log("allowDir %o", allowDir1)
      }
      if (json_msg.port == 'relay' && json_msg.port2 == "dc2" && json_msg.port3 == "status") {
        console.log("allowDir status json %o", value)
        allowDir2.status = json_msg.value;
        allowDir2.time = json_msg.time;
        console.log("allowDir %o", allowDir2)
      }
      if (json_msg.port == 'relay' && json_msg.port2 == "dc3" && json_msg.port3 == "status") {
        console.log("allowDir status json %o", value)
        allowDir3.status = json_msg.value;
        allowDir3.time = json_msg.time;
        console.log("allowDir %o", allowDir3)
      }
      if (json_msg.port == 'relay' && json_msg.port2 == "dc4" && json_msg.port3 == "status") {
        console.log("allowDir status json %o", value)
        allowDir4.status = json_msg.value;
        allowDir4.time = json_msg.time;
        console.log("allowDir %o", allowDir4)
      }
      if (json_msg.port == 'relay' && json_msg.port2 == "dc5" && json_msg.port3 == "status") {
        console.log("allowDir status json %o", value)
        allowDir5.status = json_msg.value;
        allowDir5.time = json_msg.time;
        console.log("allowDir %o", allowDir5)
      }
      if (json_msg.port == 'relay' && json_msg.port2 == "dc6" && json_msg.port3 == "status") {
        console.log("allowDir status json %o", value)
        allowDir6.status = json_msg.value;
        allowDir6.time = json_msg.time;
        console.log("allowDir %o", allowDir6)
      }
      if (json_msg.port == 'enode1' && json_msg.port2 == "contracts") {
        console.log("arrow direction json %o", value)
        if (json_msg.portX == 1) {
          allowDir1.directionfrom = json_msg.seller;
          allowDir1.directionto = json_msg.contragent;
        }
        if (json_msg.portX == 2) {
          allowDir6.directionfrom = json_msg.seller;
          allowDir6.directionto = json_msg.contragent;
        }
        if (json_msg.portX == 3) {
          allowDir4.directionfrom = json_msg.seller;
          allowDir4.directionto = json_msg.contragent;
        }
        console.log("arrow direction %o %o %o", allowDir1, allowDir6, allowDir4)
      }
      if (json_msg.port == 'enode2' && json_msg.port2 == "contracts") {
        console.log("arrow direction json %o", value)
        if (json_msg.portX == 1) {
          allowDir1.directionfrom = json_msg.seller;
          allowDir1.directionto = json_msg.contragent;
        }
        if (json_msg.portX == 2) {
          allowDir5.directionfrom = json_msg.seller;
          allowDir5.directionto = json_msg.contragent;
        }
        if (json_msg.portX == 3) {
          allowDir2.directionfrom = json_msg.seller;
          allowDir2.directionto = json_msg.contragent;
        }
        console.log("arrow direction %o %o %o", allowDir1, allowDir5, allowDir2)
      }
      if (json_msg.port == 'enode3' && json_msg.port2 == "contracts") {
        console.log("arrow direction json %o", value)
        if (json_msg.portX == 1) {
          allowDir4.directionfrom = json_msg.seller;
          allowDir4.directionto = json_msg.contragent;
        }
        if (json_msg.portX == 2) {
          allowDir5.directionfrom = json_msg.seller;
          allowDir5.directionto = json_msg.contragent;
        }
        if (json_msg.portX == 3) {
          allowDir3.directionfrom = json_msg.seller;
          allowDir3.directionto = json_msg.contragent;
        }
        console.log("arrow direction %o %o %o", allowDir4, allowDir5, allowDir3)
      }
      if (json_msg.port == 'enode4' && json_msg.port2 == "contracts") {
        console.log("arrow direction json %o", value)
        if (json_msg.portX == 1) {
          allowDir3.directionfrom = json_msg.seller;
          allowDir3.directionto = json_msg.contragent;
        }
        if (json_msg.portX == 2) {
          allowDir6.directionfrom = json_msg.seller;
          allowDir6.directionto = json_msg.contragent;
        }
        if (json_msg.portX == 3) {
          allowDir2.directionfrom = json_msg.seller;
          allowDir2.directionto = json_msg.contragent;
        }
        console.log("arrow direction %o %o %o", allowDir3, allowDir6, allowDir2)
      }
      ws.send(JSON.stringify(arrowDir1))
      ws.send(JSON.stringify(arrowDir2))
      ws.send(JSON.stringify(arrowDir3))
      ws.send(JSON.stringify(arrowDir4))
      ws.send(JSON.stringify(arrowDir5))
      ws.send(JSON.stringify(arrowDir6))
    } catch (ex) {
      console.log(ex)
    }
  }
  ws.on('message', function incoming(data) {
  console.log(data);
});
  ws.on('close', function() {
    mqttDATA.stop();
    console.log('The connection was closed!');
  });
});

app.ws('/plot', function(ws, req) {

  const mqttDATA = new mqtt_cl.ClientMQTT()
  mqttDATA.add_handler(handlerDATA)
  mqttDATA.start()

  function handlerDATA(type, value) {
    console.log("Receive new message %o", value)
    ws.send(JSON.stringify(value))
  }

  ws.on('close', function() {
    mqttDATA.stop();
    console.log('The connection was closed!');
  });
});

app.ws('/router', function(ws, req) {



  const mqttDATA = new mqtt_cl.ClientMQTT()
  mqttDATA.add_handler(handlerDATA)
  mqttDATA.start()
  ws.send(JSON.stringify(rout))

  function handlerDATA(type, value) {
    console.log(" arrows Receive new message %o", value)
    var json_msg = value;
    try {
      json_msg = JSON.parse(value)
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
      if ((json_msg.port == 'emeter1' || json_msg.port == 'emeter2' || json_msg.port == 'emeter3' || json_msg.port == 'emeter4') && json_msg.port2 == "power") {
        console.log("router json %o", value)
        rout.power = arrow1.value + arrow2.value + arrow3.value + arrow4.value
        rout.time = json_msg.time;
        console.log("router %o", rout)
      }
      ws.send(JSON.stringify(rout))
    } catch (ex) {
      console.log(ex)
    }
  }

  ws.on('close', function() {
    mqttDATA.stop();
    console.log('The connection was closed!');
  });
});

//TODO logic with socket when it is close
//TODO make topic
//TODO topics from AMIGO
//TODO send comand to AMIGO
//TODO post from UI
//TODO bash didn't store

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

app.get('/data', function(req, res) {
  res.set("Access-Control-Allow-Origin", "*")

  ref.once("value", function(snapshot) {
    console.log(snapshot.numChildren());
    res.send(snapshot.val())
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on %o", process.env.PORT);
})
