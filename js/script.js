const buttons = document.querySelectorAll(".buttons button");
const board = document.querySelector(".board");
const players = document.querySelectorAll(".board .player");
const question = document.querySelectorAll(".monitor .tanya span");
const answer = document.querySelectorAll(".monitor .jawab span");
const param = new URLSearchParams(window.location.search);
const kataKata = ["Tidak menang bukan berarti kalah.", "Jangan membatasi dirimu sendiri.", "Jangan menyerah disaat akan berhasil.", "Memang tidak mudah, tapi Pasti Bisa.", "Optimis, Tuhan bersama prasangka hamba-Nya."];
const sound = new Audio("sfx/sound1.wav");

function playSound() {
  sound.currentTime = 0.1;
  sound.play();
}

const ObjGame = {
  player: [
    { name: "<i>Tidak Ada</i>", score: 0, pos: 0 },
    { name: "<i>Tidak Ada</i>", score: 0, pos: 0 },
    { name: "<i>Tidak Ada</i>", score: 0, pos: 0 },
  ],
  extra: 0,
  time: 120,
  question: [0],
  start: false,
};
ObjGame.room = param.get("room");

const setValidate = function (elem, text = "") {
  elem.classList.remove("is-valid");
  elem.classList.add("is-invalid");
  elem.parentElement.querySelector(".invalid-feedback").innerHTML = text;
};
if (window.sessionStorage.getItem("nama")) {
  apiJoin();
  greeting.innerHTML = "Hallo, Selamat datang <strong class='text-capitalize'>" + window.sessionStorage.getItem("nama") + "</strong>!";
} else {
  let inputNama = document.querySelector("#inputNama");
  let input = inputNama.querySelector("input");
  swal({
    content: inputNama,
    button: false,
    closeOnClickOutside: false,
    closeOnEsc: true,
  });
  let valid = false;
  input.focus();
  input.oninput = function () {
    if (this.value.charAt(0) === " ") this.value = this.value.substr(1);
    this.value = this.value.replace(/\s\s+/g, " ");
    if (this.value.length == 0) setValidate(this, "Seriusan gaada nama?");
    else if (!/^[a-zA-Z ]+$/.test(this.value)) setValidate(this, "Jangan aneh-aneh deh.");
    else if (this.value.length > 15) setValidate(this, "Jangan kepanjangan atuh.");
    else if (this.value.length < 5) setValidate(this, "Namanya pendek banget ihh.");
    else {
      this.classList.remove("is-invalid");
      this.classList.add("is-valid");
      return (valid = true);
    }
    return (valid = false);
  };
  inputNama.onsubmit = (e) => {
    e.preventDefault();
    if (!valid) return;
    swal.close();
    window.sessionStorage.setItem("nama", input.value.trim().toLocaleLowerCase());
    apiJoin();
    greeting.innerHTML = "Hallo, Selamat datang <strong class='text-capitalize'>" + window.sessionStorage.getItem("nama") + "</strong>!";
  };
}

// Mengecek apakah room sudah penuh atau belum
function apiJoin() {
  $.ajax({
    method: "POST",
    data: "room=" + ObjGame.room + "&nama=" + window.sessionStorage.getItem("nama"),
    // async: false,
    url: " https://6830-112-215-171-63.ap.ngrok.io/project/Game/join.php",
    success: function (response) {
      response = JSON.parse(response);
      if (response.player > 0 && response.player < 4) {
        ObjGame.start = true;
        ObjGame.saya = response.player - 1;

        apiPrestart();
        return;
      }
      swal("Punten Slur!", "Room sudah penuh. Silahkan buat room yang baru.", "error", { button: "Oke Siap!", time: 10000 }).then((el) => {
        document.location.href = " https://6830-112-215-171-63.ap.ngrok.io/project/Game";
      });
    },
  });
}

