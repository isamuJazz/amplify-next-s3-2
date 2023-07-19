const secrets = JSON.parse(process.env.secrets);
const foo = secrets["foo"];
console.log(foo);
