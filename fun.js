const users = [
    {id: 1, name: 'moe', slot: 'first'},
    {id: 2, name: 'larry', slot: 'second'},
    {id: 3, name: 'curly', slot: 'third'},
    {id: 4, name: 'lucy', slot: 'third', selected: true},
]


const buttons = [...document.querySelectorAll('button')];

const rightButtons = document.querySelectorAll('.right');
const leftButtons = document.querySelectorAll('.left');

buttons.forEach(button => {
    if (button.hasAttribute('disabled')) {
        button.style.backgroundColor = 'lightGray';
    }
})


const moveRight = (node) => {
    const id = parseInt(node.dataset['user_id'], 10);
    const moveRightTable = {
        first: 'second',
        second: 'third'
    }
    users.forEach(user => {
        if (user.id === id) {
            if (moveRightTable[user.slot]) {
                user.slot = moveRightTable[user.slot]
            }
        }
    })

    render();
}

const moveLeft = (node) => {
    const id = +node.dataset['user_id'];
    const moveLeftTable = {
        third: 'second',
        second: 'first'
    }
    users.forEach(user => {
        if (user.id === id) {
            if (moveLeftTable[user.slot]) {
                user.slot = moveLeftTable[user.slot]
            }
        }
    })

    render()
}

rightButtons.forEach(button => {
    button.addEventListener('click', ev => {
        const parent = button.parentNode;
        parent.querySelectorAll('.selected').forEach(selected => {
            moveRight(selected);
        })
    })
})

leftButtons.forEach(button => {
    button.addEventListener('click', ev => {
        const parent = button.parentNode;
        parent.querySelectorAll('.selected').forEach(selected => {
            moveLeft(selected);
        })
    })
})


const render = () => {
    let oldUsers = document.querySelectorAll('.user');
    oldUsers.forEach(oldUser => {
        oldUser.remove();
    })
    users.forEach(user => {
       const node = document.createElement('div');
       node.classList.add('user');
       node.dataset['user_id'] = user.id;
       if (user.selected) {
           node.classList.add('selected')
       }
       node.addEventListener('click', ev => {
           node.classList.toggle('selected');
           if (user.selected === true) {
               user.selected = false
           }
           else {
               user.selected = true;
           }
       })
       node.innerHTML = `${user.name}`;
       document.getElementById(`${user.slot}`).appendChild(node);
    })
}

render();
