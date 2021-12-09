let socket = new WebSocket(`wss://anonym.ink:8000/homework/chatroom?username=${localStorage.getItem("username")}&avatar=${localStorage.getItem("avatar")}`)
let contentBox = document.querySelector(".body")
let placeholder = document.querySelector('#placeholderBlock')

document.querySelector('.back')['onclick']=x=>{
    window.location.href = "login.html";
}
socket.onopen = function(e) {
    alert("已连接");
};
  
let yourMessage = document.querySelector('#yourMessage');
// 输入评论
document.querySelector('#go')['onclick']=x=>{
    socket.send(`${yourMessage.value}`)
}

function onMessage(data) {
    if (data.type == "MESSAGE") {
        // 插入评论
        let comment = document.createElement("div")
        comment.className = "comment1"
        comment.innerHTML = `
            <div class="top">
                <div class="chatHead">
                    <img src="${data.avatar}" alt="头像">
                </div>
                <div class="right">
                    <div class="userName">
                        <div class="name">${data.username}</div>
                        <div class="more">...</div>
                    </div>
                    <div class="commentText">
                        ${data.data}
                    </div>
                </div>
            </div>
            <div class="down">
                <div class="time">${new Date().toLocaleString()}</div>
            </div>
            <hr />
        `
        // 在占位块之前插入元素
        contentBox.insertBefore(comment, placeholder)
        yourMessage.value = ''
    } else if (data.type == "OPEN") {
        // 插入登陆消息
        let open = document.createElement("div")
        open.className = 'open'
        open.innerHTML = `
            <div class='inOpen'>${data.username}进入了聊天室<div/>
        `
        // 在占位块之前插入元素
        contentBox.insertBefore(open, placeholder)
    } else if (data.type == "CLOSE") {
        // 插入离开消息
        let close = document.createElement("div")
        close.className = 'close'
        close.innerHTML = `
            <div class='inClose'>${data.username}离开了聊天室<div/>
        `
        // 在占位块之前插入元素
        contentBox.insertBefore(close, placeholder)
    }
}

socket.onmessage = function(event) {
    let eventObj = JSON.parse(event.data)
    onMessage(eventObj)
     // 把返回的信息在控制台输出，用以debug
    console.log(`[message] Data received from server: ${event.data}`);
};

socket.onclose = function(event) {
    if (event.wasClean) {
        alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
       // 例如服务器进程被杀死或网络中断
       // 在这种情况下，event.code 通常为 1006
        alert('与服务器的连接已断开');
    }
};
  
socket.onerror = function(error) {
    alert(`[error] ${error.message}`);
}