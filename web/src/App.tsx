import './styles/main.css'

import * as Dialog from '@radix-ui/react-dialog'
import { GameController } from 'phosphor-react'
import { useEffect, useState } from 'react'
import logoImg from './assets/Logo.svg'
import { CreateAdBanner } from './components/CreateAdBanner'
import { Input } from './components/Form/Input'
import { GameBanner } from './components/GameBar'

interface Games {
  id: string
  bannerUrl: string
  title: string
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<Games[]>([])
  const daysOfTheWeek = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ]
  useEffect(() => {
    fetch('http://localhost:3333/games').then((response: any) =>
      response.json().then((data: any) => {
        setGames(data)
      })
    )
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex items-center flex-col my-18">
      <img src={logoImg} alt="logo" />
      <h1 className=" text-6xl text-white font-black mt-20 ">
        Seu{' '}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          {' '}
          duo
        </span>{' '}
        está aqui!
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          )
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed">
            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
              <Dialog.Title className="text-3xl font-black">
                Publique um anúncio
              </Dialog.Title>

              <form className="mt-8 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="game" className="font-semibold">
                    Qual o game?
                  </label>
                  <Input
                    id="game"
                    placeholder="Selecione o game que deseja jogar"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Seu nome (ou nickname)</label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Como te chamam dentro do game?"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                    <Input
                      type="number"
                      id="yearsPlaying"
                      placeholder="Tudo bem ser ZERO"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="discord">Qual seu Discord?</label>
                    <Input
                      type="text"
                      id="discord"
                      placeholder="Usuario#0000"
                    />
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="weekDays">Quando costuma jogar?</label>

                    <div className="grid grid-cols-4 gap-2">
                      {daysOfTheWeek.map((day, index) => (
                        <button
                          type="button"
                          key={index}
                          title={day}
                          className="w-8 h-8 rounded bg-zinc-900 hover:bg-violet-600"
                        >
                          {day.charAt(0)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="hourStart">Qual o horário do dia?</label>
                    <div className="grid grid-cols-2 gap-1">
                      <Input type="time" id="hourStart" placeholder="De" />
                      <Input type="time" id="hourEnd" placeholder="Até" />
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex gap-2 text-sm">
                  <Input type="checkbox" />
                  Costumo me conectar no chat de voz
                </div>

                <footer className="mt-4 flex justify-end gap-4">
                  <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
                    Cancelar
                  </Dialog.Close>
                  <button
                    type="submit"
                    className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                  >
                    <GameController size={24} />
                    Encontrar duo
                  </button>
                </footer>
              </form>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default App
