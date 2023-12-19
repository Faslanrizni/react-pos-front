import React from "react"
import DefaultCard from "./cards/DefaultCard";

function Home() {

    return (
        <>
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4 col-l-3">
                        <DefaultCard/>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-l-3">
                        <DefaultCard/>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-l-3">
                        <DefaultCard/>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-l-3">
                        <DefaultCard/>
                    </div>

                </div>

            </div>

        </>
    )
}
export default Home;