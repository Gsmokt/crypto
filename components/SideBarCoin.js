import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase-config';
import { Button } from '@mui/material';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { async } from '@firebase/util';

const SideBarCoin = ({ coin }) => {

  const [user] = useAuthState(auth);

  const [watchlist, setWatchlist] = useState([]);

  const coinIn = watchlist.includes(coin?.id);
  
  useEffect(() => {
    if(user){
      const ref = doc(db, 'watchlist', user.uid);
      var unsubscribe = onSnapshot(ref, (coin) => {
        if(coin.exists()){
          setWatchlist(coin.data().coins);
        }
      })
      return () => {
        unsubscribe();
      }
    }
  })

  const addToWatchList = async () => {
    const ref = doc(db, 'watchlist', user.uid);
    try{
      await setDoc(ref, {coins: watchlist ? [...watchlist, coin?.id] : [coin?.id]});
      
    }catch( error ){
          console.log(error);
    }
  }

  const removeFromWatchList = async () => {
    const ref = doc(db, 'watchlist', user.uid);
    try{
      await setDoc(ref, {coins: watchlist.filter(e => e !== coin.id)});
    }catch( error ){
      console.log(error);
    }
  }

  

  return (
    <>
      <img src={coin.image.large} height="200px" />

      <h2>{coin.name}</h2>

      <div>
        <p>{coin.description.en.split(".")[0]}</p>
      </div>
      <h3>Rank: {coin.market_cap_rank}</h3>

      <h3>Price: € {coin.market_data.current_price.eur}</h3>
      {user && (coinIn ? <Button  onClick={removeFromWatchList} >Remove from Watchlist</Button> : <Button  onClick={addToWatchList} >Add to Watchlist</Button>)}
    </>
  );
};

export default SideBarCoin;
