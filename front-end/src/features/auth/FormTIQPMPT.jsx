import { StatusSelect } from "./StatusSelect"
import { ItemCategory } from "./ItemCategory"
import { TechCategory } from "./TechCategory"


export function FormTIQPMPT({ getRepairStatus, getItemCategory, getTechCategory }) {
    function setStatus(status){
        getRepairStatus(status)
    }

    function setItem(item){
        getItemCategory(item)
    }

    function setTech(tech){
        getTechCategory(tech)
    }
    
    return (
    <>
        <div class="popup-subheader">
            <div class="dashed-line"></div>
            <div class="popup-text-one">Task type</div>
            <div class="dashed-line"></div>
        </div>
        <StatusSelect setStatus={setStatus}/>
        <div class="popup-subheader">
            <div class="popup-subheader">
                <div class="popup-text-one">Item
                </div>
                <div class="dashed-line"></div>
                <div class="popup-text-one">and</div>
                <div class="dashed-line"></div>
                <div class="popup-text-one">Technician</div>
            </div>
        </div>
        <div class="popup-options">
            <ItemCategory setItem={setItem}/>
            <TechCategory setTech={setTech}/>
        </div>
    </>
    )
}