function ajaxPrestart() {
  $.ajax({
    method: "POST",
    data: "room=" + ObjGame.room + "&nama=" + window.sessionStorage.getItem("nama"),
    // async: false,
    url: " https://6830-112-215-171-63.ap.ngrok.io/project/Game/prestart.php",
    success: function (response) {
      // console.log(response);
      response = JSON.parse(response);
      let data = response.question.split(",");
      let beda = () => {
        for (let i = 0; i < ObjGame.question.length; i++) {
          if (ObjGame.question[i] != data[i]) return true;
        }
      };

      if (beda()) {
        clearInterval(prestart);
        ObjGame.question = data;

        response.timer = Math.round(new Date().getTime() / 1000) - parseInt(response.timer);
        if (response.timer > 120) response.timer = 120;
        ObjGame.time = response.timer;
        setTimer(response.timer);

        for (let i = 0; i < question.length; i++) {
          question[i].innerHTML = ObjGame.question[i];
        }
        answer.forEach((e) => (e.innerHTML = ""));
        for (let i = 0; i < response.pos; i++) {
          answer[i].innerHTML = 0;
        }
        if (response.pos > 44) {
          ObjGame.start = false;
          response.pos = 44;
        }
        let id = ObjGame.player[ObjGame.saya].pos === 45 ? (ObjGame.player[ObjGame.saya].pos = 44) : ObjGame.player[ObjGame.saya].pos;
        // answer[ObjGame.player[ObjGame.saya].pos].classList.remove("p" + ObjGame.saya);
        answer[id].classList.remove("p1", "p2", "p3");
        ObjGame.player[ObjGame.saya].pos = response.pos;
        answer[ObjGame.player[ObjGame.saya].pos].classList.add("p" + (ObjGame.saya + 1));

        start();
      }
      ObjGame.player[0].nama = response.p1name;
      ObjGame.player[1].nama = response.p2name;
      ObjGame.player[2].nama = response.p3name;
      players[0].querySelector(".nama").innerHTML = response.p1name;
      players[1].querySelector(".nama").innerHTML = response.p2name;
      players[2].querySelector(".nama").innerHTML = response.p3name;
    },
  });
}

function ajaxStart() {
  $.ajax({
    method: "POST",
    data: "room=" + ObjGame.room,
    // async: false,
    url: " https://6830-112-215-171-63.ap.ngrok.io/project/Game/api.php",
    success: function (response) {
      response = JSON.parse(response);
      // console.log(response.waktu, response.p1score, response.p2score, response.p3score);
      ObjGame.time = response.timer;
      if (response.p1pos > 44) response.p1pos = 44;
      if (response.p2pos > 44) response.p2pos = 44;
      if (response.p3pos > 44) response.p3pos = 44;
      setData(response);
      if (!response.start) {
        clearInterval(startInt);
        stop();
      }
    },
  });
}

function apiPrestart() {
  ajaxPrestart();
  prestart = setInterval(ajaxPrestart, 1000);
}
function apiStart() {
  // ajaxStart();
  startInt = setInterval(ajaxStart, 1000);
}
function setQuestion() {
  $.ajax({
    method: "POST",
    data: "room=" + ObjGame.room,
    // async: false,
    url: " https://6830-112-215-171-63.ap.ngrok.io/project/Game/start.php",
  });
}
function apiUpdate() {
  $.ajax({
    method: "POST",
    data: `room=${ObjGame.room}&id=${ObjGame.saya}&aidi=${ObjGame.player[ObjGame.saya].pos}&time=${ObjGame.time}`,
    url: " https://6830-112-215-171-63.ap.ngrok.io/project/Game/update.php",
  });
}
function setTimer(now) {
  try {
    clearInterval(timerInt);
  } catch (error) {
    // console.log("error");
  }
  let x = 120 - now;
  btnStart.innerHTML = "Waktu: " + x + " Detik";
  timerInt = setInterval(() => {
    if (x <= 0) clearInterval(timerInt);
    btnStart.innerHTML = "Waktu: " + x + " Detik";
    x--;
  }, 1000);
}
function start() {
  // ajaxStart();
  apiStart();
  ObjGame.start = true;
  btnStart.classList.replace("btn-primary", "btn-outline-primary");
  btnStart.disabled = true;
}
function stop() {
  apiPrestart();
  ObjGame.start = false;
  btnStart.innerHTML = "Mulai Permainan";
  btnStart.classList.replace("btn-outline-primary", "btn-primary");
  setTimeout(() => {
    btnStart.disabled = false;
  }, 3000);
  swal({
    title: "Berakhir!",
    icon: "success",
    text: kataKata[Math.floor(Math.random() * kataKata.length)],
    timer: 3000,
    // time: 1000,
  });
}

