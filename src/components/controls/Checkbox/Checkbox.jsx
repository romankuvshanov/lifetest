import './Checkbox.scss';

export default function Checkbox({checked, onChange}) {
    return <input className={'checkbox'} type={'checkbox'} checked={checked} onChange={onChange}/>;
}