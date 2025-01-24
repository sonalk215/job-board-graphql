// import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
// import { companies } from '../lib/fake-data';
// import { companyByIdQuery, getCompany } from '../lib/graphql/queries';
import { companyByIdQuery } from '../lib/graphql/queries';
import JobList from '../components/JobList';
import { useQuery } from '@apollo/client';

const CompanyPage = () => {
  const { companyId } = useParams();
  const { data, loading, error } = useQuery(companyByIdQuery, {
    variables: { id: companyId },
  });

  // const [state, setState] = useState({
  //   company: null,
  //   loading: true,
  //   error: false,
  // });

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const company = await getCompany(companyId);
  //       setState({
  //         company,
  //         loading: false,
  //         error: false,
  //       });
  //     } catch (error) {
  //       console.log('error  ', JSON.stringify(error, null, 2));
  //       setState({
  //         company: null,
  //         loading: false,
  //         error: true,
  //       });
  //     }
  //   })();
  // }, [companyId]);

  // console.log('[CompanyPage] state', state);
  // const { company, loading, error } = state;
  console.log('[CompanyPage] state', { data, loading, error });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className="has-text-danger">Data unavailable</div>;
  }

  const { company } = data;

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
