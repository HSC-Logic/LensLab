import { CircleHelp } from 'lucide-react';

export function Info({ text }: { text: string }) {
  return <span className="info" tabIndex={0} aria-label={text}><CircleHelp size={15} aria-hidden="true" /><span role="tooltip">{text}</span></span>;
}
