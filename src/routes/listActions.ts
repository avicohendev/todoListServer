import { Router } from "express";
import { getListById , userLists} from "../controllers/listControlles";
import { db , dbCollectionsRef } from "../firebase/firebaseApp";
const router = Router();


router.get('/get/:listId', getListById);

router.get('/names/:userId', userLists);

router.post('/create', async (req, res, next)=>{
    
    res.status(200).json({messgae: "end"});
})

export const  listRouter = router;