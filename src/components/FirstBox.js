import { useState, useEffect } from 'react';
import './Uniswap.css'
import { Modal, Input } from 'antd';
import TokenModal from '../modal/TokenModal';
import data from "./../data/pop_crypto.json"
import tokens from "./../data/cryptos.json"
import TokenPrice from '../modal/TokenPrive';
import Button from './Button'



export default function FirstBox() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    const [isFirstToken, setIsFirstToken] = useState(false);
    const [isSecondToken, setIsSecondToken] = useState(false);

    const [firstValue, setFirstValue] = useState(0);
    const [secondValue, setSecondValue] = useState(0);
    const [firstAllValue, setFirstAllValue] = useState(0);
    const [secondAllValue, setSecondAllValue] = useState(0);

    const [firstToken, setFirstToken] = useState(() => {
        const storedTokenName = new URLSearchParams(window.location.search).get('firstToken');
        console.log(storedTokenName, '--------')
        const storedToken = tokens.filter((item) => item.token.includes(storedTokenName))[0];
        return storedToken ? storedToken :
            { token: "ETH", icon: './cryptos/eth.svg', price: 70 }
    });
    const [secondToken, setSecondToken] = useState(() => {
        const storedTokenName = new URLSearchParams(window.location.search).get('secondToken');
        console.log(storedTokenName, '--------')
        const storedToken = tokens.filter((item) => item.token.includes(storedTokenName))[0];
        return storedToken ? storedToken :
            { token: "Select Token", icon: '', price: 0 }
    });

    const newUrl = `?firstToken=${firstToken.token}&secondToken=${secondToken.token}`;
    window.history.replaceState({}, '', newUrl);

    useEffect(() => {
        const filteredTokens = tokens.filter(item =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
        );

        setFilteredData(filteredTokens);
    }, [searchValue]);

    useEffect(() => {
        setFirstValue(firstValue)
        setFirstAllValue(firstValue * firstToken.price)
        setSecondValue(firstValue * firstToken.price / secondToken.price)
        setSecondAllValue(firstValue * firstToken.price)
    }, [firstToken]);

    useEffect(() => {
        setSecondValue(secondAllValue / secondToken.price)
    }, [secondToken]);


    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleCancel = () => {
        setIsOpen(false);
        setIsSecondToken(false);
        setIsFirstToken(false);
    };

    const firstClick = () => {
        setIsOpen(true);
        setIsFirstToken(true);
    }

    const secondClick = () => {
        setIsOpen(true);
        setIsSecondToken(true);
    }

    const handleBtn = () => {
        if (secondToken.icon) {
            setFirstToken(secondToken);
            setFirstValue(secondValue);
            setSecondToken(firstToken);
            setSecondValue(firstValue);
        }
    }

    return (
        <>
            <div className="first_box">
                <div className="pay">
                    <p>You Pay</p>
                    <input
                        type="number"
                        value={firstValue}
                        placeholder='0'
                        className="first_input"
                        onChange={(e) => {
                            setFirstValue(e.target.value);
                            setFirstAllValue(e.target.value * firstToken.price)
                            setSecondValue(e.target.value * firstToken.price / secondToken.price)
                            setSecondAllValue(e.target.value * firstToken.price)
                        }}
                    />
                    <label>$ {firstAllValue}</label>
                </div>
                <div onClick={firstClick} className="token">
                    <img src={firstToken.icon} alt="btg" />
                    <h1>{firstToken.token}</h1>
                </div>
            </div>
            <button
                className='transfer'
                onClick={handleBtn}
            >Transfer</button>

            {isOpen &&
                <Modal
                    title="Select token"
                    open={isOpen}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Input
                        placeholder='Input token'
                        value={searchValue}
                        onChange={handleSearchChange}
                    />
                    <div className='upPrice'>
                        {data.map((item) => (
                            <TokenModal
                                key={item.token}
                                token={item.token}
                                icon={item.icon}
                                price={item.price}
                                setToken={({ token, icon, price }) => {
                                    setIsOpen(false);
                                    isFirstToken ? setFirstToken({ token, icon, price }) : setSecondToken({ token, icon, price });
                                    setIsSecondToken(false);
                                    setIsFirstToken(false);
                                }}
                            />
                        ))}
                    </div>
                    <hr />
                    <div className='alltokens'>
                        {searchValue === '' ? (
                            tokens.map((item) => (
                                <TokenPrice
                                    key={item.id}
                                    name={item.name}
                                    price={item.price}
                                    icon={item.icon}
                                    token={item.token}
                                    setToken={({ token, icon, price }) => {
                                        setIsOpen(false);
                                        isFirstToken ? setFirstToken({ token, icon, price }) : setSecondToken({ token, icon, price });
                                        setIsSecondToken(false);
                                        setIsFirstToken(false);
                                    }}
                                />
                            ))) : (filteredData.map(item => (
                                <TokenPrice
                                    key={item.id}
                                    name={item.name}
                                    price={item.price}
                                    icon={item.icon}
                                    token={item.token}
                                    setToken={({ token, icon, price }) => {
                                        setIsOpen(false);
                                        isFirstToken ? setFirstToken({ token, icon, price }) : setSecondToken({ token, icon, price });
                                        setIsSecondToken(false);
                                        setIsFirstToken(false);
                                    }}
                                />
                            )))}
                    </div>
                </Modal>
            }
            <div className="first_box">
                <div className="pay">
                    <p>You recieve</p>
                    <input
                        type="number"
                        value={secondValue}
                        placeholder='0'
                        className="second_input"
                        onChange={(e) => {
                            setSecondValue(e.target.value);
                            setSecondAllValue(e.target.value * secondToken.price)
                            setFirstValue(e.target.value * secondToken.price / firstToken.price)
                            setFirstAllValue(e.target.value * secondToken.price)
                        }}
                    />
                    <label>$ {secondAllValue}</label>
                </div>
                <div onClick={secondClick} className="token">
                    {secondToken.icon !== '' && <img src={secondToken.icon} alt="btg" />}
                    <h1>{secondToken.token}</h1>
                </div>
            </div>
            <Button />
        </>
    )
}