import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, provider, db } from '../firebase-config';
import { signInWithPopup, signOut } from 'firebase/auth';
import { Drawer, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';


const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`
const Logo = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-top: 60px;
    padding-bottom: 60px;
    padding-right: 20px;
`
const Writting = styled.div`
    display: flex;
    align-items: center;
    font-size: x-large;
    justify-content: space-between;
    h1{
        color   : #21B6B7;
    };
    div {
        margin-top: 30px;
        margin-right: 40px;
        align-self: flex-start;
        img {
        border-radius: 50%;
        align-self: flex-end;
        transition: 0.3s;
        &:hover {
            cursor: pointer;
            transform: scale(1.1);
        }
    }
    }
`
const Search = styled.div`
    grid-column: 1/3;
    display: flex;
    justify-content: center;
    padding: 10px 0;
    input{
        height: 50px;
        width: 450px;
        border-radius: 7px;
        padding: 3px 10px;
        font-size: 25px;
        color: #b3c5cd;
        border: none;
        background-color: #eef3f6;
        &::placeholder {
            font-size: 25px;
            color: #b3c5cd;
        }
        &:focus {
            outline: none;
            box-shadow: 0 0 3px black;
        }
    }
`



const SearchCoin = ({setInputValue, img, isLogged, setIsLogged, coin, watchlist}) => {

    const router = useRouter();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [docSnapshot, setDocSnapshot] = useState();

    const [user] = useAuthState(auth);

    useEffect(() => {
      const getCoin = async () => {
        const ref = doc(db, 'watchlist', user.uid);

        const docSnap = await getDoc(ref);
        setDocSnapshot(docSnap.data().coins);
      }
      getCoin();
    })


    const signIn = () => {
        signInWithPopup(auth, provider)
            .then(() => {
                typeof window !== 'undefined' ? localStorage.setItem('isLogged', true) : null;
              setIsLogged(true);
            })
    }

    const userSignOut = () => {
        signOut(auth)
        .then(() => {
            typeof window !== 'undefined' ? localStorage.setItem('isLogged', false) : null;
          setIsLogged(false);
          setIsDrawerOpen(false);
        })
    }

    return (
        <Wrapper>
            <Logo>
                <Image width={100} height={50} src={img} />
            </Logo>
            <Writting>
          
                <h1>Crypto tracker</h1>
                {!user 
                            ? <button onClick={signIn} >Login</button>
                            : <div> 
                            <IconButton onClick={() => setIsDrawerOpen(true)} > <img width='70px' height='70px' src={user?.photoURL} /></IconButton>
                            <Drawer anchor='right' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                            <Box sx={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f9f9f9'}} p={2} width='250px' role='prezentation'>
                            <img style={{borderRadius: '50%'}} width='100px' height='100px' src={user?.photoURL} />
                            <Typography sx={{color: '#124a63', paddingTop: '10px'}} variant='body1' >{user?.displayName}</Typography>
                            <Stack direction='row'>
                            <Button onClick={() => setIsDrawerOpen(false)} >Close</Button>
                            <Button onClick={userSignOut} >Logout</Button>
                            </Stack>
                            <Stack direction='column'>
                                
                                {docSnapshot?.map(e => <Button onClick={() => router.push(`/${e}`)} key={e}>{e}</Button>)}
                            </Stack>
                            </Box>
                            </Drawer>
                            </div>
                }
            </Writting>
            <Search>
                <input onChange={(e) => setInputValue(e.target.value)} type='text' placeholder='Search' />
            </Search>
        </Wrapper>
    );
};

export default SearchCoin;