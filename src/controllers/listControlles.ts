import { Response, Request, NextFunction } from "express";
import { Router } from "express";
import { CollectionReference, DocumentReference, FieldValue } from "firebase-admin/firestore";
import { db , dbCollectionsRef } from "../firebase/firebaseApp";
import { ListItem } from "../models/list";
import { getListItem, createListItem} from './listItems'

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

export const createList = async (req : Request, res: Response, next: NextFunction) =>{
    if(req.body.list){
        
        await createListAndItems(req.body.list)
        res.status(200).json({message: "list created"});
    }else{

        res.status(400).json({messgae: "missing params"});

    }
    
}
const  createListAndItems = async (list: any) =>{


    const itemsArr : DocumentReference<ListItem>[] = [];
    for (const item of list.items){
        const itemId = await createListItem(item as ListItem);
        itemsArr.push(dbCollectionsRef.listItems.doc(itemId));
    }
    const createdList = await dbCollectionsRef.list.add({
        name: list.name,
        user: list.user,
        items: itemsArr
    });
    
    //   const list = await db.collection('list').add({
//     name: 'victory',
//     user: "ffffff",
//     items: FieldValue.arrayUnion(db.doc(`${listItem1.path}`), db.doc(`${listItem2.path}`)),
   
//   });
   
    
}