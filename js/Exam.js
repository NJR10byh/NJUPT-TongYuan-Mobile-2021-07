var timer = null;
var teacherId = "";
var chance = "";

// Exam.html
function Show() {
  teacherId = location.href.split("=")[1].split("&")[0];
  chance = location.href.split("=")[2];
  if (chance == 0) {
    document.getElementById("btntext").innerHTML = "查看答案";
  }
  document.getElementById("Outside").style.opacity = "1";
  // console.log("aaa");
  document.getElementById("time").style.opacity = "1";
  var m = 60;
  var s = 0;
  timer = setInterval(function () {
    if (m >= 0) {
      if (s < 10) {
        $("#time").html("剩余时间: " + "&nbsp" + m + ":0" + s);
      } else {
        $("#time").html("剩余时间: " + "&nbsp" + m + ":" + s);
      }
      if (m == 1 && s == 0) {
        alert("答题时间仅剩 3 分钟，时间到题目将自动提交！！");
      }
      if (m == 0 && s == 0) {
        submit();
        clearInterval(timer);
        alert("时间到，题目已自动提交！");
      }
      s--;
      if (s < 0) {
        s = 59;
        m--;
      }
    }
  }, 1000);
}
function two_char(n) {
  return n >= 10 ? n : "0" + n;
}

//自动跳转到下一个输入框
function focusNextInput(thisInput) {
  var inputs = document.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    // 如果是最后一个，则焦点回到第一个
    if (i == (inputs.length - 1)) {
      // inputs[0].focus();
      break;
    } else if (thisInput == inputs[i]) {
      inputs[i + 1].focus();
      break;
    }
  }
}

// 标准答案集合
var Answer = [
  "富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法治", "爱国", "敬业", "诚信", "友善",
  "信达天下", "自强不息",
  "厚德", "弘毅", "求是", "笃行",
  "勤奋", "求实", "进取", "创新",
  "长", "大", "强",
  "家国情怀深", "思想品德优", "专业素养好 ", "工作能力强",
  "博学", "温习", "牢记", "践行", "不争",
  "尊师重道", "态度谦虚", "上课守时",
  "弘扬美德", "追求理想", "健全人格",
  "用语文明", "耐心倾听", "诚恳友善",
  "面容整洁", "衣着得体", "文雅稳重",
  "爱惜粮食", "排队守序", "文明用餐",
  "遵守交规", "扶老助弱", "律己敬人",
  "爱护环境", "尊重民俗", "礼貌喝彩",
  "热爱学习", "目标明确", "学风严谨",
  "服务他人", "热心公益", "奉献社会",
  "物品整齐", "安全卫生", "团结友爱",
  "转变角色", "聆听教导", "重塑目标",
  "庄严宣誓", "不忘初心", "牢记使命",
  "铭记友情", "文明离校",
  "以刻苦学习为荣", "以虚度光阴为耻", "以求真务实为荣", "以作假抄袭为耻", "以课堂守纪为荣", "以旷课迟到为耻", "以严守考纪为荣", "以违纪作弊为耻"
];

// 上传分数
function uploadScore(score) {
  if (location.href.split("=")[2] != 0) {
    // 上传分数
    axios
      .post("http://1.117.224.204/teacher/upScore", {
        "teacherId": teacherId,
        "score": score,
      })
      .then((res) => {
        // console.log(res);
        switch (true) {
          case (score < 90):
            document.getElementById("lostpage1").style.display = "none";
            document.getElementById("lostpage2").style.display = "none";
            if (location.href.split("=")[2] > 1) {
              document.getElementById("lostpage1").style.display = "block";
              document.getElementById("lostpage").style.opacity = "1";
            } else {
              document.getElementById("lostpage2").style.display = "block";
              document.getElementById("lostpage").style.opacity = "1";
            }
            break;
          case (score >= 90 && score < 95):
            document.getElementById("successpage").style.opacity = "1";
            document.getElementById("download").href = "https://gitee.com/nortonii/pqe-image/raw/master/mid-" + teacherId + ".jpg";
            break;
          case (score >= 95):
            document.getElementById("successpage").style.opacity = "1";
            document.getElementById("download").href = "https://gitee.com/nortonii/pqe-image/raw/master/exc-" + teacherId + ".jpg";
            break;
          default:
            break;
        }
        document.getElementById("Fen").innerText = score;
        document.getElementById("result").style.opacity = "1";
      }).catch(() => {
        alert("成绩上传失败，请联系管理员！")
      });
  } else {
    document.getElementById("Fen").innerText = score;
    document.getElementById("result").style.opacity = "1";
  }
}
// 禁用button
function disabledSubmitButton() {
  return new Promise((resolve, reject) => {
    document.getElementById("btn").disabled = true;
    document.getElementById("btn").style.backgroundColor = "#eee";
    resolve(true)
  })
}

