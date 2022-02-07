import initStripe from "stripe"

const Pricing = ({ plans }) => {
    return (
        <div>
            <pre>{JSON.stringify(plans, null, 2)}</pre>
        </div>
    )
}

export default Pricing;


export const getStaticProps = async () => {
    const stripe = initStripe(process.env.STRIPE_SECRET_KEY)
    const { data: prices } = await stripe.prices.list();

    const plans = await Promise.all(prices.map(async (price) => {
        const product = await stripe.products.retrieve(price.product)
        return {
            id: price.id,
            name: product.name,
            price: price.unit_amount,
            interval: price.recurring.interval,
            currency:price.currency
        }
    }))
    return {
        props: {
            plans
        }
    }
}