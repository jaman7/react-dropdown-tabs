import { useCallback, useMemo, useState } from 'react';
import { IEmployers } from './Employers.model';
import EmployersListsItem from './EmployersListsItem';

export interface IProps {
  data?: IEmployers[];
  position?: string;
}

const EmployersContent = ({ data = [], position }: IProps) => {
  const [searchQueries, setSearchQueries] = useState<string>('');

  const handleSearchChange = useCallback(
    (query: string) => {
      if (!position) return;
      setSearchQueries(query);
    },
    [position]
  );

  const filteredList = useMemo(() => {
    if (!position) return data;
    const query = searchQueries?.toLowerCase();
    if (!query) return data;

    return (
      data?.filter(
        el => el.name.toLowerCase().includes(query) || el.email.toLowerCase().includes(query) || el.phone.toLowerCase().includes(query)
      ) ?? []
    );
  }, [data, position, searchQueries]);

  return (
    <div className="dropdown-content">
      <input
        className="input"
        type="text"
        placeholder="Search by name, email, or phone"
        value={position ? searchQueries || '' : ''}
        onChange={e => handleSearchChange(e.target.value)}
      />
      <ul className="list">{filteredList?.map(el => <EmployersListsItem key={el._id} {...el} />)}</ul>
    </div>
  );
};

export default EmployersContent;
