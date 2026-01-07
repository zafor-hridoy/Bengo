export const signup = async(req,res) =>
{
    const {fullName, email, password} = req.body

    try{
        if(!fullName || !email || !password)
        {
            return res.status(400).json({message:"All field are must be filled"})
        }
        if(password.length <6)
        {
            return res.status(400).json({message:"password must have 6 character minimum"}) 
        }

        if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    }catch (error)
    {

    }
    
}