import bcrypt from "bcryptjs";
// this chunk of codes create a random key by hashing it allows an argument as an initislizer string for the key

const keyGenerator = async (initializer) => {
    
    const key = await bcrypt.hash(initializer,10)
    console.log(key);
    
}
