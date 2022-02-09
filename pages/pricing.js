import axios from "axios";
import initStripe from "stripe"
import { useUser } from "../context/user";
import { useState, useEffect } from "react";



const Pricing = ({ plans }) => {
    const { user, login, isLoading } = useUser()

    const showSubscribeButton = !!user && !user.is_subscribed;
    const showCreateAccountBtn = !user
    const showManagedSubscription = !!user && user.is_subscribed;

    const processSubscription = (planId) => async () => {
        const { data } = await axios.get(`api/subscription/${planId}`)
        console.log(data);
    }


    return (
        <div className="w-full max-w-3xl mx-auto py-16 flex justify-around">
            {/* <pre>{JSON.stringify(plans, null, 2)}</pre> */}
            {plans.map((plan) => (
                <div key={plan.id} className='w-80 h-40 shadow-lg px-6 py-4 '>
                    <h2 className="text-3xl">{plan.name}</h2>
                    <p className="text-gray-500">${plan.price / 100} / {plan.interval}</p>



                    {!isLoading && (
                        <div>
                            {showSubscribeButton && (<button onClick={processSubscription(plan.id)}>Subscribe</button>)}
                            
                            {showCreateAccountBtn && (
                                <button onClick={login}>Create Account</button>
                            )}



                            {
                                showManagedSubscription && (
                                    <button>Manage Subscription</button>
                                )
                            }
                        </div>
                    )}


                </div>
            ))}
        </div>
    )
}

export default Pricing;


export const getStaticProps = async () => {
    const stripe = initStripe(process.env.STRIPE_SECRET_KEY)
    // This will return teh price json lists
    const { data: prices } = await stripe.prices.list();

    // This will convert the json to userdefine obj
    const plans = await Promise.all(prices.map(async (price) => {
        const product = await stripe.products.retrieve(price.product)
        return {
            id: price.id,
            name: product.name,
            price: price.unit_amount,
            interval: price.recurring.interval,
            currency: price.currency
        }
    }))

    // this will sort the value accroding to price
    const sortedPlans = plans.sort((a, b) => a.price - b.price)

    return {
        props: {
            plans: sortedPlans
        }
    }
}