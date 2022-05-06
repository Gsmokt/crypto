import React from 'react';
import SideBarCoin from '../components/SideBarCoin';
import HistoryCoin from '../components/HistoryCoin';
import styled from 'styled-components';



const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 2fr;
  background-color: #f9f9f9;
  color: #124a63;
`
const Sidebar = styled.div`
    margin: auto;
    /* padding: 70px 90px; */
    /* font-family: 'Montserrat'; */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 25px;
    div p {
        text-align: center;
        padding: 0 5px;
    }
`
const ChartBar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
`


const Name = ({coin, historyCoin}) => {
    
    return (
        <Wrapper>
            <Sidebar>
                <SideBarCoin coin={coin} />
            </Sidebar>
            <ChartBar>
                <HistoryCoin  historyCoin={historyCoin} />
            </ChartBar>
            
        </Wrapper>
    );
};

export default Name;

export const getServerSideProps = async (context) => {
  const {name} = context.query;
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${name}`);
  const data = await res.json();
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=eur&days=30`);
  const historyData = await response.json();

  return {
      props: {
          coin: data,
          historyCoin: historyData,
      }
  }
}

