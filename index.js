const data = [{
        "pincode": "110001",
        "estimatedDeliveryDays": 2,
        "locationName": "Connaught Place, Delhi"
    },
    {
        "pincode": "400001",
        "estimatedDeliveryDays": 3,
        "locationName": "Fort, Mumbai"
    },
    {
        "pincode": "700001",
        "estimatedDeliveryDays": 4,
        "locationName": "Dalhousie Square, Kolkata"
    },
    {
        "pincode": "600001",
        "estimatedDeliveryDays": 3,
        "locationName": "Parrys Corner, Chennai"
    },
    {
        "pincode": "500001",
        "estimatedDeliveryDays": 2,
        "locationName": "Afzal Gunj, Hyderabad"
    },
    {
        "pincode": "110020",
        "estimatedDeliveryDays": 5,
        "locationName": "Hauz Khas, Delhi"
    },
    {
        "pincode": "400020",
        "estimatedDeliveryDays": 4,
        "locationName": "Worli, Mumbai"
    },
    {
        "pincode": "700020",
        "estimatedDeliveryDays": 3,
        "locationName": "Salt Lake City, Kolkata"
    },
    {
        "pincode": "600020",
        "estimatedDeliveryDays": 2,
        "locationName": "Anna Nagar, Chennai"
    },
    {
        "pincode": "500020",
        "estimatedDeliveryDays": 4,
        "locationName": "Banjara Hills, Hyderabad"
    }
]


// custom-element.js
class MyCustomElement extends HTMLElement {
    constructor() {
        super();
        this.inputElement = this.querySelector("input");
        this.form = this.querySelector("form");
        this.form.addEventListener("submit", this.validatePin.bind(this));
        this.result = this.querySelector("div");

        this.inputElement.addEventListener('input', (event) => {
            let inputValue = event.target.value;
            inputValue = inputValue.replace(/\D/g, '');
            inputValue = inputValue.slice(0, 6);
            event.target.value = inputValue;
        });

    }

    validatePin(event) {
        event.preventDefault();
        this.result.textContent = "";
        const inputValue = this.inputElement.value;
        const estimatedDate = data.filter((each) => each.pincode === inputValue);
        console.log(estimatedDate);


        if ((estimatedDate.length === 0) || (this.inputElement.length < 6)) {
            const date = document.createElement("p");
            date.innerHTML = `<p class = "error-text">Entere a Valid Pincode!</p>`;
            this.result.appendChild(date);
            return;
        }

        const {
            estimatedDeliveryDays
        } = estimatedDate[0];
        const today = new Date();
        console.log(estimatedDeliveryDays);
        today.setDate(today.getDate() + estimatedDeliveryDays);
        console.log(today);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        };
        const dateFormatter = new Intl.DateTimeFormat('en-US', options);
        const formattedDate = dateFormatter.format(today);

        // Extract the day, date, and month components
        const day = formattedDate.split(',')[0].trim();
        const dateAndMonth = formattedDate.split(',')[1].trim();
        const date = document.createElement("p");
        date.innerHTML = `<p class = "result-text">Estimated Delivery</p>
            <p class ="delivery-date">${day} ${dateAndMonth}</p>`;
        this.result.appendChild(date);
    }
}

customElements.define('my-custom-element', MyCustomElement);
