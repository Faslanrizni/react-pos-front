import React from "react"
import DefaultCard from "./cards/DefaultCard.tsx";
import DefaultChart from "./cards/DefaultCard.tsx";
import MinQtyCard from "./cards/MinQtyCard";

function Home() {

    return (
        <>
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <DefaultCard
                            thumbnail={'https://img.freepik.com/free-photo/focused-business-group-studying-report_1262-21043.jpg?size=626&ext=jpg&ga=GA1.1.1313303609.1697107729&semt=sph' }
                            description={'Customer'}
                            title={'Customer'}
                            value={2750}
                            key={1}
                        />
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <DefaultCard
                            thumbnail={'https://img.freepik.com/premium-photo/large-clean-warehouse-with-shelves-cardboard-boxes-products-generative-ai_1005220-1640.jpg?size=626&ext=jpg&ga=GA1.2.1313303609.1697107729&semt=sph'}
                            description={'Products'}
                            title={'Products'}
                            value={2750}
                            key={2}
                        />
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <DefaultCard
                            thumbnail={'https://img.freepik.com/free-photo/medium-shot-man-drinking-coffee_23-2148539831.jpg?size=626&ext=jpg&ga=GA1.1.1313303609.1697107729&semt=sph'}
                            description={'Orders'}
                            title={'Orders'}
                            value={2750}
                            key={3}
                        />
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <DefaultCard
                            thumbnail={'https://img.freepik.com/free-photo/business-man-counting-dollar-banknote-online-business-concept_1150-6406.jpg?size=626&ext=jpg&ga=GA1.2.1313303609.1697107729&semt=sph'}
                            description={'income'}
                            title={'income'}
                            value={2750}
                            key={4}
                        />
                    </div>

                </div>
                <br/>

                <div className="row">
                    <div className="col-12 col-md-9">
                        <div className="context">
                            <DefaultChart/>
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                            <MinQtyCard/>
                            <MinQtyCard/>
                            <MinQtyCard/>
                            <MinQtyCard/>
                    </div>
                </div>

            </div>

        </>
    )
}
export default Home;