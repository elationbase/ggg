import type { ContactTypeWithId } from '@/lib/types';
import { createContext } from 'react';

export const ContactContext = createContext<ContactTypeWithId[]>([]);
