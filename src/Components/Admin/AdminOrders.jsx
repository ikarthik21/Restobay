import React, { useState, useEffect } from 'react';
import { AdminTable, TableRow, TableInnerRow, SingleRow, EachItemHead, SingleOrder, EachItem, UserDetails } from '../Styles/Adminstyles';
import moment from 'moment';
import '../../App.css';
import { Allitems, Container } from '../Styles/Menu'
import { getOrders } from '../../Service/Api';
import { MdVerified } from 'react-icons/md'
import { ImCross } from 'react-icons/im'




const AdminOrders = () => {

    const [singleOrder, setsingleOrder] = useState();

    const [orders, setOrders] = useState();

    useEffect(() => {
        const fetchFoodOrders = async () => {
            const resp = await getOrders();
            setOrders(resp.data);
        }
        fetchFoodOrders();

    }, [])


    return (
        <Container>
            <Allitems>
                <h1>All Orders</h1>
            </Allitems>

            <div className='flexSpacebtw2'>



                <AdminTable>


                    {
                        orders?.map((order) => {

                            return <TableRow key={order.orderId}>
                                <TableInnerRow>
                                    <img src={"/images/" + order.Items[0].image} alt="" />


                                    <div className='applyFlex2 marginBottom'>
                                        <div className='flexSpacebtw marginBottom'>
                                            <h3  >{order.orderId}</h3>
                                            {order.status === "payment successful" ? <MdVerified color="green" size={25} /> :


                                                <ImCross color="red" size={20} />}

                                        </div>


                                        <div className='applyFlex3 marginBottom'>
                                            <h4 className='sub_clr '>Total Items : <span className='font2'>{order.totalItems}</span> </h4>
                                        </div>
                                        <div className='applyFlex3 marginBottom'>
                                            <h4 className='sub_clr '>Date and Time : <span className='font2'> {moment(order.createdAt).format('DD-MM-YYYY h:mm A')} </span> </h4>
                                        </div>


                                    </div>



                                </TableInnerRow>
                                <div className='applyFlex3 floatRight '>
                                    <h4 className="font1 " style={{ cursor: "pointer" }} onClick={() => setsingleOrder(order)}
                                    >VIEW DETAILS</h4>
                                </div>
                            </TableRow>


                        })
                    }





                </AdminTable>

                {singleOrder ? <SingleOrder>


                    <TableRow>
                        <div className='flexSpacebtw marginBottom'>
                            <h2 className='spl_num fntfmly1'>  {singleOrder?.orderId}</h2>
                            <MdVerified color="green" size={25} />

                        </div>

                        <h3 className='spl_num fntfmly1' >Order Summary</h3>

                        <UserDetails>
                            <h3 className='font3'> Name : <span>{singleOrder?.name}</span> </h3>
                            <h3 className='font3'> Email : <span>{singleOrder?.email}</span></h3>
                            <h3 className='font3'>  Phone: <span>{singleOrder?.phone}</span></h3>
                        </UserDetails>

                        <SingleRow>
                            <EachItemHead>
                                <h3 className='fntfmly2'>Item</h3>
                            </EachItemHead>
                            <EachItemHead>

                                <h3 className='fntfmly2'>Name</h3>
                            </EachItemHead>
                            <EachItemHead>

                                <h3 className='fntfmly2'>Qty</h3>
                            </EachItemHead>
                            <EachItemHead>

                                <h3 className='fntfmly2'>Price</h3>
                            </EachItemHead>


                        </SingleRow>

                        {singleOrder?.Items?.map((item, idx) => {


                            return <SingleRow key={idx}>
                                <EachItem>
                                    <img src={"/images/" + item.image} alt="" />
                                </EachItem>
                                <EachItem>


                                    <h3 className='font3'>{item.name}</h3>
                                </EachItem>
                                <EachItem>

                                    <h3 className='font3'>{item.quantity}</h3>
                                </EachItem>
                                <EachItem>

                                    <h3 className='font3'>{item.price}</h3>
                                </EachItem>


                            </SingleRow>

                        })

                        }




                        <SingleRow>



                            <EachItemHead>
                                <h3 className='fntfmly2'>Total</h3>
                            </EachItemHead>
                            <EachItemHead>


                            </EachItemHead>
                            <EachItemHead>

                                <h3 className='fntfmly2 spl_num'>{singleOrder?.totalItems}</h3>
                            </EachItemHead>
                            <EachItemHead>

                                <h3 className='fntfmly2 spl_num'>{singleOrder?.totalPrice}</h3>
                            </EachItemHead>


                        </SingleRow>




                    </TableRow>

                </SingleOrder> : ""}



            </div>F
        </Container>
    )
}

export default AdminOrders