export const TREE_URL = process.env.MOSSY_DOMAIN as string

const MOSS_URL = process.env.MOSS_URL as string

export const MESSAGES = {
  url: (groupId: string) => `${TREE_URL}/tree/${groupId}\nだよ！`,
  grow: (groupId: string) =>
    `みんなの言葉のおかげで木が育ってきたよ🌲\n${TREE_URL}/tree/${groupId}`,
  mossLink: () =>
    `みんなならきっとリアルでも植物を育てられるんじゃないかな🌲\n${MOSS_URL}`,
}

export const LINE_CONFIG_ENCRYPTED =
  process.env.VERCEL_ENV === "production"
    ? "3xCC4eT4wJaRzpnZPISr9JlLlDVCS3tM/Ks3F552asc/8tQLGI4KgjiM3K1cDrK68AiN4qKpeJyOnbCkLXOfTCr76xPJ6Jw/3hGshYC0rQXTlIpJ4KrzrUK/G9Krg7uR3+1W+rl9AxB4W136kF7VpykK4nNaN39vGrbx2dgvbuBdcpNUVMuFOnyXnihpI6W90P2MXXIUJRpZPQzHhGURW0olQO/0LAaYN1EDXHEErS8dpC2FrpHvcYlaA6hmsMbbn/8i+uZ3/y8IZyJEoNSHea6I2W2jMLHQI8hagO8lkZX7Yh7B1vEfZuhgDSQ+ErO/O+FiJYnV2ehBLxPX9mO9k5WBsYDY/6klPF2WLxdC9NQ="
    : "3xCC4eT4wJaRzpnZPISr9LEUofVTprH0jRMox2sQn5y1fnt0/8rsxwiTz+VDn2oR9Ccynn/DLp3BN4xRSFJnAZJuDidskalNdvKpyzH2N3pVZcOTl5xuflWH1DoVndMJ/b+KdVZIdUqsesYQeK7ErjqxursyVPzW42vYmXiy3UySKbuRZOicUmSU1WuqFhmk6XE+uk1iI63U+7846yioFLppW25+tdM4P+Z8yLFMjiC4OgsVQvJ/dnR3lYAubcb0mbd90Glr7JnnphJ7QGpbn0f4rGIt5LGOT8RT6JWqKk3MoUzEZPzbLRAGLe2w2KlFAzHyE1sg+XIb1Rf7j5BTv4OrmnC7eM0onNoRJjIUYy0="

export const POSITIVE_THRESHOLD = 70
