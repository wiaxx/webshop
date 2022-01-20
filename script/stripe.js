// import { loadStripe } from '@stripe/stripe-js';

// create a stripe client
const stripe = Stripe('pk_test_51K2zTpD3GBWLS7iLLPtd48ZhQIIr0mPsszx3VB6ALeTAmY3ROomN4C1feYx1xXntPj0BQ58rjC6OKdjDLTaz8bLo00x7Wim6Ff');

// 

let orderData = {
  items: [{ id: 1, productName: "Monstera", price: 449, qty: 1 }],
  currency: "euro",
  amount: 2000,
  label: 'A soft cotton shirt'
};

const paymentRequest = stripe.paymentRequest({
  country: 'SE',
  currency: 'sek',
  total: {
    label: 'Demo total',
    amount: 1000,
  },
  requestPayerName: true,
  requestPayerEmail: true,
});

// disable button
document.querySelector("#pay").disabled = true;

// create a stripe element
const elements = stripe.elements();

// a custom style to set on element when created
var style = {
  base: {
    color: '#32325d',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '22px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};

// create an instance of the card element and pass custom style
let card = elements.create('card', { style: style });
// console.log(card)

// add the instance of card to element on html
card.mount('#card');

// check if card info is correct
try {
  card.on('change', function (event) {
    let message = document.querySelector("#messages");
    if (event.error) {
      message.textContent = event.error.message;
    } else {
      message.textContent = "";
    };
  
    if (event.complete) {
      const payBtn = document.querySelector("#pay");
      payBtn.disabled = false;
      paymentRequest();
      // payBtn.addEventListener('click', (e) => {
      //   e.preventDefault();
      //   pay(stripe, card);
      // })
    };
  });
  
} catch (error) {
    console.log(error)
};

const payForm = document.querySelector("#payment-form");

/*
const pay = function (stripe, card) {

  stripe
    .createToken(card)
    .then((result) => {
      if (result.error) {
        let errorEl = document.querySelector("#error");
        errorEl.textContent = result.error.message;
      } else {
        orderData.token = result.token.id;

        return fetch("/pay", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(orderData)
        });
      }
    })
    .then((result) => {
      return result.json();
    })
    .then((paymentData) => {
      if (paymentData.error) {
        let errorEl = document.querySelector("#error");
        errorEl.textContent = result.error.message;
      } else {
        orderComplete(paymentData)
      }
    });
};
*/

// handle submit payment and get token
payForm.addEventListener('submit', (event) => {
  event.preventDefault();

  stripe.createToken(card).then((result) => {
    if (result.error) {
      let errorEl = document.querySelector("#error");
      errorEl.textContent = result.error.message;
    } else {
      console.log(result.token);
      stripeTokenHandler(result.token);
    };
  });
});

// submit the form with token
const stripeTokenHandler = function(token) {
  let hiddenInput = document.createElement("input");
  hiddenInput.setAttribute("type", "hidden");
  hiddenInput.setAttribute("name", "stripeToken");
  hiddenInput.setAttribute("value", token.id);
  payForm.appendChild(hiddenInput);

  payForm.submit();
};

// check if a payment can be made, 

// respond to a payment request

// 


      // payBtn.addEventListener('click', (e) => {
      //   e.preventDefault();
      //   paymentRequest.on('token', function (event) {
      //     // event.token is available
      //     console.log(event);
      //     localStorage.setItem('token', event);
      //   });
      // });


      // paymentRequest.on('paymentmethod', function(event) {
      //     // event.paymentMethod is available
      //   });
      // enable payment button
    //} else if (event.error) {
      //console.log("missing")
      // show validation to customer


// document.querySelector("#pay").addEventListener('click', (e) => {
//     e.preventDefault();
// });

// var paymentRequest = stripe.paymentRequest({
//     country: 'SE',
//     currency: 'sek',
//     total: {label: 'Demo total', amount: 1099},
//     requestPayerName: true,
//     requestPayerEmail: true,
//   });

//   var paymentRequestButtonElement = elements.create(
//     'paymentRequestButton',
//     {
//       paymentRequest: paymentRequest,
//       style: {
//         paymentRequestButton: {
//           theme: 'light',
//         },
//       },
//     },
//   );
//   paymentRequest.canMakePayment();
//   paymentRequestButtonElement.mount('#payment')

// // var elements = stripe.elements({
// //     clientSecret = 'CLIENT_SECRET',
// // });
// let paymentElement = element.getElement('payment');

// console.log(stripe);
// console.log(elements);

/*
document.addEventListener('DOMContentLoaded', async () => {
    // const { publishableKey } = await fetch('/config').then(r=>r.json());
    // const stripe = Stripe('publishableKey')
    const stripe = Stripe('pk_test_51K2zTpD3GBWLS7iLLPtd48ZhQIIr0mPsszx3VB6ALeTAmY3ROomN4C1feYx1xXntPj0BQ58rjC6OKdjDLTaz8bLo00x7Wim6Ff')

    var elements = stripe.elements();
    var cardElement = elements.create('card');
    cardElement.mount('#card');

    const form = document.querySelector("#payment-form");
    form.addEventListener('submit', async (e) => {
        addMessage('Submitting details to backend');
        e.preventDefault();
        const { error: backendError, clientSecret } = await fetch('/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                PaymentMethodType: 'cart',
                currency: 'sek',
            }),
        }).then(r => r.json());
        if (backendError) {
            addMessage(backendError.message);
            return;
        }

        addMessage("PaymentIntent created!");

        const nameInput = document.querySelector("#name")
        const emailInput = document.querySelector("#email")
        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: nameInput.value,
                    email: emailInput.value,
                }
            }
        }
        )
        if (stripeError) {
            addMessage(stripeError.message);
            return;
        }
        addMessage(`PaymentIntent (${paymentIntent.id}): ${paymentIntent.status}`)
        // .then((response) => response.json())
        // .then((data) => {
        //     console.log('Sucess: ', data)
        // })
        // .catch((error) =>
        //     console.error('Error: ', error))
    });
});

const addMessage = (message) => {
    const messagesDiv = document.querySelector("#messages");
    messagesDiv.style.display = 'block';
    messagesDiv.innerHTML += '>' + message + '<br>';
    console.log('StripeSamleDebug:', message);
};
*/



//.env för att förvara api-keys, öppna med node enviroment