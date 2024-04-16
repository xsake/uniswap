import "./../components/Uniswap.css"

export default function TokenPrice({ icon, token, name, price,setToken }) {
    return (
        <div className="tokenprice" onClick={()=>setToken({icon, token, price})}>
            <div className="token_name">
                <img src={icon} alt="btg" size="30px"/>
                <div>
                    <h3>{name}</h3>
                    <p>{token}</p>
                </div>
            </div>
            <h2>$ {price}</h2>
        </div>
    )
}
