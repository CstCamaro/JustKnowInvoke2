const buttonText = "回复1"
let ulNode = document.getElementsByClassName("ant-tree-child-tree ant-tree-child-tree-open")[0]
ulNode.childNodes.forEach(function (childNode) {
    if (childNode.innerHTML.indexOf(buttonText) > -1) {
        let tagId = "random_string";
        childNode.setAttribute("id", tagId);
        childNode.removeChild(childNode.childNodes[1]);
        addNewTag(tagId);
    }
})

function addNewTag(tagId) {
    let spannode = document.createElement("span");
    spannode.setAttribute("class", "ant-tree-node-content-wrapper ant-tree-node-content-wrapper-normal");
    let spannode2 = document.createElement("span");
    spannode2.setAttribute("class", "ant-tree-title");
    let a = document.createElement("a");
    a.innerText = buttonText;
    spannode2.appendChild(a);
    spannode.appendChild(spannode2);
    $("#" + tagId).appendChild(spannode);
    spannode.onclick = function () {
        let someString = "hello world";
        let textNode = document.getElementsByTagName("textarea")[0];
        let oldValue = textNode.value;
        let newValue = oldValue + someString;
        textNode.value = newValue;
    }
}
