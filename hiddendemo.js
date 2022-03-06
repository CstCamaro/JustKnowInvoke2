var parentNode = document.getElementsByClassName("ant-tree-child-tree ant-tree-child-tree-open")[0];
parentNode.childNodes.forEach(function (item){
    let keyword = '回复1'
    if (item.innerHTML.indexOf(keyword) > -1){
        parentNode.removeChild(item);
    }
})
