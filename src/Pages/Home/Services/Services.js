import React, { useEffect, useRef, useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
    const [services,setServices]=useState([]);
    const [isAsc,setISAsc]=useState(true);
    const [search,setSearch]=useState('');

    const searchRef=useRef();
    const handleSearch=()=>{
        setSearch(searchRef.current.value)
    }
    useEffect(()=>{
        fetch(`http://localhost:5000/services?search=${search}&order=${isAsc ? 'asc':'dec'}`)
        .then(res=>res.json())
        .then(data=>setServices(data))
    },[isAsc,search])
    return (
        <div>
            <div className='text-center mb-4'>
                <p className="text-2xl font-bold text-orange-600" >Services</p>
                <h2 className='text-5xl font-semibold'>Our Service Area</h2>
                <p className='w-3/5 mx-auto '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, sequi! Aspernatur ipsum dolores aperiam aliquid iste! Dignissimos debitis soluta molestiae, quod quae voluptatum iste numquam nisi ab maiores. Mollitia tempore nam officiis, aspernatur nobis est autem sint vitae amet dolor consequatur sit excepturi ratione tenetur cupiditate tempora? Eum, voluptatem quis?</p>
                <input className='input input-sm my-4 mx-3' ref={searchRef} type="text" name="" id="" placeholder='type what you need' />
                 <button onClick={handleSearch}>Serach</button> <br />
                <button className='btn btn-primary' onClick={()=>setISAsc(!isAsc)} >{isAsc?'desc':'asc'}</button>
            </div>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                
                {
                    services.map(service=><ServiceCard
                    key={service._id}
                    service={service}
                    ></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;