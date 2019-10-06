const users = [
    {id: 1, name: 'moe', slot: 'first'},
    {id: 2, name: 'larry', slot: 'second'},
    {id: 3, name: 'curly', slot: 'third'},
    {id: 4, name: 'lucy', slot: 'third', selected: true},
]
const firstList = document.getElementById('first');
const secondList = document.getElementById('second');
const thirdList = document.getElementById('third');

const createLeftButtons = () => {
    let buttons = []
    for (let i = 0; i < 3; i++) {
        const button = document.createElement('button')
        button.classList.add('left');
        button.dataset['col'] = i + 1;
        button.innerHTML = '<';
        if (i === 0) {
            button.setAttribute('disabled', 'disabled')
            button.classList.remove('left')
            button.id = 'left'
        }
        if (button.hasAttribute('disabled')) {
            button.style.backgroundColor = 'lightGray';
        }
        buttons.push(button)
    }

    const placer = {
        1: firstList,
        2: secondList,
        3: thirdList
    };

    buttons.forEach(button => {
        let listNum = button.dataset.col;
        let list = placer[listNum];
        list.appendChild(button)
    })
    return buttons;
}
const createRightButtons = () => {
    let buttons = []
    for (let i = 0; i < 3; i++) {
        const button = document.createElement('button')
        button.classList.add('right');
        button.dataset['col'] = i + 1;
        button.innerHTML = '>';
        if (i === 2) {
            button.setAttribute('disabled', 'disabled')
            button.classList.remove('right')
            button.id = 'right'
        }
        if (button.hasAttribute('disabled')) {
            button.style.backgroundColor = 'lightGray';
        }
        buttons.push(button)
    }

    const placer = {
        1: firstList,
        2: secondList,
        3: thirdList
    };

    buttons.forEach(button => {
        let listNum = button.dataset.col;
        let list = placer[listNum];
        list.appendChild(button)
    })
}

const createHeaders = () => {
    const placer = {
        0: firstList,
        1: secondList,
        2: thirdList
    }
    const headers = {
        0: 'FIRST',
        1: 'SECOND',
        2: 'THIRD'
    }
    for (let i = 0; i < 3; i++) {
        let list = placer[i];
        const header = document.createElement('h2');
        const text = headers[i];
        header.innerHTML = text;
        list.appendChild(header);
    }
}
createLeftButtons()
createRightButtons()
createHeaders()

const rightButtons = document.querySelectorAll('.right');
const leftButtons = document.querySelectorAll('.left');

const checkValidity = () => { // extra functionality
    rightButtons.forEach(button => {
        const parent = button.parentNode;
        if (!parent.querySelectorAll('.selected').length) {
            button.setAttribute('disabled', 'disabled')
        }
    
        else {
            button.removeAttribute('disabled');
            button.style.backgroundColor = 'tomato';
        }
        if (button.hasAttribute('disabled')) {
            button.style.backgroundColor = 'lightGray';
        }
    })
    leftButtons.forEach(button => {
        const parent = button.parentNode;
        if (!parent.querySelectorAll('.selected').length) {
            button.setAttribute('disabled', 'disabled')
        }
    
        else {
            button.removeAttribute('disabled');
            button.style.backgroundColor = 'tomato';
        }
        if (button.hasAttribute('disabled')) {
            button.style.backgroundColor = 'lightGray';
        }
    })
}


rightButtons.forEach(button => {
    button.addEventListener('click', ev => {
        const parent = button.parentNode;
        const moveRightTable = {
            first: 'second',
            second: 'third'
        }
        parent.querySelectorAll('.selected').forEach(selected => {
            parent.removeChild(selected);
            let newSlot = moveRightTable[parent.id];
            document.getElementById(newSlot).appendChild(selected);

            checkValidity(); // added this
        })
    })
})

leftButtons.forEach(button => {
    button.addEventListener('click', ev => {
        const parent = button.parentNode;
        const moveLeftTable = {
            third: 'second',
            second: 'first'
        }
        parent.querySelectorAll('.selected').forEach(selected => {
            parent.removeChild(selected)
            let newSlot = moveLeftTable[parent.id];
            document.getElementById(newSlot).appendChild(selected);

            checkValidity(); // added this
        })
    })
})


const render = () => {
    users.forEach(user => {
    const node = document.createElement('div');
    node.classList.add('user');
    if (user.selected) {
        node.classList.add('selected')
    }
    node.addEventListener('click', ev => {
        node.classList.toggle('selected');
        if (user.selected === true) {
            user.selected = false;
        }
        else {
            user.selected = true;
        }
        checkValidity() // added this
    })
    node.innerHTML = `${user.name}`;
    document.getElementById(`${user.slot}`).appendChild(node);
    })
}

render();
checkValidity()