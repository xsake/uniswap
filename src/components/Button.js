import './Uniswap.css'
import {notification} from 'antd'

export default function Button() {

    const showNotification = (message, type = 'info') => {
        notification[type]({
          message: message,
          duration: 3
        });
      };
    

    return (
        <button onClick={() => showNotification('Succese !', 'success')}
            className="connect_wallet">
            Connect Wallet
        </button>
    )
}