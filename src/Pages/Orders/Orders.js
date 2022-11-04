
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import app from '../../firebase/firebase.config';
import OrderRow from './OrderRow';

const Orders = () => {
    const { user } = useContext(AuthContext);
    console.log(user)
    const [orders, setOrders] = useState([])
    console.log(orders)

    const handleDelete=_id=>{
        const procced=window.confirm('Are you sure you want to cancel this order');
        if(procced){
            fetch(`http://localhost:5000/orders/${_id}`,{
                method:'DELETE'
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                if(data.deletedCount>0){
                    alert('deleted succsesfully');
                    const reamining=orders.filter(odr=>odr._id!==_id);
                    setOrders(reamining)

                }
            })
        }

    }
    const handleStatusUpdate=_id=>{
        fetch(`http://localhost:5000/orders/${_id}`,{
            method:'PATCH',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({status:'Approved'})
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.modifiedCount>0){
                const remaining=orders.filter(odr=>odr._id!==_id)
                const approved=orders.find(odr=>odr._id===_id)
                approved.status='Approved';
                const newOrders=[...remaining,approved]
                setOrders(newOrders);

            }
        })

    }

    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setOrders(data))

    }
        ,
        [user?.email]
    )

    return (
        <div>
            <h2 className='text-5xl'> you have {orders.length}  orders</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <button className='btn btn-ghost'>X</button>
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>


                        {
                            orders.map(order => <OrderRow
                                key={order._id}
                                order={order}
                                handleDelete={handleDelete}
                                handleStatusUpdate={handleStatusUpdate}
                            ></OrderRow>)
                        }

                    </tbody>



                </table>
            </div>
        </div>
    );
};

export default Orders;