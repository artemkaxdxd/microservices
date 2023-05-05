import axios from "axios";

async function sendRequestsTest(route, count) {
  let failed = 0;
  let totalTime = 0;
  const promises = [];

  for (let i = 0; i < count; i++) {
    promises.push(
      axios.get(route)
        .then((response) => {
          totalTime += response.config.responseEnd - response.config.requestStart;
        })
        .catch((error) => {
          failed++;
          console.log(`ERROR: attempt: ${i} status: ${error.response?.status}`);
        })
    );
  }

  await Promise.all(promises);

  console.log(`Average duration: ${(totalTime / count).toFixed(3)}ms`);
  console.log(`${failed} from ${count} failed\n`);
}

const testAmount = 5;
const requestsAmount = 100;

const setFreeze = () => {
  const freezeRoutes = [
    "http://localhost/api/car/freeze",
    "http://localhost/api/order/freeze",
    "http://localhost/api/customers/freeze",
  ]

  const freeze = freezeRoutes.map(async (route) => {
    await axios.post(route, {});
  });

  Promise.all(freeze);  
}

setFreeze();

const urls = [
  "http://localhost/api/car/1",
  "http://localhost/api/order/1",
  "http://localhost/api/customers/1",
];

for (let i = 0; i < testAmount; i++) {
  for (let i = 0; i < urls.length; i++) {
    await sendRequestsTest(urls[i], requestsAmount);
  };
};
