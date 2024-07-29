import { Helmet } from "react-helmet-async"


// Component for setting the page title using Helmet
export default function MetaData({title}) {
    return (
        <Helmet>
            <title>{`${title} - Ecommerce`}</title>
        </Helmet>
    )
}