import { Employee } from '../models/employee';

export function createDefaultEmployee(): Employee {
  const now = new Date().toISOString();
  return {
    id: 0,
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    email: '',
    mobile: '',
    role: '',
    createdAt: now,
    updatedAt: now,
    status: ''
  };
}
