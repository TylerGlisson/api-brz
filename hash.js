const bcrypt = require('bcrypt');

async function run() {
    const salt = await bcrypt.genSalt(13);
    console.log(salt);
}

run();
