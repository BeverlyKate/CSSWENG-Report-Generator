import { TechCategory } from "./TechCategory"
export function FormTIQAndAWDPT({ getTechCategory }) {

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
        <div class="centered">
            <TechCategory setTech={setTech}/>
        </div>
    </>
  )
}
