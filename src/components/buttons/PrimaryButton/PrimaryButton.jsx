import './PrimaryButton.scss';

export default function PrimaryButton({ title = 'Button', onClick }) {
  return <button className={'primary-button'} onClick={onClick}>{title}</button>;
}