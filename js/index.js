// index.html
function Tologin() {
    // alert("答题已结束！");
    let name = document.getElementById("name").value;
    var number = document.getElementById("number").value;
    teacherId = document.getElementById("number").value;
    if (name == "" || number == "") {
        alert("请将姓名、学号填写完整");
    } else {
        if (
            confirm(
                "请您确认\n填写的姓名和学号是否正确\n姓名：" +
                name +
                "\n学号：" +
                number
            )
        ) {
            axios
                .post("http://1.117.224.204/teacher/Login", {
                    teacherName: name,
                    teacherId: number,
                })
                .then((res) => {
                    console.log(res);
                    if (res.data.code == 0) {
                        alert("登录成功!");
                        document.getElementById("loginpage").style.opacity = "0";
                        let url = "./pages/loading.html" + "?" + "teacherId=" + number;
                        setTimeout(() => {
                            window.location.replace(url);
                        }, 800);
                    } else if (res.data.code == 1) {
                        alert(res.data.errMessage);
                    }
                }).catch((res) => {
                    alert(res);
                });
        }
    }
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