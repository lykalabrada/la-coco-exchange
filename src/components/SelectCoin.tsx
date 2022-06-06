import { ICoin } from '../types'

type Props = {
    name: string
    value: string
    coins: ICoin[]
    handleOnSelect: any
}

const SelectCoin = ({name, value, coins, handleOnSelect}: Props) => {
    return (
        <select className='form--input' name={name} value={value} onChange={handleOnSelect}>
            { coins.map((coin) => <option key={coin.id} value={coin.id}>{coin.symbol}</option>) }
        </select>
    )
}

export default SelectCoin