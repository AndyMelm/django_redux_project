import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getAllAsync, addAsync, selectProducts, delAsync, updAsync } from './crudSlice'

const CRUD = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectProducts);
    const [strategy, setstrategy] = useState("")
    const [buyprice, setbuyprice] = useState(0)
    const [sellprice, setsellprice] = useState(0)
    const [position, setposition] = useState("")
    const [description, setdescription] = useState("")
    
    useEffect(() => {
        dispatch(getAllAsync())
    }, [])



    return (
        <div>
            <h1> CRUD</h1>
            Strategy<input onChange={(e) => setstrategy(e.target.value)} />
            Buy Price<input onChange={(e) => setbuyprice(+e.target.value)} />
            Sell Price<input onChange={(e) => setsellprice(+e.target.value)} />
            Position<input onChange={(e) => setposition(e.target.value)} />
            Description<input onChange={(e) => setdescription(e.target.value)} />


            <button onClick={() => dispatch(addAsync({strategy, buyprice, sellprice, position, description}))}>add data</button>
            <button onClick={() => dispatch(getAllAsync())}>Load data</button>

            {products.length}

            <hr />
            {products.map((prod, ind) => <div key={ind}>Strategy:{prod.strategy} | BuyPrice: {prod.buyprice} | SellPrice: {prod.sellprice} | Position: {prod.position} | Description: {prod.description}
                <button onClick={() => dispatch(delAsync(prod.id || 0))}>Del </button>
                <button onClick={() => dispatch(updAsync({ id: (prod.id || 0), strategy, buyprice , sellprice,position, description}))}>upd </button>
            </div>)}

        </div>
    )
}

export default CRUD

