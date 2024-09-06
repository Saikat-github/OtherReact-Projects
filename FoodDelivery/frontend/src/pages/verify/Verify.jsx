import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/context';
import axios from 'axios';


const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const {url} = useContext(StoreContext);
    const navigate = useNavigate()

    const verifyPayment = async () => {
        const response = await axios.post(url+"/api/order/verify", {success, orderId});
        if(response.data.success) {
            navigate("/myorders");
        } else {
            navigate("/")
        }
    }
    

    useEffect(() => {
        verifyPayment();
    }, []);


  return (
    <div className='verify min-h-[60vh] grid'>
        <div className="spinner w-24 h-24 place-self-center  border-4 border-t-red-600 rounded-full animate-spin"></div>
    </div>
  )
}

export default Verify