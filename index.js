const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

let final = 0;

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/gradeCalculator.html");
});

app.post("/", function (req, res) {
  let grade1 = req.body.first;
  let grade2 = req.body.second;
  let grade3 = req.body.third;
  let grade4 = req.body.fourth;
  let grade5 = req.body.fifth;

  let credit1 = Number(req.body.firstc);
  let credit2 = Number(req.body.secondc);
  let credit3 = Number(req.body.thirdc);
  let credit4 = Number(req.body.fourthc);
  let credit5 = Number(req.body.fifthc);

  let gradearr = [];
  gradearr.push(grade1);
  gradearr.push(grade2);
  gradearr.push(grade3);
  gradearr.push(grade4);
  gradearr.push(grade5);

  let creditarr = [];
  creditarr.push(credit1);
  creditarr.push(credit2);
  creditarr.push(credit3);
  creditarr.push(credit4);
  creditarr.push(credit5);

  let cumGrade = Number(req.body.cumGpa);
  gradearr.push(cumGrade);
  let cumCredit = Number(req.body.cumCredits);
  creditarr.push(cumCredit);

  let sum = 0;
  let credits = credit1 + credit2 + credit3 + credit4 + credit5 + cumCredit;

  for (let i = 0; i < gradearr.length; i++) {
    let grade = gradearr[i];
    let credit = creditarr[i];
    if (!credit > 0) {
      credit = 0;
    }

    if (grade === "A") {
      sum += 4 * credit;
    } else if (grade === "A-") {
      sum += 3.67 * credit;
    } else if (grade === "B+") {
      sum += 3.33 * credit;
    } else if (grade === "B") {
      sum += 3 * credit;
    } else if (grade === "B-") {
      sum += 2.67 * credit;
    } else if (grade === "C+") {
      sum += 2.33 * credit;
    } else if (grade === "C") {
      sum += 2 * credit;
    } else if (grade === "C-") {
      sum += 1.67 * credit;
    } else if (grade === "D+") {
      sum += 1.33 * credit;
    } else if (grade === "D") {
      sum += 1 * credit;
    } else if (grade === "D-") {
      sum += 0.67 * credit;
    } else if (!isNaN(grade)) {
      sum += grade * credit;
    } else {
      sum += 0 * credit;
    }
  }

  final = (sum / credits).toFixed(2);

  res.render("outcome", { finalGpa: final, totalCredits: credits });
});

app.post("/outcome", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on 3000");
});
