const data = require('./data.json');
import './css/style.css';
import moment from 'moment';



const $list = document.querySelector('.messages-list');

function renderList(arr){
    let temp = JSON.parse(JSON.stringify(arr));

    temp = updateMessages(temp);
    return temp;
}
// ----------------------------------------

function addUnixTime(array){
    array.forEach(elem => {
        let time = elem.time;
        let date = elem.date;

        let unix = time + ' ' + date; 
        unix = moment(unix, 'HH:mm DD.MM.YYYY').format('x');
        elem.unix = unix;
    });

    return array;
}

function sortByRead(array){
    let read = [];
    let notRead = [];

    array.forEach(elem => {
        if(elem.read){
            read.push(elem);
        } else {
            notRead.push(elem);
        }
    })

    return [read, notRead];
}

function sortByUnixTime(arr){
    $list.innerHTML = '';
    let readClassName = '';

    arr.forEach(elem => {
        elem.sort((a, b) => {

            if(a.unix > b.unix){
                return 1;
            } else if (b.unix >= a.unix){
                return -1;
            }
        })
        elem.forEach(item => {
            if(item.read){
                readClassName = 'messages-item';
            } else {
                readClassName = 'messages-item item-notRead';
            }
            $list.insertAdjacentHTML('afterbegin', `
                <li class="${readClassName}">
                    <div class="messages-item-about">
                        <div class="messages-item-pic" style="background-image: url('https://запорожье.ремонт-холодильников.org/wp-content/uploads/2014/09/default-placeholder.png')"></div>
                        <div class="messages-item-info">
                            <div class="messages-item-name">${item.name}</div>
                            <div class="messages-item-phone">${item.phone}</div>
                        </div>
                    </div>
                    <div class="messages-item-text" data-id="${item.id}">${item.text}</div>
                    <div class="messages-item-time">${item.time}</div>
                    <div class="messages-item-date">${item.date}</div>
                </li>
            `)
        })
    })

    return arr;
}

function updateMessages (arr){

    let temp = addUnixTime(arr);

    temp = sortByRead(temp);
    document.querySelector('.count-messages').innerHTML = temp[0].length + temp[1].length; 
    document.querySelector('.count-notRead-messages').innerHTML = temp[1].length; 

    temp = sortByUnixTime(temp);
    temp = temp[0].concat(temp[1]);

    return temp;
}


let temp = renderList(data);



document.addEventListener('click', e => {
    if(e.target.hasAttribute('data-id')){
        let id = +e.target.dataset.id;

        if(e.target.parentNode.classList.contains('item-notRead')){
            let ind = temp.findIndex(elem => elem.id === id);
            
            console.log(temp[ind].read);
            temp[ind].read = true;
            console.log(temp[ind].read);
        } else {
            temp = temp.filter(elem => elem.id !== id);
        }

        updateMessages(temp);
    }
    if(e.target.hasAttribute('data-update')){
        temp = renderList(data);
    }
    
})
