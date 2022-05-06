import React from 'react';
import Link from 'next/link'
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    height: 80px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    margin-bottom: 10px;
    padding: 10px;
    background-color: white;
    &:hover img {
        transform: scale(1.1);
    }
`
const Logo = styled.div`
    display: grid;
    grid-column: 1/2;
    grid-template-columns: repeat(3, 1fr);
    img {
        grid-column: 1/2;
        grid-row: 1/3;
        &:hover {
            cursor: pointer;
            transition: 0.3s;
        }
    }
`
const Symbol = styled.div`
    font-weight: bold;
    grid-column: 2/4;
    text-align: left;
`
const Name = styled.div`
    grid-column: 2/4;
`
const Price = styled.div`
    grid-column: 3/4;
    align-self: center;
    text-align: right;
    padding-right: 10px;
`
const Red = styled.div`
    grid-column: 4/5;
    align-self: center;
    text-align: right;
    padding-right: 10px;
    color: red;
`
const Green = styled.div`
    grid-column: 4/5;
    align-self: center;
    text-align: right;
    padding-right: 10px;
    color: green;
`
const MarketCap = styled.div`
    grid-column: 5/6;
    align-self: center;
    text-align: right;
    padding-right: 15px;
`


const Coin = ({coin}) => {
    return (
        
       <Wrapper>
                    <Logo>
                        <Link href={`/${coin.id}`} >
                            <img width='40px' height='40px' src={coin.image} />
                        </Link>
                        <Symbol>
                            {coin.symbol}
                        </Symbol>
                        <Name>
                            {coin.name}
                        </Name>
                    </Logo>
               
  
            <Price>
            € {coin.current_price}
            </Price>
            {coin.price_change_percentage_24h < 0 
                                                ? <Red>{coin.price_change_percentage_24h.toFixed(2)} %</Red>
                                                : <Green>{coin.price_change_percentage_24h.toFixed(2)} %</Green>
            }
            <MarketCap>
            € {coin.market_cap}
            </MarketCap>

        
            </Wrapper>
    );
};

export default Coin;