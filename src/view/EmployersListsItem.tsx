import { IEmployers } from './Employers.model';

const EmployersListsItem = (props: IEmployers) => {
  const labels: { [name: string]: string } = {
    name: 'Nazwa',
    level: 'Poziom',
    age: 'Wiek',
    position: 'Rola',
    gender: 'Płeć',
    email: 'E-mail',
    phone: 'Telefon',
  };

  return (
    <li className="employers-list-item">
      {Object.entries(labels)?.map(([key, label]) => {
        const value = props[key as keyof IEmployers];
        return value ? (
          <div key={key} className="employers-list-item__entry">
            <span className="name">{label}:</span> {value}
          </div>
        ) : null;
      })}
    </li>
  );
};

export default EmployersListsItem;
