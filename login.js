let inPutUser = document.querySelector('.inPutUser');
let inPutAvatar = document.querySelector('.inPutAvatar')

document.querySelector('.inPutButton')['onclick']=x=>{
    if(inPutUser.value == ''){
        alert('用户名为空')
    }else{
        localStorage.setItem('username', inPutUser.value);
        localStorage.setItem('avatar', inPutAvatar.value);
        window.location.href = "chat.html";
    }
}

let avatar = document.querySelector('#avatar')

avatar['onclick']=x=>{
    if(inPutAvatar.value == ""){
        alert('未更换头像呢，别点了')
    }else{
        avatar.src = inPutAvatar.value
    }
}