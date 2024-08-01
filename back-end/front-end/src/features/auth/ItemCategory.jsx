export function ItemCategory({ setItem }) {
    var itemSelection =[
        {value: "default", label: "(Category)"},
        {value: "ACCESSORIES", label: "ACCESSORIES"}, 
        {value: "AGR/MIRACLE 8 ITEM", label: "AGR/MIRACLE 8 ITEM"}, 
        {value: "CAR SPEAKER", label: "CAR SPEAKER"},
        {value: "CEILING SPEAKER", label: "CEILING SPEAKER"}, 
        {value: "HORN SPEAKER", label: "HORN SPEAKER"}, 
        {value: "KARAOKE SPEAKERS", label: "KARAOKE SPEAKERS"},
        {value: "MOULDED SPEAKERS", label: "MOULDED SPEAKERS"}, 
        {value: "PA & PRO SPEAKER SYSTEM", label: "PA & PRO SPEAKER SYSTEM"}, 
        {value: "WALL MOUNT SPEAKERS", label: "WALL MOUNT SPEAKERS"},
        {value: "WOOFERS", label: "WOOFERS"}, 
        {value: "CONFERENCE SYSTEM", label: "CONFERENCE SYSTEM"}, 
        {value: "FULL RANGE ITEMS", label: "FULL RANGE ITEMS"},
        {value: "KARAOKE & PA AMPLIFIERS", label: "KARAOKE & PA AMPLIFIERS"}, 
        {value: "LINE ARRAY", label: "LINE ARRAY"}, 
        {value: "MIC & WIRELESS MICROPHONE", label: "MIC & WIRELESS MICROPHONE"},
        {value: "MIXER", label: "MIXER"}, 
        {value: "PHASED OUT", label: "PHASED OUT"}, 
        {value: "PODIUM LECTERN", label: "PODIUM LECTERN"},
        {value: "POWER AMPLIFIERS", label: "POWER AMPLIFIERS"}, 
        {value: "PRO WOOFERS", label: "PRO WOOFERS"}, 
        {value: "PROCESSORS", label: "PROCESSORS"},
        {value: "REPAIR CHARGES", label: "REPAIR CHARGES"}, 
        {value: "SOUND DIMENSION ITEMS", label: "SOUND DIMENSION ITEMS"}, 
        {value: "SPAREPARTS", label: "SPAREPARTS"},
        {value: "TWEETERS", label: "TWEETERS"}
    ]
    
    return (
        <select className="btn-dropdown-mock dropdown-selection" name="category1" onChange={e => setItem(e.target.value)}>
            {itemSelection.map(item => {
                return (<option value={item.value}>{item.label}</option>)
            })}
        </select>
    )
}
