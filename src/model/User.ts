interface User{
  id: number,
  name: string | null,
  userName: string | null,
  currentJob: string | null,
  email: string | null,
  avatar: string,
  isAdmin: boolean,
  phone?: string | null,
  birthDate?: string | null,
}

export default User;
