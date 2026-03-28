interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', light = false }: Props) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  return (
    <div className={`flex flex-col ${alignClass} mb-12`}>
      {eyebrow && (
        <div className="flex items-center gap-3 mb-4">
          {align === 'center' && <div className="w-6 h-px bg-brand-red" />}
          <span className="text-brand-red font-body text-xs uppercase tracking-[0.3em] font-600">{eyebrow}</span>
          {align === 'center' && <div className="w-6 h-px bg-brand-red" />}
          {align === 'left' && <div className="w-8 h-px bg-brand-red" />}
        </div>
      )}
      <h2 className={`font-display font-black text-3xl md:text-5xl leading-tight ${light ? 'text-brand-dark' : 'text-white'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 font-body leading-relaxed max-w-2xl ${light ? 'text-gray-600' : 'text-white/50'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