function setPlayer1(response) {
  answer[ObjGame.player[0].pos].classList.remove("p1");
  answer[response.p1pos].classList.add("p1");
  ObjGame.player[0].pos = response.p1pos;
}
function setPlayer2(response) {
  answer[ObjGame.player[1].pos].classList.remove("p2");
  answer[response.p2pos].classList.add("p2");
  ObjGame.player[1].pos = response.p2pos;
}
function setPlayer3(response) {
  answer[ObjGame.player[2].pos].classList.remove("p3");
  answer[response.p3pos].classList.add("p3");
  ObjGame.player[2].pos = response.p3pos;
}

function setData(response) {
  // console.log(response);
  if (ObjGame.saya == 0) {
    setPlayer2(response);
    setPlayer3(response);
  } else if (ObjGame.saya == 1) {
    setPlayer1(response);
    setPlayer3(response);
  } else if (ObjGame.saya == 2) {
    setPlayer1(response);
    setPlayer2(response);
  }

  response.p1score = parseInt(response.p1score);
  response.p2score = parseInt(response.p2score);
  response.p3score = parseInt(response.p3score);
  players[0].querySelector(".score").innerHTML = response.p1score;
  players[1].querySelector(".score").innerHTML = response.p2score;
  players[2].querySelector(".score").innerHTML = response.p3score;

  if (response.p1score >= response.p2score && response.p1score >= response.p3score) {
    players[0].classList.remove("no2", "no3");
    players[0].classList.add("no1");
    if (response.p2score >= response.p3score) {
      players[1].classList.remove("no1", "no3");
      players[1].classList.add("no2");
      players[2].classList.remove("no1", "no2");
      players[2].classList.add("no3");
    } else {
      players[2].classList.remove("no1", "no3");
      players[2].classList.add("no2");
      players[1].classList.remove("no1", "no2");
      players[1].classList.add("no3");
    }
  } else if (response.p2score >= response.p1score && response.p2score >= response.p3score) {
    players[1].classList.remove("no2", "no3");
    players[1].classList.add("no1");
    if (response.p1score >= response.p3score) {
      players[0].classList.remove("no1", "no3");
      players[0].classList.add("no2");
      players[2].classList.remove("no1", "no2");
      players[2].classList.add("no3");
    } else {
      players[2].classList.remove("no1", "no3");
      players[2].classList.add("no2");
      players[0].classList.remove("no1", "no2");
      players[0].classList.add("no3");
    }
  } else if (response.p3score >= response.p1score && response.p3score >= response.p2score) {
    players[2].classList.remove("no2", "no3");
    players[2].classList.add("no1");
    if (response.p1score >= response.p2score) {
      players[0].classList.remove("no1", "no3");
      players[0].classList.add("no2");
      players[1].classList.remove("no1", "no2");
      players[1].classList.add("no3");
    } else {
      players[1].classList.remove("no1", "no3");
      players[1].classList.add("no2");
      players[0].classList.remove("no1", "no2");
      players[0].classList.add("no3");
    }
  }
}

const worker = new Worker("js/worker.js");
worker.addEventListener("message", (e) => {
  if (!e.data.benar) return;
  let pos = e.data.pos;
  if (pos < 45) {
    ObjGame.player[ObjGame.saya].pos += 1;
    answer[pos].innerHTML = e.data.hasil;
  }
  apiUpdate();
  if (pos == 44) return (ObjGame.start = false);
  answer[ObjGame.player[ObjGame.saya].pos - 1].classList.remove("p" + (ObjGame.saya + 1));
  answer[ObjGame.player[ObjGame.saya].pos].classList.add("p" + (ObjGame.saya + 1));
});

buttons.forEach((elem) => {
  elem.onclick = function () {
    if (!ObjGame.start) return;
    playSound();
    worker.postMessage({
      pos: ObjGame.player[ObjGame.saya].pos,
      btn: this.getAttribute("data-btn"),
      question: ObjGame.question,
    });
  };
});
btnStart.onclick = function () {
  this.disabled = true;
  setQuestion();
};
