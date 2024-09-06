import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { valueConverter, ytAPIKey } from '../../data'
import moment from 'moment';
import { SetContext } from '../../contexts/setContext'


const Feed = () => {
    const [data, setData] = useState(null);
    const {sidebar, category} = useContext(SetContext)

    // const fetchData = async () => {
    //     const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${import.meta.env.VITE_YTAPI_KEY}`
    //     await fetch(videoList_url).then((res) => res.json()).then((data) => setData(data.items))
    // };

    const fetchData = async () => {
        try {
            const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${ytAPIKey}`;
            const response = await fetch(videoList_url);
            const result = await response.json();
            setData(result.items);
        } catch (error) {
            console.error('Error fetching data:', error);
            setData(null)
        }
    };

    useEffect(() => {
        fetchData()
    }, [category]);

    if(!data) return <div className=' text-center my-auto text-3xl text-red-500'>Loading...</div>

    return (
        <div className={`feed grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-7 gap-x-4 gap-y-10 mx-4 ${sidebar ? "opacity-70" : ""} `}>
            {data.map((item, idx) => {
                return (
                    <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className='card' key={idx}>
                        <img className='w-full rounded-2xl' src={item.snippet.thumbnails.medium.url} alt="" />
                        <h2 className='text-sm font-medium text-black my-1 dark:bg-gray-950 dark:text-white'>{item.snippet.title}</h2>
                        <h3 className='text-sm opacity-80'>{item.snippet.channelTitle}</h3>
                        <p className='text-sm opacity-80'>{valueConverter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                        {/* <img src={thumbnail1} alt="" className='rounded-xl w-[40%]' />
                        <div className="vid-info">
                            <h2 className='text-sm font-medium text-black my-1'>Best channel to learn coding that help you to be a web developer</h2>
                            <h3 className='text-sm opacity-80'>Greatstack</h3>
                            <p className='text-sm opacity-80'>15k views &bull; 2 days ago</p>
                        </div> */}
                    </Link>
                )
            })}
        </div>
    )
}

export default Feed