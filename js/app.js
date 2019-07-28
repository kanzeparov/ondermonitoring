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
  value: "0",
  id: 1
}
var cell2 = {
  time: "0",
  value: "0",
  id: 2
}
var cell3 = {
  time: "0",
  value: "0",
  id: 3
}
var cell4 = {
  time: "0",
  value: "0",
  id: 4
}

function handler(type, value) {
  //console.log("Receive new message %o", value)
  var date = new Date();
  var timestamp = date.getTime();
  let json_msg = value;
  try {
    json_msg = JSON.parse(value)

    if (json_msg.port == 'enode1') {
    console.log("cell json %o", value)
      cell1.value = json_msg.value;
      cell1.time = json_msg.time;
      console.log("cell %o", cell1)
    }
    if (json_msg.port == 'enode2') {
      console.log("cell json %o", json_msg.value)
      cell2.value = json_msg.value;
      cell2.time = json_msg.time;
      console.log("cell %o", cell2)
    }
    if (json_msg.port == 'enode3') {
      console.log("cell json %o", value)
      cell3.value = json_msg.value;
      cell3.time = json_msg.time;
      console.log("cell %o", cell3)
    }
    if (json_msg.port == 'enode4') {
      console.log("cell json %o", value)
      cell4.value = json_msg.value;
      cell4.time = json_msg.time;
      console.log("cell %o", cell4)
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
  ws.send("PUTIN HUILO")
  ws.send(JSON.stringify(cell1))
  ws.send(JSON.stringify(cell2))
  ws.send(JSON.stringify(cell3))
  ws.send(JSON.stringify(cell4))

  function handlerDATACells(type, value) {
    console.log(" handlerDATACells Receive new message %o", value)
      let json_msg = value;
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

  ws.on('message', function incoming(data) {
  console.log(data);
});

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

  ws.on('close', function() {
    mqttDATA.stop();
    console.log('The connection was closed!');
  });
});

app.ws('/arrows', function(ws, req) {

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

app.ws('/arrowdirections', function(ws, req) {

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

  function handlerDATA(type, value) {
    console.log("Receive new message %o", value)
    ws.send(JSON.stringify(value))
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
