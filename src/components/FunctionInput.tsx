import React, { useState } from 'react'


type Handle = {
    handleFunction: (value: string) => void 
    handleInterval: (l: number, r: number) => void
}
export const FunctionInput = (handle: Handle) => {
    const [func, setFunc] = useState('')
    const [interval, setInterval] = useState<{l: number, r: number}>({l: -10, r: 10})

    const handleChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setFunc(value)
        setTimeout(() => handle.handleFunction(value), 1000)
    }

    const handleChangeInterval = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setInterval(prevInterval => ({...prevInterval, [name]: value}))
        
        const newInterval = (name === 'l') ? {l: +value, r: interval.r}
                                           : {l: interval.l, r: +value}
        handle.handleInterval(newInterval.l, newInterval.r)
        
    }

    return (
        <div className='input'>
            <label className='input__func-label' htmlFor='function'>
                <input
                    id='function' name='function'
                    type='text'
                    placeholder='f(x)'
                    value={func}
                    onChange={handleChangeFunction}/>
            </label>
            <label className='input__interval-label' htmlFor='l'>
                <input
                    id='l' name='l'
                    type='number'
                    value={interval.l}
                    onChange={handleChangeInterval}
                    />
            </label>
            <label className='input__interval-label' htmlFor='r'>
                <input
                    id='r' name='r'
                    type='number'
                    value={interval.r}
                    onChange={handleChangeInterval}
                    />
            </label>
        </div>
        
    )
}