// 提交分数
async function submit() {
  if (await disabledSubmitButton()) {
    // 学生得分
    new Promise((res, rej) => {
      let score = 0;
      var Inputs = document.getElementsByTagName("input");
      for (let i = 0; i < 80; i++) {
        switch (true) {
          case (i >= 0 && i < 4):
            if (Inputs[i].value != "" && Inputs[i].value == Answer[i]) {
              score++;
            }
            else {
              Inputs[i].style.color = "red";
              Inputs[i].style.borderBottomColor = "red"
            }
            break;
          case (i >= 4 && i < 8):
            if (Inputs[i].value != "" && Inputs[i].value == Answer[i]) {
              score++;
            }
            else {
              Inputs[i].style.color = "red";
              Inputs[i].style.borderBottomColor = "red"
            }
            break;
          case (i >= 8 && i < 12):
            if (Inputs[i].value != "" && Inputs[i].value == Answer[i]) {
              score++;
            }
            else {
              Inputs[i].style.color = "red";
              Inputs[i].style.borderBottomColor = "red"
            }
            break;
          case (i >= 12 && i < 14):
            if (Inputs[i].value != "" && Inputs[i].value == Answer[i]) {
              score++;
            }
            else {
              Inputs[i].style.color = "red";
              Inputs[i].style.borderBottomColor = "red"
            }
            break;
          case (i >= 14 && i < 18):
            if (Inputs[i].value != "" && Inputs[i].value == Answer[i]) {
              score++;
            }
            else {
              Inputs[i].style.color = "red";
              Inputs[i].style.borderBottomColor = "red"
            }
            break;
          case (i >= 18 && i < 22):
            if (Inputs[i].value != "" && Inputs[i].value == Answer[i]) {
              score++;
            }
            else {
              Inputs[i].style.color = "red";
              Inputs[i].style.borderBottomColor = "red"
            }
            break;
          case (i >= 22 && i < 23):
            if (Inputs[i].value != "" && Inputs[i].value == Answer[i]) {
              score += 2;
            }
            else {
              Inputs[i].style.color = "red";
              Inputs[i].style.borderBottomColor = "red"
            }
            break;
          case (i >= 23 && i < 24):
            if (Inputs[i].value != "" && Inputs[i].value == Answer[i]) {
              score += 2;
            }
            else {
              Inputs[i].style.color = "red";
              Inputs[i].style.borderBottomColor = "red"
            }
            break;
          case (i >= 24 && i < 25):
            if (Inputs[i].value != "" && Inputs[i].value == Answer[i]) {
              score += 2;
            }
            else {
              Inputs[i].style.color = "red";
              Inputs[i].style.borderBottomColor = "red"
            }
            break;
          case (i >= 25 && i < 29):
            if (Inputs[i].value != "" && Inputs[i].value == Answer[i]) {
              score += 2;
            }
            else {
              Inputs[i].style.color = "red";
              Inputs[i].style.borderBottomColor = "red"
            }
            break;
          case (i >= 29 && i < 34):
            if (Inputs[i].value != "" && Inputs[i].value == Answer[i]) {
              score += 2;
            }
            else {
              Inputs[i].style.color = "red";
              Inputs[i].style.borderBottomColor = "red"
            }
            break;
          case (i >= 34 && i < 37):
            if (Inputs[i].value != "" && Inputs[i].value == Answer[i]) {
              score++;
            }
            else {
              Inputs[i].style.color = "red";
              Inputs[i].style.borderBottomColor = "red"
            }
            break;
          case (i >= 37 && i < 40):
            if (Inputs[i].value != "" && Inputs[i].value == Answer[i]) {
              score++;
            }
            else {
              Inputs[i].style.color = "red";
              Inputs[i].style.borderBottomColor = "red"
            }
            break;
          case (i >= 40 && i < 43):
            if (Inputs[i].value != "" && Inputs[i].value == Answer[i]) {
              score++;
            }
            else {
              Inputs[i].style.color = "red";
              Inputs[i].style.borderBottomColor = "red"
            }
            break;
          case (i >= 43 && i < 46):
            if (Inputs[i].value != "" && Inputs[i].value == Answer[i]) {
              score++;
            }
            else {
              Inputs[i].style.color = "red";
              Inputs[i].style.borderBottomColor = "red"
            }
            break;
          case (i >= 46 && i < 49):
            if (Inputs[i].value != "" && Inputs[i].value == Answer[i]) {
              score++;
            }
            else {
              Inputs[i].style.color = "red";
              Inputs[i].style.borderBottomColor = "red"
            }
            break;
          case (i >= 49 && i < 52):
            if (Inputs[i].value != "" && Inputs[i].value == Answer[i]) {
              score++;
            }
            else {
              Inputs[i].style.color = "red";
              Inputs[i].style.borderBottomColor = "red"
            }
            break;
          case (i >= 52 && i < 55):
            if (Inputs[i].value != "" && Inputs[i].value == Answer[i]) {
              score++;
            }
            else {
              Inputs[i].style.color = "red";
              Inputs[i].style.borderBottomColor = "red"
            }
            break;
          case (i >= 55 && i < 58):
            if (Inputs[i].value != "" && Inputs[i].value == Answer[i]) {
              score++;
            }
            else {
              Inputs[i].style.color = "red";
              Inputs[i].style.borderBottomColor = "red"
            }
            break;
          case (i >= 58 && i < 61):
            if (Inputs[i].value != "" && Inputs[i].value == Answer[i]) {
              score++;
            }
            else {
              Inputs[i].style.color = "red";
              Inputs[i].style.borderBottomColor = "red"
            }
            break;
          case (i >= 61 && i < 64):
            if (Inputs[i].value != "" && Inputs[i].value == Answer[i]) {
              score++;
            }
            else {
              Inputs[i].style.color = "red";
              Inputs[i].style.borderBottomColor = "red"
            }
            break;
          case (i >= 64 && i < 67):
            if (Inputs[i].value != "" && Inputs[i].value == Answer[i]) {
              score++;
            }
            else {
              Inputs[i].style.color = "red";
              Inputs[i].style.borderBottomColor = "red"
            }
            break;
          case (i >= 67 && i < 70):
            if (Inputs[i].value != "" && Inputs[i].value == Answer[i]) {
              score++;
            }
            else {
              Inputs[i].style.color = "red";
              Inputs[i].style.borderBottomColor = "red"
            }
            break;
          case (i >= 70 && i < 72):
            if (Inputs[i].value != "" && Inputs[i].value == Answer[i]) {
              score++;
            }
            else {
              Inputs[i].style.color = "red";
              Inputs[i].style.borderBottomColor = "red"
            }
            break;
          case (i >= 72 && i < 80):
            if (Inputs[i].value != "" && Inputs[i].value == Answer[i]) {
              score += 2;
            }
            else {
              Inputs[i].style.color = "red";
              Inputs[i].style.borderBottomColor = "red"
            }
            break;
          default:
            break;
        }
      }
      res(score);
    }).then((res) => {
      uploadScore(res);
    })
  }
}
// 返回
function back() {
  console.log(teacherId);
  document.getElementById("Outside").style.opacity = "0";
  let url = "../pages/loading.html" + "?" + "teacherId=" + teacherId;
  setTimeout(() => {
    window.location.replace(url);
  }, 800);
}