import React, { useState, useEffect, useContext } from "react";

import { CompanyContext } from "../../../../../context/companies/CompanyContext";
import { ICompany } from "../../../../../interfaces";
import Layout from "../../../../../components/layouts/Layout";
import ListEntries from "../../../../../components/ui/ListEntries";
import NewEntry from "../../../../../components/ui/NewEntry";
import { useRouter } from 'next/router';
import Company from '../../../../../models/Company';
import { NextPage } from "next";

const EntriesPage:NextPage = () => {
  const { companies } = useContext(CompanyContext);
  const router  = useRouter()
  const [company, setCompany] = useState<any>();
  const [listCompanies, setListCompanies] = useState([])
  useEffect(() => {
    /* @ts-ignore */
    setListCompanies(companies[0])
    findCompany()
  }, [companies])

  const findCompany = async () => {
    const find = await listCompanies?.find((company: ICompany) => company._id === router.query.id);
    setCompany(find)
  };



  

  return (
    <Layout>
      <h1 className="font-bold text-4xl flex-row justify-center items-center">
        <button onClick={() => router.back()} className="text-sm mr-6 text-center"> 🔙   </button>
        {company?.name}</h1>
      <hr className="h-px mb-5 mt-3 bg-gray-200 border-0 dark:bg-gray-300" />
      <NewEntry />
      <ListEntries company={company} />
    </Layout>
  );
};

export default EntriesPage;
