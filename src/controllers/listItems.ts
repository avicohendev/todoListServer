import { Response, Request, NextFunction } from "express";
import { Router } from "express";
import { db , dbCollectionsRef } from "../firebase/firebaseApp";
import { ListItem } from "../models/list";



export const getListItem = async (itemId :string) => {
    const item = await  dbCollectionsRef.listItems.doc(itemId).get();
    const itemData = item.data();
    return itemData;
}