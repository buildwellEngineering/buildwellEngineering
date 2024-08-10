

export const CheckEmptyRequest=async(req,res,next)=>{
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Request body is empty' });
        }
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}
