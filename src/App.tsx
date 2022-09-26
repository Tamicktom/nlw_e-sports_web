import { useState, useEffect } from 'react';
import GameBanner from './Components/GameBanner/GameBanner';
import CreateAdModal from './Components/CreateAdModal/CreateAdModal';

import './styles/main.css';
import logoImg from './assets/logo-nlw-esports.svg';
import * as Dialog from '@radix-ui/react-dialog';
import CreateAdBanner from './Components/CreateAdBanner/CreateAdBanner';
import axios from 'axios';
interface Games {
  id: number;
  name: string;
  bannerUrl: string;
  _count: {
    Ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Games[]>([]);

  useEffect(
    () => {
      axios('http://localhost:3000/games')
        .then((response) => setGames(response.data));
    }, []);

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="Logo" />
      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {
          games.map((game) => {
            return (
              <GameBanner
                key={game.id}
                bannerURL={game.bannerUrl}
                gameName={game.name}
                ads={game._count.Ads}
              />
            )
          })
        }
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
