export type ContactItem = {
  label: string;
  content: string;
  href?: string;
  type?: "email" | "phone" | "address";
};
