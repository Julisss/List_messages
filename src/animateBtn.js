let btn = document.querySelector('.update-btn');
btn.addEventListener('click', ()=>{
    btn.classList.add('active');
    setTimeout(()=>{
        btn.classList.remove('active');
    }, 500);
})