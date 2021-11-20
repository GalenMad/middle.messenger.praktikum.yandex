interface UserInfo {
  [key: string]: string | null
}

interface ChatItem {
  id: number,
  title: string,
  avatar: string,
  unread_count: number,
  last_message: {
    user: {
      first_name: string,
      second_name: string,
      avatar: string,
      emai: string,
      login: string,
      phone: string
    },
    time: string,
    content: string
  }
}
