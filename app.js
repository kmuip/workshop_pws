const { PsrApi } = require("./api/psrApi");

const psrApi = new PsrApi(process.env.API_URL);

async function login() {
  const db = process.env.PWS_DB;
  const username = process.env.PWS_USERNAME;
  const password = process.env.PWS_PASSWORD;

  const authMan = psrApi.authenticationManager;

  await authMan
    .login(db, username, password)
    .catch((err) => {
      console.log(err);
    });
}

async function logout() {
  await psrApi.authenticationManager.logout();
}

async function main() {
  await login();

  // Insert code here

  await logout();
}

main();
