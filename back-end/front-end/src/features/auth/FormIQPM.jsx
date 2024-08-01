import { ItemCategory } from "./ItemCategory"

export function FormIQPM({ getItemCategory }) {
  function setItem(item){
    getItemCategory(item)
  }

  return (
    <>
        <div className="popup-subheader">
            <div className="dashed-line"></div>
            <div className="popup-text-one">Item Category</div>
            <div className="dashed-line"></div>
        </div>
        <br/>
        <div className="centered">
          <ItemCategory setItem={setItem}/>
        </div>
        <br/>
    </>
  )
}
