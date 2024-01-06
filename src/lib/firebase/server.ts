import type { ServiceAccount } from "firebase-admin";
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = {
  type: "service_account",
  project_id: import.meta.env.FIREBASE_PROJECT_ID,
  private_key_id: import.meta.env.FIREBASE_PRIVATE_KEY_ID,
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCW1hfoVNFmn57d\nHxTVWHqjFXuIb8gBgPwy8Dvi8g/3SMz/592MzbTUFU8a9RneyLVQMLGUtAIjgdS/\n969s6//fOgA77tX5aBggVO7vcT/olQGBEnIRuEJnd3cMABqGif3o9ToFs8q9RMUu\nNY3yMBqw5up2XAIqLE1R8YwKj2DWMvB2i++9Sud4eQM2y5JD9ihZNsBXORfeg4FL\nYUOaXTSqtyzELKXTjvvc954G62qEQ0b9qr7U4MXyDy980+mqPTUtEzkCXEVlD7d4\ng72cNQ7PJSfyMMSy4dylXL6j1oplgrH5SmPqBd0kuIPtD9ODLjSz+ofCLeqg8ZII\ne+EyVYg5AgMBAAECgf9RmoJUr46adsD74FTlF3lBwd2TcuZB6gaHiHDd1xfMMRa3\nXDoAc0nhc6XYb8IPRYbSW4W3bau6igMP2HCP/R3xJu/5fL1GsYpb85dQ83Qf4H1v\n1wrfi1BhqcA+PdAb+Yvk/MbnTt3gh9Qlq9Ofs2a9TjCK2DxTlKRAMO4SyH8bYp5u\n1oR5UmNjQYPSmLqyUgd/Ni843CH3z41bYEqaA4UWVwKPObnlKKW6jryJWD8JI7IX\nhk4/LcZkJwsFmbWNEzRSAHOeoNcKg2e1/9JB9doyAkvjzI/2eGmY9CmC4JDHDkF2\n3eRFx1vqoCygqGhmXLOwRg+zLhr1steL2HzlnIMCgYEA1IGZ4pcDB1RXtazQfeI6\nQXLh2Zb+k8Mi8TL4knbIUQ4Yi9SAF3SX5pq8XDYAv6M9Da5+mRbyz8djtRgCCWdl\nw2hEHL1p4u3XgduU44GdoUTj8CxHVT0qVALA2INjXVs0efprYMeiqItFDl6i4nMx\naco+lIMplPzRf7jstIG1hO8CgYEAtbVBn4TYTbtuML50DV7emoeegEnZvqYcIrsy\n0Jo83eFEzXu3HlI9PiGBj0YjccznTEok8XxXR12iW5LDlgvKCJrW7OlN9CyhqpIE\n+Q0h2k5wXdoRQ4n9FA/pDQHhAyptlGCb0AvkWTS+JohENkUXZ+5mdoeU3imSHPLL\nLwOeVVcCgYAuVFMIY4P1hR3aLeMGjtvEiRdUKOc3r8Neco5e4CasBTa0xY9njbPQ\nQsvuDpf7L8uPwAs5tRca1Y2XXbST+EbnY0P2QBVltBTX6td7AjcrgalwIzcqDju8\nNR12Fq8DG29FaKMgZmW/+R0FFPzOAe8z8TPTjQTzxmqmPdrdP6ojYQKBgQCBjAyR\nMiEUqkBRODd9INoLygzS4dP//GWqzVPZLV2fwu9OoJlZYMCQ/0pjX1n91FxDI8la\n8Y84LiWGrAgNfbI4mEwK8/rDzt4jwZ8SAK7V+X5bKxGL2WE5YG6C+4f0vdcKJiZw\nGUpf3x6CUjxvhKq/SlR6xQb5rSGiyebaSfYkWQKBgQCbqSEPDyb0Xp6HIUnDIdlK\nB/Pk7dcvNa4126b0USTQycwmP8Tso/Zb6em6XcZ8akjXkLbcXNAN47a7YCdyslGI\nXkCKuxOBOW/9IQMeO+bM2PIUGxNQbkQPWY5uxTrwsBxl+xomltdxIuCi6axbg0P9\nyFSi75NoTdM9bM9xZ3Wbgg==\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-m69r4@gogogolf-38d44.iam.gserviceaccount.com",
  client_id: "105621340875381507872",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-m69r4%40gogogolf-38d44.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

export const app = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

export const auth = getAuth(app);
export const firestore = getFirestore(app);
