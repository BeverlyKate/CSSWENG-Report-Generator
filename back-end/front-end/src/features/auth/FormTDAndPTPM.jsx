import { ItemCategory } from "./ItemCategory"
import { StatusSelect } from "./StatusSelect"
import { ModelCategory } from "./ModelCategory" 

export function FormTDAndPTPM({ getRepairStatus, getItemCategory, getModelCategory }) {

  function setStatus(status){
    getRepairStatus(status)
  }

  function setItem(item){
    getItemCategory(item)
  }

  function setModel(model){
    getModelCategory(model)
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
                <div class="popup-text-one">or</div>
                <div class="dashed-line"></div>
                <div class="popup-text-one">Category</div>

            </div>
        </div>
        <div class="popup-options">
          <ModelCategory setModel={setModel}/>
          <ItemCategory setItem={setItem}/>
        </div>
    </>
  )
}
