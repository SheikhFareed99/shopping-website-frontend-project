let item_con = document.querySelector(".items-container");
let count_bag = document.querySelector(".count-item");
let itemsarr = [];

function onLoad() {
  let str = localStorage.getItem("itemsarr");
  itemsarr = str ? JSON.parse(str) : [];
  if (!Array.isArray(itemsarr)) {
    itemsarr = [];
  }
  display();
  count();
}

function addtobag(itemid) {
  if (!itemsarr.includes(itemid)) {
    itemsarr.push(itemid);
    count();
    localStorage.setItem("itemsarr", JSON.stringify(itemsarr));
  }
}

function count() {
  count_bag.innerHTML = itemsarr.length;
}

function display() {
  let data = '';
  if(!item_con)
    return;
  items.forEach(item => {
    data += `
      <div class="items">
        <img src="${item.image}" class="item-img" alt="">
        <span class="rating-r">${item.rating.stars}⭐</span>
        <span class="rating-n">|| ${item.rating.count}</span>
        <p class="name">${item.company}</p>
        <p class="detail">${item.item_name}</p>
        <span class="price">Rs${item.current_price}</span>
        <span class="pre-price">Rs${item.original_price}</span>
        <span class="discount">(${item.discount_percentage}% off)<br></span>
        <button class="add-bag" data-id="${item.id}">Add to Bag</button>
      </div>
    `;
  });
  item_con.innerHTML = data;
  document.querySelectorAll('.add-bag').forEach(button => {
    button.addEventListener('click', (event) => {
      const itemId = parseInt(event.target.getAttribute('data-id'));
      addtobag(itemId);
    });
  });
}

document.addEventListener("DOMContentLoaded", onLoad);