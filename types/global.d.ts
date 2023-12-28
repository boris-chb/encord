import { definitions } from '@/db/types';

declare global {
  type Message = definitions['messages'] & {
    user: definitions['profiles'];
  };
}
