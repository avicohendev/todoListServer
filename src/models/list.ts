import { itemStatus } from "../enums/itemStatus";
import { getFirestore, Timestamp, FieldValue, Transaction , DocumentReference} from 'firebase-admin/firestore';



export interface List {
    name: string,
    user: string,
    items: DocumentReference<ListItem>[]
} 

export interface ListItem{
    itemName: string,
    amount: number,
    status: itemStatus,
    createDate : Timestamp
}