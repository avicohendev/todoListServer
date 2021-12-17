import { Response, Request, NextFunction } from "express";
import { Router } from "express";
import { db , dbCollectionsRef } from "../firebase/firebaseApp";
import { getListItem} from './listItems'

type listGetParams = {
    listId : string
}

export const getListById = async (req : Request<listGetParams>, res: Response, next: NextFunction) =>{
    if(req.params.listId){
        
        const list = await getListAndItems(req.params.listId)
        res.status(200).json(list);
    }else{

        res.status(400).json({messgae: "missing params"});

    }
    
}

export const getListAndItems = async (listId : string) =>{
    try{
        const listRefTypes = await dbCollectionsRef.list.doc(listId).get();
        const listData = listRefTypes.data();
        const items =[]
       if(listData?.items){
        for ( const item of listData!.items){
            
             items.push(await getListItem(item.id));
        }
       } 

        const listResponse = {
            name: listData?.name,
            user: listData?.user,
            items: items,
    }
    return listResponse;
    }
    catch (error){
        throw error;
    }
    
}
