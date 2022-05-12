function salecreate(price) {                // функция преобразования числа с цену
    return new Intl.NumberFormat('ru-RU', {
        currency: 'byn',
        style: 'currency'
    }).format(price)
}
    document.querySelectorAll('.price').forEach(node => {
        node.textContent =salecreate(node.textContent)
    })

function toDate (date) {
    return new Intl.DateTimeFormat('ru-RU',{
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    }).format(new Date(date))
}

document.querySelectorAll('.date').forEach(node =>{
    node.textContent = toDate(node.textContent);
})

const $card = document.querySelector('#card')
if ($card){
    $card.addEventListener('click', event =>{
        console.log(event);
        if (event.target.classList.contains('js-remove')){ // динамическое изменение страницы после удаления
            const id = event.target.dataset.id;
            const csrf = event.target.dataset.csrf;
            fetch('/card/remove/' + id,{
                method:'delete',
                headers:{
                    'X-XSRF-TOKEN':csrf
                }
            }).then(res => res.json())
                .then(card =>{
                console.log(card)
                if (card.courses.length){
                    const html =  card.courses.map(c=>{
                        return `
                        <tr>
                        <td>${c.title}</td>
                        <td>${c.count}</td>
                        <td>
                            <button class="btn btn-danger js-remove" data-id="${c.id}">удалить</button>
                        </td>
                        </tr>
                        `
                    }).join('');
                    document.querySelector('tbody').innerHTML = html;
                    document.querySelector('.price').textContent = salecreate(card.price);
                } else {
                    $card.innerHTML = '<p>Корзина пуста</p>'
                }
            })
        }
    })
}