import { Router } from "express";
import { db , dbCollectionsRef } from "../firebase/firebaseApp";
const router = Router();


router.get('/get/:itemId', async (req, res, next) =>{
    if(req.params.itemId){
       
        const listItemRefTypes = await dbCollectionsRef.listItems.doc(req.params.itemId).get();
        const listItemData = listItemRefTypes.data();
        
        
        

        res.status(200).json(listItemData);
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

export const  listItemRouter = router;