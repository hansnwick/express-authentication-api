const bcrypt = require("bcrypt");

const password = "MySecurePassword123";

async function main() {
     // 1. Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

     // 2. Print the hash
    console.log("Password Hash: ", passwordHash);

     // 3. Verify the original password
    const isCorrect = await bcrypt.compare(password, passwordHash)
    console.log("Correct password: ", isCorrect)

    // 4. Verify an incorrect password
    const isWrong = await bcrypt.compare("WrongPassword123", passwordHash)
    console.log("Wrong password: ", isWrong)
}

main();