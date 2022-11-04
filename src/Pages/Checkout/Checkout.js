import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Checkout = () => {
    const service = useLoaderData();
    const { title ,price,_id} = service;
    const {user}=useContext(AuthContext);
    const handlePlaceOrder =event=>{
        event.preventDefault();
        const form=event.target;
        const name=`${form.firstName.value} ${form.lastName.value}`
        const email=user?.email || 'unregisterd';
        const message=form.message.value;
        const phone=form.phone.value;



        const order ={
            service:_id,
            serviceName:title,
            price,
            customer:name,
            email,
            phone,
            message

        };
        console.log(order)
        // if (phone.length > 11){
        //     alert('Give the right number')

        // }
        fetch('http://localhost:5000/orders',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(order)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.acknowledged){
                alert('order placed succsessfully')
                form.reset()
            }
        })
        .catch(er=>console.error(er))
    }
    return (
        <div>
            <form onSubmit={handlePlaceOrder} >
                <h2 className='text-4xl'>You are about to order : {title}</h2>
                <h4 className='text-3xl'>Price:{price}</h4>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <input name='firstName' type="text" placeholder="frist name" className="input input-bordered w-full " />
                    <input name='lastName' type="text" placeholder="last name" className="input input-bordered w-full " />
                    <input name='phone' type="text" placeholder="your phone" required className="input input-bordered w-full " />
                    <input name='email' type="text" placeholder="your email" defaultValue={user?.email} readOnly className="input input-bordered w-full " />
                </div>
                
                <textarea name='message' className="textarea textarea-bordered h-24 w-full my-3" placeholder="your message"></textarea>
                <input className='btn' type="submit" value='Place Your Order' />
            </form>
        </div>
    );
};

export default Checkout;