document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    const orderSummary = document.querySelector('.order-summary');
    const totalPriceElement = document.querySelector('.total-price');
    const checkedOutProducts = document.querySelector('.checked-out-products');
    const totalCheckedOutPriceElement = document.querySelector('.total-checked-out-price');

    buttons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            const clickedButton = event.target;
            const itemContainer = clickedButton.closest('.box1');
            const itemName = itemContainer.querySelector('h3').textContent;
            const itemStocksElement = itemContainer.querySelector('p:first-of-type');
            let itemStocks = parseInt(itemStocksElement.textContent.split(' ')[1]);
            const quantityInput = itemContainer.querySelector('.quantity-box input');
            const quantity = parseInt(quantityInput.value);
            const selectedColor = itemContainer.querySelector('.color-box select').value;
            const itemPrice = parseFloat(itemContainer.querySelector('p:nth-of-type(2)').textContent);

            if (quantity === 0 || quantity > itemStocks) {
                alert('Invalid quantity!');
                return;
            }

            const newItem = document.createElement('div');
            newItem.classList.add('order-item');

            const itemText = document.createElement('p');
            itemText.textContent = `${quantity} x ${itemName} (${selectedColor}) - $${(quantity * itemPrice).toFixed(2)}`;
            newItem.appendChild(itemText);

            const cancelButton = document.createElement('button');
            cancelButton.textContent = 'Cancel';
            cancelButton.classList.add('cancel-btn');
            cancelButton.addEventListener('click', function() {
                itemStocks += quantity;
                itemStocksElement.textContent = `stocks ${itemStocks}`;
                orderSummary.removeChild(newItem);
                updateTotalPrice();
            });
            newItem.appendChild(cancelButton);

            const discountSelect = document.createElement('select');
            discountSelect.innerHTML = `
                <option value="none">No Discount</option>
                <option value="student">Student Discount</option>
                <option value="senior">Senior Discount</option>
                <option value="pwd">PWD Discount</option>
            `;
            discountSelect.classList.add('discount-select');
            discountSelect.addEventListener('change', updateTotalPrice);
            newItem.appendChild(discountSelect);

            const checkoutButton = document.createElement('button');
            checkoutButton.textContent = 'Checkout';
            checkoutButton.classList.add('checkout-btn');
           checkoutButton.addEventListener('click', function() {
    const discount = discountSelect.value;
    let discountRate = 0;
    let discountText = "No Discount";

    if (discount === 'student') {
        discountRate = 0.10;
        discountText = "Student Discount";
    } else if (discount === 'senior') {
        discountRate = 0.20;
        discountText = "Senior Discount";
    } else if (discount === 'pwd') {
        discountRate = 0.30;
        discountText = "PWD Discount";
    }

    const discountedPrice = (quantity * itemPrice * (1 - discountRate)).toFixed(2);
    const originalPrice = (quantity * itemPrice).toFixed(2); // Calculate original price
    const movedItemText = document.createElement('p');
    movedItemText.textContent = `${quantity} x ${itemName} (${selectedColor}) - $${discountedPrice} (${discountText}) [Original Price: $${originalPrice}]`; // Include original price in text

    checkedOutProducts.appendChild(movedItemText);

    orderSummary.removeChild(newItem);
    updateTotalPrice();
    updateCheckedOutTotalPrice();
});

            newItem.appendChild(checkoutButton);

            orderSummary.appendChild(newItem);
            itemStocks -= quantity;
            itemStocksElement.textContent = `stocks ${itemStocks}`;
            quantityInput.value = 1;

            updateTotalPrice();
        });
    });

    const orderButton = document.querySelector('.order-btn');
    const orderSummaryContainer = document.querySelector('.order-summary-container');

    orderButton.addEventListener('click', function() {
        orderSummaryContainer.classList.toggle('show');
    });

    function updateTotalPrice() {
        let total = 0;
        const orderItems = orderSummary.querySelectorAll('.order-item');

        orderItems.forEach(function(item) {
            const itemText = item.querySelector('p').textContent;
            const itemPrice = parseFloat(itemText.split('- $')[1]);
            const discountSelect = item.querySelector('.discount-select');
            let discount = 0;

            if (discountSelect) {
                const discountValue = discountSelect.value;
                if (discountValue === 'student') {
                    discount = 0.10;
                } else if (discountValue === 'senior') {
                    discount = 0.20;
                } else if (discountValue === 'pwd') {
                    discount = 0.30;
                }
            }

            total += itemPrice - (itemPrice * discount);
        });

        totalPriceElement.textContent = total.toFixed(2);
    }

    function updateCheckedOutTotalPrice() {
        let total = 0;
        const checkedOutItems = checkedOutProducts.querySelectorAll('p');

        checkedOutItems.forEach(function(item) {
            const itemPrice = parseFloat(item.textContent.split('- $')[1].split(' ')[0]);
            total += itemPrice;
        });

        totalCheckedOutPriceElement.textContent = total.toFixed(2);
    }
});