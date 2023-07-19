export interface Student {
  id?: string;
  first_name?: string;
  last_name?: string;
  birth_day?: string;
  address?: string;
  avatar?: string;
  phone?: string;
  mail?: string;
  gender?: boolean;
  status?: boolean;

  createdAt?: number;
  updatedAt?: number;
}

export type StudentType = Pick<
  Student,
  | 'first_name'
  | 'last_name'
  | 'birth_day'
  | 'address'
  | 'avatar'
  | 'phone'
  | 'mail'
  | 'gender'
  | 'status'
>[];

export type StudentTypeR = Pick<Student, 'id'>[];
