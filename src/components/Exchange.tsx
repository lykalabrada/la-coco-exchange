import React, { useCallback, useEffect, useState } from 'react'
import { ALLOWED_COINS } from '../shared/constants'
import { ICoin } from '../types'
import SelectCoin from './SelectCoin'

const Exchange = () => {
    const [amount, setAmount] = useState<string>('1')
    const [selectedPair, setSelectedPair] = useState<{ from:ICoin, to:ICoin }>({
        from: ALLOWED_COINS[0], // default to BTC
        to: ALLOWED_COINS[1] // default to ETH
    })
    const [coinList, setCoinList] = useState<{ source: ICoin[], destination: ICoin[]}>({ source: [], destination: [] })
    const [coinPrices, setCoinPrices] = useState<{fromCurrency: number, toCurrency: number}>({ fromCurrency: 0, toCurrency: 0 })
    const [result, setResult] = useState<{convertedAmount: number, totalValue: number}>({ convertedAmount: 1, totalValue:0 })
    const [error, setError] = useState<string>()

    const getCoinPrices = useCallback(async () => {
        try {
            const { from, to } = selectedPair
            const coinGeckoBaseURL:string = 'https://api.coingecko.com/api/v3/simple/price'
            
            const res = await fetch(`${coinGeckoBaseURL}?ids=${from.id},${to.id}&vs_currencies=btc`)
            const data = await res.json()
            const fromValueInBTC = data[from.id].btc
            const toValueInBTC = data[to.id].btc

            const fromCurrencyPrice = Number((fromValueInBTC / toValueInBTC).toFixed(8))
            const toCurrencyPrice = Number((toValueInBTC / fromValueInBTC).toFixed(8))
            setCoinPrices({ fromCurrency: fromCurrencyPrice, toCurrency: toCurrencyPrice})
        } catch (error) {
            setError('Ooops. Something went wrong. Please contact support.')
            console.log('Error: ', (error as any).message)
        }
    }, [selectedPair])

    useEffect(() => {
        const numAmount = Number(amount)
        if (isNaN(numAmount) || numAmount <= 0) {
            setError('Amount should be a number and greater than 0.')
        } else {     
            const totalValue = Number((coinPrices.fromCurrency * (numAmount)).toFixed(8))
            setResult({ convertedAmount: numAmount, totalValue})
            setError('')
        }
    }, [coinPrices, amount])

    useEffect(() => {
        const sourceCoinList: ICoin[] = ALLOWED_COINS.filter(coin => coin.id !== selectedPair?.to.id)
        const destinationCoinList: ICoin[] = ALLOWED_COINS.filter(coin => coin.id !== selectedPair?.from.id)
        setCoinList({ source: sourceCoinList, destination: destinationCoinList})

        // Get prices of coins
        getCoinPrices()
    }, [selectedPair, getCoinPrices])

    const onAmountChange = (event: { target: HTMLInputElement }) => {
        setAmount(event.target.value)
    }

    const onSelect = (event: { target: HTMLSelectElement }) => {
        const { name, value } = event.target
        const selectedCoin = ALLOWED_COINS.find(coin => coin.id===value)
        setSelectedPair(prevPair => ({...prevPair, [name]: selectedCoin}))
    }

    const onSwapCurrencies = () => {
        setSelectedPair(prev => ({ from: prev.to, to: prev.from }))
    }

    return (
        <main>
            <div data-testid='convert-title'>
                <h3>Convert {selectedPair.from.symbol} to {selectedPair.to.symbol}</h3>
            </div>
            <div className='form'>
                <div className='form--detail'>
                    <span>Amount</span>
                    <input
                        type='text'
                        className='form--input' 
                        placeholder='Enter Amount' 
                        value={amount} 
                        onChange={onAmountChange}
                        onKeyPress={(event) => {
                            if (!/[0-9.]/.test(event.key)) {
                                event.preventDefault()
                            }
                        }}
                        data-testid='amount'
                    />
                </div>
                <div className='form--detail' data-testid='from-currency'>
                    <span>From</span>
                    <SelectCoin
                        name='from'
                        value={selectedPair.from.id} 
                        coins={coinList.source} 
                        handleOnSelect={onSelect} 
                    />
                </div>
                <div className='form--detail' data-testid='switch-icon'>
                    <img src='/exchange.png' className='switch-img' alt='Swap Currencies' title='Swap Currencies' onClick={onSwapCurrencies} />
                </div>
                <div className='form--detail' data-testid='to-currency'>
                    <span>To</span>
                    <SelectCoin 
                        name='to'
                        value={selectedPair.to.id} 
                        coins={coinList.destination} 
                        handleOnSelect={onSelect}
                    />
                </div>  
            </div>
            {error && <div className='error' data-testid='error'>{error}</div>}
            <div className='result' data-testid='result'>
                <div style={{fontSize: '1rem'}}>{result.convertedAmount} {selectedPair.from.symbol} = </div>
                <div style={{fontSize: '1.75rem'}}>{result.totalValue} {selectedPair.to.symbol}</div>

                <div className='price-value'>1 {selectedPair.from.symbol} = {coinPrices.fromCurrency} {selectedPair.to.symbol}</div>
                <div className='price-value'>1 {selectedPair.to.symbol} = {coinPrices.toCurrency} {selectedPair.from.symbol}</div>
            </div>
        </main>
    )
}

export default Exchange