import { useState, useEffect, FormEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Check, GameController } from 'phosphor-react';
import Input from '../Form/Input';

type Props = {}

interface Games {
    id: number;
    name: string;
    bannerUrl: string;
    _count: {
        Ads: number;
    }
}

export default function CreateAdModal({ }: Props) {
    const [games, setGames] = useState<Games[]>([]);
    const [weekDays, setWeekDays] = useState<string[]>([]);

    useEffect(
        () => {
            fetch('http://localhost:3000/games')
                .then((response) => response.json())
                .then((data) => setGames(data))
        }, []);

    function handleCreateAd(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        console.log(data);

    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
            <Dialog.Content
                className='fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25 font-semibold'>
                <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>
                <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="game">Qual o game?</label>
                        <select
                            name="game"
                            id="game"
                            className='bg-zinc-900 py-3 px-4 rounded text-sm appearance-none'
                            defaultValue=""
                        >
                            <option disabled value="">Qual o game que deseja jogar?</option>
                            <>
                                {games.map((game) => { return (<option key={game.id} value={game.id}>{game.name}</option>) })}
                            </>
                        </select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name">Seu nome ou nickname</label>
                        <Input id='name' placeholder='Como te chama dentro do game' />
                    </div>

                    <div className='grid grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                            <Input id="yearsPlaying" placeholder='Todo bem ser ZERO' type="number" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="discord">Qual seu discord</label>
                            <Input id="discord" placeholder='Usuários#0000' />
                        </div>
                    </div>

                    <div className='flex gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="weekDays">Quando costuma jogar?</label>
                            <ToggleGroup.Root
                                type={'multiple'}
                                className='grid grid-cols-4 gap-2'
                                value={weekDays}
                                onValueChange={setWeekDays}
                            >
                                <DayOfWeek variable={weekDays} val="0" title="Domingo" />
                                <DayOfWeek variable={weekDays} val="1" title="Segunda-feira" />
                                <DayOfWeek variable={weekDays} val="2" title="Terça-feira" />
                                <DayOfWeek variable={weekDays} val="3" title="Quarta-feira" />
                                <DayOfWeek variable={weekDays} val="4" title="Quinta-feira" />
                                <DayOfWeek variable={weekDays} val="5" title="Sexta-feira" />
                                <DayOfWeek variable={weekDays} val="6" title="Sábado" />
                            </ToggleGroup.Root>
                        </div>
                        <div className='flex flex-col gap-2 flex-1'>
                            <label htmlFor="hourStart">Qual horário do dia?</label>
                            <div className='grid grid-cols-2 gap-2'>
                                <Input type="time" id="hourStart" placeholder='De' />
                                <Input type="time" id="hourEnd" placeholder='Até' />
                            </div>
                        </div>
                    </div>

                    <label className='mt-2 flex gap-2 text-sm items-center'>
                        <Checkbox.Root className='w-6 h-6 p-1 rounded bg-zinc-900'>
                            <Checkbox.Indicator>
                                <Check className='w-4 h-4 text-emerald-400' />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Costumo me conectar ao chat de voz
                    </label>

                    <footer className='mt-4 flex justify-end gap-4'>
                        <Dialog.Close type='button'
                            className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
                            Cancelar
                        </Dialog.Close>
                        <button
                            className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600' type="submit">
                            <GameController size={24} />
                            Encontrar Duo
                        </button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}

interface DayOfWeekProps {
    val: string;
    title: string;
    variable: string[];
}

const DayOfWeek = ({ val, title, variable }: DayOfWeekProps) => {
    return (
        <ToggleGroup.Item
            value={val}
            className={`w-8 h-8 rounded ${variable.includes(val) ? "bg-violet-500" : "bg-zinc-900"}`}
            title={title}
        >
            {title[0]}
        </ToggleGroup.Item>
    );
}