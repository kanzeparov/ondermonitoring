'use strict'

const express = require('express')
const Router = require('./router')

let router = new Router()
let app = express()
let expressWs = require('express-ws')(app)
let mqtt_cl = require('./mqtt_client')
var config = require('./config.json');
let trunc = require('./trunc.js')
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('plot.db');
var firebase = require('firebase');
let timeDelete = config.minutes;
var password_str = ""
//var admin = require("firebase-admin");
var firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId
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

const msleep = time =>
  new Promise(
    resolve => setTimeout(_ => resolve(), time)
  );

var aWss = expressWs.getWss('/');

var ref = database.ref("plot/");
var refTraditional = database.ref("plot/traditional");
var refDistribution = database.ref("plot/distributed")
var refInternet = database.ref("plot/internet");
var pas = database.ref("password/")
var refstatus = database.ref("status/")
var ref107 = database.ref("/testbed/amigo/set_price")
var ref57 = database.ref("/testbed/erouter/setpower_out")
var ref40_1 = database.ref("/testbed/emeter1/power")
var ref40_2 = database.ref("/testbed/emeter2/power")
var ref40_3 = database.ref("/testbed/emeter3/power")
var ref40_4 = database.ref("/testbed/emeter4/power")
var ref16_1 = database.ref("/testbed/enode1/ext_battery/power")
var ref16_2 = database.ref("/testbed/enode2/ext_battery/power")
var ref16_3 = database.ref("/testbed/enode3/ext_battery/power")
var ref16_4 = database.ref("/testbed/enode4/ext_battery/power")
var ref101_1_1 = database.ref("/testbed/enode1/load/relay1/status")
var ref101_1_2 = database.ref("/testbed/enode1/load/relay2/status")
var ref101_1_3 = database.ref("/testbed/enode1/load/relay3/status")
var ref101_2_1 = database.ref("/testbed/enode2/load/relay1/status")
var ref101_2_2 = database.ref("/testbed/enode2/load/relay2/status")
var ref101_2_3 = database.ref("/testbed/enode2/load/relay3/status")
var ref101_3_1 = database.ref("/testbed/enode3/load/relay1/status")
var ref101_3_2 = database.ref("/testbed/enode3/load/relay2/status")
var ref101_3_3 = database.ref("/testbed/enode3/load/relay3/status")
var ref101_4_1 = database.ref("/testbed/enode4/load/relay1/status")
var ref101_4_2 = database.ref("/testbed/enode4/load/relay2/status")
var ref101_4_3 = database.ref("/testbed/enode4/load/relay3/status")
var ref32_1 = database.ref("/testbed/enode1/load1/value")
var ref32_2 = database.ref("/testbed/enode1/load2/value")
var ref32_3 = database.ref("/testbed/enode1/load3/value")
var ref33_1 = database.ref("/testbed/enode2/load1/value")
var ref33_2 = database.ref("/testbed/enode2/load2/value")
var ref33_3 = database.ref("/testbed/enode2/load3/value")
var ref34_1 = database.ref("/testbed/enode3/load1/value")
var ref34_2 = database.ref("/testbed/enode3/load2/value")
var ref34_3 = database.ref("/testbed/enode3/load3/value")
var ref35_1 = database.ref("/testbed/enode4/load1/value")
var ref35_2 = database.ref("/testbed/enode4/load2/value")
var ref35_3 = database.ref("/testbed/enode4/load3/value")
var ref23_1 = database.ref("/testbed/enode1/finance")
var ref23_2 = database.ref("/testbed/enode2/finance")
var ref23_3 = database.ref("/testbed/enode3/finance")
var ref23_4 = database.ref("/testbed/enode4/finance")
var ref6_1_1 = database.ref("/testbed/enode1/port1/power")
var ref6_1_2 = database.ref("/testbed/enode1/port2/power")
var ref6_1_3 = database.ref("/testbed/enode1/port3/power")
var ref6_2_1 = database.ref("/testbed/enode2/port1/power")
var ref6_2_2 = database.ref("/testbed/enode2/port2/power")
var ref6_2_3 = database.ref("/testbed/enode2/port3/power")
var ref6_3_1 = database.ref("/testbed/enode3/port1/power")
var ref6_3_2 = database.ref("/testbed/enode3/port2/power")
var ref6_3_3 = database.ref("/testbed/enode3/port3/power")
var ref6_4_1 = database.ref("/testbed/enode4/port1/power")
var ref6_4_2 = database.ref("/testbed/enode4/port2/power")
var ref6_4_3 = database.ref("/testbed/enode4/port3/power")
var ref18_1_1 = database.ref("/testbed/enode1/contracts/one")
var ref18_1_4 = database.ref("/testbed/enode1/contracts/four")
var ref18_1_6 = database.ref("/testbed/enode1/contracts/six")
var ref18_2_1 = database.ref("/testbed/enode2/contracts/one")
var ref18_2_2 = database.ref("/testbed/enode2/contracts/two")
var ref18_2_5 = database.ref("/testbed/enode2/contracts/five")
var ref18_3_3 = database.ref("/testbed/enode3/contracts/three")
var ref18_3_4 = database.ref("/testbed/enode3/contracts/four")
var ref18_3_5 = database.ref("/testbed/enode3/contracts/five")
var ref18_4_2 = database.ref("/testbed/enode4/contracts/two")
var ref18_4_3 = database.ref("/testbed/enode4/contracts/three")
var ref18_4_6 = database.ref("/testbed/enode4/contracts/six")
var ref97_1 = database.ref("/testbed/enode1/relay/ac/status")
var ref97_2 = database.ref("/testbed/enode2/relay/ac/status")
var ref97_3 = database.ref("/testbed/enode3/relay/ac/status")
var ref97_4 = database.ref("/testbed/enode4/relay/ac/status")
var ref93_1 = database.ref("/testbed/enode1/relay/der/status")
var ref93_2 = database.ref("/testbed/enode2/relay/der/status")
var ref93_3 = database.ref("/testbed/enode3/relay/der/status")
var ref93_4 = database.ref("/testbed/enode4/relay/der/status")
var ref87_1 = database.ref("/testbed/relay/dc1/status")
var ref87_2 = database.ref("/testbed/relay/dc2/status")
var ref87_3 = database.ref("/testbed/relay/dc3/status")
var ref87_4 = database.ref("/testbed/relay/dc4/status")
var ref87_5 = database.ref("/testbed/relay/dc5/status")
var ref87_6 = database.ref("/testbed/relay/dc6/status")
var ref115_1 = database.ref("/testbed/enode1/gen/parameter0")
var ref115_2 = database.ref("/testbed/enode2/gen/parameter0")
var ref115_3 = database.ref("/testbed/enode3/gen/parameter0")
var ref115_4 = database.ref("/testbed/enode4/gen/parameter0")


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
  id: 9,
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
///testbed/enodeX/ext_battery/power
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
  directionfrom: "enode1",
  directionto: "enode2"
}
var arrowDir2 = {
  time: "0",
  value: 0,
  id: 2,
  balance: 0,
  status: true,
  directionfrom: "enode2",
  directionto: "enode4"
}
var arrowDir3 = {
  time: "0",
  value: 0,
  id: 3,
  balance: 0,
  status: true,
  directionfrom: "enode3",
  directionto: "enode4"
}
var arrowDir4 = {
  time: "0",
  value: 0,
  id: 4,
  balance: 0,
  status: true,
  directionfrom: "enode3",
  directionto: "enode1"
}
var arrowDir5 = {
  time: "0",
  value: 0,
  id: 5,
  balance: 0,
  status: true,
  directionfrom: "enode3",
  directionto: "enode2"
}
var arrowDir6 = {
  time: "0",
  value: 0,
  id: 6,
  balance: 0,
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

pas.once("value", function(snapshot) {
    password_str = snapshot.val().value
    console.log("pass %o", password_str);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

refstatus.once("value", function(snapshot) {
    if (snapshot.val().value.agent1 == "Agent1" ||
      snapshot.val().value.agent2 == "Agent1" ||
      snapshot.val().value.agent3 == "Agent1" ||
      snapshot.val().value.agent4 == "Agent1") {
      cell1.status = true;
    }
    if (snapshot.val().value.agent1 == "Agent2" ||
      snapshot.val().value.agent2 == "Agent2" ||
      snapshot.val().value.agent3 == "Agent2" ||
      snapshot.val().value.agent4 == "Agent2") {
      cell2.status = true;
    }

    if (snapshot.val().value.agent1 == "Agent3" ||
      snapshot.val().value.agent2 == "Agent3" ||
      snapshot.val().value.agent3 == "Agent3" ||
      snapshot.val().value.agent4 == "Agent3") {
      cell3.status = true;
    }

    if (snapshot.val().value.agent1 == "Agent4" ||
      snapshot.val().value.agent2 == "Agent4" ||
      snapshot.val().value.agent3 == "Agent4" ||
      snapshot.val().value.agent4 == "Agent4") {
      cell4.status = true;
    }

  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref107.once("value", function(snapshot) {
    var timeCurrent = new Date(rout.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      rout.time = snapshot.val().time
    }
    rout.balance = snapshot.val().value.value
    console.log("rout change time and balance %o", rout);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref57.once("value", function(snapshot) {
    var timeCurrent = new Date(rout.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      rout.time = snapshot.val().time
    }
    rout.energy = snapshot.val().value.value
    console.log("rout change time and energy %o", rout);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref40_1.once("value", function(snapshot) {
    arrow1.time = snapshot.val().time
    arrow1.value = snapshot.val().value.value
    var timeCurrent = new Date(rout.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      rout.time = snapshot.val().time
    }
    rout.power = rout.power + snapshot.val().value.value
    console.log("rout change time and power %o", rout);
    console.log("arrow change time and value %o", arrow1);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref40_2.once("value", function(snapshot) {
    arrow2.time = snapshot.val().time
    arrow2.value = snapshot.val().value.value
    var timeCurrent = new Date(rout.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      rout.time = snapshot.val().time
    }
    rout.power = rout.power + snapshot.val().value.value
    console.log("rout change time and power %o", rout);
    console.log("arrow change time and value %o", arrow2);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
ref40_3.once("value", function(snapshot) {
    arrow3.time = snapshot.val().time
    arrow3.value = snapshot.val().value.value
    var timeCurrent = new Date(rout.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      rout.time = snapshot.val().time
    }
    rout.power = rout.power + snapshot.val().value.value
    console.log("rout change time and power %o", rout);
    console.log("arrow change time and value %o", arrow3);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref40_4.once("value", function(snapshot) {
    arrow4.time = snapshot.val().time
    arrow4.value = snapshot.val().value.value
    var timeCurrent = new Date(rout.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      rout.time = snapshot.val().time
    }
    rout.power = rout.power + snapshot.val().value.value
    console.log("rout change time and power %o", rout);
    console.log("arrow change time and value %o", arrow4);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref16_1.once("value", function(snapshot) {
    arrow5.time = snapshot.val().time
    arrow5.value = snapshot.val().value.value
    console.log("arrow change time and value %o", arrow5);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref16_2.once("value", function(snapshot) {
    arrow6.time = snapshot.val().time
    arrow6.value = snapshot.val().value.value
    console.log("arrow change time and value %o", arrow6);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref16_3.once("value", function(snapshot) {
    arrow7.time = snapshot.val().time
    arrow7.value = snapshot.val().value.value
    console.log("arrow change time and value %o", arrow7);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref16_4.once("value", function(snapshot) {
    arrow8.time = snapshot.val().time
    arrow8.value = snapshot.val().value.value
    console.log("arrow change time and value %o", arrow8);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref101_1_1.once("value", function(snapshot) {
    arrow9pre.time = snapshot.val().time
    arrow9pre.status1 = snapshot.val().value.value
    var timeCurrent = new Date(arrow9.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrow9.time = snapshot.val().time
    }
    console.log("arrow change time and value %o", arrow9pre);
    console.log("arrow change time and value %o", arrow9);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref101_1_2.once("value", function(snapshot) {
    arrow9pre.time = snapshot.val().time
    arrow9pre.status2 = snapshot.val().value.value
    var timeCurrent = new Date(arrow9.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrow9.time = snapshot.val().time
    }
    console.log("arrow change time and value %o", arrow9pre);
    console.log("arrow change time and value %o", arrow9);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref101_1_3.once("value", function(snapshot) {
    arrow9pre.time = snapshot.val().time
    arrow9pre.status3 = snapshot.val().value.value
    var timeCurrent = new Date(arrow9.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrow9.time = snapshot.val().time
    }
    arrow9.status = arrow9pre.status1 || arrow9pre.status2 || arrow9pre.status3
    console.log("arrow change time and value %o", arrow9pre);
    console.log("arrow change time and value %o", arrow9);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref101_2_1.once("value", function(snapshot) {
    arrow10pre.time = snapshot.val().time
    arrow10pre.status1 = snapshot.val().value.value
    var timeCurrent = new Date(arrow10.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrow10.time = snapshot.val().time
    }
    console.log("arrow change time and value %o", arrow10pre);
    console.log("arrow change time and value %o", arrow10);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref101_2_2.once("value", function(snapshot) {
    arrow10pre.time = snapshot.val().time
    arrow10pre.status2 = snapshot.val().value.value
    var timeCurrent = new Date(arrow10.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrow10.time = snapshot.val().time
    }
    console.log("arrow change time and value %o", arrow10pre);
    console.log("arrow change time and value %o", arrow10);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref101_2_3.once("value", function(snapshot) {
    arrow10pre.time = snapshot.val().time
    arrow10pre.status3 = snapshot.val().value.value
    var timeCurrent = new Date(arrow10.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrow10.time = snapshot.val().time
    }
    arrow10.status = arrow10pre.status1 || arrow10pre.status2 || arrow10pre.status3
    console.log("arrow change time and value %o", arrow10pre);
    console.log("arrow change time and value %o", arrow10);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref101_3_1.once("value", function(snapshot) {
    arrow11pre.time = snapshot.val().time
    arrow11pre.status1 = snapshot.val().value.value
    var timeCurrent = new Date(arrow11.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrow11.time = snapshot.val().time
    }
    console.log("arrow change time and value %o", arrow11pre);
    console.log("arrow change time and value %o", arrow11);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref101_3_2.once("value", function(snapshot) {
    arrow11pre.time = snapshot.val().time
    arrow11pre.status2 = snapshot.val().value.value
    var timeCurrent = new Date(arrow11.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrow11.time = snapshot.val().time
    }
    console.log("arrow change time and value %o", arrow11pre);
    console.log("arrow change time and value %o", arrow11);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref101_3_3.once("value", function(snapshot) {
    arrow11pre.time = snapshot.val().time
    arrow11pre.status3 = snapshot.val().value.value
    var timeCurrent = new Date(arrow11.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrow11.time = snapshot.val().time
    }
    arrow11.status = arrow11pre.status1 || arrow11pre.status2 || arrow11pre.status3
    console.log("arrow change time and value %o", arrow11pre);
    console.log("arrow change time and value %o", arrow11);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref101_4_1.once("value", function(snapshot) {
    arrow12pre.time = snapshot.val().time
    arrow12pre.status1 = snapshot.val().value.value
    var timeCurrent = new Date(arrow12.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrow12.time = snapshot.val().time
    }
    console.log("arrow change time and value %o", arrow12pre);
    console.log("arrow change time and value %o", arrow12);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref101_4_2.once("value", function(snapshot) {
    arrow12pre.time = snapshot.val().time
    arrow12pre.status2 = snapshot.val().value.value
    var timeCurrent = new Date(arrow12.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrow12.time = snapshot.val().time
    }
    console.log("arrow change time and value %o", arrow12pre);
    console.log("arrow change time and value %o", arrow12);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref101_4_3.once("value", function(snapshot) {
    arrow12pre.time = snapshot.val().time
    arrow12pre.status3 = snapshot.val().value.value
    var timeCurrent = new Date(arrow12.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrow12.time = snapshot.val().time
    }
    arrow12.status = arrow12pre.status1 || arrow12pre.status2 || arrow12pre.status3
    console.log("arrow change time and value %o", arrow12pre);
    console.log("arrow change time and value %o", arrow12);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref32_1.once("value", function(snapshot) {
    arrow9pre.time = snapshot.val().time
    arrow9pre.value1 = snapshot.val().value.value
    var timeCurrent = new Date(arrow9.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrow9.time = snapshot.val().time
    }
    console.log("arrow change time and value %o", arrow9pre);
    console.log("arrow change time and value %o", arrow9);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref32_2.once("value", function(snapshot) {
    arrow9pre.time = snapshot.val().time
    arrow9pre.value2 = snapshot.val().value.value
    var timeCurrent = new Date(arrow9.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrow9.time = snapshot.val().time
    }
    console.log("arrow change time and value %o", arrow9pre);
    console.log("arrow change time and value %o", arrow9);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref32_3.once("value", function(snapshot) {
    arrow9pre.time = snapshot.val().time
    arrow9pre.value3 = snapshot.val().value.value
    var timeCurrent = new Date(arrow9.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrow9.time = snapshot.val().time
    }
    arrow9.value = arrow9pre.status1 * arrow9pre.value1 + arrow9pre.status2 * arrow9pre.value2 + arrow9pre.status3 * arrow9pre.value3
    console.log("arrow change time and value %o", arrow9pre);
    console.log("arrow change time and value %o", arrow9);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref33_1.once("value", function(snapshot) {
    arrow10pre.time = snapshot.val().time
    arrow10pre.value1 = snapshot.val().value.value
    var timeCurrent = new Date(arrow10.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrow10.time = snapshot.val().time
    }
    console.log("arrow change time and value %o", arrow10pre);
    console.log("arrow change time and value %o", arrow10);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref33_2.once("value", function(snapshot) {
    arrow10pre.time = snapshot.val().time
    arrow10pre.value2 = snapshot.val().value.value
    var timeCurrent = new Date(arrow10.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrow10.time = snapshot.val().time
    }
    console.log("arrow change time and value %o", arrow10pre);
    console.log("arrow change time and value %o", arrow10);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref33_3.once("value", function(snapshot) {
    arrow10pre.time = snapshot.val().time
    arrow10pre.value3 = snapshot.val().value.value
    var timeCurrent = new Date(arrow10.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrow10.time = snapshot.val().time
    }
    arrow10.value = arrow10pre.status1 * arrow10pre.value1 + arrow10pre.status2 * arrow10pre.value2 + arrow10pre.status3 * arrow10pre.value3
    console.log("arrow change time and value %o", arrow10pre);
    console.log("arrow change time and value %o", arrow10);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref34_1.once("value", function(snapshot) {
    arrow11pre.time = snapshot.val().time
    arrow11pre.value1 = snapshot.val().value.value
    var timeCurrent = new Date(arrow11.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrow11.time = snapshot.val().time
    }
    console.log("arrow change time and value %o", arrow11pre);
    console.log("arrow change time and value %o", arrow11);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref34_2.once("value", function(snapshot) {
    arrow11pre.time = snapshot.val().time
    arrow11pre.value2 = snapshot.val().value.value
    var timeCurrent = new Date(arrow11.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrow11.time = snapshot.val().time
    }
    console.log("arrow change time and value %o", arrow11pre);
    console.log("arrow change time and value %o", arrow11);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref34_3.once("value", function(snapshot) {
    arrow11pre.time = snapshot.val().time
    arrow11pre.value3 = snapshot.val().value.value
    var timeCurrent = new Date(arrow11.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrow11.time = snapshot.val().time
    }
    arrow11.value = arrow11pre.status1 * arrow11pre.value1 + arrow11pre.status2 * arrow11pre.value2 + arrow11pre.status3 * arrow11pre.value3
    console.log("arrow change time and value %o", arrow11pre);
    console.log("arrow change time and value %o", arrow11);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref35_1.once("value", function(snapshot) {
    arrow12pre.time = snapshot.val().time
    arrow12pre.value1 = snapshot.val().value.value
    var timeCurrent = new Date(arrow12.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrow12.time = snapshot.val().time
    }
    console.log("arrow change time and value %o", arrow12pre);
    console.log("arrow change time and value %o", arrow12);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref35_2.once("value", function(snapshot) {
    arrow12pre.time = snapshot.val().time
    arrow12pre.value2 = snapshot.val().value.value
    var timeCurrent = new Date(arrow12.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrow12.time = snapshot.val().time
    }
    console.log("arrow change time and value %o", arrow12pre);
    console.log("arrow change time and value %o", arrow12);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref35_3.once("value", function(snapshot) {
    arrow12pre.time = snapshot.val().time
    arrow12pre.value3 = snapshot.val().value.value
    var timeCurrent = new Date(arrow12.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrow12.time = snapshot.val().time
    }
    arrow12.value = arrow12pre.status1 * arrow12pre.value1 + arrow12pre.status2 * arrow12pre.value2 + arrow12pre.status3 * arrow12pre.value3
    console.log("arrow change time and value %o", arrow12pre);
    console.log("arrow change time and value %o", arrow12);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref23_1.once("value", function(snapshot) {
    cell1.time = snapshot.val().time
    cell1.value = snapshot.val().value.value
    console.log("cell change time and value %o", cell1);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref23_2.once("value", function(snapshot) {
    cell2.time = snapshot.val().time
    cell2.value = snapshot.val().value.value
    console.log("cell change time and value %o", cell2);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref23_3.once("value", function(snapshot) {
    cell3.time = snapshot.val().time
    cell3.value = snapshot.val().value.value
    console.log("cell change time and value %o", cell3);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref23_4.once("value", function(snapshot) {
    cell4.time = snapshot.val().time
    cell4.value = snapshot.val().value.value
    console.log("cell change time and value %o", cell4);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref6_1_1.once("value", function(snapshot) {
    var timeCurrent = new Date(arrowDir1.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrowDir1.time = snapshot.val().time
    }
    arrowDir1.value = snapshot.val().value.value
    console.log("arrowDir change time and value %o", arrowDir1);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref6_1_2.once("value", function(snapshot) {
    var timeCurrent = new Date(arrowDir6.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrowDir6.time = snapshot.val().time
    }
    arrowDir6.value = snapshot.val().value.value
    console.log("arrowDir change time and value %o", arrowDir6);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref6_1_3.once("value", function(snapshot) {
    var timeCurrent = new Date(arrowDir4.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrowDir4.time = snapshot.val().time
    }
    arrowDir4.value = snapshot.val().value.value
    console.log("arrowDir change time and value %o", arrowDir4);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref6_2_1.once("value", function(snapshot) {
    var timeCurrent = new Date(arrowDir1.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrowDir1.time = snapshot.val().time
    }
    arrowDir1.value = snapshot.val().value.value
    console.log("arrowDir change time and value %o", arrowDir1);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref6_2_2.once("value", function(snapshot) {
    var timeCurrent = new Date(arrowDir5.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrowDir5.time = snapshot.val().time
    }
    arrowDir5.value = snapshot.val().value.value
    console.log("arrowDir change time and value %o", arrowDir5);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref6_2_3.once("value", function(snapshot) {
    var timeCurrent = new Date(arrowDir2.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrowDir2.time = snapshot.val().time
    }
    arrowDir2.value = snapshot.val().value.value
    console.log("arrowDir change time and value %o", arrowDir2);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref6_3_1.once("value", function(snapshot) {
    var timeCurrent = new Date(arrowDir4.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrowDir4.time = snapshot.val().time
    }
    arrowDir4.value = snapshot.val().value.value
    console.log("arrowDir change time and value %o", arrowDir4);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref6_3_2.once("value", function(snapshot) {
    var timeCurrent = new Date(arrowDir5.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrowDir5.time = snapshot.val().time
    }
    arrowDir5.value = snapshot.val().value.value
    console.log("arrowDir change time and value %o", arrowDir5);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref6_3_3.once("value", function(snapshot) {
    var timeCurrent = new Date(arrowDir3.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrowDir3.time = snapshot.val().time
    }
    arrowDir3.value = snapshot.val().value.value
    console.log("arrowDir change time and value %o", arrowDir3);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref6_4_1.once("value", function(snapshot) {
    var timeCurrent = new Date(arrowDir3.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrowDir3.time = snapshot.val().time
    }
    arrowDir3.value = snapshot.val().value.value
    console.log("arrowDir change time and value %o", arrowDir3);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref6_4_2.once("value", function(snapshot) {
    var timeCurrent = new Date(arrowDir6.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrowDir6.time = snapshot.val().time
    }
    arrowDir6.value = snapshot.val().value.value
    console.log("arrowDir change time and value %o", arrowDir6);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref6_4_3.once("value", function(snapshot) {
    var timeCurrent = new Date(arrowDir2.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrowDir2.time = snapshot.val().time
    }
    arrowDir2.value = snapshot.val().value.value
    console.log("arrowDir change time and value %o", arrowDir2);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref18_1_1.once("value", function(snapshot) {
    var timeCurrent = new Date(arrowDir1.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrowDir1.time = snapshot.val().time
    }
    arrowDir1.directionfrom = snapshot.val().value.seller
    arrowDir1.directionto = snapshot.val().value.contragent
    arrowDir1.balance = snapshot.val().value.cost
    console.log("arrowDir change time and value %o", arrowDir1);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref18_1_4.once("value", function(snapshot) {
    var timeCurrent = new Date(arrowDir4.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrowDir4.time = snapshot.val().time
    }
    arrowDir4.directionfrom = snapshot.val().value.seller
    arrowDir4.directionto = snapshot.val().value.contragent
    arrowDir4.balance = snapshot.val().value.cost
    console.log("arrowDir change time and value %o", arrowDir4);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref18_1_6.once("value", function(snapshot) {
    var timeCurrent = new Date(arrowDir6.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrowDir6.time = snapshot.val().time
    }
    arrowDir6.directionfrom = snapshot.val().value.seller
    arrowDir6.directionto = snapshot.val().value.contragent
    arrowDir6.balance = snapshot.val().value.cost
    console.log("arrowDir change time and value %o", arrowDir6);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref18_2_1.once("value", function(snapshot) {
    var timeCurrent = new Date(arrowDir1.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrowDir1.time = snapshot.val().time
    }
    arrowDir1.directionfrom = snapshot.val().value.seller
    arrowDir1.directionto = snapshot.val().value.contragent
    arrowDir1.balance = snapshot.val().value.cost
    console.log("arrowDir change time and value %o", arrowDir1);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
ref18_2_2.once("value", function(snapshot) {
    var timeCurrent = new Date(arrowDir2.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrowDir2.time = snapshot.val().time
    }
    arrowDir2.directionfrom = snapshot.val().value.seller
    arrowDir2.directionto = snapshot.val().value.contragent
    arrowDir2.balance = snapshot.val().value.cost
    console.log("arrowDir change time and value %o", arrowDir2);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
ref18_2_5.once("value", function(snapshot) {
    var timeCurrent = new Date(arrowDir5.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrowDir5.time = snapshot.val().time
    }
    arrowDir5.directionfrom = snapshot.val().value.seller
    arrowDir5.directionto = snapshot.val().value.contragent
    arrowDir5.balance = snapshot.val().value.cost
    console.log("arrowDir change time and value %o", arrowDir5);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref18_3_3.once("value", function(snapshot) {
    var timeCurrent = new Date(arrowDir3.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrowDir3.time = snapshot.val().time
    }
    arrowDir3.directionfrom = snapshot.val().value.seller
    arrowDir3.directionto = snapshot.val().value.contragent
    arrowDir3.balance = snapshot.val().value.cost
    console.log("arrowDir change time and value %o", arrowDir3);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
ref18_3_4.once("value", function(snapshot) {
    var timeCurrent = new Date(arrowDir4.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrowDir4.time = snapshot.val().time
    }
    arrowDir4.directionfrom = snapshot.val().value.seller
    arrowDir4.directionto = snapshot.val().value.contragent
    arrowDir4.balance = snapshot.val().value.cost
    console.log("arrowDir change time and value %o", arrowDir4);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
ref18_3_5.once("value", function(snapshot) {
    var timeCurrent = new Date(arrowDir5.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrowDir5.time = snapshot.val().time
    }
    arrowDir5.directionfrom = snapshot.val().value.seller
    arrowDir5.directionto = snapshot.val().value.contragent
    arrowDir5.balance = snapshot.val().value.cost
    console.log("arrowDir change time and value %o", arrowDir5);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref18_4_2.once("value", function(snapshot) {
    var timeCurrent = new Date(arrowDir2.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrowDir2.time = snapshot.val().time
    }
    arrowDir2.directionfrom = snapshot.val().value.seller
    arrowDir2.directionto = snapshot.val().value.contragent
    arrowDir2.balance = snapshot.val().value.cost
    console.log("arrowDir change time and value %o", arrowDir2);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
ref18_4_3.once("value", function(snapshot) {
    var timeCurrent = new Date(arrowDir3.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrowDir3.time = snapshot.val().time
    }
    arrowDir3.directionfrom = snapshot.val().value.seller
    arrowDir3.directionto = snapshot.val().value.contragent
    arrowDir3.balance = snapshot.val().value.cost
    console.log("arrowDir change time and value %o", arrowDir3);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
ref18_4_6.once("value", function(snapshot) {
    var timeCurrent = new Date(arrowDir6.time)
    var timeFromBd = new Date(snapshot.val().time)
    if (timeCurrent < timeFromBd) {
      arrowDir6.time = snapshot.val().time
    }
    arrowDir6.directionfrom = snapshot.val().value.seller
    arrowDir6.directionto = snapshot.val().value.contragent
    arrowDir6.balance = snapshot.val().value.cost
    console.log("arrowDir change time and value %o", arrowDir6);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref97_1.once("value", function(snapshot) {
    arrow1.time = snapshot.val().time
    arrow1.status = snapshot.val().value.value
    console.log("arrow change time and value %o", arrow1);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref97_2.once("value", function(snapshot) {
    arrow2.time = snapshot.val().time
    arrow2.status = snapshot.val().value.value
    console.log("arrow change time and value %o", arrow2);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref97_3.once("value", function(snapshot) {
    arrow3.time = snapshot.val().time
    arrow3.status = snapshot.val().value.value
    console.log("arrow change time and value %o", arrow3);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref97_4.once("value", function(snapshot) {
    arrow4.time = snapshot.val().time
    arrow4.status = snapshot.val().value.value
    console.log("arrow change time and value %o", arrow4);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref93_1.once("value", function(snapshot) {
    arrow5.time = snapshot.val().time
    arrow5.status = snapshot.val().value.value
    console.log("arrow change time and value %o", arrow5);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref93_2.once("value", function(snapshot) {
    arrow6.time = snapshot.val().time
    arrow6.status = snapshot.val().value.value
    console.log("arrow change time and value %o", arrow6);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref93_3.once("value", function(snapshot) {
    arrow7.time = snapshot.val().time
    arrow7.status = snapshot.val().value.value
    console.log("arrow change time and value %o", arrow7);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref93_4.once("value", function(snapshot) {
    arrow8.time = snapshot.val().time
    arrow8.status = snapshot.val().value.value
    console.log("arrow change time and value %o", arrow8);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref87_1.once("value", function(snapshot) {
    arrowDir1.time = snapshot.val().time
    arrowDir1.status = snapshot.val().value.value
    console.log("arrowDir change time and value %o", arrowDir1);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref87_2.once("value", function(snapshot) {
    arrowDir2.time = snapshot.val().time
    arrowDir2.status = snapshot.val().value.value
    console.log("arrowDir change time and value %o", arrowDir2);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref87_3.once("value", function(snapshot) {
    arrowDir3.time = snapshot.val().time
    arrowDir3.status = snapshot.val().value.value
    console.log("arrowDir change time and value %o", arrowDir3);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref87_4.once("value", function(snapshot) {
    arrowDir4.time = snapshot.val().time
    arrowDir4.status = snapshot.val().value.value
    console.log("arrowDir change time and value %o", arrowDir4);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref87_5.once("value", function(snapshot) {
    arrowDir5.time = snapshot.val().time
    arrowDir5.status = snapshot.val().value.value
    console.log("arrowDir change time and value %o", arrowDir5);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref87_6.once("value", function(snapshot) {
    arrowDir6.time = snapshot.val().time
    arrowDir6.status = snapshot.val().value.value
    console.log("arrowDir change time and value %o", arrowDir6);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref115_1.once("value", function(snapshot) {
    gen1.time = snapshot.val().time
    gen1.value = snapshot.val().value.value
    console.log("gen change time and value %o", gen1);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref115_2.once("value", function(snapshot) {
    gen2.time = snapshot.val().time
    gen2.value = snapshot.val().value.value
    console.log("gen change time and value %o", gen2);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref115_3.once("value", function(snapshot) {
    gen3.time = snapshot.val().time
    gen3.value = snapshot.val().value.value
    console.log("gen change time and value %o", gen3);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

ref115_4.once("value", function(snapshot) {
    gen4.time = snapshot.val().time
    gen4.value = snapshot.val().value.value
    console.log("gen change time and value %o", gen4);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

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
      cell1.status = false;
      cell2.status = false;
      cell3.status = false;
      cell4.status = false;


      if (json_msg.count == 0) {
        if (json_msg.agent1 == 'Agent1') {
          cell1.status = true
          cell2.status = false
          cell3.status = false
          cell4.status = false
        }
        if (json_msg.agent1 == 'Agent2') {
          cell1.status = false
          cell2.status = true
          cell3.status = false
          cell4.status = false
        }
        if (json_msg.agent1 == 'Agent3') {
          cell1.status = false
          cell2.status = false
          cell3.status = true
          cell4.status = false
        }
        if (json_msg.agent1 == 'Agent4') {
          cell1.status = false
          cell2.status = false
          cell3.status = false
          cell4.status = true
        }
      }
      if (json_msg.count == 1) {
        if ((json_msg.agent1 == 'Agent1' && json_msg.agent2 == 'Agent2') || (json_msg.agent1 == 'Agent2' && json_msg.agent2 == 'Agent1')) {
          cell1.status = true
          cell2.status = true
          cell3.status = false
          cell4.status = false
        }
        if ((json_msg.agent1 == 'Agent2' && json_msg.agent2 == 'Agent3') || (json_msg.agent1 == 'Agent3' && json_msg.agent2 == 'Agent2')) {
          cell1.status = false
          cell2.status = true
          cell3.status = true
          cell4.status = false
        }
        if ((json_msg.agent1 == 'Agent3' && json_msg.agent2 == 'Agent4') || (json_msg.agent1 == 'Agent4' && json_msg.agent2 == 'Agent3')) {
          cell1.status = false
          cell2.status = false
          cell3.status = true
          cell4.status = true
        }
        if ((json_msg.agent1 == 'Agent3' && json_msg.agent2 == 'Agent1') || (json_msg.agent1 == 'Agent1' && json_msg.agent2 == 'Agent3')) {
          cell1.status = true
          cell2.status = false
          cell3.status = true
          cell4.status = false
        }
        if ((json_msg.agent1 == 'Agent4' && json_msg.agent2 == 'Agent1') || (json_msg.agent1 == 'Agent1' && json_msg.agent2 == 'Agent4')) {
          cell1.status = true
          cell2.status = false
          cell3.status = false
          cell4.status = true
        }
        if ((json_msg.agent1 == 'Agent4' && json_msg.agent2 == 'Agent2') || (json_msg.agent1 == 'Agent2' && json_msg.agent2 == 'Agent4')) {
          cell1.status = false
          cell2.status = true
          cell3.status = false
          cell4.status = true
        }


      }
      if (json_msg.count == 2) {
        cell1.status = false
        cell2.status = false
        cell3.status = false
        cell4.status = false
        if (json_msg.agent1 == 'Agent1' || json_msg.agent2 == 'Agent1' || json_msg.agent3 == 'Agent1') {
          cell1.status = true
        }
        if (json_msg.agent1 == 'Agent2' || json_msg.agent2 == 'Agent2' || json_msg.agent3 == 'Agent2') {
          cell2.status = true
        }
        if (json_msg.agent1 == 'Agent3' || json_msg.agent2 == 'Agent3' || json_msg.agent3 == 'Agent3') {
          cell3.status = true
        }
        if (json_msg.agent1 == 'Agent4' || json_msg.agent2 == 'Agent4' || json_msg.agent3 == 'Agent4') {
          cell4.status = true
        }
      }
      if (json_msg.count == 3) {
        cell1.status = true
        cell2.status = true
        cell3.status = true
        cell4.status = true
        console.log("cell1 status %o ", cell1)
        console.log("cell2 status %o ", cell2)
        console.log("cell3 status %o ", cell3)
        console.log("cell4 status %o ", cell4)
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



    if (json_msg.port == 'enode1' && json_msg.port2 == "load1" && json_msg.port3 == "value") {
      console.log("arrow912  json %o", value)
      arrow9pre.value1 = json_msg.value;
      console.log("arrow912 %o", arrow9pre)
    }
    if (json_msg.port == 'enode1' && json_msg.port2 == "load2" && json_msg.port3 == "value") {
      console.log("arrow912  json %o", value)
      arrow9pre.value2 = json_msg.value;
      console.log("arrow912 %o", arrow9pre)
    }
    if (json_msg.port == 'enode1' && json_msg.port2 == "load3" && json_msg.port3 == "value") {
      console.log("arrow912  json %o", value)
      arrow9pre.value3 = json_msg.value;
      console.log("arrow912 %o", arrow9pre)
    }

    if (json_msg.port == 'enode2' && json_msg.port2 == "load1" && json_msg.port3 == "value") {
      console.log("arrow912  json %o", value)
      arrow10pre.value1 = json_msg.value;
      console.log("arrow912 %o", arrow10pre)
    }
    if (json_msg.port == 'enode2' && json_msg.port2 == "load2" && json_msg.port3 == "value") {
      console.log("arrow912  json %o", value)
      arrow10pre.value2 = json_msg.value;
      console.log("arrow912 %o", arrow10pre)
    }
    if (json_msg.port == 'enode2' && json_msg.port2 == "load3" && json_msg.port3 == "value") {
      console.log("arrow912  json %o", value)
      arrow10pre.value3 = json_msg.value;
      console.log("arrow812 %o", arrow10pre)
    }




    if (json_msg.port == 'enode3' && json_msg.port2 == "load1" && json_msg.port3 == "value") {
      console.log("arrow912  json %o", value)
      arrow11pre.value1 = json_msg.value;
      console.log("arrow912 %o", arrow11pre)
    }
    if (json_msg.port == 'enode3' && json_msg.port2 == "load2" && json_msg.port3 == "value") {
      console.log("arrow912  json %o", value)
      arrow11pre.value2 = json_msg.value;
      console.log("arrow912 %o", arrow11pre)
    }
    if (json_msg.port == 'enode3' && json_msg.port2 == "load3" && json_msg.port3 == "value") {
      console.log("arrow912  json %o", value)
      arrow11pre.value3 = json_msg.value;
      console.log("arrow812 %o", arrow11pre)
    }



    if (json_msg.port == 'enode4' && json_msg.port2 == "load1" && json_msg.port3 == "value") {
      console.log("arrow912  json %o", value)
      arrow12pre.value1 = json_msg.value;
      console.log("arrow912 %o", arrow12pre)
    }
    if (json_msg.port == 'enode4' && json_msg.port2 == "load2" && json_msg.port3 == "value") {
      console.log("arrow912  json %o", value)
      arrow12pre.value2 = json_msg.value;
      console.log("arrow912 %o", arrow12pre)
    }
    if (json_msg.port == 'enode4' && json_msg.port2 == "load3" && json_msg.port3 == "value") {
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
      console.log("arrow direction json %o", value)
      if (json_msg.seller == 'enode2' || json_msg.contragent == 'enode2') {
        arrowDir1.directionfrom = json_msg.seller;
        arrowDir1.directionto = json_msg.contragent;
        arrowDir1.balance = json_msg.cost;
      }
      if (json_msg.seller == 'enode4' || json_msg.contragent == 'enode4') {
        arrowDir6.directionfrom = json_msg.seller;
        arrowDir6.directionto = json_msg.contragent;
        arrowDir6.balance = json_msg.cost;
      }
      if (json_msg.seller == 'enode3' || json_msg.contragent == 'enode3') {
        arrowDir4.directionfrom = json_msg.seller;
        arrowDir4.directionto = json_msg.contragent;
        arrowDir4.balance = json_msg.cost;
      }
      console.log("arrow direction %o %o %o", arrowDir1, arrowDir6, arrowDir4)
    }
    if (json_msg.port == 'enode2' && json_msg.port2 == "contracts") {
      console.log("arrow direction json %o", value)
      if (json_msg.seller == 'enode1' || json_msg.contragent == 'enode1') {
        arrowDir1.directionfrom = json_msg.seller;
        arrowDir1.directionto = json_msg.contragent;
        arrowDir1.balance = json_msg.cost;
      }
      if (json_msg.seller == 'enode3' || json_msg.contragent == 'enode3') {
        arrowDir5.directionfrom = json_msg.seller;
        arrowDir5.directionto = json_msg.contragent;
        arrowDir5.balance = json_msg.cost;
      }
      if (json_msg.seller == 'enode4' || json_msg.contragent == 'enode4') {
        arrowDir2.directionfrom = json_msg.seller;
        arrowDir2.directionto = json_msg.contragent;
        arrowDir2.balance = json_msg.cost;
      }
      console.log("arrow direction %o %o %o", arrowDir1, arrowDir5, arrowDir2)
    }
    if (json_msg.port == 'enode3' && json_msg.port2 == "contracts") {
      console.log("arrow direction json %o", value)
      if (json_msg.seller == 'enode1' || json_msg.contragent == 'enode1') {
        arrowDir4.directionfrom = json_msg.seller;
        arrowDir4.directionto = json_msg.contragent;
        arrowDir4.balance = json_msg.cost;
      }
      if (json_msg.seller == 'enode2' || json_msg.contragent == 'enode2') {
        arrowDir5.directionfrom = json_msg.seller;
        arrowDir5.directionto = json_msg.contragent;
        arrowDir5.balance = json_msg.cost;
      }
      if (json_msg.seller == 'enode4' || json_msg.contragent == 'enode4') {
        arrowDir3.directionfrom = json_msg.seller;
        arrowDir3.directionto = json_msg.contragent;
        arrowDir3.balance = json_msg.cost;
      }
      console.log("arrow direction %o %o %o", arrowDir4, arrowDir5, arrowDir3)
    }
    if (json_msg.port == 'enode4' && json_msg.port2 == "contracts") {
      console.log("arrow direction json %o", value)
      if (json_msg.seller == 'enode3' || json_msg.contragent == 'enode3') {
        arrowDir3.directionfrom = json_msg.seller;
        arrowDir3.directionto = json_msg.contragent;
        arrowDir3.balance = json_msg.cost;
      }
      if (json_msg.seller == 'enode1' || json_msg.contragent == 'enode1') {
        arrowDir6.directionfrom = json_msg.seller;
        arrowDir6.directionto = json_msg.contragent;
        arrowDir6.balance = json_msg.cost;
      }
      if (json_msg.seller == 'enode2' || json_msg.contragent == 'enode2') {
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
    let date_hour_min = date.getHours() + ":" + date.getMinutes()
    plot1.time = date_hour_min
    plot1.value = (arrow9.value + arrow10.value + arrow11.value + arrow12.value) * rout.balance

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
    console.log("plot1 %o", plot1)
    console.log("plot2 %o", plot2)
    console.log("plot3 %o", plot3)
    //TOPICS WHICH CONNECT WITH GRAPH
    if (true) {

      if ((json_msg.port == 'amigo' && json_msg.port2 == "set_price") ||
        (json_msg.port.toString().includes('enode') && json_msg.port2.toString().includes('load') && json_msg.port3 == "value") ||
        (json_msg.port.toString().includes('enode') && json_msg.port2 == "load" && json_msg.port3.toString().includes('relay'))) {
        console.log("plot1 db %o", plot1)
        let date_hour_min = date.getHours() + ":" + date.getMinutes()
        refTraditional = database.ref('plot/traditional/' + timestamp).set({
          time: date_hour_min,
          value: plot1.value
        });
      }

      if ((json_msg.port == 'amigo' && json_msg.port2 == "set_price") ||
        (json_msg.port.toString().includes('enode') && json_msg.port2.toString().includes('load') && json_msg.port3 == "value") ||
        (json_msg.port.toString().includes('enode') && json_msg.port2 == "load" && json_msg.port3.toString().includes('relay')) ||
        (json_msg.port.toString().includes('enode') && json_msg.port2 == "ext_battery") || (json_msg.port.toString().includes('enode') && json_msg.port2 == "gen")
      ) {
        let date_hour_min = date.getHours() + ":" + date.getMinutes()
        refDistribution = database.ref('plot/distributed/' + timestamp).set({
          time: date_hour_min,
          value: (plot2.value)
        });
      }
      //115,
      if ((json_msg.port.toString().includes('enode') && json_msg.port2.toString().includes('port') && json_msg.port3 == "power") ||
        (json_msg.port.toString().includes('enode') && json_msg.port2 == "contracts") ||
        (json_msg.port == 'amigo' && json_msg.port2 == "set_price") ||
        (json_msg.port.toString().includes('enode') && json_msg.port2.toString().includes('load') && json_msg.port3 == "value") ||
        (json_msg.port.toString().includes('enode') && json_msg.port2 == "load" && json_msg.port3.toString().includes('relay')) ||
        (json_msg.port == 'enode1' && json_msg.port2 == "ext_battery") || (json_msg.port.toString().includes('enode') && json_msg.port2 == "gen")
      ) {
        let date_hour_min = date.getHours() + ":" + date.getMinutes()
        refInternet = database.ref('plot/internet/' + timestamp).set({
          time: date_hour_min,
          value: (plot3.value)
        });
      }

      database.ref('plot/distributed').once("value", function(snapshot) {
          //console.log(snapshot.numChildren());

          snapshot.forEach((child) => {
            //console.log("vaaaaalue distributed" + child.key);
            var date = new Date();
            var timestamp = date.getTime();
            // console.log(child.key);
            if (timestamp - child.key > timeDelete * 1000 * 60) {
              // console.log("delete " + "");
              let userRef = database.ref('plot/distributed/' + child.key);
              userRef.remove()
            }
          });
        },
        function(errorObject) {
          console.log("The read failed: " + errorObject.code);
        });

      database.ref('plot/traditional').once("value", function(snapshot) {
          //console.log(snapshot.numChildren());

          snapshot.forEach((child) => {
            //console.log("vaaaaalue traditional" + child.key);
            var date = new Date();
            var timestamp = date.getTime();
            // console.log(child.key);
            if (timestamp - child.key > timeDelete * 1000 * 60) {
              // console.log("delete " + "");
              let userRef = database.ref('plot/traditional/' + child.key);
              userRef.remove()
            }
          });
        },
        function(errorObject) {
          console.log("The read failed: " + errorObject.code);
        });



      database.ref('plot/internet').once("value", function(snapshot) {
          //console.log(snapshot.numChildren());

          snapshot.forEach((child) => {
            //console.log("vaaaaalue internet" + child.key);
            var date = new Date();
            var timestamp = date.getTime();
            // console.log(child.key);
            if (timestamp - child.key > timeDelete * 1000 * 60) {
              // console.log("delete " + "");
              let userRef = database.ref('plot/internet/' + child.key);
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



        if (json_msg.count == 0) {
          if (json_msg.agent1 == 'Agent1') {
            cell1.status = true
            cell2.status = false
            cell3.status = false
            cell4.status = false
          }
          if (json_msg.agent1 == 'Agent2') {
            cell1.status = false
            cell2.status = true
            cell3.status = false
            cell4.status = false
          }
          if (json_msg.agent1 == 'Agent3') {
            cell1.status = false
            cell2.status = false
            cell3.status = true
            cell4.status = false
          }
          if (json_msg.agent1 == 'Agent4') {
            cell1.status = false
            cell2.status = false
            cell3.status = false
            cell4.status = true
          }
        }
        if (json_msg.count == 1) {
          if ((json_msg.agent1 == 'Agent1' && json_msg.agent2 == 'Agent2') || (json_msg.agent1 == 'Agent2' && json_msg.agent2 == 'Agent1')) {
            cell1.status = true
            cell2.status = true
            cell3.status = false
            cell4.status = false
          }
          if ((json_msg.agent1 == 'Agent2' && json_msg.agent2 == 'Agent3') || (json_msg.agent1 == 'Agent3' && json_msg.agent2 == 'Agent2')) {
            cell1.status = false
            cell2.status = true
            cell3.status = true
            cell4.status = false
          }
          if ((json_msg.agent1 == 'Agent3' && json_msg.agent2 == 'Agent4') || (json_msg.agent1 == 'Agent4' && json_msg.agent2 == 'Agent3')) {
            cell1.status = false
            cell2.status = false
            cell3.status = true
            cell4.status = true
          }
          if ((json_msg.agent1 == 'Agent3' && json_msg.agent2 == 'Agent1') || (json_msg.agent1 == 'Agent1' && json_msg.agent2 == 'Agent3')) {
            cell1.status = true
            cell2.status = false
            cell3.status = true
            cell4.status = false
          }
          if ((json_msg.agent1 == 'Agent4' && json_msg.agent2 == 'Agent1') || (json_msg.agent1 == 'Agent1' && json_msg.agent2 == 'Agent4')) {
            cell1.status = true
            cell2.status = false
            cell3.status = false
            cell4.status = true
          }
          if ((json_msg.agent1 == 'Agent4' && json_msg.agent2 == 'Agent2') || (json_msg.agent1 == 'Agent2' && json_msg.agent2 == 'Agent4')) {
            cell1.status = false
            cell2.status = true
            cell3.status = false
            cell4.status = true
          }


        }
        if (json_msg.count == 2) {
          cell1.status = false
          cell2.status = false
          cell3.status = false
          cell4.status = false
          if (json_msg.agent1 == 'Agent1' || json_msg.agent2 == 'Agent1' || json_msg.agent3 == 'Agent1') {
            cell1.status = true
          }
          if (json_msg.agent1 == 'Agent2' || json_msg.agent2 == 'Agent2' || json_msg.agent3 == 'Agent2') {
            cell2.status = true
          }
          if (json_msg.agent1 == 'Agent3' || json_msg.agent2 == 'Agent3' || json_msg.agent3 == 'Agent3') {
            cell3.status = true
          }
          if (json_msg.agent1 == 'Agent4' || json_msg.agent2 == 'Agent4' || json_msg.agent3 == 'Agent4') {
            cell4.status = true
          }
        }
        if (json_msg.count == 3) {
          cell1.status = true
          cell2.status = true
          cell3.status = true
          cell4.status = true
        }
      }

      ws.send(JSON.stringify(cell1))
      ws.send(JSON.stringify(cell2))
      ws.send(JSON.stringify(cell3))
      ws.send(JSON.stringify(cell4))

    } catch (ex) {
      console.log(ex)
    }




    ws.on('close', function() {
      mqttDATACells.stop();
      console.log('The connection was closed!');
    });
  }
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
    var json_msg = data;
    try {
      json_msg = JSON.parse(data)
      mqttDATA.publish113(json_msg.value)
    } catch (ex) {
      console.log(ex);
    }

  });

  ws.on('close', function() {
    mqttDATA.stop();
    console.log('The connection was closed!');
  });
});

app.ws('/agents', function(ws, req) {

  const mqttDATA = new mqtt_cl.ClientMQTT()
  mqttDATA.add_handler(handlerDATA)
  mqttDATA.start()
  ws.send(JSON.stringify(cell1))
  ws.send(JSON.stringify(cell2))
  ws.send(JSON.stringify(cell3))
  ws.send(JSON.stringify(cell4))

  function handlerDATA(type, value) {
    console.log("Receive new message %o", value)
    var json_msg = value;
    try {
      json_msg = JSON.parse(value)
      if (json_msg.port2 == 'known_agents') {
        console.log("agent json %o", value)



        if (json_msg.count == 0) {
          if (json_msg.agent1 == 'Agent1') {
            cell1.status = true
            cell2.status = false
            cell3.status = false
            cell4.status = false
          }
          if (json_msg.agent1 == 'Agent2') {
            cell1.status = false
            cell2.status = true
            cell3.status = false
            cell4.status = false
          }
          if (json_msg.agent1 == 'Agent3') {
            cell1.status = false
            cell2.status = false
            cell3.status = true
            cell4.status = false
          }
          if (json_msg.agent1 == 'Agent4') {
            cell1.status = false
            cell2.status = false
            cell3.status = false
            cell4.status = true
          }
        }
        if (json_msg.count == 1) {
          if ((json_msg.agent1 == 'Agent1' && json_msg.agent2 == 'Agent2') || (json_msg.agent1 == 'Agent2' && json_msg.agent2 == 'Agent1')) {
            cell1.status = true
            cell2.status = true
            cell3.status = false
            cell4.status = false
          }
          if ((json_msg.agent1 == 'Agent2' && json_msg.agent2 == 'Agent3') || (json_msg.agent1 == 'Agent3' && json_msg.agent2 == 'Agent2')) {
            cell1.status = false
            cell2.status = true
            cell3.status = true
            cell4.status = false
          }
          if ((json_msg.agent1 == 'Agent3' && json_msg.agent2 == 'Agent4') || (json_msg.agent1 == 'Agent4' && json_msg.agent2 == 'Agent3')) {
            cell1.status = false
            cell2.status = false
            cell3.status = true
            cell4.status = true
          }
          if ((json_msg.agent1 == 'Agent3' && json_msg.agent2 == 'Agent1') || (json_msg.agent1 == 'Agent1' && json_msg.agent2 == 'Agent3')) {
            cell1.status = true
            cell2.status = false
            cell3.status = true
            cell4.status = false
          }
          if ((json_msg.agent1 == 'Agent4' && json_msg.agent2 == 'Agent1') || (json_msg.agent1 == 'Agent1' && json_msg.agent2 == 'Agent4')) {
            cell1.status = true
            cell2.status = false
            cell3.status = false
            cell4.status = true
          }
          if ((json_msg.agent1 == 'Agent4' && json_msg.agent2 == 'Agent2') || (json_msg.agent1 == 'Agent2' && json_msg.agent2 == 'Agent4')) {
            cell1.status = false
            cell2.status = true
            cell3.status = false
            cell4.status = true
          }


        }
        if (json_msg.count == 2) {
          cell1.status = false
          cell2.status = false
          cell3.status = false
          cell4.status = false
          if (json_msg.agent1 == 'Agent1' || json_msg.agent2 == 'Agent1' || json_msg.agent3 == 'Agent1') {
            cell1.status = true
          }
          if (json_msg.agent1 == 'Agent2' || json_msg.agent2 == 'Agent2' || json_msg.agent3 == 'Agent2') {
            cell2.status = true
          }
          if (json_msg.agent1 == 'Agent3' || json_msg.agent2 == 'Agent3' || json_msg.agent3 == 'Agent3') {
            cell3.status = true
          }
          if (json_msg.agent1 == 'Agent4' || json_msg.agent2 == 'Agent4' || json_msg.agent3 == 'Agent4') {
            cell4.status = true
          }
        }
        if (json_msg.count == 3) {
          cell1.status = true
          cell2.status = true
          cell3.status = true
          cell4.status = true
        }



        ws.send(JSON.stringify(cell1))
        ws.send(JSON.stringify(cell2))
        ws.send(JSON.stringify(cell3))
        ws.send(JSON.stringify(cell4))
      }
    } catch (ex) {
      console.log(ex));
  }


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

      if (json_msg.port == 'enode1' && json_msg.port2 == "load1" && json_msg.port3 == "value") {
        console.log("arrow912  json %o", value)
        arrow9pre.value1 = json_msg.value;
        console.log("arrow912 %o", arrow9pre)
      }
      if (json_msg.port == 'enode1' && json_msg.port2 == "load2" && json_msg.port3 == "value") {
        console.log("arrow912  json %o", value)
        arrow9pre.value2 = json_msg.value;
        console.log("arrow912 %o", arrow9pre)
      }
      if (json_msg.port == 'enode1' && json_msg.port2 == "load3" && json_msg.port3 == "value") {
        console.log("arrow912  json %o", value)
        arrow9pre.value3 = json_msg.value;
        console.log("arrow912 %o", arrow9pre)
      }

      if (json_msg.port == 'enode2' && json_msg.port2 == "load1" && json_msg.port3 == "value") {
        console.log("arrow912  json %o", value)
        arrow10pre.value1 = json_msg.value;
        console.log("arrow912 %o", arrow10pre)
      }
      if (json_msg.port == 'enode2' && json_msg.port2 == "load2" && json_msg.port3 == "value") {
        console.log("arrow912  json %o", value)
        arrow10pre.value2 = json_msg.value;
        console.log("arrow912 %o", arrow10pre)
      }
      if (json_msg.port == 'enode2' && json_msg.port2 == "load3" && json_msg.port3 == "value") {
        console.log("arrow912  json %o", value)
        arrow10pre.value3 = json_msg.value;
        console.log("arrow812 %o", arrow10pre)
      }


      if (json_msg.port == 'enode3' && json_msg.port2 == "load1" && json_msg.port3 == "value") {
        console.log("arrow912  json %o", value)
        arrow11pre.value1 = json_msg.value;
        console.log("arrow912 %o", arrow11pre)
      }
      if (json_msg.port == 'enode3' && json_msg.port2 == "load2" && json_msg.port3 == "value") {
        console.log("arrow912  json %o", value)
        arrow11pre.value2 = json_msg.value;
        console.log("arrow912 %o", arrow11pre)
      }
      if (json_msg.port == 'enode3' && json_msg.port2 == "load3" && json_msg.port3 == "value") {
        console.log("arrow912  json %o", value)
        arrow11pre.value3 = json_msg.value;
        console.log("arrow812 %o", arrow11pre)
      }



      if (json_msg.port == 'enode4' && json_msg.port2 == "load1" && json_msg.port3 == "value") {
        console.log("arrow912  json %o", value)
        arrow12pre.value1 = json_msg.value;
        console.log("arrow912 %o", arrow12pre)
      }
      if (json_msg.port == 'enode4' && json_msg.port2 == "load2" && json_msg.port3 == "value") {
        console.log("arrow912  json %o", value)
        arrow12pre.value2 = json_msg.value;
        console.log("arrow912 %o", arrow12pre)
      }
      if (json_msg.port == 'enode4' && json_msg.port2 == "load3" && json_msg.port3 == "value") {
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
      let date_hour_min = date.getHours() + ":" + date.getMinutes()
      plot1.time = date_hour_min
      plot1.value = (arrow9.value + arrow10.value + arrow11.value + arrow12.value) * rout.balance
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
    var json_msg = data;
    try {
      json_msg = JSON.parse(data)
      if (json_msg.id >= 1 && json_msg.id <= 4) {
        mqttDATA.publish77(json_msg.id, json_msg.status)
        mqttDATA.publish77(json_msg.id, !json_msg.status)
      }
      if (json_msg.id == 5) {
        mqttDATA.publish73(1, json_msg.status)
        mqttDATA.publish73(1, !json_msg.status)
      }
      if (json_msg.id == 7) {
        mqttDATA.publish73(3, json_msg.status)
        mqttDATA.publish73(3, !json_msg.status)
      }
      if (json_msg.id == 9) {
        mqttDATA.publish73(2, json_msg.status)
        mqttDATA.publish73(2, !json_msg.status)
      }
      if (json_msg.id == 11) {
        mqttDATA.publish73(4, json_msg.status)
        mqttDATA.publish73(4, !json_msg.status)
      }
    } catch (ex) {
      console.log(ex)
    }
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
        console.log("arrow direction json %o", value)
        if (json_msg.seller == 'enode2' || json_msg.contragent == 'enode2') {
          arrowDir1.directionfrom = json_msg.seller;
          arrowDir1.directionto = json_msg.contragent;
          arrowDir1.balance = json_msg.cost;
        }
        if (json_msg.seller == 'enode4' || json_msg.contragent == 'enode4') {
          arrowDir6.directionfrom = json_msg.seller;
          arrowDir6.directionto = json_msg.contragent;
          arrowDir6.balance = json_msg.cost;
        }
        if (json_msg.seller == 'enode3' || json_msg.contragent == 'enode3') {
          arrowDir4.directionfrom = json_msg.seller;
          arrowDir4.directionto = json_msg.contragent;
          arrowDir4.balance = json_msg.cost;
        }
        console.log("arrow direction %o %o %o", arrowDir1, arrowDir6, arrowDir4)
      }
      if (json_msg.port == 'enode2' && json_msg.port2 == "contracts") {
        console.log("arrow direction json %o", value)
        if (json_msg.seller == 'enode1' || json_msg.contragent == 'enode1') {
          arrowDir1.directionfrom = json_msg.seller;
          arrowDir1.directionto = json_msg.contragent;
          arrowDir1.balance = json_msg.cost;
        }
        if (json_msg.seller == 'enode3' || json_msg.contragent == 'enode3') {
          arrowDir5.directionfrom = json_msg.seller;
          arrowDir5.directionto = json_msg.contragent;
          arrowDir5.balance = json_msg.cost;
        }
        if (json_msg.seller == 'enode4' || json_msg.contragent == 'enode4') {
          arrowDir2.directionfrom = json_msg.seller;
          arrowDir2.directionto = json_msg.contragent;
          arrowDir2.balance = json_msg.cost;
        }
        console.log("arrow direction %o %o %o", arrowDir1, arrowDir5, arrowDir2)
      }
      if (json_msg.port == 'enode3' && json_msg.port2 == "contracts") {
        console.log("arrow direction json %o", value)
        if (json_msg.seller == 'enode1' || json_msg.contragent == 'enode1') {
          arrowDir4.directionfrom = json_msg.seller;
          arrowDir4.directionto = json_msg.contragent;
          arrowDir4.balance = json_msg.cost;
        }
        if (json_msg.seller == 'enode2' || json_msg.contragent == 'enode2') {
          arrowDir5.directionfrom = json_msg.seller;
          arrowDir5.directionto = json_msg.contragent;
          arrowDir5.balance = json_msg.cost;
        }
        if (json_msg.seller == 'enode4' || json_msg.contragent == 'enode4') {
          arrowDir3.directionfrom = json_msg.seller;
          arrowDir3.directionto = json_msg.contragent;
          arrowDir3.balance = json_msg.cost;
        }
        console.log("arrow direction %o %o %o", arrowDir4, arrowDir5, arrowDir3)
      }
      if (json_msg.port == 'enode4' && json_msg.port2 == "contracts") {
        console.log("arrow direction json %o", value)
        if (json_msg.seller == 'enode3' || json_msg.contragent == 'enode3') {
          arrowDir3.directionfrom = json_msg.seller;
          arrowDir3.directionto = json_msg.contragent;
          arrowDir3.balance = json_msg.cost;
        }
        if (json_msg.seller == 'enode1' || json_msg.contragent == 'enode1') {
          arrowDir6.directionfrom = json_msg.seller;
          arrowDir6.directionto = json_msg.contragent;
          arrowDir6.balance = json_msg.cost;
        }
        if (json_msg.seller == 'enode2' || json_msg.contragent == 'enode2') {
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
      var date = new Date()
      let date_hour_min = date.getHours() + ":" + date.getMinutes()
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
    var json_msg = data;
    try {
      json_msg = JSON.parse(data)
      if (json_msg.id >= 1 && json_msg.id <= 6) {
        mqttDATA.publish67(json_msg.id, json_msg.status)
        mqttDATA.publish67(json_msg.id, !json_msg.status)
      }
    } catch (ex) {
      console.log(ex)
    }
  });
  ws.on('close', function() {
    mqttDATA.stop();
    console.log('The connection was closed!');
  });
});

app.ws('/plot', function(ws, req) {
  // ws.setKeepAlive(true)
  // void async function() {
  //
  //   let i = 1000;
  //   do {
  //     var date = new Date()
  //     let date_hour_min = date.getHours() + ":" + date.getMinutes()
  //     plot1.time = date_hour_min
  //     plot2.time = date_hour_min
  //     plot3.time = date_hour_min
  //     console.log("plot1 %o", plot1)
  //     console.log("plot2 %o", plot2)
  //     console.log("plot3 %o", plot3)
  //     ws.send(JSON.stringify(plot1))
  //     ws.send(JSON.stringify(plot2))
  //     ws.send(JSON.stringify(plot3))
  //     await msleep(1000);
  //   }
  //   while (i-- > 0)
  // }();


  const mqttDATA = new mqtt_cl.ClientMQTT()
  mqttDATA.add_handler(handlerDATA)
  mqttDATA.start()
  ws.send(JSON.stringify(plot1))

  function handlerDATA(type, value) {
    let json_msg = value;
    try {
      json_msg = JSON.parse(value)
      if ((json_msg.port == 'amigo' && json_msg.port2 == "set_price") ||
        (json_msg.port.toString().includes('enode') && json_msg.port2.toString().includes('load') && json_msg.port3 == "value") ||
        (json_msg.port.toString().includes('enode') && json_msg.port2 == "load" && json_msg.port3.toString().includes('relay'))) {
        console.log("plot1 %o", plot1)
        ws.send(JSON.stringify(plot1))
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

      if ((json_msg.port == 'amigo' && json_msg.port2 == "set_price") ||
        (json_msg.port.toString().includes('enode') && json_msg.port2.toString().includes('load') && json_msg.port3 == "value") ||
        (json_msg.port.toString().includes('enode') && json_msg.port2 == "load" && json_msg.port3.toString().includes('relay')) ||
        (json_msg.port == 'enode1' && json_msg.port2 == "ext_battery") || (json_msg.port.toString().includes('enode') && json_msg.port2 == "gen")
      ) {
        console.log("plot2 %o", plot2)
        ws.send(JSON.stringify(plot2))
      }

      if ((json_msg.port.toString().includes('enode') && json_msg.port2.toString().includes('port') && json_msg.port3 == "power") ||
        (json_msg.port.toString().includes('enode') && json_msg.port2 == "contracts") ||
        (json_msg.port == 'amigo' && json_msg.port2 == "set_price") ||
        (json_msg.port.toString().includes('enode') && json_msg.port2.toString().includes('load') && json_msg.port3 == "value") ||
        (json_msg.port.toString().includes('enode') && json_msg.port2 == "load" && json_msg.port3.toString().includes('relay')) ||
        (json_msg.port == 'enode1' && json_msg.port2 == "ext_battery") || (json_msg.port.toString().includes('enode') && json_msg.port2 == "gen")
      ) {
        console.log("plot3 %o", plot3)
        ws.send(JSON.stringify(plot3))
      }

    } catch (ex) {
      console.log(ex)
    }
  }

  ws.on('close', function() {
    // mqttDATA.stop();
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
      if ((json_msg.port == 'emeter1' || json_msg.port == 'emeter2' ||
          json_msg.port == 'emeter3' || json_msg.port == 'emeter4') && json_msg.port2 == "power") {
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



app.get('/login', function(req, res) {
  res.set("Access-Control-Allow-Origin", "*")
  if (req.query.password == password_str) {
    res.send('true');
  } else {
    res.send('false');
  }
});

app.get('/data', function(req, res) {
  res.set("Access-Control-Allow-Origin", "*")

  ref.once("value", function(snapshot) {
    console.log(snapshot.numChildren());
    res.send(snapshot.val())
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
});
//
app.listen(process.env.PORT || config.port, function() {
  console.log("Server started on %o", process.env.PORT);
})
