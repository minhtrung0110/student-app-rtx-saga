export function generateRandomID() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Chuỗi ký tự cho phép
  let id = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }
  return id;
}
