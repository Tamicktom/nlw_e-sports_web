import { MagnifyingGlassPlus } from 'phosphor-react';

import './styles/main.css';

import logoImg from './assets/logo-nlw-esports.svg';

function App() {

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="Logo" />
      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        <GameCard surce='/game-1.png' alter='Game 1' />
        <GameCard surce='/game-2.png' alter='Game 2' />
        <GameCard surce='/game-3.png' alter='Game 3' />
        <GameCard surce='/game-4.png' alter='Game 4' />
        <GameCard surce='/game-5.png' alter='Game 5' />
        <GameCard surce='/game-6.png' alter='Game 6' />
      </div>

      <div className='pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8'>
        <div className='bg-[#2A2634] px-8 py-6 flex justify-between items-center'>
          <div>
            <strong className='text-2xl text-white font-black block'>Não encontrou seu duo?</strong>
            <span className='text-zinc-400 block'>Publique um anúncio para encontrar novos players!</span>
          </div>
          <button className='px-4 py-3 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3'>
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </button>
        </div>
      </div>
    </div>
  )
}

interface GameCardProps {
  surce: string;
  alter: string;
  gameName?: string;
  ads?: number;
}

function GameCard({ surce, alter, gameName = 'League of Legends', ads = 4 }: GameCardProps) {
  return (
    <a href="" className='relative rounded-lg overflow-hidden'>
      <img src={surce} alt={alter} />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">{gameName}</strong>
        <span className='text-zinc-300 text-sm block'>{ads} {ads > 1 ? 'Anúncios' : 'Anúncio'}</span>
      </div>
    </a>
  )
}

export default App
