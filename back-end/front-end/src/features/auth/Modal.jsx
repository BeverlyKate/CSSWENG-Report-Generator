export default function Modal({ openOverlay, children }) {
    if (!openOverlay) return null
    return (
    <div>
        {children}
    </div>
    )
}
