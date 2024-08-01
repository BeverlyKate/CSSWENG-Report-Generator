import { useState } from "react"
import closeIcon from "./close.svg"
import { DateSelect } from "./DateSelect"
import { FormIQPM } from "./FormIQPM"
import { FormTDAndPTPM } from "./FormTDAndPTPM"
import { useNavigate } from "react-router-dom"
import apiClient from "../../app/api/apiClient"

export function ReportFilter({ toggleOverlay, reportName, id }){
    const [dateRange, setDateRange] = useState("")
    const [repairStatus, setRepairStatus] = useState("")
    const [itemCategory, setItemCategory] = useState("default")
    const [modelCategory, setModelCategory] = useState("default")
    const [formData, setFormData] = useState({overlay: id, dateFrom: "", category1: ""})
    const navigate = useNavigate()

    function getDate(date) {
        setDateRange(date)
    }

    function getRepairStatus(status) {
        setRepairStatus(status)
    }

    function getItemCategory(item){
        setItemCategory(item)
    }

    function getModelCategory(model){
        setModelCategory(model)
    }

    function generateReport(e) {
        e.preventDefault()

        //var data = this.state.arr.slice()

        if(dateRange === "") return console.log("invalid date")
        
        formData.dateFrom = dateRange
        
        //console.log(dateRange)

        if(id === "TDPM" || id === "PTPM"){
            if(repairStatus==="") return console.log("please select status")

            formData.taskType = repairStatus

            formData.itemModel = modelCategory
        }

        if(itemCategory !== "default" && modelCategory != "default") return console.log("Select 1 category only")

        formData.category1 = itemCategory

        //console.log(formData)

        apiClient
        .post(`/${formData.overlay}post`, formData, {
            headers: {
                // host: 'localhost:3000',
                // connection: 'keep-alive',
                // 'content-length': '16852305',
                // 'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
                // accept: '*/*',
                // 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryyjm1HU0NM68qybG8',
                // 'x-requested-with': 'XMLHttpRequest',
                // 'sec-ch-ua-mobile': '?0',
                // 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
                // 'sec-ch-ua-platform': '"Windows"',
                // origin: 'http://localhost:3000',
                // 'sec-fetch-site': 'same-origin',
                // 'sec-fetch-mode': 'cors',
                // 'sec-fetch-dest': 'empty',
                // referer: 'http://localhost:3000/import',
                // 'accept-encoding': 'gzip, deflate, br, zstd',
                // 'accept-language': 'en-US,en;q=0.9,tl;q=0.8',
                'Content-Type': 'application/json'
              // Add any other headers you need
            }
        })
        .then(
            (response) => {
            console.log(response.data)
            navigate("/dash/report", {state: {data: response.data, content: formData}})
            }
            // navigate("/dash/report", {state: formData})
        )
        .catch((error)=>{
            console.error("Can't generate data!", error.message);
        })

        // apiClient
        // .post(`/${formData.overlay}post`, formData)
        // .then(response => {
        //     console.log(response.data)
        //     navigate("/dash/report", {state: response.data})
        // })
        // .catch((error)=>{
        //     console.error("Can't generate data!", error);
        // })

        
    }

    return(
        <div className="overlay-holder">
            <div className="dark-overlay"></div>
            <div className="popup">
                {/* <button 
                    className="on-close" 
                    onClick={() => toggleOverlay("")}
                >
                    
                </button> */}
                <form className ="hello" onSubmit={generateReport}>
                    <div className="popup-body">
                        <div className="popup-header">
                            <div className="popup-text">{reportName}</div>
                            <button className="btn-close" onClick={() => toggleOverlay("")}><img src={closeIcon} alt="close popup"/></button>
                        </div>
                        <div className="popup-subheader">
                            <div className="dashed-line"></div>
                            <div className="popup-text-one">Date range</div>
                            <div className="dashed-line"></div>
                        </div>
                        <DateSelect getDate={getDate}/>
                        <div className="report-specifics-holder">
                            {reportName === "Item Quantity Per Model" && (<FormIQPM getItemCategory={getItemCategory}/>) 
                            || (<FormTDAndPTPM getRepairStatus={getRepairStatus} 
                                                getItemCategory={getItemCategory} 
                                                getModelCategory={getModelCategory}/>)}
                        </div>
                        <button type="submit" className="btn-generate-report">
                            Generate Report
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}