import { app } from "../firebase/firebaseApp";


export const authenticate = async(req : any, res: any, next: any) =>{

    const userToken = req.headers.authorization.replcae("Bearer ","");
    const user = await app.auth().verifyIdToken(userToken, true);

    if(user){
        req.userEmail = user.email;
        req.userId = user.uid;
        next();
    }
    res.status(400).json({message: "unauthorized"});

}