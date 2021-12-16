import { Router } from "express";
import { db } from "../firebase/firebaseApp";
const router = Router();


router.get('/get/:listId', async (req, res, next) =>{
    if(req.params.listId){
        console.log(req.params.listId);
        res.status(200).json({messgae: req.params.listId});
    }else{

        res.status(200).json({messgae: "end"});

    }
    
    
});

router.get('/names', async (req, res, next) =>{
    
    res.status(200).json({messgae: "end"});
});

router.post('/create', async (req, res, next)=>{
    res.status(200).json({messgae: "end"});
})

export default router;