export const generateId = (lenght = 12) => {
  const symbols = "qwertyuiop[]asdfghjklzxcvbnm1234567890-"
  let id = ""
  for (let i = 0; i < lenght; i++) {
    id += symbols[ Math.round(Math.random() * (symbols.length - 1), 0) ]
  }
  return id
}