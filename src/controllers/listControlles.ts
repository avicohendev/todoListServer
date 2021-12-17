import { Response, Request, NextFunction } from "express";
import { Router } from "express";
import { CollectionReference, DocumentReference, FieldValue , Query } from "firebase-admin/firestore";
import { db , dbCollectionsRef } from "../firebase/firebaseApp";
import { ListItem } from "../models/list";
import { getListItem, createListItem} from './listItems'
import { collection, query, where, getDocs } from "firebase/firestore";

type listGetParams = {
    listId : string
}
type userParams={
    userId: string

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
    
    //   const list = await db.collection('lisimport { collection, query, where, getDocs } from "firebase/firestore";t').add({
//     name: 'victory',
//     user: "ffffff",
//     items: FieldValue.arrayUnion(db.doc(`${listItem1.path}`), db.doc(`${listItem2.path}`)),
   
//   });
   

}

export const userLists = async (req : Request<userParams>, res: Response, next: NextFunction) =>{
    if(req.params.userId){
        
        const result : {}[]= [];
        const names = await dbCollectionsRef.list.select("user", "name").where("user", "==", req.params.userId).get();
       // const q = query(collection(db,'list'), where("user", "==", req.params.userId));
       names.forEach(name => {

        const listData = name.data();
           const listToAdd ={
               name : listData.name,
               id: name.id
           }
           result.push(listToAdd);
       })
        res.status(200).json(result);
    }else{

        res.status(400).json({messgae: "missing params"});

    }
    
}