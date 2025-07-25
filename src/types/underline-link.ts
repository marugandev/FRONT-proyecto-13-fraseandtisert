export type UnderlineLinkProps =
  | {
      to: string;
      onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
      children: React.ReactNode;
      className?: string;
    }
  | {
      to?: undefined;
      onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
      children: React.ReactNode;
      className?: string;
    };
