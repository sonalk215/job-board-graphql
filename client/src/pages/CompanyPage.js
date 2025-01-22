import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
// import { companies } from '../lib/fake-data';
import { getCompany } from '../lib/graphql/queries';
import JobList from '../components/JobList';

const CompanyPage = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState();

  useEffect(() => {
    getCompany(companyId).then((res) => {
      setCompany(res);
    });
  }, [companyId]);

  console.log('[CompanyPage] company', company);
  if (!company) {
    return <div>Loading...</div>;
  }
  // const company = companies.find((company) => company.id === companyId);
  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
      <h2 className="title is-5">Jobs at {company.name}</h2>
      <JobList jobs={company.jobs} />
    </div>
  );
};

export default CompanyPage;
