import { ICard, IList } from '../models';
import uuidv1 from 'uuid/v1';

export const reorder = <T>(list: T[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const initialLists: IList[] = [
  {
    id: 'id0',
    listTitle: 'Todo 📝',
  },
  {
    id: 'id1',
    listTitle: 'In progress 👌',
  },
  {
    id: 'id2',
    listTitle: 'Done ✅',
  },
];

export const initialCards: ICard[] = [
  {
    id: uuidv1(),
    text: 'Feed cat',
    listId: 'id0',
  },
  {
    id: uuidv1(),
    text: 'Take out bins',
    listId: 'id0',
  },
  {
    id: uuidv1(),
    text: 'Housework',
    listId: 'id1',
  },
];

export const listMembersForTask = [
  {
    id: 1,
    first_name: 'Nguyễn Đức Minh',
    last_name: 'Trung',
    phone_number: '09744148784',
    gender: 'nam',
    birth_date: '01-10-2001',
    mail: 'minhtrung@gmail.com',
    role: 'CEO',
    avatar: 'https://i.ibb.co/mvybfht/C-i-n-3-1.jpg',
    address: 'Tan Quy Tây, Bình Chanh,HCM',
    status: 1,
  },
  {
    id: 2,
    first_name: 'Dương Đình Khả',
    last_name: 'Ngân',
    phone_number: '08844148784',
    gender: 'nữ',
    birth_date: '12-06-1996',
    mail: 'nganxulaku@gmail.com',
    role: 'diễn viên',
    avatar: 'https://duyendangvietnam.net.vn/public/uploads/files/Chau%20Chau/aaa(74).jpg',
    address: 'HCM',
    status: 1,
  },
  {
    id: 3,
    first_name: 'Hà',
    last_name: 'Nhi',
    phone_number: '08844148784',
    gender: 'nữ',
    birth_date: '08-02-1994',
    mail: 'nhixinhdep@gmail.com',
    role: 'ca sĩ',
    avatar: 'https://images2.thanhnien.vn/Uploaded/thynhm/2022_08_08/ha-nhi-7-8636.jpg',
    address: 'HCM',
    status: 1,
  },
  {
    id: 4,
    first_name: 'Lê Phạm',
    last_name: 'Ngân',
    phone_number: '08844148784',
    gender: 'nữ',
    birth_date: '01-10-2008',
    mail: 'nganxulaku@gmail.com',
    role: 'Thư Ký',
    avatar: 'https://th.bing.com/th/id/OIP.JZb8Bkv2vXm6G4W6KZy-rAHaHV?pid=ImgDet&rs=1',
    address: 'HCM',
    status: 1,
  },
];
export const listPriority = [
  {
    id: 1,
    label: 'Highly',
    value: 'highly',
    color: '#e94040',
    backgroundColor: 'rgba(233,64,64,.12)',
  },
  {
    id: 2,
    label: 'Middle',
    value: 'middle',
    color: '#fa8c16',
    backgroundColor: 'rgba(250,140,22,.12)',
  },
  {
    id: 3,
    label: 'Low',
    value: 'low',
    color: '#18baff',
    backgroundColor: 'rgba(24,186,255,.12)',
  },
  {
    id: 4,
    label: 'None ',
    value: 'none',
    color: '#a9a8a8',
    backgroundColor: '#f5f7f9',
  },
];
