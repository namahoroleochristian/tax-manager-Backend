import bcrypt from "bcryptjs";

const keyGenerator = async (initializer) => {
    
    const key = await bcrypt.hash(initializer,10)
    console.log(key);
    
}
