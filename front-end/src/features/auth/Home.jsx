import { useState } from "react"
import { MainContent } from "./MainContent"
import { ReportFilter } from "./ReportFilter"
import Modal from "./Modal"

export default function Home({ setReportData }) {
    var reportSelection =[
        {id: 'IQPM', reportName: 'Item Quantity Per Model'}, 
        {id: 'TDPM', reportName: 'Top Defects Per Model'}, 
        {id: 'PTPM', reportName: 'Pending Tasks Per Model'}
    ]

    const [openOverlay, setOpenOverlay] = useState(false)

    const [currentOverlay, setCurrentOverlay] = useState({id: "", reportName: ""})

    function toggleOverlay(report, Id) {
        setOpenOverlay(!openOverlay)
        currentOverlay.id = Id
        currentOverlay.reportName = report
    }

    return (
    <>
        {/* <div className="navHolder"></div>  */}

        <MainContent reportSelection={reportSelection} toggleOverlay={toggleOverlay}/>

        {/* {openOverlay && (<FilterOverlay toggleOverlay={toggleOverlay} />)} */}

        <Modal openOverlay={openOverlay} toggleOverlay={toggleOverlay} >
            <ReportFilter toggleOverlay={toggleOverlay} {...currentOverlay} />
        </Modal>
    </>
    )
}
