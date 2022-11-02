import React from 'react';

const BannerItem = ({slide}) => {
    const {image,prev,next,id}=slide;
    return (
        <div id={`slide${id}`} className="carousel-item relative w-full">
                <div className='carousel-img'>
                    <img src={image} alt='' className="w-full rounded-xl" />
                </div>
                <div className="absolute flex justify-end transform -translate-y-1/2 left-20  top-1/4">
                    <h1 className='text-6xl font-bold text-white'>
                        Affordtable <br />
                        Price For Car <br />
                        Serviceing
                    </h1>
                </div>
                <div className="absolute flex justify-end transform w-2/5 -translate-y-1/2 left-20  top-1/2">
                    <p className='text-white text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, expedita.</p>
                </div>
                <div className="absolute flex justify-start transform w-2/5 -translate-y-1/2 left-20  top-3/4">
                    <button className="btn btn-warning mr-5">Warning</button>
                    <button className="btn btn-outline btn-warning">Warning</button>
                </div>


                <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                    <a href={`#slide${prev}`} className="btn btn-circle mr-5">❮</a>
                    <a href={`#slide${next}`} className="btn btn-circle">❯</a>
                </div>
            </div>
    );
};

export default BannerItem;