addEventListener("message", function (e) {
  let iJawab = e.data.pos;
  let extra;
  if (iJawab > 35) extra = 4;
  else if (iJawab > 26) extra = 3;
  else if (iJawab > 17) extra = 2;
  else if (iJawab > 8) extra = 1;
  else if (iJawab >= 0) extra = 0;
  let iTanya = iJawab + extra;
  let hasil = (parseInt(e.data.question[iTanya]) + parseInt(e.data.question[iTanya + 1])) % 10;
  if (hasil == e.data.btn) {
    this.postMessage({ benar: true, pos: e.data.pos, hasil: hasil });
    return;
  }
  // this.postMessage({ benar: false });
});
