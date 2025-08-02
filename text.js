
const stores = [
  {
    title: "Fashion Store",
    desc: "Trendy online fashion boutique.",
    price: 9,
    img: "https://via.placeholder.com/300x200",
  },
  {
    title: "TechNova Shop",
    desc: "High-tech gadgets & gear.",
    price: 20,
    img: "https://via.placeholder.com/300x200",
  },
  // Add 18 more stores similarly
];

const storeList = document.getElementById("store-list");

stores.forEach((store, index) => {
  const card = document.createElement("div");
  card.className = "store-card";

  card.innerHTML = `
    <img src="${store.img}" alt="${store.title}" />
    <h3>${store.title}</h3>
    <p>${store.desc}</p>
    <p><strong>$${store.price}</strong></p>
    <div id="paypal-button-container-${index}"></div>
  `;

  storeList.appendChild(card);

  paypal.Buttons({
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: store.price.toString()
          }
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        alert('Transaction completed by ' + details.payer.name.given_name);
      });
    }
  }).render(`#paypal-button-container-${index}`);
});