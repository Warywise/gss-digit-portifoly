import { JSX } from 'react';

const Card = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <article className="rounded-lg inset-ring ring-muted bg-muted/30 shadow-sm/30 shadow-foreground">
    {children}
  </article>
);

const CardContent = ({
  style,
  children,
}: {
  style?: string;
  children: JSX.Element | JSX.Element[];
}) => <div className={`p-6 ${style}`}>{children}</div>;

const InfoCard = ({ icon, title, label }: { icon: JSX.Element; title: string; label: string }) => (
  <>
    <div className="w-12 h-12 rounded-full text-primary bg-primary/10 flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-subtitle">{label}</p>
    </div>
  </>
);

export { Card, CardContent, InfoCard };
