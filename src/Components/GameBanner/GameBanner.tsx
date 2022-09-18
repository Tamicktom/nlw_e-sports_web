interface GameCardProps {
    bannerURL: string;
    gameName: string;
    ads: number;
}

export default function GameBanner({ bannerURL, gameName, ads }: GameCardProps) {
    
    return (
        <a href="" className='relative rounded-lg overflow-hidden'>
            <img src={bannerURL} />
            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
                <strong className="font-bold text-white block">{gameName}</strong>
                <span className='text-zinc-300 text-sm block'>{ads} {ads > 1 ? 'Anúncios' : 'Anúncio'}</span>
            </div>
        </a>
    )
}

