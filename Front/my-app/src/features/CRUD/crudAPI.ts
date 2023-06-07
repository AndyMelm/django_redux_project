import axios from 'axios'
import { Journal2 } from '../../Models/Journal2';

export function getAll() {
    return new Promise<{ data: any }>((resolve) =>
        axios.get("http://127.0.0.1:8000/journal/").then(res => resolve({ data: res.data }))
    );
}

export function add(product:Journal2) {
    console.log("ADD ACTIVATED");
    return new Promise<{ data: any }>((resolve) =>
        axios.post("http://127.0.0.1:8000/journal/",product).then(res => resolve({ data: res.data }))
    );
}

export function deleteProd(productId:number) {
    return new Promise<{ data: any }>((resolve) =>
        axios.delete(`http://127.0.0.1:8000/journal/${productId}`).then(res => resolve({ data: res.data }))
    );
}

export function upd(product:Journal2) {
    return new Promise<{ data: Journal2 }>((resolve) =>
        axios.put(`http://127.0.0.1:8000/journal/${product.id}`,product).then(res => resolve({ data: res.data }))
    );
}
