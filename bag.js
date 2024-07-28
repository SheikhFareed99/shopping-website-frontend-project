

let product = '';
let bagContainer = document.querySelector(".bag-card");
let countt = document.querySelector(".count-item");


onLoad();

function onLoad() {
    let str = localStorage.getItem("itemsarr");
    itemsarr = str ? JSON.parse(str) : [];
    if (!Array.isArray(itemsarr)) {
        itemsarr = [];
    }
    displayBagItems();
    count();
}

function displayBagItems() 
{
    let pieces=0;
    let price=0;
    let discount=0;
    let total_price=0;
    
    product = '';
    itemsarr.forEach(element => {
        items.forEach(item => {
            if (element == item.id) {
                product += `
                    <div class="card1">
                        <div class="cardimg">
                            <img src="${item.image}" alt="">
                        </div>
                        <div class="card1detail">
                            <p class="name">${item.company}</p>
                            <p class="detail">${item.item_name}</p>
                            <span class="price">Rs${item.current_price}</span>
                            <span class="pre-price">Rs${item.original_price}</span>
                            <span class="discount">${item.discount_percentage}% off</span>
                            <p class="return"><span>${item.return_period} days</span> return policy</p>
                            <p class="delivery">Delivery to <span>${item.delivery_date}</span></p>
                        </div>
                        <div class="crossimg">
                            <img src="cross.png" alt="" class="cancel" onclick="removebag(${item.id})">
                        </div>
                    </div>
                `;

                pieces++;
                price+=item.original_price;
                discount+=  item.original_price - item.current_price;
                if(pieces==1)
                total_price+=99+item.current_price;
            else
            total_price+=item.current_price;
document.querySelector(".pieces").innerHTML= ` (${pieces} pieces) `;
document.querySelector(".price-mvp").innerHTML=`Rs ${price} `;
document.querySelector(".percent").innerHTML= ` -Rs ${discount} `;
document.querySelector(".total-p").innerHTML= ` Rs ${total_price} `;



            }
        });
    });



    bagContainer.innerHTML = product;


   
}

function removebag(itemIdToRemove) {
  
    itemsarr = itemsarr.filter(itemId => itemId != itemIdToRemove);
    localStorage.setItem("itemsarr", JSON.stringify(itemsarr));
if(itemsarr.length===0)
    {
        document.querySelector(".pieces").innerHTML="( 0 piece )";
        document.querySelector(".price-mvp").innerHTML=`Rs 0`;
        document.querySelector(".percent").innerHTML= ` -Rs 0 `;
        document.querySelector(".total-p").innerHTML= ` Rs 0 `;
    }
    displayBagItems();
   
    count();
}

function count() {
    countt.innerHTML = itemsarr.length;
}
