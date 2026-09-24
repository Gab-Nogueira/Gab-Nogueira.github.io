import type { Locale } from './preferences';
export type ContactErrorCode = 'required' | 'length' | 'email' | 'short';
export const contactErrors: Record<Locale, Record<ContactErrorCode, string>> = {
  pt: { required: 'Preencha todos os campos para preparar a mensagem.', length: 'A mensagem excedeu o tamanho permitido. Revise os campos.', email: 'Informe um e-mail válido.', short: 'Escreva uma mensagem com pelo menos 10 caracteres.' },
  en: { required: 'Complete all fields to prepare the message.', length: 'The message exceeds the allowed length. Check the fields.', email: 'Enter a valid email address.', short: 'Write a message with at least 10 characters.' },
  es: { required: 'Completa todos los campos para preparar el mensaje.', length: 'El mensaje supera el tamaño permitido. Revisa los campos.', email: 'Introduce un correo válido.', short: 'Escribe un mensaje con al menos 10 caracteres.' },
};
export class ContactError extends Error {
  code: ContactErrorCode;
  constructor(code: ContactErrorCode, locale: Locale) { super(contactErrors[locale][code]); this.code = code; this.name = 'ContactError'; }
}
export interface ContactFields { name: string; email: string; subject: string; message: string; }
export function createContactDraft(values: ContactFields, recipient: string, locale: Locale = 'pt') {
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim().replace(/[\r\n]+/g, ' ');
  const message = values.message.trim();
  if (!name || !email || !subject || !message) throw new ContactError('required', locale);
  if (name.length > 100 || email.length > 254 || subject.length > 180 || message.length > 5000) throw new ContactError('length', locale);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new ContactError('email', locale);
  if (message.length < 10) throw new ContactError('short', locale);
  const labels = { pt: ['Olá, Gabriel!', 'Para', 'Assunto'], en: ['Hello, Gabriel!', 'To', 'Subject'], es: ['¡Hola, Gabriel!', 'Para', 'Asunto'] }[locale];
  const body = `${labels[0]}\n\n${message}\n\n—\n${name}\n${email}`;
  const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { mailto, body, copy: `${labels[1]}: ${recipient}\n${labels[2]}: ${subject}\n\n${body}` };
}
