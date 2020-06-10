window.addEventListener('load', function(){
    let items = document.querySelectorAll('.burger__item');
    order = new Order;
    items.forEach(item => 
        item.addEventListener('click', order.handlerClickEvent.bind(order))
    );
})