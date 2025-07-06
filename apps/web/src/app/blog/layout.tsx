export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-red-500">{children}</div>;
}