import { Router } from "express";
import { db } from "../firebase/firebaseApp";
const router = Router();


router.get('/get/:listId', async (req, res, next) =>{
    if(req.params.listId){
        const listRef = db.collection('list').doc(req.params.listId);;
     const data = await  listRef.get();

        res.status(200).json(data);
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

export const  listRouter = router;