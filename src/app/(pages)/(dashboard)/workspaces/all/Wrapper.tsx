"use client";

import Section from "@/components/shared/section";
import { useApi } from "@/hooks/swr";
import { Workspace } from "@/types/workspace";
import FilterButton from "../components/filter";
import Workspaces from "@/components/shared/workspaces/workspaces";
import FullLoading from "@/components/shared/full-loading";
import { FetchDataType } from "@/lib/axios";

export default function Wrapper() {
  const { data, isLoading } = useApi<FetchDataType<Workspace[]>>(`/workspaces`);
  const items: Workspace[] = !!data ? data?.data : [];

  let content = <Workspaces items={items} />;

  if (isLoading) content = <FullLoading />;

  return (
    <Section title='All Workspaces' action={<FilterButton />}>
      {content}
    </Section>
  );
}
