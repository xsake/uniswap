
export default function TokenModal( {icon, token, price, setToken}) {
    return (
        <div className="token" onClick={()=>setToken({icon, token, price})}>
            <img src={icon} alt="btg" />
            <h1>{token}</h1>
        </div>
    )
}
