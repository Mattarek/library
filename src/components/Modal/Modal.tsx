interface Props {
  onClose: () => void;
}
export const Modal = ({ onClose }: Props) => {
  return (
    <div>
      <p>Do you want to remove book?</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};
