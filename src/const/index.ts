import { UserItem } from "@/types"

export const WINDOW_WIDTH = {
  bigDesktop: 1920,
  desktop: 1440,
  smallDesktop: 1280,
  tablet: 768
}

export const CHANNEL_WIDTH = {
  biggest: 300,
  bigDesktop: 250,
  desktop: 200,
  smallDesktop: 150,
  tablet: 100
}

export const CHANNELS = [
  {
    name: "Корпоративная сеть: рабочие вопросы",
    subName: "corp",
    id: 0
  },
  {
    name: "Корпоративная сеть: флудилка",
    subName: "flood",
    id: 1
  }
]

export const USER_LIST: UserItem[] = [
  {
    id: 27,
    nickname: "Александр",
    password: "1"
  },
  {
    id: 84,
    nickname: "Игорь",
    password: "2"
  },
  {
    id: 31,
    nickname: "Николай",
    password: "3"
  },
  {
    id: 49,
    nickname: "Юлия",
    password: "4"
  },
  {
    id: 51,
    nickname: "Екатерина",
    password: "5"
  },
  {
    id: 12,
    nickname: "Олег",
    password: "6"
  },
  {
    id: 62,
    nickname: "Ирина",
    password: "7"
  },
  {
    id: 7,
    nickname: "Админ",
    password: "0"
  }
]
