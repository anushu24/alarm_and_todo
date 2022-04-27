setInterval(() => {
    d = new Date();
    htime = d.getHours();
    mtime = d.getMinutes();
    stime = d.getSeconds();
    hrotation = 30*htime + mtime/2;
    mrotation = 6*mtime;
    srotation = 6*stime;

    hour.style.transform = `rotate(${hrotation}deg)`;
    minute.style.transform = `rotate(${mrotation}deg)`;
    second.style.transform = `rotate(${srotation}deg)`;
}, 1000);

var alarmC = {
  init : function () {
  // ac.init() : start the alarm clock
    // Get the current time - hour, min, seconds
    alarmC.chr = document.getElementById("chr");
    alarmC.cmin = document.getElementById("cmin");
    alarmC.csec = document.getElementById("csec");

    // The time picker - Hr, Min, Sec
    alarmC.thr = alarmC.createSel(23);
    document.getElementById("tpick-h").appendChild(alarmC.thr);
    alarmC.thm = alarmC.createSel(59);
    document.getElementById("tpick-m").appendChild(alarmC.thm);
    alarmC.ths = alarmC.createSel(59);
    document.getElementById("tpick-s").appendChild(alarmC.ths);

    // The time picker - Set, reset
    alarmC.tset = document.getElementById("tset");
    alarmC.tset.addEventListener("click", alarmC.set);
    alarmC.treset = document.getElementById("treset");
    alarmC.treset.addEventListener("click", alarmC.reset);

    // The alarm sound
    alarmC.sound = document.getElementById("alarm-sound");

    // Start the clock
    alarmC.alarm = null;
    setInterval(alarmC.tick, 1000);
  },

  createSel : function (max) {
  // createSel() : support function - creates a selector for hr, min, sec

    var selector = document.createElement("select");
    for (var i=0; i<=max; i++) {
      var opt = document.createElement("option");
      i = alarmC.padzero(i);
      opt.value = i;
      opt.innerHTML = i;
      selector.appendChild(opt);
    }
    return selector
  },

  padzero : function (num) {
  // ac.padzero() : support function - pads hr, min, sec with 0 if <10

    if (num < 10) { num = "0" + num; }
    else { num = num.toString(); }
    return num;
  },

  tick : function () {
  // ac.tick() : update the current time

    // Current time
    var now = new Date();
    var hr = alarmC.padzero(now.getHours());
    var min = alarmC.padzero(now.getMinutes());
    var sec = alarmC.padzero(now.getSeconds());

    // Update current clock
    alarmC.chr.innerHTML = hr;
    alarmC.cmin.innerHTML = min;
    alarmC.csec.innerHTML = sec;

    // Check and sound alarm
    if (alarmC.alarm != null) {
      now = hr + min + sec;
      if (now == alarmC.alarm) {
        if (alarmC.sound.paused) {
          alarmC.sound.play();
        }
      }
    }
  },

  set : function () {
  // ac.set() : set the alarm

    alarmC.alarm = alarmC.thr.value + alarmC.thm.value + alarmC.ths.value;
    alarmC.thr.disabled = true;
    alarmC.thm.disabled = true;
    alarmC.ths.disabled = true;
    alarmC.tset.disabled = true;
    alarmC.treset.disabled = false;
  },

  reset : function () {
  // ac.reset() : reset the alarm

    if (!alarmC.sound.paused) {
      alarmC.sound.pause();
    }
    alarmC.alarm = null;
    alarmC.thr.disabled = false;
    alarmC.thm.disabled = false;
    alarmC.ths.disabled = false;
    alarmC.tset.disabled = false;
    alarmC.treset.disabled = true;
  }
};

// INIT - RUN ALARM CLOCK
window.addEventListener("load", alarmC.init);
