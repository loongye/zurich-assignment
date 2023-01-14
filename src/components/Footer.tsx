interface IFooterProps {
  title: string;
  description: string;
}

export const Footer: React.FC<IFooterProps> = ({ title, description }) => {
  return (
    <footer>
      <h5>{title}</h5>
      <p>{description}</p>
    </footer>
  );
};
